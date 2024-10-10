# 小猿口算
未完成的逆向笔记  
详见[frida/readme.md](frida/readme.md)

# 如何复现
+ windows:  
安装mumu模拟器，根据mumu官方教程，依次安装magisk，lsposed，算法助手。  
安装小猿口算app，在算法助手里设置小猿口算app允许webview远程调试。  
打开chrome或edge浏览器，分别打开chrome://inspect或者edge://inspect  
打开小猿口算app，打开口算pk，回到浏览器的inspect页面，等待显示出pk链接调试按钮，点击调试。  
开发者工具的网络页面选择保留日志。然后左上角刷新页面以确保获取到完整数据。每打开一个页面回到inspect页面等待获取到新的调试链接，在新的调试页面刷新页面。  
[查看视频](./video/webview.mp4)

# 进度
## 正在解`sign`  
获取pk试题及答案，提交答案主要在`exercise.ts`文件里  
生成请求参数位于`request.ts`文件里  
跟踪`signUrlIfNeeded`方法，一路跟踪发现使用`solar`让安卓程序生成sign再把url带参数传回来  

+ 使用`anay_webview.js`能看到传递和调用链  
```
cd frida
frida -U -n 小猿口算 -l anay_webview.js
```
```
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