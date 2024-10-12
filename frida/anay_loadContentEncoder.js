/**
 * 来自 https://github.com/cr4n5/XiaoYuanKouSuan/issues/79
 * com.fenbi.android.leo.imgsearch.sdk.utils.e
 * jadx反编译
 *  package com.fenbi.android.leo.imgsearch.sdk.utils;
    public class e {
        static {
            System.loadLibrary("ContentEncoder");
        }
        public static native byte[] c(byte[] bArr);
    }
 */ 

Java.perform(function() {
    var e = Java.use("com.fenbi.android.leo.imgsearch.sdk.utils.e")
    e["c"].implementation = function (bArr) {
        console.log("e.c is called: bArr=" + bArr)
        var result = this["c"](bArr)
        console.log("e.c result=" + result)
        console.log("堆栈:", Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
        return result
    }
})