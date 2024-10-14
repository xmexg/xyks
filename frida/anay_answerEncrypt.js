// 可以放心只有提交答案时才会调用该类
/**
 * 提交答案数据包加密
 * 
 * 执行一下 hook_JsBridgeBean_sign.js 文件， 查看带dataEncrypt的堆栈
 * com.fenbi.android.leo.webapp.secure.commands.EncryptResult@22959bb
    [+] HOOK JsBridgeBean$a:
    参数1 aVar: [object Object]
    参数2 str (回调方法): dataEncrypt_1728894319246_20
    参数3 str2 (URL带sign): W251bGwseyJyZXN1bHQiOiJ5N0twdHluZ3BHdWdHby82RnE1NWQ0Y3o2UjBaZVVrZGtUYkNYOE1IVzl5Y1pVbDg3UCtQdi9lbjhMbWVReE9TSEpNb1M0VkxDbmpsXG56dkoycWFJS0Q0cDFrTXFOeDFCaGpSc09zOE5MdExlUkN5MkMwc1U5NzRVZno2dDFXc2gyZm1sR0pvQzFvU2lTYXBNaFd5OWVzQWx1XG4yQTBQYmk0SkFIeC82TXpDNTFqZTQwRnBKdWRJYU85Y0x6UDBKZTVBeTZpY2ZtYkpzTG1aWGZhblJCbENQUGtpZlpHVVA3YlZReUoxXG5yVGpMNG5MWlJmUFd5YmlaTGhwd3ZnYkYzUkQ4TnJvT0VPRXdIRUxDdUNEMGl4VDQwQ0ZIcDRhRUdFdWpvWWFhMHd5clh1TmN1VklIXG4vcHUraTZ3Tk5kbm9mbFBaNDJjMkY3ckZYNEhvdHRSQUIxNjVuUWl3ZDA1UjlPVkovZzN1RWh2OXYvdEdEM0lXa0NLdG9RTTl2OFpNXG5ubzRUQXAzSHprZnRoZGVsaUQ0TVMzdm41UzRvSkNoQ2VZWWJEZXpnL1dnYnNseXNLMEZLYWJ0RG44d1hHamcyeGZIMUI4dTVpTzB1XG5pcnF0Qm1sZkJqUXI1WEZyN1k3eWdHM1FCT0ZnU21ycEQ5WTBtMENCWUJUVlY4VXJMU1VLNkZ1aTNZNHVhQUxHUFdtQi95NU1wdzQzXG5lb3Y2N0ZPS0ZrM0h0UkNaVEM3YVU1a2xTL0hvaWxla2ljdUUxM1JrK3NTNUtHQTJTUGdwRi8zTktMd1R3eEkxN0V1L0RtMlVCR1pKXG5nbGdHa3NOTWQ5MEVhdm1oRXVxMXY4eWNYM0pvb2U0SGJNcFFhZGRFTEswbHJvaWw4ZGRLTFZrSVFqY3VHV1FZdWJWampEVVBHZTAyXG5JRkVFbWNzWnpJRm8zcTV0bGExY1UvVVZkb2I4UUJwNkg1VThqUG1aUDdJVGVzUS9SbEl4WVlaSnlsSlBZYWlLY0E4SGdUbG9TMDcrXG5OcDRrcHdtUzg5SnBtSFN4bFhhZ2dzbTcydE84VFZaSm9uSXV1SVNKVFI4eGxHZzcrcTZKL2g2dnZ1czZxSjF1OEF1YkJDRzBrVnltXG5hajd5QkM1Q21GMEYrUXh0TnVwb2YxSWx5YjkxaGt0ZC9nY01tZkcvMFA4Y0ZCK09ZUHA0RzE4SUxpT3E4c3RkWG15UkNSK0RsbnZZXG5IbCtKTW1jdDVKMmpCY3VDZFBXREE4Z2MxMnBjQXMyQXVsdTIrS1VhSjd5M3dYTWFSVjl4Y29uY3RGQzRiMVpaQnZ4WDVicThlY0FaXG50WGhEWFhqbnlIQ3FJTm5LZDN1VWxBMTJGWHZLeDRhUGRPYS84UkprVFJCMmJ4WUxxUE9UT29CSTZCTCtqbHpqbFlRanJ6aUk5dmNXXG45UnFUcWJseWdqZDBZOWVnUXpqaUxWbnQ3S2cwUEExU3BaZWhtUXcvQVVud2VpclJMN2dFTUlUcVVqbk4zOEVyajNneUVEcTBPcEJUXG5GNWJGTXZOTzZDQ0hBNnB4Q1NmYlJxd0NNUVk0UHRIOHZlNVlUM3J6QWFKanhsK1VveTJWUE1YV1VHV0tPc0FHQWpxVUdpRUNIM1UvXG5FVVdRNTVKY25sMU9penBpQ1NXYlBTRjl4bkU5SVZkVk40TG1PMUxTS2lLTDBHelhkOHNGQUxGSnpPYm1vUEQ0cEVKU3AwZWtPaTBFXG5DcE80TGhmSXNodklyK084STUzZ1cwYjZZS1JGdmxld1Z2ZC9aekkzTmVnakRyb2JzUjZOTEwxODd6OXhrZlRla0pnc00wVGNSZEQ2XG5ndFRnUHBLRjRMWGR0d1M1Rmdkb2Nsc1BxOG5wWVdOZ3p0ekx1MFRhN1UrbGZac1RCSGkxSnA4SW9ZUU9qRU1GSENNWTJZTjIrbFM5XG4xbUwvVWRmc084KzkzSWxJY2l1amVwNVVUTjlISDU0UzRBdnR0dTZNenRZdUVLOGRnWW8zR3A3QW9uOGlTWlpnK2o4RmhIbEp0QmljXG51Yk1oWTdhMVJ4SmRGOVpnbXBLQ1JNaDNpSEdCeEEzZC9qZDNsWXp0RUFSMUM1VnBpdG1ObUVkZmp3TU04RGxEdUpqNGZoYXhsWkFPXG5kYjZ2S1NFZHc2dU5MVk13UzBJZU92M0VDNkVFUEQ3b1FRMUhsMzJyMW9XWVo0Nm8vT2JjRnZaVit4VHR2SkZhRVRCcERyZkoycjBXXG5yUEFLU2xnTjN0TGlwaUpxRGRQbnlLcGp5WUVhaGxMdEdpazBqblZmWktjT01qLzhGNlArUERWRzFYSUhSS29WQVlVNkJhUytIZDd0XG5tZUxyWndUamRRbGsrVkpUOFZTWWx5bHlEaGhNRko1YWVDN3F0WkI2V2RXNE1YNWlVSVY3VjVZOWlBOElmdHZwWWZwL2xXc0NHdXA2XG51UmU0ZTBBbXRwTjk0RkhaTmRuWGhQUStLaGpFR3N5d1FOZFp2TDFONjZPR05udlpEOGpmQk9mTjhwaEdoNGlLb0g1UXlFSjI1KzRTXG5RWkIvd2VpbWhvNm9RTXBtcUhuT00vUER1V0p0aDJ4WmdYZFhlVk5FRndNV29JRkQvZ2hud2t6cGxqSk9QNkI3Smg4SWdoNXAyTm1KXG5jeS9WVVhSMlNidmtLSEhxRS93QzhBc1I0Q2VUTndPcHR2M3Z4Z0NQOHFBdERVWTNqSnhwQ2JTdkRDQjVYb1NCQVM4bHBvQ3pzWUMyXG5sWlhYMk1CYVUyV1UzQ25oTkhqMTZoVHo0TG5UWlEwMDBjV3ROcSttOUlldGR6ZnhvUHl1WWxuS05jZEVsSjJHSTdGb1hQdmY1cC9UXG5uU0RnUndPWUM3RGdJaVlZNEJISUl2WUJETHZDenpKeXNvNjZjT2d2c29lYnhLbENQZ0Q4dm9weHV0eENvV2hNdUhVa3ZLNjZ3T3BDXG5GK0VNK2dDWm91RERxeDQyTWFDYTJYVzl5OFZ6WkRQL21CSU9HT1RxVEZraUdLSWNkU0V0ZTV4RGlST1FiOFVTR3RVT2NPTDdzTi94XG5DR2JZL21IUjF0Ri9lOWNGdzdVcEQ4ZDY4cjV3RGlHUHpJa3BURXFRS250enZ4RVNZb1F0OStkdmRSLzdQOVdCUUlTV1BHblBHeUpOXG51N0RtK3llUHFkeW4rcnZoc0w0Zk9UMm14dlRlV0xrcGx1SnlaR2RjM3Q1UWtXcDN0MHZrcjZudEp0RHdTb2U1dmUxb1RKYkdaNmt6XG5FdmVXTlJlb0F4V2daZ29uOWpXSXlpNTdrMlc2R3MxeDZ3bHQvQmFnRVBTeldUd0tFNDkrZ3MvZG9ZaSsyd3ArZXBzN3NldTJwY0JtXG5QL2tvR1R6UnJZallxd3ZHTGNtSlZlNXdoUXVobmFXZ3hLbkxWTjFBQyt3emJmTlczcVNvQXA1T2d3ZVBHajloVGZpN0VhM1ZLYjlQXG5wa05SRE0wVVpUeEVOWjQrb3RQZGZyYWdUcmN0UlhSTVZacTRNOWp1aXlTaFB4eXZrN2VTQldYY1pFMVZrZElPd1JxakhUZnBEbW9pXG5WR3NjUllua1Q1U2p1RVJvbEplUzlDNmhoK0lYMkNDY2p3ZTM3UlpDRzlUbmM2Y0ptL1pTR2NJNTRCN3UrZ1NvU2FyRWFaYjNxZ1BPXG5TaDZldHVsOVBhbWIwdmJGaEZ6QnhHWGlQazhhNmdLUkRTRXZUYmozdm51WVFlbm82YWFUa0k4QXg5QmQ4TFFmcGZxczZXY2FxNmlyXG53bGRNZFJBNldUZ3hnUENiYWhXSDBSeFEwdFpnYS83bWcwZjd1elZ3QVczeU1rclBvK1JZSEJUOUlValVDa1BtclFacGJsd1VjWXFHXG5oKzRxNW5jZWFjNFhpZnRiOGRqYUZ4cTdmeGVNQWNBWlQ0cDNYYzNjNENZVUVTTjhKc2Q5emNkZEhWeTZrNE85RDdzNVZOeW9XWXNKXG5sR1pYWE95b0Evcm83M29PM3l6M0ovaEhwc0FudDRCdE1zNXFpVk83amt3UUhpTFYxQTNEeHJWN29GUElMMXB6aVVBRHpNYXZoeWlOXG5hU09VN1h4OHB1b3Q5ejVsY0xSbThrblZocXlYanEvQVE1YTNZY1poTVZ0SjJ0SWZpbVpTT2VwbFBkMTA3S3dRM09QSTFLNS9GRVc3XG5kNThwYmVFaG12WU0vcVhEbll2cllrVnNtbllnRVN3RGJyWU1OaVhzZGNDclNaUG5wVnR2Mjh0aXFaczVtVlhxNVEyQWlENWFoVkFPXG5VdS9xL0xtNiszV3NGaHNaT0tiYThnSDlSV29KWnh1TFl4QmpDaUpYKzZvampBL1h4QTRyVnhyYjJlT2lCQ1dGc0hLa0l5QTZXdGtEXG5hbW1FWEorS3ozYjZmTmNZcTlmZ1M4b1hGUzdBTGVQVDFvWUxrVXBsVmJ6a2NNOEVwVFljdERjMW5nN3o3NCt2NXRyUjNFWm9wN2d5XG5xR1FpRjNpZjlwbW10WVNHTXJQR1BpeUNsVHRjRUhXeWVoU3RxVzY0dmpLS2lzSmljb2p2ZkxqOUV2QUEyRkNpZW9wbFZUekM4cHY5XG51RDhvVEdzVHF1QnBMeWRxT01NcXgrR0gvWDVNOUt5VmRKcWsxNHoxXG4ifV0=
    解参数3 base64:  [null,{"result":"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\n"}]
    打印调用链  java.lang.Exception
            at com.yuanfudao.android.common.webview.base.JsBridgeBean$a.<init>(Native Method)
            at com.yuanfudao.android.common.webview.base.JsBridgeBean.trigger(SourceFile:7)
            at com.yuanfudao.android.common.webview.base.JsBridgeBean.trigger(Native Method)
            at com.yuanfudao.android.common.webview.base.JsBridgeBean.trigger(SourceFile:1)
            at gg.a.c(SourceFile:18)
            at com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1.invokeSuspend(SourceFile:75)
            at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(SourceFile:12)
            at kotlinx.coroutines.u0.run(SourceFile:129)
            at android.os.Handler.handleCallback(Handler.java:938)
            at android.os.Handler.dispatchMessage(Handler.java:99)
            at android.os.Looper.loopOnce(Looper.java:201)
            at android.os.Looper.loop(Looper.java:288)
            at android.app.ActivityThread.main(ActivityThread.java:8060)
            at java.lang.reflect.Method.invoke(Native Method)
            at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
            at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)

    jadx 看 com.fenbi.android.leo.webapp.secure.commands.DataEncryptCommand$execute$1.invokeSuspend
    发现关键代码：
    DataEncryptCommand$execute$1$encryptData$1 dataEncryptCommand$execute$1$encryptData$1 = new DataEncryptCommand$execute$1$encryptData$1(this.$bean, null);
    其中this.$bean.getBase64()就是base64编码后的提交答案包


    jadx看 DataEncryptCommand$execute$1$encryptData$1
    public final Object invokeSuspend(@NotNull Object obj) {
        kotlin.coroutines.intrinsics.b.f();
        if (this.label == 0) {
            n.b(obj);
            return Base64.encodeToString(r2.f33340a.b(Base64.decode(this.$bean.getBase64(), 0)), 0);
            // this.$bean.getBase64(): 答案包的base64编码
            // r2.f33340a.b(): 加密方法, 关键
            // Base64.encodeToString(): 将字节数组编码为Base64字符串
        }
        throw new IllegalStateException("call to 'resume' before 'invoke' with coroutine");
    }

    r2.f33340a.b(): 加密方法
    jadx 看com.fenbi.android.leo.utils.r2.b
    关键代码：
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        GZIPOutputStream gZIPOutputStream = new GZIPOutputStream(byteArrayOutputStream);
        gZIPOutputStream.write(data);
        gZIPOutputStream.close();
        return c(byteArrayOutputStream.toByteArray());
        // 简单来说是把答案明文进行gzip压缩后再传给c加密

    
    对于c: 
    public final byte[] c(byte[] data) {
        return com.fenbi.android.leo.imgsearch.sdk.utils.e.c(data);
        // data是gzip压缩后的答案明文
    }

    查看com.fenbi.android.leo.imgsearch.sdk.utils.e.c:
    package com.fenbi.android.leo.imgsearch.sdk.utils;
    public class e {
        static {
            System.loadLibrary("ContentEncoder");
        }
        public static native byte[] c(byte[] bArr);
    }

    这下简单了, 只要hook com.fenbi.android.leo.imgsearch.sdk.utils.e.c, 把答案明文进行gzip传过去就可以了

 * 
 */

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