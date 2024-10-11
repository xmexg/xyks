# 参考https://github.com/xmexg/xyks/issues/9
# anay_webview.js意外对解matchV2有效果

"""
do_matchV2.js这段程序能输出且仅输出抓到的加密题目及答案, 通过do_matchV2.js获取题目及答案, 然后python解密

没想到好的使用方法
目前计划这样加入已有的刷题脚本:

在现有的抓包脚本加入当前目录的这两个文件, 这两个文件会返回加密题目及答案

"""
import frida
import sys
import base64

# 通过链接到虚拟机frida-server
device = frida.get_usb_device()

# 通过包名获取进程
pid = device.spawn(["com.fenbi.android.leo"])

# 启动进程
device.resume(pid)

# 获取进程
session = device.attach(pid)

# 加载js文件
with open("do_matchV2.js") as f:
    script = session.create_script(f.read())


# 设置控制台消息处理程序
def on_message(message, data):
    if message['type'] == 'send':
        # 获取Base64编码的内容
        encoded_data = message['payload']
        print("[JS] Received Base64: {}".format(encoded_data))

        # 解码Base64
        decoded_bytes = base64.b64decode(encoded_data)

        # 删除前17 后3个字节
        decoded_bytes = decoded_bytes[17:-3]

        # 将字节转换为字符串，去除所有'\n'字符
        cleaned_string = decoded_bytes.decode('utf-8').replace('\n', '')

        # 处理Unicode，可以用以下方式
        cleaned_string = cleaned_string.encode('utf-8').decode('unicode_escape')

        # 再解base64
        result = base64.b64decode(cleaned_string).decode('utf-8')

        # {"pkIdStr":"609469730679459854","otherUser":{"userId":1054886576,"userName":"猿宝86576","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd013ae4a67.png","userPendantUrl":null},"otherWinCount":1,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469730679459854","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":10,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469730679459854,"content":"18\\circle6","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469730679459854,"content":"18\\circle16","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":2,"examId":609469730679459854,"content":"13\\circle18","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":3,"examId":609469730679459854,"content":"11\\circle17","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":4,"examId":609469730679459854,"content":"18\\circle10","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":5,"examId":609469730679459854,"content":"1\\circle3","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":6,"examId":609469730679459854,"content":"2\\circle20","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":7,"examId":609469730679459854,"content":"8\\circle13","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":8,"examId":609469730679459854,"content":"7\\circle9","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":9,"examId":609469730679459854,"content":"17\\circle14","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}
        print(result)

        # 传回js文件
        script.post({'type': 'input', 'payload': result})
    else:
        print("[{}] {}".format(message['type'], message['description']))


# 设置消息处理程序
script.on('message', on_message)

# 加载js文件并获取脚本输出的信息
script.load()

# 保持脚本运行
sys.stdin.read()

