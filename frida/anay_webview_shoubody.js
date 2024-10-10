Java.perform(function() {
    var WebView = Java.use('android.webkit.WebView');

    // Hook WebView 的 loadUrl 方法
    WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
        console.log("WebView loading URL: " + url);

        // 打印调用堆栈
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));

        // 继续执行原来的 loadUrl 方法
        return this.loadUrl(url);
    };

    // Hook WebViewClient 的 shouldInterceptRequest 方法，获取请求内容
    var WebViewClient = Java.use('android.webkit.WebViewClient');
    WebViewClient.shouldInterceptRequest.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest').implementation = function(view, request) {
        var requestUrl = request.getUrl().toString();
        console.log("Intercepting WebResourceRequest: " + requestUrl);

        // 获取请求方法
        var method = request.getMethod();
        console.log("Request Method: " + method);

        // 获取请求头
        var headers = request.getRequestHeaders();
        console.log("Request Headers: " + JSON.stringify(headers));

        return this.shouldInterceptRequest(view, request);
    };

    // Hook WebViewClient 的 onPageFinished 方法，打印响应堆栈
    WebViewClient.onPageFinished.overload('android.webkit.WebView', 'java.lang.String').implementation = function(view, url) {
        console.log("WebView finished loading URL: " + url);
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        return this.onPageFinished(view, url);
    };
});
