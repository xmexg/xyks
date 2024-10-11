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
     * 
     * 启动了一个协程, 让RequestConfigCommand$Companion$call$1(url参数, callback参数, null)执行
     * 
     * jadx反编译
     * package com.fenbi.android.leo.webapp.secure.commands;
     * public final class RequestConfigCommand implements IWebAppCommand<RequestConfigBean> {
     *  public final void b(@Nullable RequestConfigBean requestConfigBean, @NotNull p pVar) {
                y.g(pVar, "callback"); // 检查pVar是否为空
                kotlinx.coroutines.j.d(l0.a(x0.c()), null, null, new RequestConfigCommand$Companion$call$1(requestConfigBean, pVar, null), 3, null); // 调用RequestConfigCommand$Companion$call$1方法
            }
            public final java.lang.Object c(com.fenbi.android.leo.webapp.secure.commands.RequestConfigBean r6, kotlin.coroutines.c<? super java.util.List<java.lang.String>> r7) {
                // 无法反编译, 这里是sign加密算法
            }
            @Override // com.fenbi.android.leo.webapp.command.IWebAppCommand
            // renamed from: a, reason: merged with bridge method [inline-methods]
            public void execute(@Nullable RequestConfigBean requestConfigBean, @NotNull p pVar) {
                y.g(pVar, "callback"); // 检查pVar是否为空
                INSTANCE.b(requestConfigBean, pVar);  // 调用b方法
            }
            @Override // com.fenbi.android.leo.webapp.command.IWebAppCommand
            public boolean executable(@Nullable String method) {
                return y.b(method, "LeoSecure_requestConfig"); // 检查method是否为"LeoSecure_requestConfig"
            }
        }
      }

     * public interface p {
            void a(@Nullable Object obj);

            @Deprecated
            void b(@Nullable Object error, @NotNull Object... result);

            void c(@NotNull Object... result);
        }

     * public final class RequestConfigBean extends JsBridgeBean {
            @Nullable
            private final String path;
            public RequestConfigBean(@Nullable String str) {
                this.path = str;
            }
            @Nullable
            public final String getPath() {
                return this.path;
            }
        }
     */
    let Companion = Java.use("com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion")
    Companion["b"].implementation = function (requestConfigBean, callback) {
        console.log("[*] HOOK RequestConfigCommand$Companion: ");
        console.log(`Companion.b is called: requestConfigBean=${requestConfigBean}, callback=${callback}`)
        this["b"](requestConfigBean, callback)
    }

    /**
     * 由上一步协程调用
     * 
     * com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion$call$1
     * frida反编译
     * public final class RequestConfigCommand$Companion$call$1 extends SuspendLambda implements p<k0, kotlin.coroutines.c<? super y>, Object> {
            final RequestConfigBean $bean;
            final com.fenbi.android.leo.webapp.command.p $callback;
            int label;

            public RequestConfigCommand$Companion$call$1(RequestConfigBean requestConfigBean, com.fenbi.android.leo.webapp.command.p pVar, kotlin.coroutines.c<? super RequestConfigCommand$Companion$call$1> cVar) {
                super(2, cVar);
                this.$bean = requestConfigBean;
                this.$callback = pVar;
            }

            @Override // kotlin.coroutines.jvm.internal.BaseContinuationImpl
            @NotNull
            public final kotlin.coroutines.c<y> create(@Nullable Object obj, @NotNull kotlin.coroutines.c<?> cVar) {
                return new RequestConfigCommand$Companion$call$1(this.$bean, this.$callback, cVar);
            }
                
            @Override // kotlin.coroutines.jvm.internal.BaseContinuationImpl
            @Nullable
            public final Object invokeSuspend(@NotNull Object obj) {
                Object f11;
                String str;
                Object x02;
                f11 = kotlin.coroutines.intrinsics.b.f();
                int i11 = this.label;
                String str2 = "";
                try {
                    if (i11 != 0) {
                        if (i11 == 1) {
                            n.b(obj);
                        } else {
                            throw new IllegalStateException("call to 'resume' before 'invoke' with coroutine");
                        }
                    } else {
                        n.b(obj);
                        RequestConfigCommand.Companion companion = RequestConfigCommand.INSTANCE;
                        RequestConfigBean requestConfigBean = this.$bean;
                        this.label = 1;
                        obj = companion.c(requestConfigBean, this);
                        if (obj == f11) {
                            return f11;
                        }
                    }
                    com.fenbi.android.leo.webapp.command.p pVar = this.$callback;
                    Object[] objArr = new Object[1];
                    x02 = CollectionsKt___CollectionsKt.x0((List) obj, 0);
                    String str3 = (String) x02;
                    if (str3 == null) {
                        RequestConfigBean requestConfigBean2 = this.$bean;
                        if (requestConfigBean2 != null) {
                            str3 = requestConfigBean2.getPath();
                        } else {
                            str3 = null;
                        }
                    }
                    String b11 = com.fenbi.android.leo.network.constant.a.f31897a.b();
                    if (b11 == null) {
                        b11 = "";
                    }
                    objArr[0] = new HttpInfo(str3, b11);
                    pVar.b(null, objArr);
                } catch (Exception unused) {
                    com.fenbi.android.leo.webapp.command.p pVar2 = this.$callback;
                    Object[] objArr2 = new Object[1];
                    RequestConfigBean requestConfigBean3 = this.$bean;
                    if (requestConfigBean3 != null) {
                        str = requestConfigBean3.getPath();
                    } else {
                        str = null;
                    }
                    String b12 = com.fenbi.android.leo.network.constant.a.f31897a.b();
                    if (b12 != null) {
                        str2 = b12;
                    }
                    objArr2[0] = new HttpInfo(str, str2);
                    pVar2.b(null, objArr2);
                }
                return y.f60440a;
            }

            @Override // y30.p
            @Nullable
            public final Object invoke(@NotNull k0 k0Var, @Nullable kotlin.coroutines.c<? super y> cVar) {
                return ((RequestConfigCommand$Companion$call$1) create(k0Var, cVar)).invokeSuspend(y.f60440a);
            }
        }
     *  public final class RequestConfigBean extends JsBridgeBean {
            @Nullable
            private final String path;
            public RequestConfigBean(@Nullable String str) {
                this.path = str;
            }
            @Nullable
            public final String getPath() {
                return this.path;
            }
        }
     * 
     */
    let RequestConfigCommand$Companion$call$1 = Java.use("com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion$call$1")
    RequestConfigCommand$Companion$call$1["$init"].implementation = function (requestConfigBean, pVar, cVar) {
        console.log("[*] HOOK RequestConfigCommand$Companion$call$1初始化时: ")
        console.log(`RequestConfigCommand$Companion$call$1.$init is called: requestConfigBean=${requestConfigBean}, pVar=${pVar}, cVar=${cVar}`);
        console.log("[!] [url no sign] RequestConfigCommand$Companion$call$1.$init requestConfigBean.path=", requestConfigBean.getPath())
        this["$init"](requestConfigBean, pVar, cVar)
    }
    RequestConfigCommand$Companion$call$1["invokeSuspend"].implementation = function (obj) {
        console.log(`[!] [url with sign] RequestConfigCommand$Companion$call$1.invokeSuspend is called: 传入参数: ${obj}`);
        let result = this["invokeSuspend"](obj);
        console.log(`RequestConfigCommand$Companion$call$1.invokeSuspend result=${result}`);
        return result;
    };
    /**
     * 上面代码, 已经成功hook出无sign的url和有sign的url的代码
     * 下面代码, 详细分析
     */
    RequestConfigCommand$Companion$call$1["create"].implementation = function (obj, cVar) {
        console.log(`RequestConfigCommand$Companion$call$1.create is called: obj=${obj}, cVar=${cVar}`)
        // 尝试获取 obj 的类名, 获取到了, 是kotlinx.coroutines.l2
        // if (obj !== null) {
        //     try {
        //         let objClassName = obj.getClass().getName();  // 获取 obj 的类名
        //         console.log(`RequestConfigCommand$Companion$call$1.create obj class name: ${objClassName}`);
        //     } catch (e) {
        //         console.log("RequestConfigCommand$Companion$call$1.create Failed to get obj class name: " + e);
        //     }
        //     // 尝试打印对象的内容（仅在 obj 是一个 Java 对象时有效）
        //     try {
        //         console.log("RequestConfigCommand$Companion$call$1.create obj.toString() value: " + obj.toString());
        //     } catch (e) {
        //         console.log("RequestConfigCommand$Companion$call$1.create Failed to convert obj to string: " + e);
        //     }
        // } else {
        //     console.log("RequestConfigCommand$Companion$call$1.create obj is null");
        // }
        let result = this["create"](obj, cVar)
        console.log(`[*] 创建结果 RequestConfigCommand$Companion$call$1.create result=${result}`)
        Object.getOwnPropertyNames(result).forEach(prop => {
            console.log(`${prop} = ${result[prop]}`);
        });
        return result
    }

    /**
     * 最终关键点还是在com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand.Companion.c方法
     * public final java.lang.Object c(com.fenbi.android.leo.webapp.secure.commands.RequestConfigBean r6, kotlin.coroutines.c<? super java.util.List<java.lang.String>> r7)
       该方法无法反编译, 应该在里面调用了`apk安装包/lib/arm64-v8a/libRequestEncoder.so`进行计算sign
     */
    Companion["c"].implementation = function (requestConfigBean, obj) {
        console.log(`[!] 无法反编译的 Companion.c is called: `, requestConfigBean, obj)
        if(requestConfigBean != null) {
            console.log(`[!] 无法反编译的 Companion.c requestConfigBean.path: ${requestConfigBean.getPath()}`)
        }
        let result = this["c"](requestConfigBean, obj)
        console.log(`[!] 无法反编译的 Companion.c result: ${result}`)
        return result
    }
    
    // 主动创建该协程的脚本位于 do_makesign.js

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
    // 看jsBridgeBean.trigger的result已经生成好了sign, 这里不用hook, 肯定已经生成好了sign

    
    /**
     * 对于传出[null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/home?_productId\u003d611\u0026platform\u003dandroid32\u0026version\u003d3.93.2\u0026vendor\u003dxiao_mi\u0026av\u003d5\u0026sign\u003d3d6ecf6bfae078137e35a8b172f85888\u0026deviceCategory\u003dpad"}]时，得到如下输出:
     * [*] HOOK JsBridgeBean.trigger:
        trigger: requestConfig_1728604078663_16
        webView: [object Object]
        r16:  null
        data:
        1
        com.fenbi.android.leo.webapp.HttpInfo@4550c220

     * com.fenbi.android.leo.webapp
     * jadx反编译
     * public final class HttpInfo extends y00.a {
            @NotNull
            private final String userAgent;
            @Nullable
            private final String wrappedUrl;
            public HttpInfo(@Nullable String str, @NotNull String userAgent) {
                kotlin.jvm.internal.y.g(userAgent, "userAgent");
                this.wrappedUrl = str;
                this.userAgent = userAgent;
            }
        ...
        }
     * result此时已经包含了生成好的sign
     * 
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
        // data可能是任何一个类
        console.log(data.length)
        console.log(data.toString())
        // for (var i = 0; i < data.length; i++) {
        //     console.log('data[' + i + ']: ' + data[i]);
        // }
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
            