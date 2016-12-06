/**
 * Created by Monyk on 05.11.2016.
 */

import * as Router from 'koa-router';
import { Context } from 'koa';
import {User} from '../models/models';
import authMiddleware from '../middlewares/AuthMiddleware';

const UserController = new Router()

// UserController.use(authMiddleware)

UserController

    .get('/users',
    authMiddleware,
    async (ctx: Context) => {
        ctx.body = await User.findAll({raw: true, order: 'id'})
    })

    .get('/users/:id',
    async (ctx) => {
        let id = ctx.params.id
        ctx.body = await User.findById(id, { raw: true })
    })

    .put('/users/:id',
    async (ctx: Context) => {
        let id = ctx.params.id
        let user = ctx.request.body
        const foundUser = await User.findById(id)//todo: restring access
        if (foundUser) {
            ctx.body = (await foundUser.update(user)).get()
        }
        ctx.body = { success: false, message: 'User not found' }
    })

export default UserController

