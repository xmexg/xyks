# https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook
# 应注意可能有某个页面也被hook到了，可能有也肯能没有
# 输出的json不一定格式正确，比如如果某个值是None，则不会加引号导致json格式错误无法加载网页

"""
修改提交试题答案
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
with open("submit_model.js", encoding='utf-8') as f:
    script = session.create_script(f.read())

# 设置控制台消息处理程序
def on_message(message, data):
    if message['type'] == 'send':
        # 复制粘贴 https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook 的代码
        bytes_obj = bytes.fromhex(message['payload'])
        string = bytes_obj.decode('utf-8')
        string = string.replace(r'\"', "%")
        # 修正null不加引号导致的错误
        string = string.replace("null", '"null"')
        print("字符串: ", string)
        json_data = json.loads(string)
        print(json_data)
        print('原始花费时间：', json_data['costTime'])
        # TODO 时间不要修改为0 最低为1 否则会有难以解决的错误
        json_data['costTime'] = 100
        print('现在花费时间：', json_data['costTime'])
        print(json_data)
        data = str(json_data).replace('%', r'\"')
        data = str(data).replace('\'', '\"')
        data = str(data).replace(' ', '')
        script.post({'type': 'send', 'my_data': data})
    else:
        print("[{}] {}".format(message['type'], message['description']))

# 设置消息处理程序
script.on('message', on_message)

# 加载js文件并获取脚本输出的信息
script.load()
# 保持脚本运行
sys.stdin.read()
