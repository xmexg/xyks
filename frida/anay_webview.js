/**
 * 已得到：
 * 
 * 获取pk试题的样子：
 * https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=30c3a8c42056e5ba71cb81ba4d7ca5a3&deviceCategory=pad
 * WebView loading URL: javascript:(window.requestConfig_1728442462820_12 && window.requestConfig_1728442462820_12("W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tZ2FtZS1way9hbmRyb2lkL21hdGgvcGsvbWF0Y2g/cG9pbnRJZFx1MDAzZDJcdTAwMjZfcHJvZHVjdElkXHUwMDNkNjExXHUwMDI2cGxhdGZvcm1cdTAwM2RhbmRyb2lkMzJcdTAwMjZ2ZXJzaW9uXHUwMDNkMy45My4yXHUwMDI2dmVuZG9yXHUwMDNkeGlhb19taVx1MDAyNmF2XHUwMDNkNVx1MDAyNnNpZ25cdTAwM2QzMGMzYThjNDIwNTZlNWJhNzFjYjgxYmE0ZDdjYTVhM1x1MDAyNmRldmljZUNhdGVnb3J5XHUwMDNkcGFkIn1d")
 * 解base64：
 * [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/match?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=30c3a8c42056e5ba71cb81ba4d7ca5a3&deviceCategory=pad"}]
 * 
 * 预提交答案的样子：
 * WebView loading URL: javascript:(window.requestConfig_1728442488548_12 && window.requestConfig_1728442488548_12("W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tc3Rhci9hbmRyb2lkL2V4ZXJjaXNlL3JhbmsvcHJlLWZldGNoP19wcm9kdWN0SWRcdTAwM2Q2MTFcdTAwMjZwbGF0Zm9ybVx1MDAzZGFuZHJvaWQzMlx1MDAyNnZlcnNpb25cdTAwM2QzLjkzLjJcdTAwMjZ2ZW5kb3JcdTAwM2R4aWFvX21pXHUwMDI2YXZcdTAwM2Q1XHUwMDI2c2lnblx1MDAzZGRjNzFjY2UyMjdmODM3YWYyNDJhMmUzZjdhMDMzOGE2XHUwMDI2ZGV2aWNlQ2F0ZWdvcnlcdTAwM2RwYWQifV0="))
 * 解base64：
 * [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-star/android/exercise/rank/pre-fetch?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=dc71cce227f837af242a2e3f7a0338a6&deviceCategory=pad"}]
 *  
 * 提交pk答案的样子：
 * WebView loading URL: javascript:(window.requestConfig_1728442488747_22 && window.requestConfig_1728442488747_22("W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tZ2FtZS1way9hbmRyb2lkL21hdGgvcGsvc3VibWl0P19wcm9kdWN0SWRcdTAwM2Q2MTFcdTAwMjZwbGF0Zm9ybVx1MDAzZGFuZHJvaWQzMlx1MDAyNnZlcnNpb25cdTAwM2QzLjkzLjJcdTAwMjZ2ZW5kb3JcdTAwM2R4aWFvX21pXHUwMDI2YXZcdTAwM2Q1XHUwMDI2c2lnblx1MDAzZDM1M2RhMzcwMjlhNzAzNzczMGVkOWUzMDI5ZTFjZDQ0XHUwMDI2ZGV2aWNlQ2F0ZWdvcnlcdTAwM2RwYWQifV0="))
 * 解base64：
 * [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=353da37029a7037730ed9e3029e1cd44&deviceCategory=pad"}]
 *  
 */

/**
 获取
 */

Java.perform(function() {

    // Hook WebView 的 loadUrl 方法 (经测试全部用的是这个)
    // var WebView = Java.use('android.webkit.WebView');
    // WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
    //     console.log("WebView loading URL: " + url);
    //     // 打印栈追踪 (调用链)
    //     var stackTrace = Java.use('android.util.Log').getStackTraceString(Java.use('java.lang.Exception').$new());
    //     console.log("调用链: " + stackTrace);
    //     // 继续执行原来的 loadUrl 方法
    //     return this.loadUrl(url);
    // };

    // Hook WebView 的 loadUrl 方法 (经测试全部用的是这个)
    var WebView = Java.use('android.webkit.WebView');
    WebView.setWebContentsDebuggingEnabled.overload("boolean").implementation = function (s) {
        console.log("强制开启webview调试");
        this.setWebContentsDebuggingEnabled(true)
    }
    WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
        console.log("WebView loading URL: " + url);
        if (url.startsWith("javascript:") && url.includes("window.requestConfig")) {
            // 提取Base64字符串
            var base64EncodedString = url.match(/"([^"]+)"/)[1]; // 匹配出Base64字符串
            // 解码Base64
            var decodedBase64 = Java.use('android.util.Base64').decode(base64EncodedString, 0);
            var decodedString = Java.use('java.lang.String').$new(decodedBase64, "UTF-8");
            // 使用Java的replace方法进行转义字符替换
            decodedString = decodedString.replace(Java.use('java.lang.String').$new("\\u0026"), Java.use('java.lang.String').$new("&"));
            decodedString = decodedString.replace(Java.use('java.lang.String').$new("\\u003d"), Java.use('java.lang.String').$new("="));
            console.log("解码 Base64: " + decodedString)
        }
        // 打印栈追踪 (调用链)
        var stackTrace = Java.use('android.util.Log').getStackTraceString(Java.use('java.lang.Exception').$new());
        console.log("调用链: " + stackTrace);
        // 继续执行原来的 loadUrl 方法
        return this.loadUrl(url);
    };
    
    // 解码Unicode字符串的函数
    function decodeUnicode(str) {
        return str.replace(/\\u[\dA-Fa-f]{4}/g, function (match) {
            return String.fromCharCode(parseInt(match.replace("\\u", ""), 16));
        });
    }
    

    // Hook WebViewClient 的 onPageFinished 方法
    var WebViewClient = Java.use('android.webkit.WebViewClient');
    WebViewClient.onPageFinished.overload('android.webkit.WebView', 'java.lang.String').implementation = function(view, url) {
        console.log("WebView finished loading URL: " + url);
        // 可以在这里处理更多逻辑，如获取网页内容
        return this.onPageFinished(view, url);
    };

    // Hook WebView 的 WebResourceRequest
    var WebResourceRequest = Java.use('android.webkit.WebResourceRequest');
    var WebViewClient2 = Java.use('android.webkit.WebViewClient');

    WebViewClient2.shouldInterceptRequest.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest').implementation = function(view, request) {
        var requestUrl = request.getUrl().toString();
        console.log("Intercepting WebResourceRequest: " + requestUrl);

        // 在这里可以执行任何自定义逻辑，如修改请求
        return this.shouldInterceptRequest(view, request);
    };
});
