# hiker-react-hooks-ssr

react同构的原型项目

主要技术栈：`react hooks`,`koa`,`webpack`

## 实现目标：  
- 前后端使用同一套代码进行开发  
- 把webpack基本配置封装到cli里面去,每次由cli工具进行启动，避免每次配置webapck的繁琐
同时提供额外配置webpack的功能。
- 支持http和https切换调试

## 项目优化
- 打包优化：
    - [ ] 将常用库（react,react-dom）单独打包,以便于文件缓存重用
    - [ ] 在wepack中使用使用多线程加快打包速度
    ```
        使用npm i -D webpack-parallel-uglify-plugin启用多线程并行压缩JS
    ```
  -  [ ] webpack打包开启gzip压缩，压缩代码体积，
        > 将压缩后的资源连同源文件放入资源服务器支持gzip的浏览器会   
        > 检查资源是否有gz的后缀，如果有的话会自动加载。
    - [ ] webpack编译文件添加hash，避免编译后缓存,
        > 如何添加hash？如何保证添加hash之后服务器可以读取到最新的文件？尚未完成   
        > 可以参考文档：[webpack分包分析及SplitChunksPlugin实用指南](https://www.jianshu.com/p/65d8f9a2986e)  
        > 还有这个文档（[webpack独立打包与缓存处理](https://segmentfault.com/a/1190000008912289)），api已经过期，但是还是可以参考。
    - [ ] 开启Scope Hoistion,即作用域提升;
        > 原理：分析模块间的依赖关系，尽可能的将零散的模块合并到一个函数中去，前提不能造成代码冗余，因此只有被引用了一次的模块才能被合并。
        > 接入好处：  
        > - 代码体积减少  
        > - 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小
        ```
        const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
        plugins: [
            new ModuleConcatPlugin(), //开启scope Hoisting
        ],
        ```
    - [ ] web可视化查看构建分析：[性能优化篇---Webpack构建速度优化](https://segmentfault.com/a/1190000018493260)
        > 输出Webpack构建信息的.json文件：webpack --profile --json > stats.json
        > 借助webpack-bundle-analyzer工具在CI工具里面实现可视化查看

- 开发优化
    - [ ] 接入错误监控系统
    - [ ] 打包文件直接上传测试服务器
    - [ ] Code Splitting：在react-router来分割代码，实现reactRouter按需加载  
        > 参考文档：[Code Splitting](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
    - [ ] 前端请求缓存：
        > 前端设置html页面缓存方法：静态的html页面想要设置使用缓存需要通过HTTP的META设置expires和cache-control  
        > `<meta http-equiv="Cache-Control" content="max-age=7200" /> `    
        > `<meta http-equiv="Expires" content="Mon, 20 Jul 2013 23:00:00 GMT" />`  
    - [ ] 使用splitChunks将react，react-dom单独分割加载，这部分框架代码可以缓存到用户浏览器上面，实现复用
        > splitChunks相对之前到common模块的优势：chunks（以及内部导入的模块）是通过内部 webpack 图谱中的父子关系关联的。CommonsChunkPlugin 曾被用来避免他们之间的重复依赖，但是不可能再做进一步的优化
    - [ ] 对于git commit进行处理，在提交代码之前进行代码静态检查
        > 这里需要eslint

- 代码优化
    - [ ] 接入treeShaking，删除无用代码,待尝试
        > webpack --display-used-exports运行构建带上--display-used-exports可追踪到Tree Shaking的工作；
        > Webpack只能正确的分析出如何剔除死代码，需要接入UglifyJs处理剔除（配置见上）   
    - [ ] 生产环境配置删除console.log等打印信息
    - [ ] 接入CDN会引入多个域名，增加域名解析时间，可进行预解析域名
    ```
    <link rel="dns-prefetch" href="//js.dns.com" />
    ```
- 服务端优化
    - [ ] 使用gzip压缩并且进行缓存,使用Koa Static Cache代替koa-static，增加页面的缓存。
    ```
    app.use(staticCache(resolve(__dirname, "../../dist"), {
        maxAge: 7 * 24 * 60 * 60,
        gzip: true, //开启
        dynamic: true,
    }));
    ```
    - [ ] 使用中间件记录每次服务器响应的时间，及请求的信息打印在日志里面
        > 打印日志是否会影响服务器的性能？[Koa日志中间件封装开发](https://segmentfault.com/a/1190000018433489)
        > 日志持久化存储和定期删除
    - [ ] 在后端设置缓存，
        - [ ] 使用redis对重复的接口进行缓存，参考文档：[Redis + Node.js: 请求缓存](https://blog.csdn.net/bdss58/article/details/53590393)
            >  是否可用？待尝试
        - [ ] 对于静态文件的缓存,参考文档：[nodejs篇-http缓存](https://segmentfault.com/a/1190000037654659)
            > 是否有用？每次请求的文档可能会不一样


## 项目实现设计流程：  
- 客户端：
    react redux（recoil） hooks 使用usecontext和useReducer来模拟redux
- 服务端：
    - koa服务搭建
    - ssr处理，（路由处理，数据预获取）

## 涉及的问题： 
- 解决同构代码中大量的环境判断的问题
- 首页页面数据预获取，数据如何同构
- [ ] 构建的时候对包的体积进行分析
    分析：是否提供一个单独的命令对webpack打成的包进行分析

## sonar静态代码检查

进入网站启动sonar服务，进行代码静态检查，同时可以集成单元测试

这个可以封装到cli工具里面，仅提供sonar-scanner的demo配置文件，具体的话还是需要自己去使用
免费版无法跟git集成使用
扫描命令：
```
sonar-scanner
```

## 参考文档：
- [同构渲染](https://zhuanlan.zhihu.com/p/114275951Node)
- [性能优化篇---Webpack构建代码质量压缩](https://segmentfault.com/a/1190000018644992)
- [性能优化篇---Webpack构建速度优化](https://segmentfault.com/a/1190000018493260)