// 生成加密答案包

Java.perform(function() {
    var answer_base64 = "flag_answer_base64" // python中替换为答案的base64编码, 用python编码base64, 用安卓自己的Base64解成byte数组
    var Base64 = Java.use('android.util.Base64')
    var answer_encrypt_base64 = Base64.encodeToString(Java.use('com.fenbi.android.leo.utils.r2').$new().b(Base64.decode(answer_base64, 0)), 0)
    send(answer_encrypt_base64);
})
