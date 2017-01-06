import { UserAttribute, UserModel } from '../models/User';
import { User, Subscription } from '../models/models';
import { generateToken } from '../config/jwt';
import { Request } from '~koa/lib/request';
import { Response } from '~koa/lib/response';
import * as Router from 'koa-router'
import { Context } from 'koa';

const hash = require('sha256')

const AuthController = new Router()

AuthController

    .get('/login',
    (ctx: Context) => {
        ctx.body = []
    })

    .post('/login',
    async (ctx: Context): Promise<any> => {
        const user = ctx.request.body
        const found = await User.findOne({
            where: {
                email: user.email
            },
            include:[
                Subscription
            ]
        })
        if (found && found.password == hash(user.password))
            ctx.body =  { success: true, token: generateToken(found.dataValues) }
        else if (!found)
            ctx.body =  { success: false, message: 'Wrong email' }
        else
            ctx.body = { success: false, message: 'Wrong password' }
    })

    .get('/register',
    async (ctx: Context) => {
        ctx.body = []
    })
    
    .post('/register',
    async (ctx: Context) => {
        let user = ctx.request.body
        if (user.password != user.confirmPassword)
            ctx.body = { success: false, message: 'Passwords do not match' }
        user.password = hash(user.password)
        try {
            let createdUser = await User.create(user)
        }
        catch (err) {
            console.log(err)
            if (err.name == "SequelizeUniqueConstraintError")
                ctx.body =  { success: false, message: 'Email busy' }
            ctx.body =  { success: false, message: 'Some error' }
        }
        ctx.body =  { success: true, message: '' }
    })

export default AuthController
