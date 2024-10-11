'''
注意传入的url是这样的:
来自 https://square.github.io/okhttp/3.x/okhttp/okhttp3/HttpUrl.html
返回此 URL 的完整路径，该路径经过编码后可用于 HTTP 资源解析。返回的路径将以 开头"/"。
网址	encodedPath()
http://host/	"/"
http://host/a/b/c	"/a/b/c"
http://host/a/b%20c/d	"/a/b%20c/d"
http://host/a/b/c?d=e	"/a/b/c"
以/开头, 到#或者?结束(不含#和?)
'''

# 不知道为什么, 使用frida -U -n 小猿口算 -l gan_sign_model.js直接执行没问题, 但是执行这份py脚本不行

import frida
import sys

# 通过链接到虚拟机frida-server
device = frida.get_usb_device()

# 通过包名获取进程
pid = device.spawn(["com.fenbi.android.leo"])

# 启动进程
device.resume(pid)

# 获取进程
session = device.attach(pid)

# 加载js文件
with open("gan_sign_model.js") as f:
    # 在加载时向js文件传值
    script = session.create_script(f.read())

# 传入的值
# script.post({'type': 'input', 'payload': "/okhttp/3.x/okhttp/okhttp3/HttpUrl.html"})


# 设置控制台消息处理程序
def on_message(message, data):
    if message['type'] == 'send':
        # 获取sign值
        sign = message['payload']
        print("[JS] Received Base64: {}".format(sign))
        # 做其他事
        
        
    else:
        print("[{}] {}".format(message['type'], message['description']))


# 设置消息处理程序
script.on('message', on_message)

# 加载js文件并获取脚本输出的信息
script.load()

# 保持脚本运行
sys.stdin.read()
