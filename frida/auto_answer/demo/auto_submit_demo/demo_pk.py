# 演示数字比大小获取试题 -> 生成答案 -> 提交答案
"""
该目录将作为演示及开发项目, 不作为正式项目使用
运行前应检查填写cookie, 你手机发起pk请求时的带参数url和提交答案时的带参数url, 这些参数不同小猿口算app版本, 不同手机, 都可能不同

通过hook自动补全cookie和带参url功能将在未来的auto_submit_multiprocess_demo项目中实现
"""

import base64
import gzip
import time

import requests
import json

from termcolor import colored
from urllib3.exceptions import InsecureRequestWarning

from hook.gan_sign.gan_sign_model import FridaSignExtractor # 用于生成sign
from hook.matchV2_byDataDecryptCommand.do_matchV2_byDataDecryptCommand_model import FridaResponseDecrypt # 用于解密试题
from hook.answer_encrypt.do_answer_encrypt_model import FridaRequestEncrypt # 用于加密答案

import get_cookie

# cookies, 后续应该改成先在手机pk一下, hook请求头拿cookie, 既省去抓包, 又可以当未来的cookie实时变化, 通过hook计算
"""
每过一段时间发生变化的cookie: 
g_sess, sess


只需要填下面3个关键cookie即可
ks_persistent, sess, userid
"""

cookies = {
    "YFD_U": "",
    "__sub_user_infos__": "",
    "g_loc": "",
    "g_sess": "",
    "ks_deviceid": "",
    "ks_persistent": "此处必填",
    "ks_sess": "",
    "persistent": "",
    "sess": "此处必填",
    "sid": "",
    "userid": "此处必填"
}


"""
获取及解密试题部分
"""
# 调用gan_sign_model.py模块获取sign
getQuestion_extractor = FridaSignExtractor("com.fenbi.android.leo", "hook/gan_sign/gan_sign_model.js", None)  # 第3个是小袁口算的pid; 如果知道的话就传pid, 能免去adb查找, 提高效率; 不知道就传None
getQuestion_extractor.start()  # 初始化并附加到进程
getQuestion_sign_value = getQuestion_extractor.getsign("/leo-game-pk/android/math/pk/match/v2")  # 获取签名
print("gan_sign_model sign value:", getQuestion_sign_value)
# 使用`gan_sign`生成`sign`值, 向`https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=0e40a461631880b0937515fd93fe87b6&deviceCategory=pad`发起post请求
matchV2_url = ("https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?"
               "pointId=69&_productId=611&platform=android32&version=3.93.3&vendor=baidu&av=5&"
               "sign={}&deviceCategory=phone").format(getQuestion_sign_value)
# TODO 注意此处的version、vendor
matchV2_head = {
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-length": "0",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://xyks.yuanfudao.com",
    "pragma": "no-cache",
    "referer": "https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/exercise.html?"
               "pointId=69&isFromInvite=undefined&_productId=611&vendor=baidu&phaseId=3&from=yuansoutikousuan&"
               "YFD_U=自己填或者从get_cookies文件中拿&version=3.93.3&siwr=false&keypath=",
    # TODO 注意此处的YFD_U、vendor、version
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Linux; Android 12; SDY-AN00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 YuanSouTiKouSuan/3.93.3",
    # TODO 注意此处的user-agent也是从get_cookies文件中拿
    "x-requested-with": "com.fenbi.android.leo",
    "cookie": "; ".join([f"{k}={v}" for k, v in cookies.items()])
}
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
# 发起post请求
matchV2_response = requests.post(matchV2_url, headers=matchV2_head, verify=False)
# 输出返回结果长度, 应注意这是二进制乱码, 长度仅供参考有无获取成功, pk试题一般在400-500左右
print("获取到试题未解密大概长度", len(matchV2_response.text))
# 确认响应的二进制内容 (gpt的迷惑行为)
binary_content = matchV2_response.content  # 这是二进制数据
# 将二进制数据进行 Base64 编码
encoded_content = base64.b64encode(binary_content).decode('utf-8')


"""
解密试题部分
"""
decrypt = FridaResponseDecrypt("com.fenbi.android.leo", "hook/matchV2_byDataDecryptCommand/do_matchV2_byDataDecryptCommand_model.js", None)  # 第3个是小袁口算的pid; 如果知道的话就传pid, 能免去adb查找, 提高效率; 不知道就传None
decrypt.start()
match_question = decrypt.getstr(encoded_content)
print("解密试题: ", match_question)


"""
生成答案数据包部分， 这里适配pk答题
1. 把试题包examVO下的所有内容抄一遍, 变成根
2. 把correctCnt改成试题数量
   把costTime改成答题用时
   把updatedTime改成当前时间戳
3. 把questions列表下的:
     每个status改成1
     每个userAnswer改成answer列表的第0个
     每个script用户答题痕迹改成"", 不生成用户答题痕迹
     不要给没加引号的null加上引号, hook调用里会加上引号 // 坑, 未来优化调用要注意
     加上这样的json:
        "curTrueAnswer": {
            "recognizeResult": ">",
            "pathPoints": [],
            "answer": 1,
            "showReductionFraction": 0
        }
"""
match_question_json = json.loads(match_question)
answer_json = match_question_json["examVO"]
answer_json["correctCnt"] = answer_json["questionCnt"]
answer_json["costTime"] = 100
answer_json["updatedTime"] = int(time.time() * 1000)
for question in answer_json["questions"]:
    question["status"] = 1
    question["userAnswer"] = question["answer"][0]
    question["script"] = ""
    question["curTrueAnswer"] = {
        "recognizeResult": question["answer"][0],
        "pathPoints": [],
        "answer": 1,
        "showReductionFraction": 0
    }
print(answer_json)
answer_data = json.dumps(answer_json, ensure_ascii=False)  # 生成答案数据包
print(colored("生成答案: ", 'red') + answer_data)


"""
提交答案部分
答案gzip压缩一下, 传给服务器
目标url = https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=2147537776d49902270b5a6b27686beb&deviceCategory=pad
"""
answer_data_base64 = base64.b64encode(answer_data.encode('utf-8')).decode('utf-8')
request_encrypt = FridaRequestEncrypt("com.fenbi.android.leo", "hook/answer_encrypt/do_answer_encrypt_model.js", None)
request_encrypt.start()
answer_encrypt_base64 = request_encrypt.get_request_encrypt(answer_data_base64)

upAnswer_extractor = FridaSignExtractor("com.fenbi.android.leo", "hook/gan_sign/gan_sign_model.js", None)  # 第3个是小袁口算的pid; 如果知道的话就传pid, 能免去adb查找, 提高效率; 不知道就传None
upAnswer_extractor.start()  # 初始化并附加到进程
upAnswer_sign_value = upAnswer_extractor.getsign("/leo-game-pk/android/math/pk/submit")  # 获取签名
upAnswer_url = ("https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.3&vendor=baidu&av=5&sign={}&deviceCategory=phone").format(upAnswer_sign_value)
# TODO 注意此处的version、deviceCategory、vendor
upAnswer_head = {
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/octet-stream",
    "origin": "https://xyks.yuanfudao.com",
    "referer": "https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html?",
    "user-agent": "Mozilla/5.0 (Linux; Android 12; SDY-AN00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 YuanSouTiKouSuan/3.93.3",
    # TODO 同理
    "x-requested-with": "com.fenbi.android.leo",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "; ".join([f"{k}={v}" for k, v in cookies.items()])
}
upAnswer_response = requests.put(url=upAnswer_url, headers=upAnswer_head, data=base64.b64decode(answer_encrypt_base64), verify=False)
# 不是{"timestamp":1728884050091,"status":400,"message":"error"}就是成功了
print(colored("提交结果： ", 'green') + upAnswer_response.text)  # {"timestamp":1728884050091,"status":400,"message":"error"}
