console.log("Script loaded successfully ");
Java.perform(function() {
    var DataDecryptCommand$execute$1$decryptData$1 = Java.use('com.fenbi.android.leo.webapp.secure.commands.DataDecryptCommand$execute$1$decryptData$1');

    DataDecryptCommand$execute$1$decryptData$1['invokeSuspend'].implementation = function (obj) {
        console.log("['invokeSuspend'] DataDecryptCommand$execute$1$decryptData$1.invokeSuspend is called: obj=" + obj);

        // 调用原始方法获取结果
        var originalResult = this['invokeSuspend'](obj);

        // 发送结果给监听者
        send(originalResult.toString());

        // 同步等待监听者返回新数据
        var newResult = null;
        while (newResult === null) {
            newResult = recv('input', function(value) {
                console.log('[matchV2_byDataDecryptCommand] Data Replaced');
                console.log(value.payload);
                newResult = value.payload;
            });
        }

        // 确保新数据是一个字符串
        if (typeof newResult !== 'string') {
            console.warn("['invokeSuspend'] New result is not a string, converting to string.");
            newResult = String(newResult);
        }

        // 将新数据转换为Java字符串
        var StringClass = Java.use('java.lang.String');
        var modifiedResult = StringClass.$new(newResult);
        console.log("['invokeSuspend'] Modified result: " + modifiedResult);

        // 确保返回类型兼容
        return Java.cast(modifiedResult, Java.use('java.lang.Object'));
    }
});