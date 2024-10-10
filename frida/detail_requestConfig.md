# 详记requestConfig方法调用
+ 生成各类回调方法的代码位于`webpack://leo-web-oral-pk/node_modules/@solar/solar-web-bridge/lib/util/util.js`  
所有用到该方法的，最终好像都去到了Android webview
```js
export var generateCallbackName = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    var callbackName = prefix + "_" + Date.now() + "_" + id++;
    for (var i = 0; i < 500 && window && window[callbackName]; i++) {
        callbackName = prefix + "_" + Date.now() + "_" + id++;
    }
    if (window && window[callbackName]) {
        throw new Error(prefix + "_\u56DE\u8C03\u65B9\u6CD5\u91CD\u590D");
    }
    return callbackName;
};
* var registryCallback = function (name, callback, timeout) {
    if (timeout === void 0) { timeout = 0; }
    var timeId = -1;
    if (timeout > 0) {
        // @ts-ignore
        timeId = setTimeout(function () {
            globalScope[name] = '';
            callback(ERRORS.TIMEOUT);
        }, timeout);
    }
    globalScope[name] = function (b64) {
        clearTimeout(timeId);
        callback.apply(null, b64 ? JSON.parse(base64ToString(b64)) : [null]);
    };
};
```
+ 值得一提，使用frida -U -n 小猿口算 -l anay_webview.js注入脚本，也能获取到这里的调用。  
位于`webpack://leo-web-oral-pk/node_modules/@solar/solar-web-bridge/lib/native.js`有写
```js
/**
 * 与客户端交互bridge
 * @param name 函数名
 * @param params 函数参数列表
 * @param prefix interface
 * @callNative 为了使Android摆脱js接口方法硬编码，对webview接口重新设计，通过一个js接口来对实际方法调用进行分发
 * @returns
 */
export var sendToNative = function (name, params, prefix, callback, rnDefultCallback) {
    if (prefix === void 0) { prefix = ''; }
    var encodeParam = Buffer.from(JSON.stringify(params)).toString('base64');
    if (NativeModules && NativeModules.RNJsBridge) {
        var callNativeParams = Buffer.from(JSON.stringify(params.arguments && params.arguments[0])).toString('base64');
        NativeModules.RNJsBridge.callNative(prefix, name, callNativeParams, function (b64) {
            if (b64 && callback) {
                var response = JSON.parse(base64ToString(b64));
                var isUserCallback = typeof callback === 'function';
                if (Array.isArray(response)) {
                    var err = response[0], extData = response.slice(1);
                    if (err) {
                        isUserCallback ? callback.apply(void 0, __spreadArrays([err], extData)) : rnDefultCallback(err, extData);
                    }
                    else {
                        isUserCallback ? callback.apply(void 0, __spreadArrays([ERRORS.NULL], extData)) : rnDefultCallback(ERRORS.NULL, extData);
                    }
                }
                else {
                    isUserCallback ? callback(ERRORS.NULL, response) : rnDefultCallback(ERRORS.NULL, response);
                }
            }
        });
        return true;
    }
```