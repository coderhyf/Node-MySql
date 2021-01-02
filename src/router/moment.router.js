const Router = require ('koa-router');
const momentRouter = new Router ({prefix: '/moment'});
const {
  verifyAuth,
  verifyPermission
} = require ('../middleware/auth.middleware');
const {
  create,
  datail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require ('../controller/moment.controller');
const {
  verifyLabelExists
}  = require('../middleware/label.middleware');
momentRouter.post ('/', verifyAuth, create);
momentRouter.get ('/', list);
momentRouter.get ('/:momentId', datail);
momentRouter.patch ('/:momentId', verifyAuth,verifyPermission, update);
momentRouter.delete ('/:momentId', verifyAuth,verifyPermission, remove);
momentRouter.post ('/:momentId/labels', verifyAuth,verifyPermission, verifyLabelExists,addLabels);
// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo);
module.exports = momentRouter;