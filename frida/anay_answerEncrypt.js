// 可以放心只有提交答案时才会调用该类
// 好吧不是加密，只是gzip压缩了一下

Java.perform(function() {

    let DataEncryptCommand$execute$1 = Java.use("com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1");
    DataEncryptCommand$execute$1["$init"].implementation = function (dataEncryptBean, pVar, cVar) {
        console.log("发现调用加密方法")
        console.log(`DataEncryptCommand$execute$1.$init is called: dataEncryptBea.getBase64=${dataEncryptBean.getBase64()}, pVar=${pVar}, cVar=${cVar}`);
        console.log("堆栈: \n" + Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new())); 
        this["$init"](dataEncryptBean, pVar, cVar);
    }


    let DataEncryptCommand$execute$1$encryptData$1 = Java.use("com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1$encryptData$1");
    DataEncryptCommand$execute$1$encryptData$1["invokeSuspend"].implementation = function (obj) {
        console.log("发现加密")
        console.log(`DataEncryptCommand$execute$1$encryptData$1.invokeSuspend is called: obj=${obj}`);
        let result = this["invokeSuspend"](obj);
        console.log(`DataEncryptCommand$execute$1$encryptData$1.invokeSuspend result=${result}`);
        return result;
    }
})