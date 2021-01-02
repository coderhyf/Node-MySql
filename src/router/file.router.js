const Router = require ('koa-router');
const fileRouter = new Router ({prefix: '/upload'});
const {
  verifyAuth
} = require ('../middleware/auth.middleware');
const {
  avatarHanler,
  pictureHandler,
  pictureResize
} = require ('../middleware/file.middleware');
const {
  saveAvatarInfo,
  savePictureInfo
} = require ('../controller/file.controller')
fileRouter.post ('/avatar', verifyAuth, avatarHanler, saveAvatarInfo);
fileRouter.post ('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);
module.exports = fileRouter;