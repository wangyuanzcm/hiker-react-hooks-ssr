import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import { Routes,routes } from "./router";
import {Provider} from 'react-redux';
import {createServerStore} from './store'

export default (ctx) => {
  return new Promise((resolve) => {
    const store = createServerStore();
    console.log(store.getState(),"store中的值")
    const promises = [];
    routes.some(route=>{
      if(route.path===ctx.request.path&&route.loadData){
        promises.push(route.loadData())
      }
    })
    Promise.all(promises).then(res=>{
      console.log("服务端数据",res);
      res[0]&&(ctx.window = res[0].data.data);
      resolve(<Provider store={store}><Router location={ctx.request.url}>{Routes()}</Router></Provider>);
    })
  });
};
