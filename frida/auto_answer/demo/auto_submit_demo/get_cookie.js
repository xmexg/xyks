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
        var HttpUrl = Java.use('okhttp3.HttpUrl');

        // 拦截 Request.Builder 的 build 方法
        RequestBuilder.build.implementation = function () {
            console.log("Intercepted Request.Builder.build");

            // 调用原始方法
            var request = this.build();

            // 检查请求 URL
            var url = request.url().toString();
            console.log("Intercepted request to URL: " + url);

            // 检查特定 URL
            if (url.startsWith('https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/pk.html?')) {
                console.log("Intercepted specific URL: " + url);

                // 解析 URL 参数
                var parsedUrl = HttpUrl.parse(url);
                if (parsedUrl) {
                    var yfdUFromUrl = parsedUrl.queryParameter('YFD_U');
                    console.log("YFD_U parameter: " + yfdUFromUrl);

                    // 获取请求头
                    var headers = request.headers();
                    console.log("Request Headers:");
                    var originalCookieFromHeader = '';
                    var userAgentFromHeader = '';
                    for (var i = 0; i < headers.size(); i++) {
                        var name = headers.name(i);
                        var value = headers.value(i);
                        console.log(name + ": " + value);

                        // 检查 Cookie
                        if (name.toLowerCase() === 'cookie') {
                            console.log("Original Cookie from header: " + value);
                            originalCookieFromHeader = value;
                        }

                        // 检查 User-Agent
                        if (name.toLowerCase() === 'user-agent') {
                            console.log("User-Agent from header: " + value);
                            userAgentFromHeader = value;
                        }
                    }

                    // 如果没有原始 Cookie 或 User-Agent，不进行任何操作
                    if (!originalCookieFromHeader || !userAgentFromHeader) {
                        console.log("No original Cookie or User-Agent found, skipping modification");
                    } else {
                        // 发送数据到 Python 脚本
                        send({
                            url: url,
                            yfdU: yfdUFromUrl,
                            originalCookie: originalCookieFromHeader,
                            userAgent: userAgentFromHeader
                        });
                    }
                } else {
                    console.log("Failed to parse URL");
                }
            }

            return request;
        };

        console.log("Started intercepting Request.Builder.build for specific URL with YFD_U in Cookie");
    } catch (err) {
        console.log("Request.Builder not found: " + err);
    }
});