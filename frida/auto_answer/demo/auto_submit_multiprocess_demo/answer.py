import argparse
import copy

import urllib3

from hook.loader import FridaLoader
import base64
import time

import requests
import json

from termcolor import colored
from urllib.parse import urlparse


"""
python务必使用进程 而不是线程
我python不太好, 请务必不要全局只new一个FridaLoader, FridaLoader内的sign,解密试题, 加密答案可能多进程时会相互覆盖
目前是每个进程分配一个FridaLoader, 但是这样会导致每个进程都要重新附加, 会比较慢, 当然, 进程够多, 无所谓FridaLoader的new速度了, 整体上看还是很快
优化方向是创建一个和进程同尺寸FridaLoader池, 在该池里new, 每个进程分配池中对应位置的FridaLoader, 不回收FridaLoader(不预设程序结束目标,用户按ctrl+c来结束)
"""


class Student:

    """
    fridaLoader = FridaLoader("com.fenbi.android.leo", None, hook_script)
    fridaLoader.start()

    # 获取sign值
    sign_value = fridaLoader.get_sign("/leo-game-pk/android/math/pk/match/v2")
    print("Sign值: ", sign_value)

    # 解密试题
    # reponse_value = fridaLoader.get_question("此处输入获取到的试题的base64编码")
    # print("获取试题: ", reponse_value)

    # 加密答案
    # request_value = fridaLoader.get_request_encrypt("此处输入获取到的试题的base64编码")
    # print("加密后答案: ", request_value)
    """

    def __init__(self, cookie, url, package_name, hook_script, arg):
        self.fridaLoader = FridaLoader(package_name, None, hook_script)
        self.fridaLoader.start()
        self.cookies = cookie
        self.url = url
        self.hook_script = hook_script
        self.arg = arg

    def answer(self):
        print("开始新一轮答题")
        """
        获取及解密试题部分
        """
        # 调用gan_sign_model.py模块获取sign
        getQuestion_sign_value = self.fridaLoader.get_sign(urlparse(self.url["get_question"]).path)
        print("gan_sign_model sign value:", getQuestion_sign_value)
        # 使用`gan_sign`生成`sign`值, 向`https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=0e40a461631880b0937515fd93fe87b6&deviceCategory=pad`发起post请求
        matchV2_url = (self.url["get_question"]).format(sign=getQuestion_sign_value)
        # TODO 注意此处的version、vendor # 目前由用户自己填写version、vendor
        matchV2_head = {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-length": "0",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://xyks.yuanfudao.com",
            "pragma": "no-cache",
            "referer": (self.url["get_question"]).split("?")[0],
            # 只填url路径部分就行,不用加参数
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Linux; Android 12; SDY-AN00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 YuanSouTiKouSuan/3.93.3",
            # user-agent有就行,不用和版本对应
            "x-requested-with": "com.fenbi.android.leo",
            "cookie": "; ".join([f"{k}={v}" for k, v in self.cookies.items()])
        }
        print("请求试题url: ", matchV2_head["referer"])
        # 禁用安全请求警告, 有的版本的requests会报警告
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
        match_question = self.fridaLoader.get_question(encoded_content)
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
                
        2024年10月16日新增修补试题数量功能, 更快速刷分
        """
        # 试题倍数
        q_magn = self.arg["q_magn"]

        match_question_json = json.loads(match_question)
        answer_json = match_question_json["examVO"]
        right_questionCnt = answer_json["questionCnt"]
        answer_json["questionCnt"] = answer_json["questionCnt"] * q_magn
        answer_json["correctCnt"] = answer_json["questionCnt"]
        answer_json["costTime"] = 100
        answer_json["updatedTime"] = int(time.time() * 1000)
        perpare_answer_questions = answer_json["questions"]  # 存下原有的试题模板
        answer_json["questions"] = []  # 清空试题
        for_questionCnt = 0  # 修改试题id, 这样写可保证无论如何都不会出错
        for i in range(q_magn):
            for question in perpare_answer_questions:
                new_question = copy.deepcopy(question)  # 深拷贝每个题目，确保对象独立
                new_question["id"] = for_questionCnt
                new_question["status"] = 1
                new_question["userAnswer"] = new_question["answer"][0]
                new_question["script"] = ""
                new_question["curTrueAnswer"] = {
                    "recognizeResult": new_question["answer"][0],
                    "pathPoints": [],
                    "answer": 1,
                    "showReductionFraction": 0
                }
                for_questionCnt = for_questionCnt + 1
                answer_json["questions"].append(new_question)  # 生成答案数据包

        answer_data = json.dumps(answer_json, ensure_ascii=False)
        print(colored("生成答案: ", 'red') + answer_data)

        """
        提交答案部分
        答案gzip压缩一下, 传给服务器
        目标url = https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=2147537776d49902270b5a6b27686beb&deviceCategory=pad
        """
        answer_data_base64 = base64.b64encode(answer_data.encode('utf-8')).decode('utf-8')
        answer_encrypt_base64 = self.fridaLoader.get_request_encrypt(answer_data_base64)

        upAnswer_sign_value = self.fridaLoader.get_sign(urlparse(self.url["submit_answer"]).path)  # 获取签名
        upAnswer_url = (self.url["submit_answer"]).format(sign=upAnswer_sign_value)
        # TODO 注意此处的version、deviceCategory、vendor # 目前由用户自己填写version、vendor
        upAnswer_head = {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/octet-stream",
            "origin": "https://xyks.yuanfudao.com",
            "referer": (self.url["submit_answer"]).split("?")[0],
            "user-agent": "Mozilla/5.0 (Linux; Android 12; SDY-AN00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 YuanSouTiKouSuan/3.93.3",
            # TODO 同理
            "x-requested-with": "com.fenbi.android.leo",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "; ".join([f"{k}={v}" for k, v in self.cookies.items()])
        }
        upAnswer_response = requests.put(url=upAnswer_url, headers=upAnswer_head,
                                         data=base64.b64decode(answer_encrypt_base64), verify=False)
        # 不是{"timestamp":1728884050091,"status":400,"message":"error"}就是成功了
        print(colored("提交结果： ",
                      'green') + upAnswer_response.text)  # {"timestamp":1728884050091,"status":400,"message":"error"}


if __name__ == "__main__":
    print("此处测试运行")

    """
    hook脚本位置, 保持默认的话, 请不要修改
    """
    hook_script = {
        "jsFilePath_getSign": "hook/js/gan_sign_model.js",
        "jsFilePath_doMatchV2ByDataDecryptCommand": "hook/js/do_matchV2_byDataDecryptCommand_model.js",
        "jsFilePath_doAnswerEncrypt": "hook/js/do_answer_encrypt_model.js"
    }

    """
    存放一些答题脚本的启动参数
    """
    arg = {

        """
        默认试题倍数, 
        比如默认为1, 收到10道题, 提交10道题
        修改成20, 收到10道题, 提交200道题
        可通过启动参数python main.py --fakeq=20进行修改
        """
        "q_magn": 1
    }

    # 初始化
    # 第2个是小猿口算的pid; 如果知道的话就传pid, 能免去adb查找, 提高效率; 不知道就传None
    fridaLoader = FridaLoader("com.fenbi.android.leo", None, hook_script, arg)
    fridaLoader.start()

    # 获取sign值
    sign_value = fridaLoader.get_sign("/leo-game-pk/android/math/pk/match/v2")
    print("Sign值: ", sign_value)

    # 解密试题
    # reponse_value = fridaLoader.get_question("此处输入获取到的试题的base64编码")
    # print("获取试题: ", reponse_value)

    # 加密答案
    # request_value = fridaLoader.get_request_encrypt("此处输入获取到的试题的base64编码")
    # print("加密后答案: ", request_value)
