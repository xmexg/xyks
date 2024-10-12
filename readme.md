# 小猿口算
未完成的逆向笔记  
vue逆向笔记 [frida/readme.md](frida/readme.md)  
sign逆向笔记 [frida/sign_decrypt.md](frida/sign_decrypt.md)

# 目录说明
|||
|--|--|
|dexdump|使用frida-dexdump导出的dex|
|frida|用到的一些脚本和逆向笔记|
|har|在虚拟机抓到的包|
|java_test|一点java测试|

# 如何复现

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


## [未经测试的加载RequestEncoder生成sign方法](frida/gan_sign)
根据 [taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的hook方向, 现写出:  
+ [anay_loadRequestEncoder.js](frida/anay_loadRequestEncoder.js) hook分析测试脚本
+ [gan_sign_model.js](frida/gan_sign/gan_sign_model.js) 生成sign
+ [gan_sign_model.py](frida/gan_sign/gan_sign_model.py) 提供python调用


## [正在测试通过frida调用的形式不解具体算法拿到带sign的url](./frida/sign_decrypt.md)  
获取pk试题及答案，提交答案主要在`exercise.ts`文件里  
生成请求参数位于`request.ts`文件里  
跟踪`signUrlIfNeeded`方法，一路跟踪发现使用`solar`让安卓程序生成sign再把url带参数传回来  

+ 使用`anay_webview.js`能看到传递和调用链  
```sh
cd frida
frida -U -n 小猿口算 -l anay_webview.js
```
```js
WebView loading URL: javascript:(window.requestConfig_callback_1728561502343_17 && window.requestConfig_callback_1728561502343_17("W251bGxd
"))
解码 Base64: [null]
调用链: java.lang.Exception
        at android.webkit.WebView.loadUrl(Native Method)
        at com.tencent.smtt.sdk.WebView.loadUrl(SourceFile:1)
        at java.lang.reflect.Method.invoke(Native Method)
        at org.lsposed.lspd.nativebridge.HookBridge.invokeOriginalMethod(Native Method)
        at J.callback(Unknown Source:193)
        at LSPHooker_.loadUrl(Unknown Source:11)
        at com.fenbi.android.leo.webapp.JsBridgeBean.callback$leo_webview_release(SourceFile:73)
        at com.fenbi.android.leo.webapp.secure.LeoSecureWebViewApi$g.run(SourceFile:11)
        at android.os.Handler.handleCallback(Handler.java:938)
        at android.os.Handler.dispatchMessage(Handler.java:99)
        at android.os.Looper.loopOnce(Looper.java:201)
        at android.os.Looper.loop(Looper.java:288)
        at android.app.ActivityThread.main(ActivityThread.java:8060)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)

WebView loading URL: javascript:(window.requestConfig_1728561502343_16 && window.requestConfig_1728561502343_16("W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tZ2FtZS1way9hbmRyb2lkL21hdGgvcGsvaG9tZT9fcHJvZHVjdElkXHUwMDNkNjExXHUwMDI2cGxhdGZvcm1cdTAwM2RhbmRyb2lkMzJcdTAwMjZ2ZXJzaW9uXHUwMDNkMy45My4yXHUwMDI2dmVuZG9yXHUwMDNkeGlhb19taVx1MDAyNmF2XHUwMDNkNVx1MDAyNnNpZ25cdTAwM2RmMmQ2NjhjZTY3MDgxOWMwNWI3NjRhMjM3YzcyNjQ0Mlx1MDAyNmRldmljZUNhdGVnb3J5XHUwMDNkcGFkIn1d"))
解码 Base64: [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/home?_productId=611&platform\u003dandroid32&version\u003d3.93.2&vendor\u003dxiao_mi&av\u003d5&sign\u003df2d668ce670819c05b764a237c726442&deviceCategory\u003dpad"}]
调用链: java.lang.Exception
        at android.webkit.WebView.loadUrl(Native Method)
        at com.tencent.smtt.sdk.WebView.loadUrl(SourceFile:1)
        at java.lang.reflect.Method.invoke(Native Method)
        at org.lsposed.lspd.nativebridge.HookBridge.invokeOriginalMethod(Native Method)
        at J.callback(Unknown Source:193)
        at LSPHooker_.loadUrl(Unknown Source:11)
        at com.yuanfudao.android.common.webview.base.JsBridgeBean$a.run(SourceFile:47)
        at android.os.Handler.handleCallback(Handler.java:938)
        at android.os.Handler.dispatchMessage(Handler.java:99)
        at android.os.Looper.loopOnce(Looper.java:201)
        at android.os.Looper.loop(Looper.java:288)
        at android.app.ActivityThread.main(ActivityThread.java:8060)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)
```

+ 使用[frida-dexdump](https://github.com/hluwa/frida-dexdump)  
```
frida-dexdump -FU
```
frida-dexdump导出的[dex](frida/dexdump/小猿口算),拖到jadx窗口逆向

## 现状
已完成:   
+ 感谢 [@x781078959](https://github.com/x781078959) 完成[hook解密试题及答案,模拟滑动](frida/matchV2)  
+ 感谢 [@taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的[hook sign](frida/gan_sign)方向
+ 感谢 [@ZQBCWG](https://github.com/ZQBCWG) 在 [https://github.com/cr4n5/XiaoYuanKouSuan/issues/79](https://github.com/cr4n5/XiaoYuanKouSuan/issues/79) 提供hook试题及答案新方向, 实现了查看, 好像还是不能修改试题及答案, [查看示例模板](frida/matchV2_byDataDecryptCommand) 
+ 感谢 [@x781078959](https://github.com/x781078959) 指出异步调用导致js在获取到py传入的新题库前return导致无法修改试题及答案的bug

待完成：
+ [@jqjhl](https://github.com/jqjhl) 提供待逆向的加密算法 [fun_001eefc.txt](资料/解密算法/fun_001eefc.txt)

推荐项目：
+ 修改数据包欺骗服务器做题耗时: https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook

## 免责声明

1. 本仓库发布的 `xyks` (下文均用本项目代替) 项目中涉及的任何脚本，仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断。

2. 作者对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.

3. 请勿将本项目的任何内容用于商业或非法目的，否则后果自负。

4. 以任何方式查看此项目的人或直接或间接使用本项目的任何脚本的使用者都应仔细阅读此声明。作者保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或本项目，则视为您已接受此免责声明。

5. 您必须在下载后的24个小时之内，从您的电脑或手机中彻底删除上述内容。

6. 任何擅自改变计算机信息网络数据属于违法行为，本项目不提供成品可运行程序，仅做学习研究使用。

`您使用或者复制了本仓库且本人制作的任何代码或项目，则视为已接受此声明，请仔细阅读。`