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

# 演示调用gan_sign_model.py模块获取sign
from gan_sign_model import FridaSignExtractor

extractor = FridaSignExtractor("com.fenbi.android.leo", "gan_sign_model.js")
extractor.start()  # 初始化并附加到进程
sign_value = extractor.getsign("/leo-game-pk/android/math/pk/match/v2")  # 获取签名
print("gan_sign_model sign value:", sign_value)
