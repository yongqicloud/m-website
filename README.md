# Project-Liyongqi-M-Website

#### 介绍

**猫耳FM**

一个二次元的FM网站

#### 软件架构
RMVC
    r:Router
    m:Modules
    v:views
    c:Controllers
#### 实现业务
###### 1、主页(推荐页)板块动态渲染
    `首页可视区采用静态数据加载（优化用户体验）`
    `视口以外动态加载`
    `排行榜` `更多`
###### 2、音单
    `手动点击加载更多按钮`
###### 3、板块
    `点击跳转音单列表` `效果同推荐页面的'更多'`
###### 4、详情页
    `视频` `音频`
    `手写媒体播放控件` `视(音)频的播放暂停` `进度条拖拽与控制时间` `全屏、缩放`
###### 5、搜索
    `调用接口`
#### 技术要点
**项目**
    gulp工程化管理工具
    gitee 代码托管
    gulp-sass && node-sass编译工具
    http-proxy-middleware 中间件接口代理工具
    webpack-stream 打包工具
    art-template 模板引擎
    moment 日期处理插件
    ...
**页面布局**
    `适用于市场上现有的95%以上的移动端`
    rem布局
    100%布局
    yo框架
**逻辑层**
    SPA(single page application) 单页面应用
    路由中转:整个项目只有一个入口文件，即index.html;


