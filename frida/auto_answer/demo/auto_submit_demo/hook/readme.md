# 目录说明
存放需要用到的hook脚本, 本目录脚本相较于`/frida`目录脚本有修改

不要查看hook目录下的所有readme.md, 整个目录都是复制粘贴`/frida`目录过来然后修改的

# 目录文件对照表  
|本目录文件|作用|复制于|
|--|--|--|
|[gan_sign](gan_sign)|生成sign|[/frida/gan_sign](/frida/gan_sign)|
|[matchV2_byDataDecryptCommand](matchV2_byDataDecryptCommand)|解密试题|[/frida/matchV2_byDataDecryptCommand](/frida/matchV2_byDataDecryptCommand)|
|[answer_encrypt](answer_encrypt) (对应目录变化)|加密答案|[/frida/submit](/frida/submit)|
|[answer_uphand](answer_uphand) (新增)|提交答案|无|
