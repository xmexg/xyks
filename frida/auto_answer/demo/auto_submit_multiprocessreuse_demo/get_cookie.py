import frida
import sys

# 获取目标应用的 PID
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


# 注入 Frida 脚本
# 注入 Frida 脚本
def inject_script(pid, script_path):
    try:
        device = frida.get_usb_device()
        session = device.attach(pid)
        print(f"Attached to PID: {pid}")

        with open(script_path, 'r', encoding='utf-8') as f:
            script_content = f.read()
            print(f"Loaded script content: {script_content[:100]}...")  # 打印部分内容

        script = session.create_script(script_content)

        def on_message(message, data):
            if message['type'] == 'send':
                payload = message['payload']
                try:
                    # 尝试使用 utf-8 解码
                    decoded_payload = payload.encode('latin1').decode('utf-8')
                except UnicodeDecodeError:
                    # 如果失败，使用 gbk 解码
                    decoded_payload = payload.encode('latin1').decode('gbk', errors='ignore')
                print(f"Received message: {decoded_payload}")
            elif message['type'] == 'error':
                print(f"Error: {message['stack']}")

        script.on('message', on_message)
        script.load()
        print(f"Script injected into PID {pid}")
        sys.stdin.read()  # 保持脚本运行
    except Exception as e:
        print(f"Error injecting script: {e}")
        sys.exit(1)


if __name__ == "__main__":
    pid = _get_pid_from_adb("com.fenbi.android.leo")
    inject_script(pid, 'get_cookie.js')