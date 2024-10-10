Java.perform(function() {
    // Hook java.net.URL
    var URL = Java.use('java.net.URL');
    var BufferedReader = Java.use('java.io.BufferedReader');
    var InputStreamReader = Java.use('java.io.InputStreamReader');
    var StringBuilder = Java.use('java.lang.StringBuilder');

    // Hook openConnection 来捕获请求
    URL.openConnection.overload().implementation = function() {
        var connection = this.openConnection();
        console.log("URL Request: " + this.toString());

        // Hook HttpURLConnection.getInputStream()
        if (connection.getInputStream) {
            var getInputStream = connection.getInputStream.overload();
            getInputStream.implementation = function() {
                console.log("拦截 response...");

                var inputStream = getInputStream.call(this);
                
                // 使用 BufferedReader 读取 InputStream 的内容
                var reader = BufferedReader.$new(InputStreamReader.$new(inputStream));
                var responseBuilder = StringBuilder.$new();
                var line;

                while ((line = reader.readLine()) !== null) {
                    responseBuilder.append(line);
                }

                console.log("Response Body: " + responseBuilder.toString());
                return inputStream;
            };
        }
        return connection;
    };
});
