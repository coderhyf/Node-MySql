const jwt = require ('jsonwebtoken');
const errorTypes = require ('../constants/error-types');
const userService = require ('../service/user.service');
const md5Password = require ('../utils/password-handle');
const {PUBLIC_KEY} = require ('../app/config');
const authService = require ('../service/auth.service');
const verifyLogin = async (ctx, next) => {
  // 获取用户名、密码
  const {name, password} = ctx.request.body;
  // 判断用户名是否为空
  if (!name || !password) {
    const error = new Error (errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit ('error', error, ctx)
  }
  // 判断用户名是否存在
  const result = await userService.getUserByName (name);
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
    const error = new Error (errorTypes.UNAUTHORIZATION);
    return ctx.app.emit ('error', error, ctx);
  }
  const token = authorization.replace ('Bearer ', '');
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify (token, PUBLIC_KEY, {algorithms: ["RS256"]});
    ctx.user = result;
    await next ();
  } catch (err) {
    const error = new Error (errorTypes.UNAUTHORIZATION);
    ctx.app.emit ('error', error, ctx);
  }
}
const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware~");

  // 1.获取参数 { commentId: '1' }
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;

  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkMoment(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}