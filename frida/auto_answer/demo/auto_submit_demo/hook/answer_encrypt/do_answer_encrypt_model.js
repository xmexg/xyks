// 生成加密答案包
// 不可以, 正在重新写逆向加密脚本

Java.perform(function() {
    // Hook到Base64类
    var Base64 = Java.use('android.util.Base64');

    // Hook到加密类
    var R2Class = Java.use('com.fenbi.android.leo.utils.r2').$new();

    // 在解密的地方插入逻辑
    var answer_str = "flag_answer_str";  // 不要修改字符串flag_answer_str, 运行时替换为答案的json字符串

    // 使用java.lang.String类的getBytes()方法将字符串转换为字节数组
    var answer_byte = Java.cast(Java.use('java.lang.String').$new(answer_str).getBytes(), '[B');

    var decrypted = R2Class["b"](answer_byte);  // 调用加密方法

    // 将加密后的内容重新编码成Base64字符串
    var result = Base64.encodeToString(decrypted, 0);

    // 输出解密后的结果
    console.log("加密后的结果: " + result);
    send(result);
});


// 输出提交的数据
// 比 https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook 早hook了一层，确保hook到的数据应该都是待提交的答案
// 应注意可能有某个页面也被hook到了，可能有也肯能没有

//console.log("Script loaded successfully ");
//Java.perform(function() {
//    let DataEncryptCommand$execute$1$encryptData$1 = Java.use("com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1$encryptData$1");
//    DataEncryptCommand$execute$1$encryptData$1["invokeSuspend"].implementation = function (obj) {
//
//        // 复制粘贴 https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook 的
//        let r2 = Java.use("com.fenbi.android.leo.utils.r2");
//        r2["b"].implementation = function (data) {
//
//            var String= Java.use("java.lang.String");
//
//            let data_ori = data
//
//            data = Bytes2HexString(data)
//
//            send(data)
//
//            let new_data
//            let new_data_2
//            var instance
//            recv(function (received_json_object) {
//                new_data = received_json_object.my_data
//                instance = String.$new(new_data);
//                new_data_2 = instance.getBytes()
//
//            }).wait();
//
//            let result = this["b"](new_data_2);
//            return result;
//        }
//
//        function Bytes2HexString(arrBytes) {
//            var str = "";
//            for (var i = 0; i < arrBytes.length; i++) {
//                var tmp;
//                var num = arrBytes[i];
//                if (num < 0) {
//                    //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
//                    tmp = (255 + num + 1).toString(16);
//                } else {
//                    tmp = num.toString(16);
//                }
//                if (tmp.length == 1) {
//                    tmp = "0" + tmp;
//                }
//                str += tmp;
//            }
//            return str;
//        }
//
//        // 调用原始方法获取结果
//        var originalResult = this["invokeSuspend"](obj)
//        return originalResult
//    };
//});
//
