# hiker-react-hooks-ssr

主要技术栈：`react hooks`,`koa`,`webpack`

## 实现目标：  
- 前后端使用同一套代码进行开发  
- 把webpack基本配置封装到cli里面去,每次由cli工具进行启动，避免每次配置webapck的繁琐
同时提供额外配置webpack的功能。
- 支持http和https切换调试

## 项目实现设计流程：  
- 客户端：
    react redux（recoil） hooks 使用usecontext和useReducer来模拟redux
- 服务端：
    - koa服务搭建
    - ssr处理，（路由处理，数据预获取）

## 涉及的问题： 
- 解决同构代码中大量的环境判断的问题
- 首页页面数据预获取，数据如何同构
-[] 构建的时候对包的体积进行分析
    分析：是否提供一个单独的命令对webpack打成的包进行分析
参考文档：
- [同构渲染](https://zhuanlan.zhihu.com/p/114275951Node)

将常用库（react,react-dom）单独打包,以便于文件缓存重用
使用npm i -D webpack-parallel-uglify-plugin启用多线程并行压缩JS
webpack配置接入CDN
接入CDN会引入多个域名，增加域名解析时间，可进行预解析域名<link rel="dns-prefetch" href="//js.dns.com" />
使用Koa Static Cache代替koa-static，增加页面的缓存。
在webpack和后端开启gzip压缩，减小文件体积
使用中间件记录每次服务端响应的时间
服务端打印日志，记录每次的请求信息

请求缓存：
前端部分：
前端设置http缓存,前端设置html页面缓存方法：静态的html页面想要设置使用缓存需要通过HTTP的META设置expires和cache-control
<meta http-equiv="Cache-Control" content="max-age=7200" />
 <meta http-equiv="Expires" content="Mon, 20 Jul 2013 23:00:00 GMT" />
服务器端设置缓存：
    对于接口的缓存：
        Redis + Node.js: 请求缓存
        https://blog.csdn.net/bdss58/article/details/53590393
    
    对于静态文件的缓存
        nodejs篇-http缓存
        https://segmentfault.com/a/1190000037654659


webpack打包的缓存处理
https://segmentfault.com/a/1190000008912289



使用splitChunks将react，react-dom单独分割加载
https://www.jianshu.com/p/65d8f9a2986e
最初，chunks（以及内部导入的模块）是通过内部 webpack 图谱中的父子关系关联的。CommonsChunkPlugin 曾被用来避免他们之间的重复依赖，但是不可能再做进一步的优化

webpack 将根据以下条件自动拆分 chunks：

新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
当按需加载 chunks 时，并行请求的最大数量小于或等于 30
当加载初始化页面时，并发请求的最大数量小于或等于 30
当尝试满足最后两个条件时，最好使用较大的 chunks。



Code Splitting：在react-router来分割代码

    https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md






splitChunks.maxSize 
number = 0

使用 maxSize（每个缓存组 optimization.splitChunks.cacheGroups[x].maxSize 全局使用 optimization.splitChunks.maxSize 或对后备缓存组 optimization.splitChunks.fallbackCacheGroup.maxSize 使用）告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分。 这些较小的部分在体积上至少为 minSize（仅次于 maxSize）。 该算法是确定性的，对模块的更改只会产生局部影响。这样，在使用长期缓存时就可以使用它并且不需要记录。maxSize 只是一个提示，当模块大于 maxSize 或者拆分不符合 minSize 时可能会被违反。

当 chunk 已经有一个名称时，每个部分将获得一个从该名称派生的新名称。 根据 optimization.splitChunks.hidePathInfo 的值，它将添加一个从第一个模块名称或其哈希值派生的密钥。

maxSize 选项旨在与 HTTP/2 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度。

