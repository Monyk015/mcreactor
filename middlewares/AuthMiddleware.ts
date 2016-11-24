import { Middleware, MiddlewareInterface} from 'routing-controllers';
import {Context} from 'koa'
import { UserAttribute } from '../models/User';
import { verifyToken } from '../config/jwt';



@Middleware()
export class AuthMiddleware implements MiddlewareInterface {

    use(context: Context, next: (err?: any) => Promise<any>): Promise<any> | null 
    {
        const token = context.cookie.token
        if(token)
        {
            const user : UserAttribute | boolean = verifyToken(token.toString())
            if(user)
            {
                context.request.user = user
                return next()
            }
        }
        context.response.status = 403
        context.response.body = '403 Forbidden'
        return
    }

}
