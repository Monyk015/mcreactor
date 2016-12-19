import authMiddleware from '../middlewares/AuthMiddleware';
import {Commentary, CommentaryRate, Tag, User, Post} from '../models/models';
import {Context} from '~koa/lib/context';
import * as Router from 'koa-router';

const CommentController = new Router()

CommentController
    
    .post('/post/:id/comment',
        authMiddleware,
        async(ctx) =>
        {
            try
            {
                let commentary = ctx.request.body
                commentary.PostId = ctx.params.id
                commentary.UserId = ctx.user.id
                await Commentary.create(commentary)
                let comments = await Commentary.findAll({
                    where: {
                        PostId: commentary.PostId
                    },
                    include: [User]
                })
                ctx.body = {success: true, message: 'comment created', comments: comments}
            }
            catch (e)
            {
                ctx.body = {success: false, message: `something went wrong: ${e}`}
            }
        })
    
    .get('/comment/:id/rate/:rate',
        authMiddleware,
        async(ctx) =>
        {
            let id = ctx.params.id
            let rate = ctx.params.rate
            let previousRate = await CommentaryRate.findOne({
                where: {
                    CommentaryId: id,
                    UserId: ctx.user.id
                },
                include: [Commentary, User]
            })
            if (previousRate)
            {
                previousRate.User.rating -= previousRate.rate
                previousRate.Commentary.rating -= previousRate.rate
                if (rate == 'neutral')
                {
                    await previousRate.destroy()
                }
                else
                {
                    previousRate.rate = (rate == 'like' ? 1 : -1)
                    previousRate.User.rating += previousRate.rate
                    previousRate.Commentary.rating += previousRate.rate
                    await previousRate.save()
                }
                await previousRate.User.save()
                await previousRate.Commentary.save()
                ctx.body = {success: true, rating: previousRate.Commentary.rating}
            }
            else if (rate != 'neutral')
            {
                let newRate = await CommentaryRate.create(<any>{
                    rate: (rate == 'like' ? 1 : -1),
                    UserId: ctx.user.id,
                    CommentaryId: id
                })
                let commentary = await Commentary.findById(id, {
                    include: [User]
                })
                commentary.User.rating += newRate.rate
                commentary.rating += newRate.rate
                await newRate.save()
                await commentary.save()
                await commentary.User.save()
                ctx.body = {success: true, rating: commentary.rating}
            }
        })


export default CommentController
