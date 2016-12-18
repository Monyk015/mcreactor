import authMiddleware from '../middlewares/AuthMiddleware';
import {Commentary, Tag, User, Post} from '../models/models';
import { Context } from '~koa/lib/context';
import * as Router from 'koa-router';

const CommentController = new Router()

CommentController
  
    .post('/post/:id/comment',
    authMiddleware,
    async (ctx) => {
        try{
            let commentary = ctx.request.body
            commentary.PostId = ctx.params.id
            commentary.UserId = ctx.user.id
            await Commentary.create(commentary)
            let comments = await Commentary.findAll({
                where: {
                    PostId:commentary.PostId
                },
                include:[User]
            })
            ctx.body = {success: true, message:'comment created', comments: comments}
        }
        catch(e)
        {
            ctx.body = {success: false, message: `something went wrong: ${e}`}
        }
    })

export default CommentController
