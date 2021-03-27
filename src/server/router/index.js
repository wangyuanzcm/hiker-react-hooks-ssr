const Router = require("@koa/router");
const router = new Router();
const { resolve } = require("path");
const { renderToString } = require("react-dom/server");

const fs = require("fs");
const template = fs.readFileSync(
  resolve(__dirname, "../../../dist/index.html"),
  "utf-8"
);
const handleTemplate = (template) => {
  return (props) =>
    template.replace(
      '<div id="app"></div>',
      `<div id="app">${props.html}</div>${props.store}`
    );
};

const ServerBundle = require("../../../dist/server.bundle").default;
module.exports = (app) => {
  router.get(["/", "/about"], async (ctx, next) => {
    const render = handleTemplate(template);

    const jsx = await ServerBundle(ctx);
    const html = renderToString(jsx);
    ctx.body = render({
      html,
      store: `<script>window.REDUX_STATE = ${JSON.stringify(
        ctx.window
      )}</script>`,
    });
  });
  app.use(router.routes()).use(router.allowedMethods());
};
