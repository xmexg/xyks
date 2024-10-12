// 使用python调用会有奇妙bug, 不要在python中调用这个脚本
Java.perform(function() {
    console.log("gan_sign script loaded successfully ")
    var e = Java.use("com.fenbi.android.leo.utils.e")
    var str = "flag_url"  // 要访问的网站链接
    var str2 = "wdi4n2t8edr"  // 固定参数
    var intParam = parseInt( Java.use("qh.a").f().h() / 1000 ) // 获取 int 参数
    
    // 调用方法并获取返回值
    var result = e.zcvsd1wr2t(str, str2, intParam)
    console.log("input: ", str, str2, intParam)
    send(result)
    console.log("output", result)
})