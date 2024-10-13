// 输出提交的数据
// 比 https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook 早hook了一层，确保hook到的数据是待提交的答案
console.log("Script loaded successfully ");
Java.perform(function() {

    let DataEncryptCommand$execute$1$encryptData$1 = Java.use("com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1$encryptData$1");
    DataEncryptCommand$execute$1$encryptData$1["invokeSuspend"].implementation = function (obj) {

        // 调用原始方法获取结果
        var originalResult = this['invokeSuspend'](obj);

        console.log("['invokeSuspend'] Modified result: " + originalResult);
        console.log("堆栈:", Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));

        // 确保返回类型兼容
        return Java.cast(modifiedResult, Java.use('java.lang.Object'));
    };
});

