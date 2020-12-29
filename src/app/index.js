const Koa = require ("koa");
const bodyparser = require ('koa-bodyparser');

const userRouter = require ('../router/user.router');
const errorHandler = require ('./error-handle');
const app = new Koa ();
app.use (bodyparser ())
app.use (userRouter.routes ());
app.use (userRouter.allowedMethods ());
app.on ('error', errorHandler);
module.exports = app;