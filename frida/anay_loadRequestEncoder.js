/*
 * https://github.com/xmexg/xyks/issues/9
 * 由 https://github.com/dfaofeng 提供的hook方向
 */

Java.perform(function() {

    // 测试(int) (qh.a.f().h() / 1000)执行结果
    var qhClass = Java.use("qh.a")
    var result = qhClass.f().h() / 1000
    var result_int = parseInt(result)
    console.log("[test] (qh.a.f().h() / 1000) = " + result)
    console.log("[test] (int)(qh.a.f().h() / 1000) = " + result_int)
    
    /**
     *  package com.fenbi.android.leo.utils;
     *  public class j3 {
     *      public String b(String str) {
                return e.zcvsd1wr2t(str, "wdi4n2t8edr", (int) (qh.a.f().h() / 1000));
            }
        }

     *  package com.fenbi.android.leo.utils;
        public class e {
            static {
                System.loadLibrary("RequestEncoder");
            }
            public static native String sdwioxccsd();
            public static native String zcvsd1wr2t(String str, String str2, int i11);
        }

     * 获取可加载RequestEncoder的目标类

     * 对于url, 格式要求如下:
            来自: https://square.github.io/okhttp/3.x/okhttp/okhttp3/HttpUrl.html   encodedPath()
            公共 字符串 编码路径（）
            返回此 URL 的完整路径，该路径经过编码后可用于 HTTP 资源解析。返回的路径将以 开头"/"。
            网址	encodedPath()
            http://host/	"/"
            http://host/a/b/c	"/a/b/c"
            http://host/a/b%20c/d	"/a/b%20c/d"
     */
    var e = Java.use("com.fenbi.android.leo.utils.e")
    var str = "url"  // 要访问的网站链接
    var str2 = "wdi4n2t8edr"  // 固定参数
    var intParam = parseInt( Java.use("qh.a").f().h() / 1000 ) // 获取 int 参数

    // 调用方法并获取返回值
    var result = e.zcvsd1wr2t(str, str2, intParam)
    console.log("input: ", str, str2, intParam)
    console.log("Result: " + result)
})
