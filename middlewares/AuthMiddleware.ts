import { Middleware, MiddlewareInterface} from 'routing-controllers';
import {Context} from 'koa'
import { UserAttribute } from '../models/User';
import { verifyToken } from '../config/jwt';





const authMiddleware =  (context: Context, next: (err?: any) => Promise<any>): Promise<any> | null  => {
        let token = false
        if(context.cookie)
            token = context.cookie.token
        if(token)
        {
            const user : UserAttribute | boolean = verifyToken(token.toString())
            if(user)
            {
                context.user = user
                return next()
            }
        }
        context.response.status = 403
        context.response.body = '403 Forbidden'
        return
    }

export default authMiddleware
