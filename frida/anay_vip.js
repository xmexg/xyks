/***
 * 虚假的修改vip, 只能本地显示vip, 实际还是要花钱
 * 
 * 有些奇怪, 2024年10月15日18点前还能修改本地vip有效期到9999年12月31号, 2024年10月16日0点后反而修改不了了
 */

Java.perform(function() {

    // 尝试创建 UserVipInfoVO 对象
    /**
     * package com.fenbi.android.leo.business.user.vip;
 
     *  public finalclass UserVipInfoVO extends y00.a {
        private final long createTime;
        private final long endTime;
        private final boolean monthly;

        public UserVipInfoVO(long j11, long j12, boolean z11) {
            this.createTime = j11;
            this.endTime = j12;
            this.monthly = z11;
        }

     */

    // 没hook到
    let UserVipInfoVO = Java.use("com.fenbi.android.leo.business.user.vip.UserVipInfoVO");
    UserVipInfoVO["$init"].implementation = function (j11, j12, z11) {
        console.log(`UserVipInfoVO.$init is called: j11=${j11}, j12=${j12}, z11=${z11}`);
        this["$init"](j11, j12, z11);
    }

    /**
     *  package com.fenbi.android.leo.business.user.vip;

     *  public final class UserVipVO extends y00.a {
     *      public static final class Companion {
                public Companion() {
                }

                public Companion(DefaultConstructorMarker defaultConstructorMarker) {
                    this();
                }

                @NotNull
                public final UserVipVO a() {
                    return UserVipVO.NOT_VIP;
                }
            }

            public UserVipVO(@NotNull String avatarUrl, int i11, @NotNull String name, @Nullable UserVipInfoVO userVipInfoVO, boolean z11, boolean z12, @Nullable StudyGroupRightInfo studyGroupRightInfo) {
                y.g(avatarUrl, "avatarUrl");
                y.g(name, "name");
                this.avatarUrl = avatarUrl;
                this.grade = i11;
                this.name = name;
                this.userVIPInfo = userVipInfoVO;
                this.vipHistory = z11;
                this.vipSymbol = z12;
                this.studyGroupRightInfo = studyGroupRightInfo;
            }
        }

     */
    // 刚打开软件时能hook到， 所以要使用 frida -U -f com.fenbi.android.leo -l .\anay_vip.js 来启动软件
    let UserVipVO = Java.use("com.fenbi.android.leo.business.user.vip.UserVipVO");
    UserVipVO["$init"].implementation = function (avatarUrl, i11, name, userVipInfoVO, z11, z12, studyGroupRightInfo) {
        // console.log(`UserVipVO.$init is called: avatarUrl=${avatarUrl}, i11=${i11}, name=${name}, userVipInfoVO=${userVipInfoVO}, z11=${z11}, z12=${z12}, studyGroupRightInfo结束时间=${studyGroupRightInfo.getRightEndTime()}, studyGroupRightInfo状态=${studyGroupRightInfo.getRightStatus()}`);
        /**
         * avatarUrl 头像地址 https://leo-online.fbcontent.cn/leo-gallery/16a9fd0c54acf9c.png
         * i11 年级 1
         * name 昵称 猿宝96838
         * userVipInfoVO  
         * z11, false
         * z12, false
         * studyGroupRightInfo com.fenbi.android.leo.business.user.vip.StudyGroupRightInfo@0
         */ 
        console.log("设置vip有效期的堆栈：" + Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        let java_UserVipInfoVO = Java.use("com.fenbi.android.leo.business.user.vip.UserVipInfoVO");
        
        // 修改用户vip有效期是从2024年10月15日到9999年12月31日
        let make_userVipInfoVO = java_UserVipInfoVO.$new(1728994204000, 253402271999000, true);

        // 修改studyGroupRightInfo, 有效期也改成9999年12月31日, rightStatus不知道是什么,默认0改成1
        // 没找到内置的set方法, 重新new一个替换掉原有的
        // 传新studyGroupRightInfo后反而会导致本地修改vip到期时间失效
        // let new_studyGroupRightInfo_class = Java.use("com.fenbi.android.leo.business.user.vip.StudyGroupRightInfo")
        // let new_studyGroupRightInfo = new_studyGroupRightInfo_class.$new(253402271999000, 1)
        this["$init"](avatarUrl, i11, name, make_userVipInfoVO, true, true, studyGroupRightInfo);
    };
    // 没必要hook这里, 上面能修改更多信息, 这里的返回值也是调用的上面修改后的
    // 这里实际就是上面的z12
    // UserVipVO["getVipSymbol"].implementation = function () {
    //     console.log(`UserVipVO.getVipSymbol is called`);
    //     let result = this["getVipSymbol"]();
    //     console.log(`UserVipVO.getVipSymbol result=${result}`);
    //     console.log("设置vip true的堆栈: " + Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    //     return true;
    // };

    /**
     * 
     * 打印上面的堆栈
     * java.lang.Exception
        at com.fenbi.android.leo.business.user.vip.UserVipVO.<init>(Native Method)
        at com.fenbi.android.leo.business.user.vip.UserVipVOJsonAdapter.a(SourceFile:200)
        at com.fenbi.android.leo.business.user.vip.UserVipVOJsonAdapter.fromJson(SourceFile:1)
        at com.squareup.moshi.internal.NullSafeJsonAdapter.fromJson(SourceFile:16)
        at com.squareup.moshi.JsonAdapter.fromJson(SourceFile:3)
        at com.fenbi.android.leo.utils.v.b(SourceFile:11)
        at com.fenbi.android.leo.utils.v.a(SourceFile:15)
        at com.fenbi.android.leo.utils.v.getValue(SourceFile:3)
        at jy.a.k(SourceFile:8)
        at com.fenbi.android.leo.business.user.vip.UserVipManager.g(SourceFile:3)
        at com.fenbi.android.leo.logic.UserActiveStatusSyncHelper$createSyncJobAndStart$1.invokeSuspend(SourceFile:66)
        at com.fenbi.android.leo.logic.UserActiveStatusSyncHelper$createSyncJobAndStart$1.invoke(SourceFile:2)
        at com.fenbi.android.leo.logic.UserActiveStatusSyncHelper$createSyncJobAndStart$1.invoke(SourceFile:1)
        at com.fenbi.android.leo.coroutine.LaunchKt$launchCatching$safeBlock$1.invokeSuspend(SourceFile:37)
        at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(SourceFile:12)
        at kotlinx.coroutines.u0.run(SourceFile:129)
        at kotlinx.coroutines.scheduling.CoroutineScheduler.P(SourceFile:1)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$c.d(SourceFile:15)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$c.p(SourceFile:29)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$c.run(SourceFile:1)

        查看：
        package com.fenbi.android.leo.business.user.vip;
        public final class UserVipManager {
            public final UserVipVO g() {
                return jy.a.f57574a.k();
            }

     * 
     */
            // 调用太频繁了, 一直刷屏
    // let UserVipManager = Java.use("com.fenbi.android.leo.business.user.vip.UserVipManager");
    // UserVipManager["g"].implementation = function () {
    //     console.log(`UserVipManager.g is called`);
    //     let result = this["g"]();
    //     console.log(`UserVipManager.g result=${result}`);
    //     return result;
    // };

    /**
     * 
     * 看看jy.a.k
     *  public final UserVipVO k() {
            return (UserVipVO) currentUserVip.getValue(this, f57575b[3]);
        }
        调用太频繁了, 一直刷屏
     */
    // let a = Java.use("jy.a");
    // a["k"].implementation = function () {
    //     console.log(`a.k is called`);
    //     let result = this["k"]();
    //     console.log(`a.k result=${result}`);
    //     return result;
    // };


    /**
     * 拦截vip有效性检查, 返回true和false好像都一样
     */
    // UserVipVO["isValid"].implementation = function () {
    //     console.log(`UserVipVO.isValid is called`);
    //     let result = this["isValid"]();
    //     console.log(`UserVipVO.isValid 原始 result=${result}`);
    //     console.log("堆栈：" + Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    //     return result;
    // };
})