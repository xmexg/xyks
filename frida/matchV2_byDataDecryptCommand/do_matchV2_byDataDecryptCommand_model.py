# https://github.com/cr4n5/XiaoYuanKouSuan/issues/79

"""
在现有的抓包脚本加入当前目录的这两个文件, 这两个文件会返回加密题目及答案
"""
import json
import time

import frida
import sys
import base64
import subprocess
import re
import threading
import number_command
import tkinter as tk
import os

ANSWER_COUNT = 1
WAITING_TIME = 12

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

def auto_click_and_close(root, prepared_commands):
    answer_write(prepared_commands)
    root.destroy()

def answer_write(prepared_commands):
    start_time = time.time()
    # 一次性发送准备好的 ADB 命令
    number_command.run_adb_command(prepared_commands)
    end_time = time.time()
    print(f"点击操作耗时: {end_time - start_time:.3f}秒")


def gui_answer():
    # 预先准备 ADB 命令
    prepared_commands = number_command.prepare_tap_commands(".", ANSWER_COUNT)

    root = tk.Tk()
    root.title("继续执行")
    button = tk.Button(root, text="点击继续", command=lambda: answer_write(prepared_commands))
    button.pack(pady=20)

    # 设置定时器自动执行
    threading.Timer(WAITING_TIME, auto_click_and_close, args=(root, prepared_commands)).start()

    root.mainloop()



# 设置控制台消息处理程序
def on_message(message, data):
    if message['type'] == 'send':
        # 获取Base64编码的内容
        encoded_data = message['payload']
        print("[JS] Received Base64: {}".format(encoded_data))

        # 删除所有换行符
        encoded_data = re.sub(r'[^A-Za-z0-9+/=]', '', encoded_data)
        print("[JS] Cleaned Base64: {}".format(encoded_data))

        # 解码Base64
        try:
            result = base64.b64decode(encoded_data).decode('utf-8')
        except Exception as e:
            print(f"[Error] Base64 decoding failed: {e}")
            return

        # 输出解密后的题目及答案
        print("Decoded JSON: ", result)
        try:
            data = json.loads(result)
        except json.JSONDecodeError as e:
            print(f"[Error] JSON decoding failed: {e}")
            return

        print(data['targetCostTime'])
        targetCostTime = data['targetCostTime']


        os.chdir("..")
        with open("test.txt", "w") as f:
            f.write(str(targetCostTime))

        for question in data["examVO"]["questions"]:
            print(question["id"], question["content"], question["answer"])

        # 删除题目，修改答案
        data['examVO']['questions'] = [data['examVO']['questions'][0]]

        # TODO correctCnt":0,"costTime"
        # correctCnt":10,"costTime":7190,"answer":1,"showReductionFraction":0,"updatedTime":1728795476677}
        # data['examVO']['correctCnt'] = data['examVO']['questionCnt']
        # data['examVO']['costTime'] = '1000'



        for i in range(len(data['examVO']['questions'])):
            data['examVO']['questions'][i]['answer'] = "1"
            data['examVO']['questions'][i]['answers'] = ["1"]



        # 确保JSON字符串格式一致
        result = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
        print("Serialized JSON: ", result)

        threading.Thread(target=gui_answer).start()

        # result进行base64加密
        result_makebase64 = base64.b64encode(result.encode('utf-8')).decode('utf-8')


        print("Base64 Encoded: ", result_makebase64)

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