const jwt = require ('jsonwebtoken');
const errorTypes = require ('../constants/error-types');
const service = require ('../service/user.service');
const md5Password = require ('../utils/password-handle');
const {PUBLIC_KEY} = require ('../app/config');
const verifyLogin = async (ctx, next) => {
  // 获取用户名、密码
  const {name, password} = ctx.request.body;
  // 判断用户名是否为空
  if (!name || !password) {
    const error = new Error (errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit ('error', error, ctx)
  }
  // 判断用户名是否存在
  const result = await service.getUserByName (name);
  const user = result[0];
  if (!user) {
    const err = new Error (errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit ('error', err, ctx)
  }
  // 判断密码是否与数据库一致
  if (md5Password (password) !== user.password) {
    const err = new Error (errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit ('error', err, ctx)
  }
  ctx.user = user;
  await next ();
}
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {algorithms: ["RS256"]});
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}
module.exports = {verifyLogin, verifyAuth}