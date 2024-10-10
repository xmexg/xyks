/**
 * sign逆向
 * // jadx反编译
 * package com.yuanfudao.android.common.webview.base;
   public a(com.yuanfudao.android.common.webview.base.a aVar, String str, String str2) {
            this.f47305a = aVar;
            this.f47306b = str;
            this.f47307c = str2;
        }

        @Override // java.lang.Runnable
        public final void run() {
            this.f47305a.loadUrl("javascript:(window." + this.f47306b + " && window." + this.f47306b + "(\"" + this.f47307c + "\"))");
        }
    
    // 使用anay_webview.js获取输出
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
 */

Java.perform(function() {

    /**
     * gg.a.b
     * jadx反编译
        public void b(@Nullable Object error, @NotNull Object... result) {
            JsBridgeBean jsBridgeBean;
            y.g(result, "result");
            if ((error == null || (error instanceof Integer)) && (jsBridgeBean = this.jsBridgeBean) != null) {
                jsBridgeBean.trigger(this.webApp, (Integer) error, Arrays.copyOf(result, result.length));
            }
        }

     */
    

    
    /**
     * com.yuanfudao.android.common.webview.base.JsBridgeBean
     * jadx反编译
     *  public final boolean trigger(@Nullable String trigger, @NotNull com.yuanfudao.android.common.webview.base.a webView, @Nullable Integer r16, @NotNull Object... data) {
        boolean B;
        String I;
        y.h(webView, "webView");
        y.h(data, "data");
        if (trigger != null) {
            B = t.B(trigger);
            if (!B) {
                String str = '[' + r16 + ((data.length == 0) ^ true ? ArraysKt___ArraysKt.s0(data, ",", ",", null, 0, null, JsBridgeBean$trigger$dataStr$1.INSTANCE, 28, null) : "") + ']'; // 从data的第0个字符开始,用逗号开头,用逗号分隔data的每个元素,不加后缀,把data每个元素拼接成字符串
                Charset charset = d.UTF_8;
                if (str != null) {
                    byte[] bytes = str.getBytes(charset);
                    y.c(bytes, "(this as java.lang.String).getBytes(charset)");
                    String encodeToString = Base64.encodeToString(bytes, 0);
                    y.c(encodeToString, "Base64.encodeToString(pa…eArray(), Base64.DEFAULT)");
                    I = t.I(encodeToString, StringUtils.LF, "", false, 4, null);
                    webView.post(new a(webView, trigger, I));
                    return true;
                }
                throw new TypeCastException("null cannot be cast to non-null type java.lang.String");
            }
        }
        return false;
    */
    var JsBridgeBean = Java.use('com.yuanfudao.android.common.webview.base.JsBridgeBean');
    JsBridgeBean.trigger.overload('java.lang.String', 'com.yuanfudao.android.common.webview.base.a', 'java.lang.Integer', '[Ljava.lang.Object;').implementation = function(trigger, webView, r16, data) {
        console.log("[*] HOOK JsBridgeBean.trigger:")
        console.log('trigger: ' + trigger);
        console.log('webView:', webView);
        console.log('r16: ', r16);
        console.log('data:');
        for (var i = 0; i < data.length; i++) {
            console.log('data[' + i + ']: ' + data[i]);
        }
        return this.trigger(trigger, webView, r16, data);
    };


    /**
     * 得到如下输出: 
        JsBridgeBean$a constructor is called:
        参数1 aVar: [object Object]
        参数2 str (回调方法): requestConfig_1728567719783_16
        参数3 str2 (URL带sign): W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tZ2FtZS1way9hbmRyb2lkL21hdGgvcGsvaG9tZT9fcHJvZHVjdElkXHUwMDNkNjExXHUwMDI2cGxhdGZvcm1cdTAwM2RhbmRyb2lkMzJcdTAwMjZ2ZXJzaW9uXHUwMDNkMy45My4yXHUwMDI2dmVuZG9yXHUwMDNkeGlhb19taVx1MDAyNmF2XHUwMDNkNVx1MDAyNnNpZ25cdTAwM2QyNDU2OGI3Y2Q2MWM5OWYxYjk3MDU1M2Q0N2MxMjI5Mlx1MDAyNmRldmljZUNhdGVnb3J5XHUwMDNkcGFkIn1d
        解参数3 base64:  [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/home?_productId\u003d611\u0026platform\u003dandroid32\u0026version\u003d3.93.2\u0026vendor\u003dxiao_mi\u0026av\u003d5\u0026sign\u003d24568b7cd61c99f1b970553d47c12292\u0026deviceCategory\u003dpad"}]
        java.lang.Exception
                at com.yuanfudao.android.common.webview.base.JsBridgeBean$a.<init>(Native Method)
                at com.yuanfudao.android.common.webview.base.JsBridgeBean.trigger(SourceFile:7)
                at com.yuanfudao.android.common.webview.base.JsBridgeBean.trigger(SourceFile:1)
                at gg.a.b(SourceFile:26)
                at com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion$call$1.invokeSuspend(SourceFile:86)
                at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(SourceFile:12)
                at kotlinx.coroutines.u0.run(SourceFile:129)
                at android.os.Handler.handleCallback(Handler.java:938)
                at android.os.Handler.dispatchMessage(Handler.java:99)
                at android.os.Looper.loopOnce(Looper.java:201)
                at android.os.Looper.loop(Looper.java:288)
                at android.app.ActivityThread.main(ActivityThread.java:8060)
                at java.lang.reflect.Method.invoke(Native Method)
                at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
                at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)
        
     *   com.yuanfudao.android.common.webview.base.JsBridgeBean$a.<init>
     *   jadx反编译
        public static final class a implements Runnable {

            // renamed from: a
            public finalcom.yuanfudao.android.common.webview.base.a f47305a;

            // renamed from: b
            public final String f47306b;

            // renamed from: c
            public final String f47307c;

            public a(com.yuanfudao.android.common.webview.base.a aVar, String str, String str2) {
                this.f47305a = aVar;
                this.f47306b = str;
                this.f47307c = str2;
            }

            @Override // java.lang.Runnable
            public final void run() {
                this.f47305a.loadUrl("javascript:(window." + this.f47306b + " && window." + this.f47306b + "(\"" + this.f47307c + "\"))");
            }
        }

     */
    var JsBridgeBean_a = Java.use("com.yuanfudao.android.common.webview.base.JsBridgeBean$a");
    // Hook 内部类 a 的构造函数
    JsBridgeBean_a.$init.overload('com.yuanfudao.android.common.webview.base.a', 'java.lang.String', 'java.lang.String').implementation = function(aVar, str, str2) {
        // 输出传入的构造参数
        console.log("[+] HOOK JsBridgeBean$a:")
        console.log("参数1 aVar:", aVar)
        console.log("参数2 str (回调方法):", str)
        console.log("参数3 str2 (URL带sign):", str2)
        var decode_url_base64 = Java.use('android.util.Base64').decode(str2, 0)
        var decode_url_string = Java.use('java.lang.String').$new(decode_url_base64, 0)
        console.log("解参数3 base64: ", decode_url_string)
        console.log("打印调用链 ", Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new())) // 打印调用链
        // 调用原始构造函数
        return this.$init(aVar, str, str2)
    }

    
})
            