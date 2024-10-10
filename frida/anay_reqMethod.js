/**
 * 小猿口算逆向笔记
 * 我们在proxypin中捕获了一些网络请求，其中https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match为本次pk试题及答案，
 * 但是提交答案的https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit接口被加密了，我们无法直接提交答案。
 * 推测加密算法位于https://xyks.yuanfudao.com/leo-client-perf/android/leoreport或者https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html或者https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/exercise.html?pointId=2&_productId=611&vendor=xiao_mi&phaseId=3&from=yuansoutikousuan&YFD_U=-3211421434165909800&version=3.93.2&siwr=true&keypath=
 * 逆向算法需要巨大工作量，我们准备hook网络请求获取下发试题时的答案，然后模拟绘制答案
 * 
 * 我们准备了3中常见的请求库，经过实践，小猿搜题使用的正是第三种java.net.URL进行网络交互
 */

Java.perform(function() {
    // Hook OkHttpClient 的网络请求
    try {
        var OkHttpClient = Java.use('okhttp3.OkHttpClient');
        var Request = Java.use('okhttp3.Request');
        var Response = Java.use('okhttp3.Response');
        
        OkHttpClient.newCall.overload('okhttp3.Request').implementation = function(req) {
            var requestUrl = req.url().toString();
            console.log("OkHttp Request to: " + requestUrl);

            var call = this.newCall(req);
            var response = call.execute();
            
            // 读取响应体
            var responseBody = response.body().string();
            console.log("OkHttp Response Body: " + responseBody);

            return response;
        };
    } catch (err) {
        console.log("OkHttpClient not found: " + err);
    }

    // Hook HttpURLConnection 的网络请求
    try {
        var HttpURLConnection = Java.use('java.net.HttpURLConnection');
        
        HttpURLConnection.getInputStream.implementation = function() {
            console.log("HttpURLConnection Request URL: " + this.getURL().toString());
            
            var inputStream = this.getInputStream();
            
            var bufferedReader = Java.use('java.io.BufferedReader');
            var InputStreamReader = Java.use('java.io.InputStreamReader');
            var reader = bufferedReader.$new(InputStreamReader.$new(inputStream));
            var sb = Java.use('java.lang.StringBuffer').$new();
            var line;
            
            while ((line = reader.readLine()) !== null) {
                sb.append(line);
            }
            console.log("HttpURLConnection Response: " + sb.toString());

            return inputStream;
        };
    } catch (err) {
        console.log("HttpURLConnection not found: " + err);
    }

    // Hook Retrofit 的网络请求（如果 Retrofit 使用 OkHttp，这部分可以忽略）
    try {
        var RetrofitClient = Java.use('retrofit2.OkHttpCall');
        
        RetrofitClient.execute.implementation = function() {
            console.log("Retrofit Request URL: " + this.request().url().toString());
            
            var response = this.execute();
            
            // 打印响应体
            var responseBody = response.body().string();
            console.log("Retrofit Response Body: " + responseBody);

            return response;
        };
    } catch (err) {
        console.log("RetrofitClient not found: " + err);
    }

    // 捕获其他方式的网络请求
    try {
        var URL = Java.use('java.net.URL');
        
        URL.openConnection.overload().implementation = function() {
            var connection = this.openConnection();
            console.log("URL Request to: " + this.toString());
            
            return connection;
        };
    } catch (err) {
        console.log("java.net.URL not found: " + err);
    }
});
