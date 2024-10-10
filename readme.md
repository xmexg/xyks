# 小猿口算
未完成的逆向笔记  
详见[frida/readme.md](frida/readme.md)

# 如何复现
+ windows:  
安装mumu模拟器，根据mumu官方教程，依次安装magisk，lsposed，算法助手。  
安装小猿口算app，在算法助手里设置小猿口算app允许webview远程调试。  
打开chrome或edge浏览器，分别打开chrome://inspect或者edge://inspect  
打开小猿口算app，打开口算pk，回到浏览器的inspect页面，等待显示出pk链接调试按钮，点击调试。  
开发者工具的网络页面选择保留日志。然后左上角刷新页面以确保获取到完整数据。每打开一个页面回到inspect页面等待获取到新的调试链接，在新的调试页面刷新页面。  

# 进度
获取pk试题及答案，提交答案主要在`exercise.ts`文件里  

生成请求参数位于`request.ts`文件里  
大概`signUrlIfNeeded`方法用于生成请求参数的sign值  
