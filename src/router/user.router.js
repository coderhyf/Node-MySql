const Router = require ('koa-router');
const {
  create,
    avatarInfo
} = require ('../controller/user.controller');
const {verifyUser, handlePassword} = require('../middleware/user.middleware');
const userRouter = new Router ({prefix: '/users'});
// verifyUser 用户名与密码验证, handlePassword密码加密
userRouter.post ('/', verifyUser, handlePassword,create);
userRouter.get ('/:userId/avatar', avatarInfo);

module.exports = userRouter;