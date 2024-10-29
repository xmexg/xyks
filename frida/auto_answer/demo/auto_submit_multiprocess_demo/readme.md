# auto_submit_multiprocess_demo
多线程答题模板

# 关于禁赛24小时
[系统检测已违规，您将被禁赛24小时](https://github.com/xmexg/xyks/issues/50)

# 目录文件说明
|                                  |                                                |
|----------------------------------|------------------------------------------------|
| [hook/loader.py](hook/loader.py) | 使用一个py文件调用所有多进程刷题时需要的脚本, 不含`--hookcookie`参数需要的脚本 |
| [hook/js](hook/js)               | 存放所有用到的js脚本                                    |
| [main.py](main.py)               | 多进程开始运行                                        |
| [answer.py](answer.py)           | hook脚本测试                                       |
| []()                             |                                                |


# 使用方法
## 准备工作:
- 此项目所有脚本启动前都要能够adb连接到手机, 并且手机上已经安装了frida-server, 并且frida-server已经启动  
- 除anay_vip.js外, 本仓库所有脚本启动前都要预先启动 `小猿口算` app
- 本仓库所有脚本都是按照一个`adb devices`安卓设备, `usb连接`的方式编写的,    
  由于不同人环境不同, 存在多个usb设备的环境需要先自行修改[hook/loader.js](./hook/loader.py)脚本中的:
    ```
    # 使用 adb 获取进程列表，并查找目标应用的 PID
    result = subprocess.run(['adb', 'shell', 'ps | grep ' + self.package_name],
                        capture_output=True, text=True)
  ```
## 正式开始
1. 安装依赖:
```shell
pip install -r requirements.txt
```
2. 运行`main.py`:  
    - **通过 python main.py 启动时需要自己填写cookie和url**  
   使用此命令运行前需要修改[main.py](main.py)里的cookie和url  
   自行抓包cookie和获取试题和提交答案时的完整url   
        ```shell
        python main.py
        ```
   
   - **通过 python main.py --hookcookie 启动后会自动获取cookie和url**  
     由于`小猿口算`app最终请求获取答案和请求提交答案是在vue网页实现的,目前没有在java中找到替代的hook点  
     该方法暂不可用    
   ~~使用此命令运行后需要自己先去手动pk一下, 以获取cookie和url, 已修补pk试题为1道题, 答案是1, pk用时0.1s~~  
       ```
       python main.py --hookcookie
       ```

   - **通过添加`--fakeq=3`参数可以修改试题数量,快速刷分,默认为1,最高为3,再高不计成绩**  
        ```shell
        python main.py --fakeq=1
        ```
   - **通过`--processes=20`参数可设置进程数量,默认20,太高会卡,多进程刷分**
       ```shell
       python main.py --processes=20
       ```
   - **不同参数可组合使用
       ```shell
       python main.py --fakeq=3 --processes=20
       ```
