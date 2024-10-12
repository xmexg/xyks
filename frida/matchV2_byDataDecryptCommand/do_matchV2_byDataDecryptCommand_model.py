# https://github.com/cr4n5/XiaoYuanKouSuan/issues/79

"""
还是不能修改答案
在现有的抓包脚本加入当前目录的这两个文件, 这两个文件会返回加密题目及答案
"""
import json

import frida
import sys
import base64
import subprocess

# 使用 adb 获取 com.fenbi.android.leo 包名的 PID
def _get_pid_from_adb(package_name):
    import subprocess
    try:
        # 使用 adb 获取进程列表，并查找目标应用的 PID
        result = subprocess.run(['adb', 'shell', 'ps | grep ' + package_name],
                                capture_output=True, text=True)
        output = result.stdout.strip()
        if output:
            # 从 adb 输出中提取 PID
            pid = int(output.split()[1])
            print(f"通过 adb 找到 PID: {pid}")
            return pid
        else:
            print("adb 没有找到该应用的 PID")
            return None
    except Exception as e:
        print(f"adb 获取 PID 时出错: {e}")
        return None

# 获取 PID
pid = _get_pid_from_adb("com.fenbi.android.leo")

# 通过链接到虚拟机frida-server
device = frida.get_usb_device()

# 附加到已有进程的PID
session = device.attach(pid)

# 加载js文件
with open("do_matchV2_byDataDecryptCommand_model.js", encoding='utf-8') as f:
    script = session.create_script(f.read())

# 设置控制台消息处理程序
def on_message(message, data):
    if message['type'] == 'send':
        # 获取Base64编码的内容
        encoded_data = message['payload']
        print("[JS] Received Base64: {}".format(encoded_data))

        # 删除所有换行符
        encoded_data = encoded_data.replace("\n", "")
        print("[JS] Received Base64: {}".format(encoded_data))

        # 解码Base64
        result = base64.b64decode(encoded_data).decode('utf-8')

        # 输出解密后的题目及答案
        print(result)
        data = json.loads(result)

        for question in data["examVO"]["questions"]:
            print(question["id"], question["content"], question["answer"])

        # 删除题目，修改答案
        data['examVO']['questions'] = [data['examVO']['questions'][0]]
        # # 将题目答案全部改为"1"
        # for i in range(len(data['examVO']['questions'])):
        #     data['examVO']['questions'][i]['answer'] = "1"
        #     data['examVO']['questions'][i]['answers'] = ["1"]

        result = json.dumps(data, ensure_ascii=False)
        # 修改result来修改题目及答案
        # result = '{"pkIdStr":"609469730679459854","otherUser":{"userId":1054886576,"userName":"hook名字","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd013ae4a67.png","userPendantUrl":null},"otherWinCount":1,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469730679459854","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":2,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469730679459854,"content":"18\\circle6","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469730679459854,"content":"18\\circle16","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}'

        # result进行base64加密
        result_makebase64 = base64.b64encode(result.encode('utf-8')).decode('utf-8')

        # 每76个字符加一个\n字符
        # result_makebase64 = "\n".join(result_makebase64[i:i + 76] for i in range(0, len(result_makebase64), 76))

        print(result_makebase64)

        if not isinstance(result_makebase64, str):
            result_makebase64 = str(result_makebase64)

        # 传回js文件
        script.post({'type': 'input', 'payload': result_makebase64})
    else:
        print("[{}] {}".format(message['type'], message['description']))

# 设置消息处理程序
script.on('message', on_message)

# 加载js文件并获取脚本输出的信息
script.load()
# 保持脚本运行
sys.stdin.read()