const contentService = require ('../service/content.service');

class CommentController {
  async create (ctx, next) {
    const {momentId, content} = ctx.request.body;
    const {id} = ctx.user;
    const result = await contentService.create (momentId, content, id);
    ctx.body = result;
  }

  async reply (ctx, next) {
    const {momentId, content} = ctx.request.body;
    const {commentId} = ctx.params;
    const {id} = ctx.user;
    const result = await contentService.reply (momentId, content, id, commentId);
    ctx.body = result;
  }

  async update (ctx, next) {
    const {content} = ctx.request.body;
    const {commentId} = ctx.params;
    const result = await contentService.update (commentId, content );
    ctx.body = result;
  }
  async remove(ctx, next){
    const { commentId } = ctx.params;
    const result = await contentService.remove(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { momentid } = ctx.query;
    const result = await contentService.getCommentsByMomentId(momentid);
    ctx.body = result;
  }
}

module.exports = new CommentController ();