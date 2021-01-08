const Koa = require ("koa");
const bodyparser = require ('koa-bodyparser');
const cors = require('@koa/cors');
const userRouter = require ('../router');
const errorHandler = require ('./error-handle');
const app = new Koa ();
app.useRoutes = userRouter;
app.use (cors ());
app.use (bodyparser ());

app.useRoutes();
app.on ('error', errorHandler);
module.exports = app;