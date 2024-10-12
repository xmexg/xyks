console.log("Script loaded successfully ")
Java.perform(function() {
    var DataDecryptCommand$execute$1$decryptData$1 = Java.use('com.fenbi.android.leo.webapp.secure.commands.DataDecryptCommand$execute$1$decryptData$1');
    DataDecryptCommand$execute$1$decryptData$1['invokeSuspend'].implementation = function (obj) {
//        console.log("['invokeSuspend'] DataDecryptCommand$execute$1$decryptData$1.invokeSuspend is called: obj=" + obj);
        var result = this['invokeSuspend'](obj)
        send(result.toString())
        var data = recv('input', function(value) {
            // py这样写的script.post({'type': 'input', 'payload': result}), 这里显示Received: [object Object],所以这里要取value.payload
            console.log('[matchV2_byDataDecryptCommand] Data Replaced')
            result = Java.use('java.lang.String').$new(value.payload)
        })
//        console.log("['invokeSuspend'] DataDecryptCommand$execute$1$decryptData$1.invokeSuspend result=" + result)
        return result
    }
})