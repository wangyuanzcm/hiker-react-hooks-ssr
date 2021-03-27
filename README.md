# hiker-react-hooks-ssr

react hooks



同构：
前后端公用一套代码，
直出：首屏直出，服务端直接吐出页面

关键点：

- 客户端：
    react redux（recoil） hooks 使用usecontext和useReducer来模拟redux
- 服务端：
    - koa 一系列
    - ssr处理
        路由处理
        数据预获取

把webpack基本配置封装到cli里面去,每次由cli工具进行启动，避免每次配置webapck的繁琐
支持http和https切换调试

https://zhuanlan.zhihu.com/p/114275951Node —— 同构渲染

首页页面数据预获取，数据如何同构
