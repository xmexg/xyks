# sign加密分析
- sign本身不在vue页面里,而是在vue使用solar通过sendToNative方法传给apk内置的方法生成url参数,再传回vue里发请求,见[detail_requestConfig.md](detail_requestConfig.md)  

- 虽然dexdump文件夹放置了使用frida-dexdump导出了dex,但是jadx逆向发现直接逆向apk得到的效果更好  

- 对于sign，具体的加密算法位于com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand.Companion.c, 但是该方法无法完全导出dex，我无法反编译出源码。  
**应该不会有具体的sign算法，我正在分析调用过程，准备通过hook的方式，向frida传入无sign的url链接，传出带sign的url链接，中间计算过程由小猿口算app生成。**

# frida注入
使用以下命令注入现有的sign测试脚本
```
frida -U -n 小猿口算 -l hook_JsBridgeBean_sign.js
```

# 算法分析
- 注入[anay_webview.js](anay_webview.js)分析调用链
```sh
frida -U -n 小猿口算 -l anay_webview.js
```
发现如下输出:
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

- jadx查看`com.yuanfudao.android.common.webview.base.JsBridgeBea`
![sign1](/frida/image/sign1.png)  

详见[hook_JsBridgeBean_sign.js](hook_JsBridgeBean_sign.js)

有问题的生成带sign的url演示: [do_makesign.js](do_makesign.js)  
传入的空的回调地址,无法生成sign