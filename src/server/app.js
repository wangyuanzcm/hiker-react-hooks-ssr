const Koa = require("koa");
const server = require('koa-static');
var staticCache = require("koa-static-cache");

const { resolve } = require("path");

const app = new Koa();
app.use(async (ctx, next) => {
  // 记录服务器响应时间的中间件
  let stime = new Date().getTime(); // 记录当前时间戳
  await next(); // 事件控制权中转
  let endTime = new Date().getTime(); // 所有中间件执行完成后记录当前时间
  console.log(`请求地址: ${ctx.path}，响应时间：${endTime - stime}ms`);
});

const router = require("./router");
router(app);

// app.use(server(resolve(__dirname,'../../dist')));
app.use(
  staticCache(resolve(__dirname, "../../dist"), {
    maxAge: 7 * 24 * 60 * 60,
    gzip: true, //开启
    dynamic: true,
  })
);
app.listen(3000, () => {
  console.log("running 3000");
});
