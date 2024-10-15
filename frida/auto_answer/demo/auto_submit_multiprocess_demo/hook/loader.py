"""
注意传入的url是这样的:
来自 https://square.github.io/okhttp/3.x/okhttp/okhttp3/HttpUrl.html
返回此 URL 的完整路径，该路径经过编码后可用于 HTTP 资源解析。返回的路径将以 开头"/"。
网址	encodedPath()
http://host/	"/"
http://host/a/b/c	"/a/b/c"
http://host/a/b%20c/d	"/a/b%20c/d"
http://host/a/b/c?d=e	"/a/b/c"
以/开头, 到#或者?结束(不含#和?)

直接启动无法获取到进程, 必须先其他小猿口算, 然后adb获取进程pid, 强制附加pid
"""

import base64

import frida
import re


class FridaLoader:
    def __init__(self, package_name, pid, jsFilePath):
        self.package_name = package_name
        self.js_file_path_getSign = jsFilePath["jsFilePath_getSign"]  # 用于获取sign值
        self.do_matchV2_byDataDecryptCommand = jsFilePath["jsFilePath_doMatchV2ByDataDecryptCommand"]  # 用于解密试题
        self.do_answer_encrypt = jsFilePath["jsFilePath_doAnswerEncrypt"]  # 用于加密答案
        self.device = None
        self.pid = pid
        self.session = None
        self.script = None
        self.sign = None  # 用于存储sign值
        self.reponse_str = None  # 用于存储试题值
        self.request_str = None  # 用于存储加密后的答案

    def start(self):
        # 通过链接到虚拟机frida-server
        self.device = frida.get_usb_device()

        if self.pid is None:
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

    """
    获取sign值
    """

    def get_sign(self, url):
        if self.session is None:
            raise Exception("Frida session 尚未初始化。请先调用 start() 方法。")

        # 设置目标url
        target_url = url

        # 加载js文件
        with open(self.js_file_path_getSign, encoding="utf-8") as f:
            script_content = f.read()
            script_content = script_content.replace("flag_url", target_url)
            self.script = self.session.create_script(script_content)

        # 设置控制台消息处理程序
        def on_message(message, data):
            if message['type'] == 'send':
                # 获取sign值
                self.sign = message['payload']
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
        while self.sign is None:
            pass
        sign = self.sign
        self.sign = None
        return sign

    """
    解密试题
    """
    def get_question(self, reponse_base64):
        if self.session is None:
            raise Exception("Frida session 尚未初始化。请先调用 start() 方法。")

        # 加载js文件
        with open(self.do_matchV2_byDataDecryptCommand, encoding="utf-8") as f:
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
                # print("[JS] Received Base64: {}".format(encoded_data))
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
        return self._wait_for_reponse_str()

    def _wait_for_reponse_str(self):
        # 这里可以根据具体情况调整等待方式
        while self.reponse_str is None:
            pass
        reponse_str = self.reponse_str
        self.reponse_str = None
        return reponse_str

    """
    加密答案
    """
    def get_request_encrypt(self, answer_base64):
        if self.session is None:
            raise Exception("Frida session 尚未初始化。请先调用 start() 方法。")

        # 加载js文件
        with open(self.do_answer_encrypt, encoding="utf-8") as f:
            script_content = f.read()
            script_content = script_content.replace("flag_answer_base64", answer_base64)
            self.script = self.session.create_script(script_content)

        # 设置控制台消息处理程序
        def on_message(message, data):
            if message['type'] == 'send':
                # 已生成加密后的答案base64字符串
                self.request_str = message['payload']
            else:
                print("[{}] {}".format(message['type'], message['description']))

        # 设置消息处理程序
        self.script.on('message', on_message)

        # 加载js文件并获取脚本输出的信息
        self.script.load()

        # 等待脚本执行完成并返回sign
        return self._wait_for_answer()

    def _wait_for_answer(self):
        # 这里可以根据具体情况调整等待方式
        while self.request_str is None:
            pass
        request_str = self.request_str
        self.request_str = None
        return request_str


# 示例调用
if __name__ == "__main__":
    print("测试hook")

    """
    hook脚本位置, 保持默认的话, 请不要修改
    """
    hook_script = {
        "jsFilePath_getSign": "js/gan_sign_model.js",
        "jsFilePath_doMatchV2ByDataDecryptCommand": "js/do_matchV2_byDataDecryptCommand_model.js",
        "jsFilePath_doAnswerEncrypt": "js/do_answer_encrypt_model.js"
    }

    # 初始化
    # 第2个是小猿口算的pid; 如果知道的话就传pid, 能免去adb查找, 提高效率; 不知道就传None
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
