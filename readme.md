# 小猿口算
未完成的逆向笔记  
vue逆向笔记 [frida/readme.md](frida/readme.md)  
sign逆向笔记 [frida/sign_decrypt.md](frida/sign_decrypt.md)

# 目录说明
|||
|--|--|
|dexdump|使用frida-dexdump导出的dex|
|frida|用到的一些脚本和逆向笔记|
|har|在虚拟机抓到的包|
|java_test|一点java测试|

# 如何复现

## webview复现
+ windows:  
    安装mumu模拟器，根据mumu官方教程，依次安装magisk，lsposed，算法助手。  

    安装小猿口算app，在算法助手里设置小猿口算app允许webview远程调试。  

    打开chrome或edge浏览器，分别打开chrome://inspect或者edge://inspect  

    打开小猿口算app，打开口算pk，回到浏览器的inspect页面，等待显示出pk链接调试按钮，点击调试。  

    开发者工具的网络页面选择保留日志。然后左上角刷新页面以确保获取到完整数据。每打开一个页面回到inspect页面等待获取到新的调试链接，在新的调试页面刷新页面。  
    [查看视频](./video/webview.mp4)

## frida复现
+ windows:  
    安装mumu模拟器, 根据mumu官方教程, 开启root  

    去[frida仓库](https://github.com/frida/frida/releases)下载`frida-server-版本号-android-x86_64.xz`并解压  

    把解压后的frida-server推送到模拟器任意目录,比如通过`adb push`推送到`/data/local`目录下  

    连接到模拟器终端使用root启动frida-server,比如`adb shell, su, /data/local/frida-server-文件名`  

    电脑安装frida和frida-tools
    ```
    pip install frida-tools
    pip install frida
    ```

    电脑命令行向小猿口算注入xx脚本`frida -U -n 小猿口算 -l .\hook_JsBridgeBean_sign.js`


# 进度
## [关于试题加密](https://github.com/xmexg/xyks/issues/9)
使用[frida/matchV2](/frida/matchV2)目录下的py脚本或ts脚本，他们可以拿到试题和答案
[do_matchV2.py](frida/matchV2/do_matchV2.py)文件输出如下： 
```
Script loaded successfully 
[JS] Received Base64: W251bGwseyJyZXN1bHQiOiJleUp3YTBsa1UzUnlJam9pTmpBNU5EWTVOalF6T1RReE5UYzJOelUwSWl3aWIzUm9aWEpWYzJWeUlqcDdJblZ6WlhKSlpDSTZPREF4XG5OVFV6TkRVMkxDSjFjMlZ5VG1GdFpTSTZJdWVNditXdW5UVXpORFUySWl3aVlYWmhkR0Z5VlhKc0lqb2lhSFIwY0hNNkx5OXNaVzh0XG5iMjVzYVc1bExtWmlZMjl1ZEdWdWRDNWpiaTlzWlc4dFoyRnNiR1Z5ZVM4eE5tRTVabVF3TVROaFpUUmhOamN1Y0c1bklpd2lkWE5sXG5jbEJsYm1SaGJuUlZjbXdpT201MWJHeDlMQ0p2ZEdobGNsZHBia052ZFc1MElqb3dMQ0p6Wld4bVYybHVRMjkxYm5RaU9qRXpMQ0owXG5ZWEpuWlhSRGIzTjBWR2x0WlNJNk5UQXdNREFzSW1WNFlXMVdUeUk2ZXlKd2EwbGtVM1J5SWpvaU5qQTVORFk1TmpRek9UUXhOVGMyXG5OelUwSWl3aWNHOXBiblJKWkNJNk1pd2ljRzlwYm5ST1lXMWxJam9pTWpEa3U2WGxob1htbGJEbm1vVG1yNVRscEtmbHNJOGlMQ0p5XG5kV3hsVkhsd1pTSTZNQ3dpY1hWbGMzUnBiMjVEYm5RaU9qRXdMQ0pqYjNKeVpXTjBRMjUwSWpvd0xDSmpiM04wVkdsdFpTSTZNQ3dpXG5jWFZsYzNScGIyNXpJanBiZXlKcFpDSTZNQ3dpWlhoaGJVbGtJam8yTURrME5qazJORE01TkRFMU56WTNOVFFzSW1OdmJuUmxiblFpXG5PaUl4TWx4Y1kybHlZMnhsT0NJc0ltRnVjM2RsY2lJNklqNGlMQ0oxYzJWeVFXNXpkMlZ5SWpwdWRXeHNMQ0poYm5OM1pYSnpJanBiXG5JajRpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55YVhCMElqcHVkV3hzTENKeWRXeGxWSGx3XG5aU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam94TENKbGVHRnRTV1FpT2pZd09UUTJPVFkwTXprME1UVTNOamMxTkN3aVkyOXVkR1Z1XG5kQ0k2SWpSY1hHTnBjbU5zWlRFMklpd2lZVzV6ZDJWeUlqb2lQQ0lzSW5WelpYSkJibk4zWlhJaU9tNTFiR3dzSW1GdWMzZGxjbk1pXG5PbHNpUENKZExDSnpkR0YwZFhNaU9qQXNJbk5qY21sd2RDSTZiblZzYkN3aWQzSnZibWRUWTNKcGNIUWlPbTUxYkd3c0luSjFiR1ZVXG5lWEJsSWpvaVEwOU5VRUZTUlNKOUxIc2lhV1FpT2pJc0ltVjRZVzFKWkNJNk5qQTVORFk1TmpRek9UUXhOVGMyTnpVMExDSmpiMjUwXG5aVzUwSWpvaU1URmNYR05wY21Oc1pUY2lMQ0poYm5OM1pYSWlPaUkrSWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzYkN3aVlXNXpkMlZ5XG5jeUk2V3lJK0lsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2Ym5Wc2JDd2ljblZzXG5aVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk15d2laWGhoYlVsa0lqbzJNRGswTmprMk5ETTVOREUxTnpZM05UUXNJbU52XG5iblJsYm5RaU9pSTBYRnhqYVhKamJHVTFJaXdpWVc1emQyVnlJam9pUENJc0luVnpaWEpCYm5OM1pYSWlPbTUxYkd3c0ltRnVjM2RsXG5jbk1pT2xzaVBDSmRMQ0p6ZEdGMGRYTWlPakFzSW5OamNtbHdkQ0k2Ym5Wc2JDd2lkM0p2Ym1kVFkzSnBjSFFpT201MWJHd3NJbkoxXG5iR1ZVZVhCbElqb2lRMDlOVUVGU1JTSjlMSHNpYVdRaU9qUXNJbVY0WVcxSlpDSTZOakE1TkRZNU5qUXpPVFF4TlRjMk56VTBMQ0pqXG5iMjUwWlc1MElqb2lNVFpjWEdOcGNtTnNaVEV4SWl3aVlXNXpkMlZ5SWpvaVBpSXNJblZ6WlhKQmJuTjNaWElpT201MWJHd3NJbUZ1XG5jM2RsY25NaU9sc2lQaUpkTENKemRHRjBkWE1pT2pBc0luTmpjbWx3ZENJNmJuVnNiQ3dpZDNKdmJtZFRZM0pwY0hRaU9tNTFiR3dzXG5JbkoxYkdWVWVYQmxJam9pUTA5TlVFRlNSU0o5TEhzaWFXUWlPalVzSW1WNFlXMUpaQ0k2TmpBNU5EWTVOalF6T1RReE5UYzJOelUwXG5MQ0pqYjI1MFpXNTBJam9pT0Z4Y1kybHlZMnhsTmlJc0ltRnVjM2RsY2lJNklqNGlMQ0oxYzJWeVFXNXpkMlZ5SWpwdWRXeHNMQ0poXG5ibk4zWlhKeklqcGJJajRpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55YVhCMElqcHVkV3hzXG5MQ0p5ZFd4bFZIbHdaU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam8yTENKbGVHRnRTV1FpT2pZd09UUTJPVFkwTXprME1UVTNOamMxXG5OQ3dpWTI5dWRHVnVkQ0k2SWpFeFhGeGphWEpqYkdVeE1DSXNJbUZ1YzNkbGNpSTZJajRpTENKMWMyVnlRVzV6ZDJWeUlqcHVkV3hzXG5MQ0poYm5OM1pYSnpJanBiSWo0aVhTd2ljM1JoZEhWeklqb3dMQ0p6WTNKcGNIUWlPbTUxYkd3c0luZHliMjVuVTJOeWFYQjBJanB1XG5kV3hzTENKeWRXeGxWSGx3WlNJNklrTlBUVkJCVWtVaWZTeDdJbWxrSWpvM0xDSmxlR0Z0U1dRaU9qWXdPVFEyT1RZME16azBNVFUzXG5OamMxTkN3aVkyOXVkR1Z1ZENJNklqRXpYRnhqYVhKamJHVTFJaXdpWVc1emQyVnlJam9pUGlJc0luVnpaWEpCYm5OM1pYSWlPbTUxXG5iR3dzSW1GdWMzZGxjbk1pT2xzaVBpSmRMQ0p6ZEdGMGRYTWlPakFzSW5OamNtbHdkQ0k2Ym5Wc2JDd2lkM0p2Ym1kVFkzSnBjSFFpXG5PbTUxYkd3c0luSjFiR1ZVZVhCbElqb2lRMDlOVUVGU1JTSjlMSHNpYVdRaU9qZ3NJbVY0WVcxSlpDSTZOakE1TkRZNU5qUXpPVFF4XG5OVGMyTnpVMExDSmpiMjUwWlc1MElqb2lOVnhjWTJseVkyeGxOQ0lzSW1GdWMzZGxjaUk2SWo0aUxDSjFjMlZ5UVc1emQyVnlJanB1XG5kV3hzTENKaGJuTjNaWEp6SWpwYklqNGlYU3dpYzNSaGRIVnpJam93TENKelkzSnBjSFFpT201MWJHd3NJbmR5YjI1blUyTnlhWEIwXG5JanB1ZFd4c0xDSnlkV3hsVkhsd1pTSTZJa05QVFZCQlVrVWlmU3g3SW1sa0lqbzVMQ0psZUdGdFNXUWlPall3T1RRMk9UWTBNemswXG5NVFUzTmpjMU5Dd2lZMjl1ZEdWdWRDSTZJak5jWEdOcGNtTnNaVEV5SWl3aVlXNXpkMlZ5SWpvaVBDSXNJblZ6WlhKQmJuTjNaWElpXG5PbTUxYkd3c0ltRnVjM2RsY25NaU9sc2lQQ0pkTENKemRHRjBkWE1pT2pBc0luTmpjbWx3ZENJNmJuVnNiQ3dpZDNKdmJtZFRZM0pwXG5jSFFpT201MWJHd3NJbkoxYkdWVWVYQmxJam9pUTA5TlVFRlNSU0o5WFN3aWRYQmtZWFJsWkZScGJXVWlPakI5ZlFcdTAwM2RcdTAwM2RcbiJ9XQ==
{"pkIdStr":"609469643941576754","otherUser":{"userId":801553456,"userName":"猿宝53456","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd013ae4a67.png","userPendantUrl":null},"otherWinCount":0,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469643941576754","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":10,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469643941576754,"content":"12\\circle8","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469643941576754,"content":"4\\circle16","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":2,"examId":609469643941576754,"content":"11\\circle7","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":3,"examId":609469643941576754,"content":"4\\circle5","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":4,"examId":609469643941576754,"content":"16\\circle11","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":5,"examId":609469643941576754,"content":"8\\circle6","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":6,"examId":609469643941576754,"content":"11\\circle10","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":7,"examId":609469643941576754,"content":"13\\circle5","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":8,"examId":609469643941576754,"content":"5\\circle4","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":9,"examId":609469643941576754,"content":"3\\circle12","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}
[JS] Received Base64: W251bGwseyJyZXN1bHQiOiJleUp3YTBsa1UzUnlJam9pTmpBNU5EWTVOekUzTnpBMk5UVTFORGN5SWl3aWIzUm9aWEpWYzJWeUlqcDdJblZ6WlhKSlpDSTZPRGsyXG5Nak0wTkRBc0luVnpaWEpPWVcxbElqb2k1NHkvNWE2ZE1qTTBOREFpTENKaGRtRjBZWEpWY213aU9pSm9kSFJ3Y3pvdkwyeGxieTF2XG5ibXhwYm1VdVptSmpiMjUwWlc1MExtTnVMMnhsYnkxbllXeHNaWEo1THpFMllUbG1aREl4TTJJeVkyVTNaaTV3Ym1jaUxDSjFjMlZ5XG5VR1Z1WkdGdWRGVnliQ0k2Ym5Wc2JIMHNJbTkwYUdWeVYybHVRMjkxYm5RaU9qQXNJbk5sYkdaWGFXNURiM1Z1ZENJNk1UTXNJblJoXG5jbWRsZEVOdmMzUlVhVzFsSWpvMU1EQXdNQ3dpWlhoaGJWWlBJanA3SW5CclNXUlRkSElpT2lJMk1EazBOamszTVRjM01EWTFOVFUwXG5OeklpTENKd2IybHVkRWxrSWpveUxDSndiMmx1ZEU1aGJXVWlPaUl5TU9TN3BlV0doZWFWc09lYWhPYXZsT1drcCtXd2p5SXNJbkoxXG5iR1ZVZVhCbElqb3dMQ0p4ZFdWemRHbHZia051ZENJNk1UQXNJbU52Y25KbFkzUkRiblFpT2pBc0ltTnZjM1JVYVcxbElqb3dMQ0p4XG5kV1Z6ZEdsdmJuTWlPbHQ3SW1sa0lqb3dMQ0psZUdGdFNXUWlPall3T1RRMk9UY3hOemN3TmpVMU5UUTNNaXdpWTI5dWRHVnVkQ0k2XG5JakV4WEZ4amFYSmpiR1V5TUNJc0ltRnVjM2RsY2lJNklqd2lMQ0oxYzJWeVFXNXpkMlZ5SWpwdWRXeHNMQ0poYm5OM1pYSnpJanBiXG5JandpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55YVhCMElqcHVkV3hzTENKeWRXeGxWSGx3XG5aU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam94TENKbGVHRnRTV1FpT2pZd09UUTJPVGN4Tnpjd05qVTFOVFEzTWl3aVkyOXVkR1Z1XG5kQ0k2SWpSY1hHTnBjbU5zWlRFMElpd2lZVzV6ZDJWeUlqb2lQQ0lzSW5WelpYSkJibk4zWlhJaU9tNTFiR3dzSW1GdWMzZGxjbk1pXG5PbHNpUENKZExDSnpkR0YwZFhNaU9qQXNJbk5qY21sd2RDSTZiblZzYkN3aWQzSnZibWRUWTNKcGNIUWlPbTUxYkd3c0luSjFiR1ZVXG5lWEJsSWpvaVEwOU5VRUZTUlNKOUxIc2lhV1FpT2pJc0ltVjRZVzFKWkNJNk5qQTVORFk1TnpFM056QTJOVFUxTkRjeUxDSmpiMjUwXG5aVzUwSWpvaU4xeGNZMmx5WTJ4bE1URWlMQ0poYm5OM1pYSWlPaUk4SWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzYkN3aVlXNXpkMlZ5XG5jeUk2V3lJOElsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2Ym5Wc2JDd2ljblZzXG5aVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk15d2laWGhoYlVsa0lqbzJNRGswTmprM01UYzNNRFkxTlRVME56SXNJbU52XG5iblJsYm5RaU9pSXhOVnhjWTJseVkyeGxPU0lzSW1GdWMzZGxjaUk2SWo0aUxDSjFjMlZ5UVc1emQyVnlJanB1ZFd4c0xDSmhibk4zXG5aWEp6SWpwYklqNGlYU3dpYzNSaGRIVnpJam93TENKelkzSnBjSFFpT201MWJHd3NJbmR5YjI1blUyTnlhWEIwSWpwdWRXeHNMQ0p5XG5kV3hsVkhsd1pTSTZJa05QVFZCQlVrVWlmU3g3SW1sa0lqbzBMQ0psZUdGdFNXUWlPall3T1RRMk9UY3hOemN3TmpVMU5UUTNNaXdpXG5ZMjl1ZEdWdWRDSTZJamRjWEdOcGNtTnNaVEUxSWl3aVlXNXpkMlZ5SWpvaVBDSXNJblZ6WlhKQmJuTjNaWElpT201MWJHd3NJbUZ1XG5jM2RsY25NaU9sc2lQQ0pkTENKemRHRjBkWE1pT2pBc0luTmpjbWx3ZENJNmJuVnNiQ3dpZDNKdmJtZFRZM0pwY0hRaU9tNTFiR3dzXG5JbkoxYkdWVWVYQmxJam9pUTA5TlVFRlNSU0o5TEhzaWFXUWlPalVzSW1WNFlXMUpaQ0k2TmpBNU5EWTVOekUzTnpBMk5UVTFORGN5XG5MQ0pqYjI1MFpXNTBJam9pTTF4Y1kybHlZMnhsTVRRaUxDSmhibk4zWlhJaU9pSThJaXdpZFhObGNrRnVjM2RsY2lJNmJuVnNiQ3dpXG5ZVzV6ZDJWeWN5STZXeUk4SWwwc0luTjBZWFIxY3lJNk1Dd2ljMk55YVhCMElqcHVkV3hzTENKM2NtOXVaMU5qY21sd2RDSTZiblZzXG5iQ3dpY25Wc1pWUjVjR1VpT2lKRFQwMVFRVkpGSW4wc2V5SnBaQ0k2Tml3aVpYaGhiVWxrSWpvMk1EazBOamszTVRjM01EWTFOVFUwXG5OeklzSW1OdmJuUmxiblFpT2lJeE5GeGNZMmx5WTJ4bE1Ua2lMQ0poYm5OM1pYSWlPaUk4SWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzXG5iQ3dpWVc1emQyVnljeUk2V3lJOElsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2XG5iblZzYkN3aWNuVnNaVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk55d2laWGhoYlVsa0lqbzJNRGswTmprM01UYzNNRFkxXG5OVFUwTnpJc0ltTnZiblJsYm5RaU9pSTVYRnhqYVhKamJHVXhPQ0lzSW1GdWMzZGxjaUk2SWp3aUxDSjFjMlZ5UVc1emQyVnlJanB1XG5kV3hzTENKaGJuTjNaWEp6SWpwYklqd2lYU3dpYzNSaGRIVnpJam93TENKelkzSnBjSFFpT201MWJHd3NJbmR5YjI1blUyTnlhWEIwXG5JanB1ZFd4c0xDSnlkV3hsVkhsd1pTSTZJa05QVFZCQlVrVWlmU3g3SW1sa0lqbzRMQ0psZUdGdFNXUWlPall3T1RRMk9UY3hOemN3XG5OalUxTlRRM01pd2lZMjl1ZEdWdWRDSTZJakV3WEZ4amFYSmpiR1UzSWl3aVlXNXpkMlZ5SWpvaVBpSXNJblZ6WlhKQmJuTjNaWElpXG5PbTUxYkd3c0ltRnVjM2RsY25NaU9sc2lQaUpkTENKemRHRjBkWE1pT2pBc0luTmpjbWx3ZENJNmJuVnNiQ3dpZDNKdmJtZFRZM0pwXG5jSFFpT201MWJHd3NJbkoxYkdWVWVYQmxJam9pUTA5TlVFRlNSU0o5TEhzaWFXUWlPamtzSW1WNFlXMUpaQ0k2TmpBNU5EWTVOekUzXG5OekEyTlRVMU5EY3lMQ0pqYjI1MFpXNTBJam9pTTF4Y1kybHlZMnhsTWlJc0ltRnVjM2RsY2lJNklqNGlMQ0oxYzJWeVFXNXpkMlZ5XG5JanB1ZFd4c0xDSmhibk4zWlhKeklqcGJJajRpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55XG5hWEIwSWpwdWRXeHNMQ0p5ZFd4bFZIbHdaU0k2SWtOUFRWQkJVa1VpZlYwc0luVndaR0YwWldSVWFXMWxJam93ZlgwXHUwMDNkXG4ifV0=
{"pkIdStr":"609469717706555472","otherUser":{"userId":89623440,"userName":"猿宝23440","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd213b2ce7f.png","userPendantUrl":null},"otherWinCount":0,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469717706555472","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":10,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469717706555472,"content":"11\\circle20","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469717706555472,"content":"4\\circle14","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":2,"examId":609469717706555472,"content":"7\\circle11","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":3,"examId":609469717706555472,"content":"15\\circle9","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":4,"examId":609469717706555472,"content":"7\\circle15","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":5,"examId":609469717706555472,"content":"3\\circle14","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":6,"examId":609469717706555472,"content":"14\\circle19","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":7,"examId":609469717706555472,"content":"9\\circle18","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":8,"examId":609469717706555472,"content":"10\\circle7","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":9,"examId":609469717706555472,"content":"3\\circle2","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}
[JS] Received Base64: W251bGwseyJyZXN1bHQiOiJleUp3YTBsa1UzUnlJam9pTmpBNU5EWTVOekkwT1RRMU9EQTVOVEF6SWl3aWIzUm9aWEpWYzJWeUlqcDdJblZ6WlhKSlpDSTZNVEExXG5NVGMwT0RZeU5Dd2lkWE5sY2s1aGJXVWlPaUxuakwvbHJwMDBPRFl5TkNJc0ltRjJZWFJoY2xWeWJDSTZJbWgwZEhCek9pOHZiR1Z2XG5MVzl1YkdsdVpTNW1ZbU52Ym5SbGJuUXVZMjR2YkdWdkxXZGhiR3hsY25rdk1UWmhPV1prTUdWbU1tSTBOMlF4TG5CdVp5SXNJblZ6XG5aWEpRWlc1a1lXNTBWWEpzSWpwdWRXeHNmU3dpYjNSb1pYSlhhVzVEYjNWdWRDSTZOQ3dpYzJWc1psZHBia052ZFc1MElqb3hNeXdpXG5kR0Z5WjJWMFEyOXpkRlJwYldVaU9qVXdNREF3TENKbGVHRnRWazhpT25zaWNHdEpaRk4wY2lJNklqWXdPVFEyT1RjeU5EazBOVGd3XG5PVFV3TXlJc0luQnZhVzUwU1dRaU9qSXNJbkJ2YVc1MFRtRnRaU0k2SWpJdzVMdWw1WWFGNXBXdzU1cUU1cStVNWFTbjViQ1BJaXdpXG5jblZzWlZSNWNHVWlPakFzSW5GMVpYTjBhVzl1UTI1MElqb3hNQ3dpWTI5eWNtVmpkRU51ZENJNk1Dd2lZMjl6ZEZScGJXVWlPakFzXG5JbkYxWlhOMGFXOXVjeUk2VzNzaWFXUWlPakFzSW1WNFlXMUpaQ0k2TmpBNU5EWTVOekkwT1RRMU9EQTVOVEF6TENKamIyNTBaVzUwXG5Jam9pTVRkY1hHTnBjbU5zWlRFMElpd2lZVzV6ZDJWeUlqb2lQaUlzSW5WelpYSkJibk4zWlhJaU9tNTFiR3dzSW1GdWMzZGxjbk1pXG5PbHNpUGlKZExDSnpkR0YwZFhNaU9qQXNJbk5qY21sd2RDSTZiblZzYkN3aWQzSnZibWRUWTNKcGNIUWlPbTUxYkd3c0luSjFiR1ZVXG5lWEJsSWpvaVEwOU5VRUZTUlNKOUxIc2lhV1FpT2pFc0ltVjRZVzFKWkNJNk5qQTVORFk1TnpJME9UUTFPREE1TlRBekxDSmpiMjUwXG5aVzUwSWpvaU1UbGNYR05wY21Oc1pUa2lMQ0poYm5OM1pYSWlPaUkrSWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzYkN3aVlXNXpkMlZ5XG5jeUk2V3lJK0lsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2Ym5Wc2JDd2ljblZzXG5aVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk1pd2laWGhoYlVsa0lqbzJNRGswTmprM01qUTVORFU0TURrMU1ETXNJbU52XG5iblJsYm5RaU9pSTBYRnhqYVhKamJHVXhOaUlzSW1GdWMzZGxjaUk2SWp3aUxDSjFjMlZ5UVc1emQyVnlJanB1ZFd4c0xDSmhibk4zXG5aWEp6SWpwYklqd2lYU3dpYzNSaGRIVnpJam93TENKelkzSnBjSFFpT201MWJHd3NJbmR5YjI1blUyTnlhWEIwSWpwdWRXeHNMQ0p5XG5kV3hsVkhsd1pTSTZJa05QVFZCQlVrVWlmU3g3SW1sa0lqb3pMQ0psZUdGdFNXUWlPall3T1RRMk9UY3lORGswTlRnd09UVXdNeXdpXG5ZMjl1ZEdWdWRDSTZJakpjWEdOcGNtTnNaVFlpTENKaGJuTjNaWElpT2lJOElpd2lkWE5sY2tGdWMzZGxjaUk2Ym5Wc2JDd2lZVzV6XG5kMlZ5Y3lJNld5SThJbDBzSW5OMFlYUjFjeUk2TUN3aWMyTnlhWEIwSWpwdWRXeHNMQ0ozY205dVoxTmpjbWx3ZENJNmJuVnNiQ3dpXG5jblZzWlZSNWNHVWlPaUpEVDAxUVFWSkZJbjBzZXlKcFpDSTZOQ3dpWlhoaGJVbGtJam8yTURrME5qazNNalE1TkRVNE1EazFNRE1zXG5JbU52Ym5SbGJuUWlPaUl4TjF4Y1kybHlZMnhsTWlJc0ltRnVjM2RsY2lJNklqNGlMQ0oxYzJWeVFXNXpkMlZ5SWpwdWRXeHNMQ0poXG5ibk4zWlhKeklqcGJJajRpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55YVhCMElqcHVkV3hzXG5MQ0p5ZFd4bFZIbHdaU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam8xTENKbGVHRnRTV1FpT2pZd09UUTJPVGN5TkRrME5UZ3dPVFV3XG5NeXdpWTI5dWRHVnVkQ0k2SWpFMVhGeGphWEpqYkdVeE9TSXNJbUZ1YzNkbGNpSTZJandpTENKMWMyVnlRVzV6ZDJWeUlqcHVkV3hzXG5MQ0poYm5OM1pYSnpJanBiSWp3aVhTd2ljM1JoZEhWeklqb3dMQ0p6WTNKcGNIUWlPbTUxYkd3c0luZHliMjVuVTJOeWFYQjBJanB1XG5kV3hzTENKeWRXeGxWSGx3WlNJNklrTlBUVkJCVWtVaWZTeDdJbWxrSWpvMkxDSmxlR0Z0U1dRaU9qWXdPVFEyT1RjeU5EazBOVGd3XG5PVFV3TXl3aVkyOXVkR1Z1ZENJNklqUmNYR05wY21Oc1pURTRJaXdpWVc1emQyVnlJam9pUENJc0luVnpaWEpCYm5OM1pYSWlPbTUxXG5iR3dzSW1GdWMzZGxjbk1pT2xzaVBDSmRMQ0p6ZEdGMGRYTWlPakFzSW5OamNtbHdkQ0k2Ym5Wc2JDd2lkM0p2Ym1kVFkzSnBjSFFpXG5PbTUxYkd3c0luSjFiR1ZVZVhCbElqb2lRMDlOVUVGU1JTSjlMSHNpYVdRaU9qY3NJbVY0WVcxSlpDSTZOakE1TkRZNU56STBPVFExXG5PREE1TlRBekxDSmpiMjUwWlc1MElqb2lNVFZjWEdOcGNtTnNaVFlpTENKaGJuTjNaWElpT2lJK0lpd2lkWE5sY2tGdWMzZGxjaUk2XG5iblZzYkN3aVlXNXpkMlZ5Y3lJNld5SStJbDBzSW5OMFlYUjFjeUk2TUN3aWMyTnlhWEIwSWpwdWRXeHNMQ0ozY205dVoxTmpjbWx3XG5kQ0k2Ym5Wc2JDd2ljblZzWlZSNWNHVWlPaUpEVDAxUVFWSkZJbjBzZXlKcFpDSTZPQ3dpWlhoaGJVbGtJam8yTURrME5qazNNalE1XG5ORFU0TURrMU1ETXNJbU52Ym5SbGJuUWlPaUl4TVZ4Y1kybHlZMnhsTnlJc0ltRnVjM2RsY2lJNklqNGlMQ0oxYzJWeVFXNXpkMlZ5XG5JanB1ZFd4c0xDSmhibk4zWlhKeklqcGJJajRpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55XG5hWEIwSWpwdWRXeHNMQ0p5ZFd4bFZIbHdaU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam81TENKbGVHRnRTV1FpT2pZd09UUTJPVGN5XG5ORGswTlRnd09UVXdNeXdpWTI5dWRHVnVkQ0k2SWpFeFhGeGphWEpqYkdVeE1DSXNJbUZ1YzNkbGNpSTZJajRpTENKMWMyVnlRVzV6XG5kMlZ5SWpwdWRXeHNMQ0poYm5OM1pYSnpJanBiSWo0aVhTd2ljM1JoZEhWeklqb3dMQ0p6WTNKcGNIUWlPbTUxYkd3c0luZHliMjVuXG5VMk55YVhCMElqcHVkV3hzTENKeWRXeGxWSGx3WlNJNklrTlBUVkJCVWtVaWZWMHNJblZ3WkdGMFpXUlVhVzFsSWpvd2ZYMFx1MDAzZFxuIn1d
{"pkIdStr":"609469724945809503","otherUser":{"userId":1051748624,"userName":"猿宝48624","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd0ef2b47d1.png","userPendantUrl":null},"otherWinCount":4,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469724945809503","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":10,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469724945809503,"content":"17\\circle14","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469724945809503,"content":"19\\circle9","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":2,"examId":609469724945809503,"content":"4\\circle16","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":3,"examId":609469724945809503,"content":"2\\circle6","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":4,"examId":609469724945809503,"content":"17\\circle2","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":5,"examId":609469724945809503,"content":"15\\circle19","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":6,"examId":609469724945809503,"content":"4\\circle18","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":7,"examId":609469724945809503,"content":"15\\circle6","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":8,"examId":609469724945809503,"content":"11\\circle7","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":9,"examId":609469724945809503,"content":"11\\circle10","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}
[JS] Received Base64: W251bGwseyJyZXN1bHQiOiJleUp3YTBsa1UzUnlJam9pTmpBNU5EWTVOek13TmpjNU5EVTVPRFUwSWl3aWIzUm9aWEpWYzJWeUlqcDdJblZ6WlhKSlpDSTZNVEExXG5ORGc0TmpVM05pd2lkWE5sY2s1aGJXVWlPaUxuakwvbHJwMDROalUzTmlJc0ltRjJZWFJoY2xWeWJDSTZJbWgwZEhCek9pOHZiR1Z2XG5MVzl1YkdsdVpTNW1ZbU52Ym5SbGJuUXVZMjR2YkdWdkxXZGhiR3hsY25rdk1UWmhPV1prTURFellXVTBZVFkzTG5CdVp5SXNJblZ6XG5aWEpRWlc1a1lXNTBWWEpzSWpwdWRXeHNmU3dpYjNSb1pYSlhhVzVEYjNWdWRDSTZNU3dpYzJWc1psZHBia052ZFc1MElqb3hNeXdpXG5kR0Z5WjJWMFEyOXpkRlJwYldVaU9qVXdNREF3TENKbGVHRnRWazhpT25zaWNHdEpaRk4wY2lJNklqWXdPVFEyT1Rjek1EWTNPVFExXG5PVGcxTkNJc0luQnZhVzUwU1dRaU9qSXNJbkJ2YVc1MFRtRnRaU0k2SWpJdzVMdWw1WWFGNXBXdzU1cUU1cStVNWFTbjViQ1BJaXdpXG5jblZzWlZSNWNHVWlPakFzSW5GMVpYTjBhVzl1UTI1MElqb3hNQ3dpWTI5eWNtVmpkRU51ZENJNk1Dd2lZMjl6ZEZScGJXVWlPakFzXG5JbkYxWlhOMGFXOXVjeUk2VzNzaWFXUWlPakFzSW1WNFlXMUpaQ0k2TmpBNU5EWTVOek13TmpjNU5EVTVPRFUwTENKamIyNTBaVzUwXG5Jam9pTVRoY1hHTnBjbU5zWlRZaUxDSmhibk4zWlhJaU9pSStJaXdpZFhObGNrRnVjM2RsY2lJNmJuVnNiQ3dpWVc1emQyVnljeUk2XG5XeUkrSWwwc0luTjBZWFIxY3lJNk1Dd2ljMk55YVhCMElqcHVkV3hzTENKM2NtOXVaMU5qY21sd2RDSTZiblZzYkN3aWNuVnNaVlI1XG5jR1VpT2lKRFQwMVFRVkpGSW4wc2V5SnBaQ0k2TVN3aVpYaGhiVWxrSWpvMk1EazBOamszTXpBMk56azBOVGs0TlRRc0ltTnZiblJsXG5iblFpT2lJeE9GeGNZMmx5WTJ4bE1UWWlMQ0poYm5OM1pYSWlPaUkrSWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzYkN3aVlXNXpkMlZ5XG5jeUk2V3lJK0lsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2Ym5Wc2JDd2ljblZzXG5aVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk1pd2laWGhoYlVsa0lqbzJNRGswTmprM016QTJOemswTlRrNE5UUXNJbU52XG5iblJsYm5RaU9pSXhNMXhjWTJseVkyeGxNVGdpTENKaGJuTjNaWElpT2lJOElpd2lkWE5sY2tGdWMzZGxjaUk2Ym5Wc2JDd2lZVzV6XG5kMlZ5Y3lJNld5SThJbDBzSW5OMFlYUjFjeUk2TUN3aWMyTnlhWEIwSWpwdWRXeHNMQ0ozY205dVoxTmpjbWx3ZENJNmJuVnNiQ3dpXG5jblZzWlZSNWNHVWlPaUpEVDAxUVFWSkZJbjBzZXlKcFpDSTZNeXdpWlhoaGJVbGtJam8yTURrME5qazNNekEyTnprME5UazROVFFzXG5JbU52Ym5SbGJuUWlPaUl4TVZ4Y1kybHlZMnhsTVRjaUxDSmhibk4zWlhJaU9pSThJaXdpZFhObGNrRnVjM2RsY2lJNmJuVnNiQ3dpXG5ZVzV6ZDJWeWN5STZXeUk4SWwwc0luTjBZWFIxY3lJNk1Dd2ljMk55YVhCMElqcHVkV3hzTENKM2NtOXVaMU5qY21sd2RDSTZiblZzXG5iQ3dpY25Wc1pWUjVjR1VpT2lKRFQwMVFRVkpGSW4wc2V5SnBaQ0k2TkN3aVpYaGhiVWxrSWpvMk1EazBOamszTXpBMk56azBOVGs0XG5OVFFzSW1OdmJuUmxiblFpT2lJeE9GeGNZMmx5WTJ4bE1UQWlMQ0poYm5OM1pYSWlPaUkrSWl3aWRYTmxja0Z1YzNkbGNpSTZiblZzXG5iQ3dpWVc1emQyVnljeUk2V3lJK0lsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1WjFOamNtbHdkQ0k2XG5iblZzYkN3aWNuVnNaVlI1Y0dVaU9pSkRUMDFRUVZKRkluMHNleUpwWkNJNk5Td2laWGhoYlVsa0lqbzJNRGswTmprM016QTJOemswXG5OVGs0TlRRc0ltTnZiblJsYm5RaU9pSXhYRnhqYVhKamJHVXpJaXdpWVc1emQyVnlJam9pUENJc0luVnpaWEpCYm5OM1pYSWlPbTUxXG5iR3dzSW1GdWMzZGxjbk1pT2xzaVBDSmRMQ0p6ZEdGMGRYTWlPakFzSW5OamNtbHdkQ0k2Ym5Wc2JDd2lkM0p2Ym1kVFkzSnBjSFFpXG5PbTUxYkd3c0luSjFiR1ZVZVhCbElqb2lRMDlOVUVGU1JTSjlMSHNpYVdRaU9qWXNJbVY0WVcxSlpDSTZOakE1TkRZNU56TXdOamM1XG5ORFU1T0RVMExDSmpiMjUwWlc1MElqb2lNbHhjWTJseVkyeGxNakFpTENKaGJuTjNaWElpT2lJOElpd2lkWE5sY2tGdWMzZGxjaUk2XG5iblZzYkN3aVlXNXpkMlZ5Y3lJNld5SThJbDBzSW5OMFlYUjFjeUk2TUN3aWMyTnlhWEIwSWpwdWRXeHNMQ0ozY205dVoxTmpjbWx3XG5kQ0k2Ym5Wc2JDd2ljblZzWlZSNWNHVWlPaUpEVDAxUVFWSkZJbjBzZXlKcFpDSTZOeXdpWlhoaGJVbGtJam8yTURrME5qazNNekEyXG5OemswTlRrNE5UUXNJbU52Ym5SbGJuUWlPaUk0WEZ4amFYSmpiR1V4TXlJc0ltRnVjM2RsY2lJNklqd2lMQ0oxYzJWeVFXNXpkMlZ5XG5JanB1ZFd4c0xDSmhibk4zWlhKeklqcGJJandpWFN3aWMzUmhkSFZ6SWpvd0xDSnpZM0pwY0hRaU9tNTFiR3dzSW5keWIyNW5VMk55XG5hWEIwSWpwdWRXeHNMQ0p5ZFd4bFZIbHdaU0k2SWtOUFRWQkJVa1VpZlN4N0ltbGtJam80TENKbGVHRnRTV1FpT2pZd09UUTJPVGN6XG5NRFkzT1RRMU9UZzFOQ3dpWTI5dWRHVnVkQ0k2SWpkY1hHTnBjbU5zWlRraUxDSmhibk4zWlhJaU9pSThJaXdpZFhObGNrRnVjM2RsXG5jaUk2Ym5Wc2JDd2lZVzV6ZDJWeWN5STZXeUk4SWwwc0luTjBZWFIxY3lJNk1Dd2ljMk55YVhCMElqcHVkV3hzTENKM2NtOXVaMU5qXG5jbWx3ZENJNmJuVnNiQ3dpY25Wc1pWUjVjR1VpT2lKRFQwMVFRVkpGSW4wc2V5SnBaQ0k2T1N3aVpYaGhiVWxrSWpvMk1EazBOamszXG5NekEyTnprME5UazROVFFzSW1OdmJuUmxiblFpT2lJeE4xeGNZMmx5WTJ4bE1UUWlMQ0poYm5OM1pYSWlPaUkrSWl3aWRYTmxja0Z1XG5jM2RsY2lJNmJuVnNiQ3dpWVc1emQyVnljeUk2V3lJK0lsMHNJbk4wWVhSMWN5STZNQ3dpYzJOeWFYQjBJanB1ZFd4c0xDSjNjbTl1XG5aMU5qY21sd2RDSTZiblZzYkN3aWNuVnNaVlI1Y0dVaU9pSkRUMDFRUVZKRkluMWRMQ0oxY0dSaGRHVmtWR2x0WlNJNk1IMTlcbiJ9XQ==
{"pkIdStr":"609469730679459854","otherUser":{"userId":1054886576,"userName":"猿宝86576","avatarUrl":"https://leo-online.fbcontent.cn/leo-gallery/16a9fd013ae4a67.png","userPendantUrl":null},"otherWinCount":1,"selfWinCount":13,"targetCostTime":50000,"examVO":{"pkIdStr":"609469730679459854","pointId":2,"pointName":"20以内数的比大小","ruleType":0,"questionCnt":10,"correctCnt":0,"costTime":0,"questions":[{"id":0,"examId":609469730679459854,"content":"18\\circle6","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":1,"examId":609469730679459854,"content":"18\\circle16","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":2,"examId":609469730679459854,"content":"13\\circle18","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":3,"examId":609469730679459854,"content":"11\\circle17","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":4,"examId":609469730679459854,"content":"18\\circle10","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":5,"examId":609469730679459854,"content":"1\\circle3","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":6,"examId":609469730679459854,"content":"2\\circle20","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":7,"examId":609469730679459854,"content":"8\\circle13","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":8,"examId":609469730679459854,"content":"7\\circle9","answer":"<","userAnswer":null,"answers":["<"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"},{"id":9,"examId":609469730679459854,"content":"17\\circle14","answer":">","userAnswer":null,"answers":[">"],"status":0,"script":null,"wrongScript":null,"ruleType":"COMPARE"}],"updatedTime":0}}

```
[视频演示](/video/frida_matchV2.mp4)

## [未经测试的加载RequestEncoder生成sign方法](frida/gan_sign)
根据 [taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的hook方向, 现写出:  
+ [anay_loadRequestEncoder.js](frida/anay_loadRequestEncoder.js) hook分析测试脚本
+ [gan_sign_model.js](frida/gan_sign/gan_sign_model.js) 生成sign
+ [gan_sign_model.py](frida/gan_sign/gan_sign_model.py) 提供python调用


## [正在测试通过frida调用的形式不解具体算法拿到带sign的url](./frida/sign_decrypt.md)  
获取pk试题及答案，提交答案主要在`exercise.ts`文件里  
生成请求参数位于`request.ts`文件里  
跟踪`signUrlIfNeeded`方法，一路跟踪发现使用`solar`让安卓程序生成sign再把url带参数传回来  

+ 使用`anay_webview.js`能看到传递和调用链  
```sh
cd frida
frida -U -n 小猿口算 -l anay_webview.js
```
```js
WebView loading URL: javascript:(window.requestConfig_callback_1728561502343_17 && window.requestConfig_callback_1728561502343_17("W251bGxd
"))
解码 Base64: [null]
调用链: java.lang.Exception
        at android.webkit.WebView.loadUrl(Native Method)
        at com.tencent.smtt.sdk.WebView.loadUrl(SourceFile:1)
        at java.lang.reflect.Method.invoke(Native Method)
        at org.lsposed.lspd.nativebridge.HookBridge.invokeOriginalMethod(Native Method)
        at J.callback(Unknown Source:193)
        at LSPHooker_.loadUrl(Unknown Source:11)
        at com.fenbi.android.leo.webapp.JsBridgeBean.callback$leo_webview_release(SourceFile:73)
        at com.fenbi.android.leo.webapp.secure.LeoSecureWebViewApi$g.run(SourceFile:11)
        at android.os.Handler.handleCallback(Handler.java:938)
        at android.os.Handler.dispatchMessage(Handler.java:99)
        at android.os.Looper.loopOnce(Looper.java:201)
        at android.os.Looper.loop(Looper.java:288)
        at android.app.ActivityThread.main(ActivityThread.java:8060)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)

WebView loading URL: javascript:(window.requestConfig_1728561502343_16 && window.requestConfig_1728561502343_16("W251bGwseyJ1c2VyQWdlbnQiOiJMZW8vMy45My4yIChYaWFvbWkyMjA2MTIyU0M7IEFuZHJvaWQgMTI7IFNjYWxlLzEuNDkpIiwid3JhcHBlZFVybCI6Ii9sZW8tZ2FtZS1way9hbmRyb2lkL21hdGgvcGsvaG9tZT9fcHJvZHVjdElkXHUwMDNkNjExXHUwMDI2cGxhdGZvcm1cdTAwM2RhbmRyb2lkMzJcdTAwMjZ2ZXJzaW9uXHUwMDNkMy45My4yXHUwMDI2dmVuZG9yXHUwMDNkeGlhb19taVx1MDAyNmF2XHUwMDNkNVx1MDAyNnNpZ25cdTAwM2RmMmQ2NjhjZTY3MDgxOWMwNWI3NjRhMjM3YzcyNjQ0Mlx1MDAyNmRldmljZUNhdGVnb3J5XHUwMDNkcGFkIn1d"))
解码 Base64: [null,{"userAgent":"Leo/3.93.2 (Xiaomi2206122SC; Android 12; Scale/1.49)","wrappedUrl":"/leo-game-pk/android/math/pk/home?_productId=611&platform\u003dandroid32&version\u003d3.93.2&vendor\u003dxiao_mi&av\u003d5&sign\u003df2d668ce670819c05b764a237c726442&deviceCategory\u003dpad"}]
调用链: java.lang.Exception
        at android.webkit.WebView.loadUrl(Native Method)
        at com.tencent.smtt.sdk.WebView.loadUrl(SourceFile:1)
        at java.lang.reflect.Method.invoke(Native Method)
        at org.lsposed.lspd.nativebridge.HookBridge.invokeOriginalMethod(Native Method)
        at J.callback(Unknown Source:193)
        at LSPHooker_.loadUrl(Unknown Source:11)
        at com.yuanfudao.android.common.webview.base.JsBridgeBean$a.run(SourceFile:47)
        at android.os.Handler.handleCallback(Handler.java:938)
        at android.os.Handler.dispatchMessage(Handler.java:99)
        at android.os.Looper.loopOnce(Looper.java:201)
        at android.os.Looper.loop(Looper.java:288)
        at android.app.ActivityThread.main(ActivityThread.java:8060)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:571)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1091)
```

+ 使用[frida-dexdump](https://github.com/hluwa/frida-dexdump)  
```
frida-dexdump -FU
```
frida-dexdump导出的[dex](frida/dexdump/小猿口算),拖到jadx窗口逆向

## 现状
已完成:   
+ 感谢 @x781078959 完成[hook解密试题及答案,模拟滑动](frida/matchV2)  
+ 感谢 @taotao5 在 #9 提供的[hook sign](frida/gan_sign)方向

## 免责声明

1. 本仓库发布的 `xyks` (下文均用本项目代替) 项目中涉及的任何脚本，仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断。

2. 作者对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.

3. 请勿将本项目的任何内容用于商业或非法目的，否则后果自负。

4. 以任何方式查看此项目的人或直接或间接使用本项目的任何脚本的使用者都应仔细阅读此声明。作者保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或本项目，则视为您已接受此免责声明。

5. 您必须在下载后的24个小时之内，从您的电脑或手机中彻底删除上述内容。

6. 任何擅自改变计算机信息网络数据属于违法行为，本项目不提供成品可运行程序，仅做学习研究使用。

`您使用或者复制了本仓库且本人制作的任何代码或项目，则视为已接受此声明，请仔细阅读。`