# 小猿口算
未完成的逆向笔记  
vue逆向笔记 [frida/readme.md](frida/readme.md)  
sign逆向笔记 [frida/sign_decrypt.md](frida/sign_decrypt.md)

# [请查看我们的最新进展](frida/auto_answer/readme.md)
[待完成的自动发包笔记](frida/auto_answer/readme.md)  

# 关键目录说明

|目录|功能|
|--|--|
|dexdump|使用frida-dexdump导出的dex|
|frida|用到的一些脚本和逆向笔记|
|har|在虚拟机抓到的包|
|java_test|一点java测试| 
|[matchV2](frida/matchV2)|修改获取到的试题包,可修改成一道题任意答案|
|[matchV2_byDataDecryptCommand](frida/matchV2_byDataDecryptCommand)|和`matchV2`同样的功能, 修改获取到的试题包,可修改成一道题任意答案|
|[submit](frida/submit)|修改提交的答案包,可修改答题耗时|
|[gan_sign](frida/gan_sign)|生成sign参数, 在未来纯协议发包时有用, 目前没用|  


# 如何复现
## adb相关
现在frida使用`adb shell ps | grep com.fenbi.android.leo`查询小猿口算pid, 所以需要安装adb
- 提前下载platform模块并放入系统环境变量。  
- 运行PowerShell或者CMD  
- 输入`adb devices`查找设备绑定  
- 输入`adb connnect 127.0.0.1:port` 注意 此处的port为端口号 具体查看模拟器的ADB端口  
  Mumu模拟器一般默认为16384 或者直接输入`adb connect 127.0.0.1:16384` 
- 下载frida-server-android使用adb推送至安卓  
    ```sh
    adb push frida-server-android*路径 /data/local/tmp
    adb shell
    su #此处需要在模拟器中授权
    cd /data/local/tmp
    chmod 777 frida-server-android* #给rwx权限
    ./frida-server-android*
    ```
    即可运行frida，到此adb结束。  

    注意不要退出powershell或者cmd的窗口
    ![image](https://github.com/user-attachments/assets/4d0570db-4b13-4f50-b48a-bdb30eee24a4)

## webview复现
+ windows:  
    安装mumu模拟器，根据mumu官方教程，依次安装magisk，lsposed，算法助手。  

    安装小猿口算app，在算法助手里设置小猿口算app允许webview远程调试。  

    打开chrome或edge浏览器，分别打开chrome://inspect或者edge://inspect  

    打开小猿口算app，打开口算pk，回到浏览器的inspect页面，等待显示出pk链接调试按钮，点击调试。  

    开发者工具的网络页面选择保留日志。然后左上角刷新页面以确保获取到完整数据。每打开一个页面回到inspect页面等待获取到新的调试链接，在新的调试页面刷新页面。  
    [查看视频](./video/webview.mp4)

## frida复现
+ windows:  
    安装mumu模拟器, 根据mumu官方教程, 开启root  

    去[frida仓库](https://github.com/frida/frida/releases)下载`frida-server-版本号-android-x86_64.xz`并解压  

    把解压后的frida-server推送到模拟器任意目录,比如通过`adb push`推送到`/data/local`目录下  

    连接到模拟器终端使用root启动frida-server,比如`adb shell, su, /data/local/frida-server-文件名`  

    电脑安装frida和frida-tools
    ```
    pip install frida-tools
    pip install frida
    ```

    电脑命令行向小猿口算注入xx脚本`frida -U -n 小猿口算 -l .\hook_JsBridgeBean_sign.js`


# 进度
## [关于试题加密](https://github.com/xmexg/xyks/issues/9)
- 方法一(已可以修改答案):  
使用[frida/matchV2](/frida/matchV2)目录下的py脚本或ts脚本，他们可以拿到试题和答案
[do_matchV2_model.py](frida/matchV2/do_matchV2_model.py)示例  
![image](./image/change_res.png)

    [视频演示](/video/frida_matchV2.mp4)

- 方法二(已可以修改答案):  
使用[示例模板](frida/matchV2_byDataDecryptCommand)目录下的py脚本或ts脚本，他们可以拿到试题和答案  
![image](/image/change_json.png)


## 已经测试有效的[加载RequestEncoder生成sign方法](frida/gan_sign)
根据 [taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的hook方向, 现写出:  
+ [anay_loadRequestEncoder.js](frida/anay_loadRequestEncoder.js) hook分析测试脚本
+ [gan_sign_model.js](frida/gan_sign/gan_sign_model.js) 生成sign
+ [gan_sign_model.py](frida/gan_sign/gan_sign_model.py) 提供python调用




## 现状
已完成:   
+ 感谢 [@x781078959](https://github.com/x781078959) 完成[hook解密试题及答案,模拟滑动](frida/matchV2)  
+ 感谢 [@taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的[hook sign](frida/gan_sign)方向
+ 感谢 [@ZQBCWG](https://github.com/ZQBCWG) 在 [https://github.com/cr4n5/XiaoYuanKouSuan/issues/79](https://github.com/cr4n5/XiaoYuanKouSuan/issues/79) 提供hook试题及答案新方向, 实现了查看修改试题及答案, [查看示例模板](frida/matchV2_byDataDecryptCommand) 
+ 感谢 [@x781078959](https://github.com/x781078959) 指出异步调用导致js在获取到py传入的新题库前return导致无法修改试题及答案的bug
+ 修改自 [XiaoYuanKouSuan_Frida_hook](https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook) 的[修改提交答案数据包](frida/submit)

待完成：
+ [@jqjhl](https://github.com/jqjhl) 提供待逆向的加密算法 [fun_001eefc.txt](资料/解密算法/fun_001eefc.txt)

推荐项目：
+ 修改数据包欺骗服务器做题耗时: https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook
+ 小猿搜题冲榜/刷排名/专用思路一s2w分: https://github.com/xiaou61/XiaoYuanKousuan
+ 控制跳转,瞬间提交: https://github.com/FoskyM/XiaoYuanKouSuan_Tutorial

推荐链接
+ 全国每日榜: https://xyks.yuanfudao.com/bh5/leo-web-config-activity/activity.html?orionKey=leo.activity.config.picture.v5&_productId=611#/

## 免责声明

1. 本仓库发布的 `xyks` (下文均用本项目代替) 项目中涉及的任何脚本，仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断。

2. 作者对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.

3. 请勿将本项目的任何内容用于商业或非法目的，否则后果自负。

4. 以任何方式查看此项目的人或直接或间接使用本项目的任何脚本的使用者都应仔细阅读此声明。作者保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或本项目，则视为您已接受此免责声明。

5. 您必须在下载后的24个小时之内，从您的电脑或手机中彻底删除上述内容。

6. 任何擅自改变计算机信息网络数据属于违法行为，本项目不提供成品可运行程序，仅做学习研究使用。

`您使用或者复制了本仓库且本人制作的任何代码或项目，则视为已接受此声明，请仔细阅读。`
