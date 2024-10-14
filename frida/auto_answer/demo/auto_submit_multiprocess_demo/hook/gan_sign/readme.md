# gan_sign
感谢 [@taotao5](https://github.com/taotao5) 在 [#9](https://github.com/xmexg/xyks/issues/9) 提供的hook方向

|文件|作用|
|--|--|
|gan_sign_model.js|模型, hook生成sign|
|gan_sign_model.py|模型, 提供python示例|
|gan_sign_exec_model.py|模型, 演示其他py文件导入模块获取sign|

![image](./image/import_gan_sign_model.png)

# 注意事项
- 执行脚本前确保`小猿口算`已在运行  
- python只能使用adb获取到pid, 确保电脑已安装adb