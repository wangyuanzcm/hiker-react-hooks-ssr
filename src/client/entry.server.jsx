import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import { Routes, routes } from "./router";
import { Provider } from "react-redux";
import { createServerStore } from "./store";

export default (ctx) => {
  return new Promise((resolve) => {
    const store = createServerStore();
    const promises = [];
    let stime = new Date().getTime(); // 记录当前时间戳

    routes.some((route) => {
      if (route.path === ctx.request.path && route.loadData) {
        promises.push(route.loadData());
    
      }
    });
    Promise.all(promises).then((res) => {
      res[0] && (ctx.window = res[0].data.data);
      
      let endTime = new Date().getTime(); // 所有中间件执行完成后记录当前时间
      console.log(`****接口请求响应时间：${endTime - stime}ms*****`);
      resolve(
        <Provider store={store}>
          <Router location={ctx.request.url}>{Routes()}</Router>
        </Provider>
      );
    });
  });
};
