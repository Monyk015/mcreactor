/**
 * Created by Monyk on 05.11.2016.
 */

import * as Router from 'koa-router';
import {Context} from 'koa';
import {User, Subscription, Tag, Ban, Post} from '../models/models';
import authMiddleware from '../middlewares/AuthMiddleware';
import getPosts from "../lib/post";
import adminMiddleware from "../middlewares/AdminMiddleware";

const UserController = new Router()

// UserController.use(authMiddleware)

UserController
    
    .get('/user',
        authMiddleware(),
        async(ctx: Context) => {
            ctx.body = await User.findAll({raw: true, order: 'id'})
        })
    
    .get('/user/:id',
        async(ctx) => {
            let id = ctx.params.id
            ctx.body = await User.findById(id)
        })
    
    .put('/user/:id',
        async(ctx: Context) => {
            let id = ctx.params.id
            let user = ctx.request.body
            const foundUser = await User.findById(id)
            if (foundUser)
            {
                ctx.body = (await foundUser.update(user)).get()
            }
            ctx.body = {success: false, message: 'User not found'}
        })
    
    .get('/user/:id/subscriptions',
        async(ctx) => {
            let id = ctx.params.id
            let subscriptions = await Subscription.findAll({
                where: {
                    UserId: id
                },
                include: [Tag]
            })
            let bans = await Ban.findAll({
                where: {
                    UserId: id
                },
                include: [Tag]
            })
            ctx.body = {success: true, subscriptions: subscriptions, bans: bans}
        })
    
    .get('/user/:id/tag/:tagId/subscribe',
        async(ctx) => {
            try
            {
                let userId = ctx.params.id
                let tagId = ctx.params.tagId
                await Ban.destroy({
                    where: {
                        UserId: userId,
                        TagId: tagId
                    }
                })
                await Subscription.create({
                    UserId: userId,
                    TagId: tagId
                })
            }
            catch (e)
            {
                ctx.body = {success: false, message: 'Something went wrong'}
                return
            }
            ctx.body = {success: true}
        })
    
    .get('/user/:id/tag/:tagId/unsubscribe',
        async(ctx) => {
            try
            {
                let userId = ctx.params.id
                let tagId = ctx.params.tagId
                await Subscription.destroy({
                    where: {
                        UserId: userId,
                        TagId: tagId
                    }
                })
            }
            catch (e)
            {
                ctx.body = {success: false, message: 'Something went wrong'}
                return
            }
            ctx.body = {success: true}
        })
    
    .get('/user/:id/tag/:tagId/ban',
        async(ctx) => {
            try
            {
                let userId = ctx.params.id
                let tagId = ctx.params.tagId
                await Subscription.destroy({
                    where: {
                        UserId: userId,
                        TagId: tagId
                    }
                })
                await Ban.create({
                    UserId: userId,
                    TagId: tagId
                })
            }
            catch (e)
            {
                ctx.body = {success: false, message: 'Something went wrong'}
                return
            }
            ctx.body = {success: true}
        })
    
    .get('/user/:id/tag/:tagId/unban',
        async(ctx) => {
            try
            {
                let userId = ctx.params.id
                let tagId = ctx.params.tagId
                await Ban.destroy({
                    where: {
                        UserId: userId,
                        TagId: tagId
                    }
                })
            }
            catch (e)
            {
                ctx.body = {success: false, message: 'Something went wrong'}
                return
            }
            ctx.body = {success: true}
        })
    
    .get('/user/:id/ban',
        authMiddleware(),
        adminMiddleware,
        async(ctx) => {
            let id = ctx.params.id
            await User.update({
                isBanned: true
            }, {
                where: {
                    id: id
                }
            })
            await Post.destroy({
                where: {
                    UserId: id
                }
            })
            ctx.body = {success: true}
        })
    
    .get('/user/:id/unban',
        authMiddleware(),
        adminMiddleware,
        async(ctx) => {
            let id = ctx.params.id
            await User.update({
                isBanned: false
            }, {
                where: {
                    id: id
                }
            })
            ctx.body = {success: true}
        })

export default UserController

