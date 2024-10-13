# 复制粘贴 frida/auto_answer/demo/auto_submit_demo/hook/gan_sign/gan_sign_model.py 然后修改的
import base64

import frida
import re

class FridaResponseDecrypt:
    def __init__(self, package_name, js_file_path):
        self.package_name = package_name
        self.js_file_path = js_file_path
        self.device = None
        self.session = None
        self.script = None
        self.reponse_str = None

    def start(self):
        # 通过链接到虚拟机frida-server
        self.device = frida.get_usb_device()

        try:
            # 获取进程ID
            process = self.device.get_process(self.package_name)
            pid = process.pid
            print(f"找到目标应用，PID: {pid}")
        except frida.ProcessNotFoundError:
            # 如果未找到进程，通过 adb 查找 PID
            print(f"通过 adb 获取应用 '{self.package_name}' 的 PID...")
            pid = self._get_pid_from_adb()
            if pid is None:
                raise Exception(f"未能通过 adb 找到应用 '{self.package_name}' 的 PID")

        # 附加到进程
        self.session = self.device.attach(pid)
        print(f"成功附加到应用: {self.package_name}, PID: {pid}")

    def _get_pid_from_adb(self):
        import subprocess
        try:
            # 使用 adb 获取进程列表，并查找目标应用的 PID
            result = subprocess.run(['adb', 'shell', 'ps | grep ' + self.package_name],
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

    def getstr(self, reponse_base64):
        if self.session is None:
            raise Exception("Frida session 尚未初始化。请先调用 start() 方法。")

        # 加载js文件
        with open(self.js_file_path) as f:
            script_content = f.read()
            script_content = script_content.replace("flag_base64", reponse_base64)
            self.script = self.session.create_script(script_content)

        # 设置控制台消息处理程序
        def on_message(message, data):
            if message['type'] == 'send':
                # 已拿到二进制解密后的base64
                encoded_data = message['payload']
                # 删除所有换行符
                encoded_data = re.sub(r'[^A-Za-z0-9+/=]', '', encoded_data)
                print("[JS] Received Base64: {}".format(encoded_data))
                # 解base64
                result = base64.b64decode(encoded_data).decode('utf-8')
                self.reponse_str = result
            else:
                print("[{}] {}".format(message['type'], message['description']))

        # 设置消息处理程序
        self.script.on('message', on_message)

        # 加载js文件并获取脚本输出的信息
        self.script.load()

        # 等待脚本执行完成并返回sign
        return self._wait_for_sign()

    def _wait_for_sign(self):
        # 这里可以根据具体情况调整等待方式
        while self.reponse_str is None:
            pass
        return self.reponse_str


# 示例调用
if __name__ == "__main__":
    decrypt = FridaResponseDecrypt("com.fenbi.android.leo", "do_matchV2_byDataDecryptCommand_model.js")
    decrypt.start()
    reponse_value = decrypt.getstr("此处输入获取到的试题的base64编码")
    print("reponse value: ", reponse_value)
