/**
 * 优化于 https://github.com/cr4n5/XiaoYuanKouSuan/issues/79
 * 
 * com.fenbi.android.leo.webapp.secure.commands.DataDecryptCommand$execute$1$decryptData$1.invokeSuspend
 * 
 * jadx反编译
 *  package com.fenbi.android.leo.webapp.secure.commands;

 *  public final class DataDecryptCommand$execute$1$decryptData$1 extends SuspendLambda implements p<k0, kotlin.coroutines.c<? super String>, Object> {
        final DataDecryptBean $bean;
        int label;

        public DataDecryptCommand$execute$1$decryptData$1(DataDecryptBean dataDecryptBean, kotlin.coroutines.c<? super DataDecryptCommand$execute$1$decryptData$1> cVar) {
            super(2, cVar);
            this.$bean = dataDecryptBean;
        }

        @Override // kotlin.coroutines.jvm.internal.BaseContinuationImpl
        @NotNull
        public final kotlin.coroutines.c<y> create(@Nullable Object obj, @NotNull kotlin.coroutines.c<?> cVar) {
            return new DataDecryptCommand$execute$1$decryptData$1(this.$bean, cVar);
        }

        @Override // kotlin.coroutines.jvm.internal.BaseContinuationImpl
        @Nullable
        public final Object invokeSuspend(@NotNull Object obj) {
            kotlin.coroutines.intrinsics.b.f();
            if (this.label == 0) {
                n.b(obj);
                return Base64.encodeToString(r2.f33340a.a(Base64.decode(this.$bean.getBase64(), 0)), 0);
            }
            throw new IllegalStateException("call to 'resume' before 'invoke' with coroutine");
        }

        @Override // y30.p
        @Nullable
        public final Object invoke(@NotNull k0 k0Var, @Nullable kotlin.coroutines.c<? super String> cVar) {
            return ((DataDecryptCommand$execute$1$decryptData$1) create(k0Var, cVar)).invokeSuspend(y.f60440a);
        }
    }
 */

Java.perform(function() {
    var DataDecryptCommand$execute$1$decryptData$1 = Java.use('com.fenbi.android.leo.webapp.secure.commands.DataDecryptCommand$execute$1$decryptData$1');
    DataDecryptCommand$execute$1$decryptData$1['invokeSuspend'].implementation = function (obj) {
        console.log("['invokeSuspend'] DataDecryptCommand$execute$1$decryptData$1.invokeSuspend is called: obj=" + obj);
        var result = this['invokeSuspend'](obj)
        console.log("['invokeSuspend'] DataDecryptCommand$execute$1$decryptData$1.invokeSuspend result=" + result)
        return result;
    }

    DataDecryptCommand$execute$1$decryptData$1["$init"].implementation = function (dataDecryptBean, cVar) {
        console.log(`[init] DataDecryptCommand$execute$1$decryptData$1.$init is called: dataDecryptBean=${dataDecryptBean}, cVar=${cVar}`);
        this["$init"](dataDecryptBean, cVar);
    }
})

// 可能以后有用的代码
// Base64.encodeToString(r2.f33340a.a(Base64.decode(this.$bean.getBase64(), 0)), 0)
/**
 *  com.fenbi.android.leo.imgsearch.sdk.utils.e 就是下面这个
 *  public class e {
        static {
            System.loadLibrary("ContentEncoder");
        }

        public static native byte[] c(byte[] bArr);
    }
 */