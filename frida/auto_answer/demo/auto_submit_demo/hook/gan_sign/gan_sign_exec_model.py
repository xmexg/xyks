# 使用exec frida -U -n 小猿口算 -l gan_sign_model.js执行脚本获得输出的最后一行, 然后结束该进程
import subprocess
import os

import subprocess
import os
import time

# 执行 Frida 命令
process = subprocess.Popen(
    ["frida", "-U", "-n", "小猿口算", "-l", "gan_sign_model.js"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

# 等待并捕获输出
try:
    # 等待 3 秒
    time.sleep(3)
    output = process.stdout.readline()
    if output:
        print(output.strip())

except KeyboardInterrupt:
    pass

# 获取最后一行输出
last_line = output.strip()
print("最后一行输出:", last_line)

# 结束该进程
process.terminate()

