Java.perform(function () {
    console.log("Java.perform started");

    try {
        // 动态查找已加载的类
        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                console.log("Loaded class: " + className);
                if (className.startsWith('okhttp3.')) {
                    console.log("Found OkHttp class: " + className);
                }
            },
            onComplete: function () {
                console.log("Class enumeration complete");
            }
        });

        // 尝试加载 Request.Builder 类
        var RequestBuilder = Java.use('okhttp3.Request$Builder');
        var Request = Java.use('okhttp3.Request');

        // 拦截 Request.Builder 的 build 方法
        RequestBuilder.build.implementation = function () {
            console.log("Intercepted Request.Builder.build");

            // 调用原始方法
            var request = this.build();

            // 检查请求方法
            if (request.method().toUpperCase() === 'GET') {
                console.log("Intercepted GET request");

                // 获取请求头
                var headers = request.headers();
                console.log("Request Headers:");
                for (var i = 0; i < headers.size(); i++) {
                    var name = headers.name(i);
                    var value = headers.value(i);
                    console.log(name + ": " + value);

                    // 检查 Cookie
                    if (name.toLowerCase() === 'cookie') {
                        console.log("Cookie: " + value);
                        send(value);
                    }
                }
            }

            return request;
        };

        console.log("Started intercepting Request.Builder.build for GET requests");
    } catch (err) {
        console.log("Request.Builder not found: " + err);
    }
});