# vue-attack-defense-admin


## Build Setup

```bash
# 克隆项目
git clone https://github.com/Ivy-0321/vue-attack-defense-admin

# 进入项目目录
cd vue-attack-defense-admin

# 安装依赖
npm install

# 打开服务端
cd server
node app.js

# 启动服务（目录下打开另一个终端）
npm run dev
```


浏览器访问 [http://localhost:8000](http://localhost:8000)

## 连接Wazuh
使用[虚拟机方式](documentation.wazuh.com/current/deployment-options/virtual-machine/virtual-machine.html)安装wazuh。

虚拟机内输入命令[查看IP](https://blog.csdn.net/TSY_1222/article/details/106378421)，将虚拟机IP替换到src/views/wazuh/index.vue中的your_ip部分。

浏览器可选择Firefox/Chrome94以下版本。Username:admin,Password:admin。
### Firefox
1. 安装插件[Ignore X-Frame-Options Header](https://addons.mozilla.org/zh-CN/firefox/addon/ignore-x-frame-options-header/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)


### Chrome94以下：
1. 安装插件[Ignore X-Frame headers](https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe)
2. 根据[教程](https://juejin.cn/post/7073447264756170765)修改Cookie SameSite跨站限制

## 连接Cydarm
和连接Wazuh方法类似，替换src/views/cydarm/index.vue中的your_ip部分即可。

## 查看摄像头页面人脸识别数据  
### Firefox  
打开页面，按F12（或单击鼠标右键-检查）打开开发者工具，依次点击“存储”选项卡-“本地存储”，点击对应的页面网址，即可看到对应时间以及json格式的人脸识别数据  

### Chrome94以下
1.安装插件[Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb)  
2.打开页面，按F12（或单击鼠标右键-检查）打开开发者工具，点击“Storage Explore”选项卡，在那里可以查看、编辑和导出对应时间以及json格式的人脸识别数据。  

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)



## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
