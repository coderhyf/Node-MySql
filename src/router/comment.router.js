// 发表评论接口/comment
const Router = require ('koa-router');
const commentRouer = new Router ({prefix: '/comment'});
const {
  verifyAuth,
  verifyPermission
} = require ('../middleware/auth.middleware');
const {
  create,
  reply,
  update,
  remove,
  list
} = require ('../controller/comment.controller');

commentRouer.post ('/', verifyAuth, create);
commentRouer.post ('/:commentId/reply', verifyAuth, reply);
commentRouer.patch('/:commentId', verifyAuth, verifyPermission, update);
commentRouer.delete('/:commentId', verifyAuth, verifyPermission, remove);
// 获取评论列表
commentRouer.get('/', list);
module.exports = commentRouer;