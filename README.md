# react+router+redux+antd 后台管理系统框架

## 项目环境

    nodejs 8.x+ 环境，windows直接在官网下载安装包安装，
    mac可以使用homebrew安装，也可以去node官网下载安装包安装

    可选：yarn 去官网下载安装包，mac也可以使用homebrew安装

## 项目启动与打包

    第一次将项目拉到本地，
        需要先安装依赖（在项目根目录下运行： npm i 命令[这步骤比较慢，要等等]）
        依赖安装完成后再运行（npm run build:dll）
        注：不建议使用cnpm，有bug，建议使用yarn

    本地启动项目:开发环境（npm run start|dev)
    本地启动项目:生产环境（npm run start|dev:prd)
    打测试包（npm run build:test）
    打生产包 (npm run build:prd)

    关于启动其他定制化渠道的配置只要在开发命令和打包命令后面加上配置的渠道名称就好
    例如：npm run start {site} --project {project}
         npm run build:test {site} --project {project}
         npm run build:prd {site} --project {project}


## yarn的使用

    yarn安装依赖的速度要比npm快点，
    安装完成后，之前使用npm i 的命令就可以使用yarn 或者 yarn install去替代

## 项目结构

    业务代码放在src/client下面

    /app 是外层容器

    /business 是放置复杂的业务逻辑（简单的业务逻辑在action中可以完成就无需放在此处
        权限管理模块放置在此文件夹中

    /common 放置公共配置，数据，业务等

    /iconfont 是图标文件夹

    /image 图片文件夹

    /layout 系统的UI布局，包括头部，脚部，菜单栏，登陆页面
        /layout/Login 登陆页面的UI 业务是放在这里的

    /mock mock数据文件夹

    /pages  业务页面，存放每个页面的style，action，reducer，components

    /redux 主要放置redux自动注入脚本和暴露对象配置

    /buildConfig/site/{site}/route 路由配置
    
    /buildConfig/site/{site}/menuConfig 菜单配置

    /service 调用API层

    /buildConfig
        /site 同一个项目会对不同的环境或渠道开放，这里是存放不同的渠道配置比如菜单配置、路由配置、项目配置等等
        /defaultConfig 默认项目，site，pwa配置

    /utils 工具库
        /axiosInit.js 这里是初始化http请求配置


## create:page 一键生成页面，绑定redux，配置好route

    根目录运行npm run create:page命令，会在/page下面创建用户输入的名称的文件夹，
    创建好index.js,actions.js,constants.js,style.scss,reducer.js
    这些创建好的文件是以/script/createPage/template 下的文件为模板创建的

    然后会自动的帮你绑定好redux，配置好route，默认将路由配置为根路由的子路由


## 如何使页面看到

    在你create:page之后，需要将你的page添加到菜单中
    添加到菜单：在/buildConfig/site/{site}/menuConfig.js
    定义好你用的菜单属性key，icon，text，link（page在路由中配置的path值）


## 使用redux

    在项目的页面中，有page模板，每一个page文件中有actions和reducer,constants（可以参考/common>/user中的模板）
    想要使用这些actions和reducer数据，得先将actions和reducer暴露出来
    在/redux/index.js中导入actions和reducer并添加进allActions和allReducer中
    然后在页面中引入'@inject'依赖，然后使用注解的方式[@inject('user')]导入你需要的redux


## 使用mock数据

    mock数据使用了mockjs依赖，在你写好一个页面的mock后（mock文件放在/mock中），
    将其引入到页面，页面中的请求就会自动匹配拦截，不引入就不会使用mock数据
    mockjs支持使用简单的语法模板去生成数据，具体语法可以参考mockjs官网文档

## 服务端需要的设置

    框架默认使用的是browserHistory的单页面应用，所以如果使用browserHistory
    在服务端需要设置将所以的路由都跳转到index.html页面
    建议服务端开启gzip压缩，提高用户体验

## 关于router

    脚手架包装了react-router,
    路由切换配置在/route/react-router.js中，
    如果在项目中需要使用browserHistory或者hashHistory
    建议如下使用
    import { history } from '@react-router'

    history.push(path);
    history.replace(path);
    ...


## 默认site配置

    /buildConfig/defaultConfig.js
    defaultSite: 配置默认渠道
    defaultProject: 配置默认项目文件
    pwa: pwa开关，这个要本地开发或者https环境才能用，没有可以关掉

## 如何删除一个页面

    1,删除page中的页面文件
    2,删除/redux/index中这个页面的引用
    3,删除/buildConfig/site/{site}/route.js中的页面路由配置
    4,删除/buildConfig/site/{site}/menuConfig.js中的页面菜单配置



