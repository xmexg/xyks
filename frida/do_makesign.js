/**
 * 演示通过主动创建协程来生成sign
 * 
  com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion$call$1
  com.fenbi.android.leo.webapp.command.p
  com.fenbi.android.leo.webapp.secure.commands.RequestConfigBean

    // p callback
    public interface p {
        void a(@Nullable Object obj);
        @Deprecated
        void b(@Nullable Object error, @NotNull Object... result);
        void c(@NotNull Object... result);
    }

    // RequestConfigBean requestConfigBean
    public final class RequestConfigBean extends JsBridgeBean {
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
  jadx反编译
  创建协程: 
  new RequestConfigCommand$Companion$call$1(requestConfigBean, callback, null)
 */
Java.perform(function() {
    console.log("demo make sign start...")
    var RequestConfigCommandCompanionCall = Java.use('com.fenbi.android.leo.webapp.secure.commands.RequestConfigCommand$Companion$call$1');
    // 获取需要的参数类 RequestConfigBean 和 p (callback)
    var RequestConfigBean = Java.use('com.fenbi.android.leo.webapp.secure.commands.RequestConfigBean');
    var CallbackInterface = Java.use('com.fenbi.android.leo.webapp.command.p');
    // /leo-game-pk/{client}/math/pk/home

    // 创建 RequestConfigBean 实例
    var requestConfigBeanInstance = RequestConfigBean.$new("/leo-game-pk/{client}/math/pk/home");

    // 实现接口 p，并正确处理可变参数
    var callbackInstance = Java.registerClass({
        name: 'com.fenbi.android.leo.webapp.command.p$Impl',  // 给实现类起个名字
        implements: [CallbackInterface],
        methods: {
            a: function (obj) {
                console.log("[*] Callback a called with: " + obj);
            },
            b: function (error, result) {  // 可变参数处理
                console.log("[*] Callback b called with error: " + error);
                for (var i = 0; i < result.length; i++) {
                    console.log("[*] Result " + i + ": " + result[i]);
                }
            },
            c: function (result) {  // 可变参数处理
                console.log("[*] Callback c called with results:");
                for (var i = 0; i < result.length; i++) {
                    console.log("[*] Result " + i + ": " + result[i]);
                }
            }
        }
    }).$new();

    // 创建 RequestConfigCommand$Companion$call$1 实例 (协程体)
    var coroutineInstance = RequestConfigCommandCompanionCall.$new(requestConfigBeanInstance, callbackInstance, null);

    console.log("[*] Coroutine instance created");

    // Hook invokeSuspend
    coroutineInstance.invokeSuspend.implementation = function (obj) {
        console.log("[*] invokeSuspend called with: " + obj);
        var result = this.invokeSuspend(obj);
        console.log("[*] invokeSuspend result: " + result);
        return result;
    };

    // 主动调用协程的 invokeSuspend 方法，启动协程
    var initialObj = null; // 通常初次调用传递 null
    console.log("[*] Starting coroutine by invoking invokeSuspend");
    coroutineInstance.invokeSuspend(initialObj);
})