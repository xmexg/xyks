console.log("[do_matchV2_byDataDecryptCommand_model] script loaded successfully");

/**
 * 这里完全改了
 * android.util.Base64.encodeToString(com.fenbi.android.leo.utils.r2.f33340a.b(android.util.Base64.decode(原始加密试题的base64编码,0)),0)
 * 
 * python加载该文件, 并向该文件传递加密试题的base64编码, 该文件执行解密后返回字符串
 */
Java.perform(function() {
    // Hook到Base64类
    var Base64 = Java.use('android.util.Base64');
    
    // Hook到解密类
    var R2Class = Java.use('com.fenbi.android.leo.utils.r2').$new();

    // 在解密的地方插入逻辑
    var response_base64 = "flag_base64";  // 不要修改字符串flag_base64, 运行时替换为加密试题的base64编码
    var decoded = Base64.decode(response_base64, 0);  // 解码base64字符串

    var decrypted = R2Class["b"](decoded);  // 调用解密方法

    // 将解密后的内容重新编码成Base64字符串
    var result = Base64.encodeToString(decrypted, 0);

    // 输出解密后的结果
    console.log("解密后的结果: " + result);
    send(result);
});


