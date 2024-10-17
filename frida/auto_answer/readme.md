# 自动刷题目录
纯协议小猿口算实现模板

# 现状
## 已实现纯协议答题模板
![image](./image/auto_submit.png)

## [已实现纯协议多进程速刷](demo/auto_submit_multiprocess_demo)  
[点击查看纯协议多进程速刷](https://github.com/user-attachments/assets/bc1974af-463b-45cf-92bf-1f778cb27826)

~~已经逆向答案加密, 准备实现中 [加密答案分析](../anay_answerEncrypt.js)~~

~~尝试逆向 [前端试题请求逆向](前端试题请求逆向.md)~~

# 目录
|目录|简介|
|--|--|
|[auto_submit_demo](demo/auto_submit_demo)|基础模板, 单线程, 一次性答题, 开发调试使用|
|[auto_submit_multiprocess_demo](demo/auto_submit_multiprocess_demo)|多线程答题模板, 刷题使用|
|[auto_submit_multiprocessreuse_demo](demo/auto_submit_multiprocessreuse_demo)|(尚未实现)更改`多线程答题模板`加载流程, 更快的刷题速度|

# 说明
- [auto_submit_demo](demo/auto_submit_demo)项目将作为演示及开发项目, 不作为正式项目使用  

  运行前应检查填写cookie, 你手机发起pk请求时的带参数url和提交答案时的带参数url, 这些参数不同小猿口算app版本, 不同手机, 都有所不同  

  通过hook自动补全cookie和带参url功能将在未来的auto_submit_multiprocess_demo项目中实现

- [auto_submit_multiprocess_demo](demo/auto_submit_multiprocess_demo)项目将作为正式的,带hook的多进程协议刷题项目  
计划 ~~~每次运行时应先手动pk一下来捕获cookie,带参url等信息,~~~~ 而后多进程速刷

- [auto_submit_multiprocessreuse_demo](demo/auto_submit_multiprocessreuse_demo) 更改`多线程答题模板`加载流程, 全局初始化并复用答题类及js脚本, 减少print, 实现更低IO、更快的刷题速度

- [node_submit] 将根据 [#34 用js写了下libContentEncoder的解密](https://github.com/xmexg/xyks/issues/34) 后续发展, 可能会作为无hook协议刷题的nodejs项目  
只有`libContentEncoder的解密`是不够的, 至少还需要`libRequestEncoder.so`的生成sign算法和`libContentEncoder`的加密算法

# 计划步骤
[✔] 1. 我们需要写一个发包脚本, 使用`gan_sign`生成`sign`值, 向`https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=0e40a461631880b0937515fd93fe87b6&deviceCategory=pad`发起post

[✔] 2. 我们需要修改[do_matchV2_byDataDecryptCommand_model.js](../matchV2_byDataDecryptCommand/do_matchV2_byDataDecryptCommand_model.js), 使其加载并解密上一步收到的试题包

[✔] 3. 我们需要研究收到的试题包和待提交的答案包的json对应关系, 根据对应关系生成待提交的答案包

[✔] 4. 我们需要修改[submit](../submit), 使其能够接收我们生成的答案包, 将答案包加密成服务器认可的二进制格式

[✔] 5. 向`https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign=47d140c9a28f4d0343dfb9f109c93b2e&deviceCategory=pad`发包完成答题  

[✘] 6. 根据get_cookie.js文件，修改后可获得相应Cookie，将其传入demo_pk.py的几个部分即可实现全协议结算作答。


# 回顾
- 解试题包加密  
  [matchV2](../matchV2) 于2024年10月11日(五)傍晚完成  
  [matchV2_byDataDecryptCommand](../matchV2_byDataDecryptCommand) 于2024年10月12日(六)下午15时完成  

- 解sign  
  [gan_sign](../gan_sign) 于2024年10月12日(六)凌晨2时完成  

- 解提交包  
  [submit](../submit) 于2024年10月13日(日)凌晨1时完成
