# 只适配了比大小口算pk

# 如何读取cookie: 0:读取cookies_model, 1:通过hook读取(未测试)
cookie_type = 1

"""
请填写cookie
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

cookie = hookcookie if cookie_type else cookies


