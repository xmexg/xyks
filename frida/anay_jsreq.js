Java.perform(function () {

    // Hook WebView 的 evaluateJavascript 方法
    var WebView = Java.use('android.webkit.WebView');
    WebView.evaluateJavascript.overload('java.lang.String', 'android.webkit.ValueCallback').implementation = function (script, callback) {
        console.log("执行 JavaScript: " + script);
        // 打印栈追踪 (调用链)
        var stackTrace = Java.use('android.util.Log').getStackTraceString(Java.use('java.lang.Exception').$new());
        console.log("调用链: " + stackTrace);
        // 如果需要，可以修改 script 的内容或对其进行分析
        return this.evaluateJavascript(script, callback);
    };
});
