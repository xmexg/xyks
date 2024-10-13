# 演示数字比大小获取试题 -> 生成答案 -> 提交答案
import base64

import requests
import json
from hook.gan_sign.gan_sign_model import FridaSignExtractor # 用于生成sign
from hook.matchV2_byDataDecryptCommand.do_matchV2_byDataDecryptCommand_model import FridaResponseDecrypt # 用于解密试题
# from hook.submit.submit_model import FridaSubmit # 用于提交答案


# cookies, 后续应该改成先在手机pk一下, hook请求头拿cookie, 既省去抓包, 又可以当未来的cookie实时变化, 通过hook计算
"""
每过一段时间发生变化的cookie: 
旧g_sess: mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzfa9xOA1atJfbDyVz8AXA8gdxY9+TnZCJxGqI5iuiiuUnweref1Oh67snIy/jPY26egEIJBewmKZu/o6dla1Nt
新g_sess: mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpyEA4Gs0hQT8iHQlInOLnP1ICVT9MRFjhTD/Z2zDPDkNFMgFt5ygWlQBWokrIDQts+

旧sess: mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzfa9xOA1atJfbDyVz8AXA8gdxY9+TnZCJxGqI5iuiiuW0dgwRApB/EPcNTcZHPTb0=
新sess: mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpyEA4Gs0hQT8iHQlInOLnP1HHFkGYQnloHAd1irRcJjH0=

虽然但是, 不是已经实名上网了吗, cookie不是开盒的唯一方法 
"""
cookies = {
    "YFD_U": "-3211421434165909800",
    "__sub_user_infos__": "/24T7Ovgtuud9LSYuz4IE8QXC8WtncTejJIS1NgUsGUc8dJri87nwxAR7ZYZSGLMzASpBTOcRDDcGj5XRSh1wQ==",
    "g_loc": "vPeteFfrRL2jJ0VNIL3TWQ==",
    "g_sess": "mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpycmhggh4Nc/ETKNNMvV6z+l9HmLXdNf7tLzzWJYrgsC55vyiiufCCQNT8ynqqTJPG",
    "ks_deviceid": "264747485",
    "ks_persistent": "E7HkOGfEedeolQpPvUgvctiPZ1hsCdgCrWumlSnrg10fRR9HYdofd0CBlxMTQcI8J7tQGTZoCoUi1nDWMDPuw7GN5JOGpwpJ+6HADJ+6BeY=",
    "ks_sess": "+aI8wF/5r4paFMXzig5QgEPWtR3TDnSVQ2eV1eGhImwT/41ip5vnvURH8V1LdJxz",
    "persistent": "EPLFTB7BUdycG28sjEfjTHAPCWlrbTYUyPUdrydyp42z3wiXT9eIussNNc+8BoWua49Wf+i8fY2M/nXqZLBd6w==",
    "sess": "mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpycmhggh4Nc/ETKNNMvV6z+mAQCs8XGPVbybOXWsQ6NLc=",
    "sid": "4442320405456624390",
    "userid": "1052996838"
}


"""
获取及解密试题部分
"""
# 调用gan_sign_model.py模块获取sign
extractor = FridaSignExtractor("com.fenbi.android.leo", "hook/gan_sign/gan_sign_model.js")
extractor.start()  # 初始化并附加到进程
sign_value = extractor.getsign("/leo-game-pk/android/math/pk/match/v2")  # 获取签名
print("gan_sign_model sign value:", sign_value)

# 使用`gan_sign`生成`sign`值, 向`https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=0e40a461631880b0937515fd93fe87b6&deviceCategory=pad`发起post请求
matchV2_url = ("https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32"
       "&version=3.93.2&vendor=xiao_mi&av=5&sign={}&deviceCategory=pad").format(sign_value)
matchV2_head = {
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-length": "0",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://xyks.yuanfudao.com",
    "pragma": "no-cache",
    "referer": "https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/exercise.html?pointId=2&isFromInvite=undefined&_productId=611&vendor=xiao_mi&phaseId=3&from=yuansoutikousuan&YFD_U=-3211421434165909800&version=3.93.2&siwr=true&keypath=",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Linux; Android 12; 2206122SC Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Safari/537.36 YuanSouTiKouSuan/3.93.2",
    "x-requested-with": "com.fenbi.android.leo",
    "cookie": "; ".join([f"{k}={v}" for k, v in cookies.items()])
}
# 发起post请求
matchV2_response = requests.post(matchV2_url, headers=matchV2_head)
# 输出返回结果长度, 应注意这是二进制乱码, 长度仅供参考有无获取成功, pk试题一般在400-500左右
print("获取到试题未解密大概长度", len(matchV2_response.text))
# 确认响应的二进制内容 (gpt的迷惑行为)
binary_content = matchV2_response.content  # 这是二进制数据

"""
start 此处同webview共同调试
"""
def bytes_to_decimal(byte_data):
    # 将字节数据转换为对应的十进制值
    decimal_values = [byte for byte in byte_data]
    return decimal_values

# 输出二进制数字
bin = bytes_to_decimal(binary_content)
print(len(bin), bin)
"""
end 此处同webview共同调试
"""

# 将二进制数据进行 Base64 编码
encoded_content = base64.b64encode(binary_content).decode('utf-8')
# 再base64一次
encoded_content = base64.b64encode(encoded_content.encode('utf-8')).decode('utf-8')
# 原始二进制响应的base64编码
# print(encoded_content)

"""
解密试题部分
"""
decrypt = FridaResponseDecrypt("com.fenbi.android.leo", "hook/matchV2_byDataDecryptCommand/do_matchV2_byDataDecryptCommand_model.js")
decrypt.start()
reponse_value = decrypt.getstr(encoded_content)
print("reponse value: ", reponse_value)

