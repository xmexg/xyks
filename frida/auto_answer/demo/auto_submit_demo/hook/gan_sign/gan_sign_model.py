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

import frida

class FridaSignExtractor:
    def __init__(self, package_name, js_file_path):
        self.package_name = package_name
        self.js_file_path = js_file_path
        self.device = None
        self.session = None
        self.script = None
        self.sign = None

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

    def getsign(self, url):
        if self.session is None:
            raise Exception("Frida session 尚未初始化。请先调用 start() 方法。")

        # 设置目标url
        target_url = url

        # 加载js文件
        with open(self.js_file_path) as f:
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
        return self.sign


# 示例调用
if __name__ == "__main__":
    extractor = FridaSignExtractor("com.fenbi.android.leo", "gan_sign_model.js")
    extractor.start()
    sign_value = extractor.getsign("/leo-game-pk/android/math/pk/match/v2")
    print("Sign value: ", sign_value)
