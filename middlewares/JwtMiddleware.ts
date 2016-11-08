import { Middleware, MiddlewareInterface} from 'routing-controllers';
import {Context} from 'koa'
import { UserAttribute } from '../models/User';
import { verifyToken } from '../config/jwt';

@Middleware()
export class JwtMiddleware implements MiddlewareInterface {

    use(context: Context, next: (err?: any) => Promise<any>): Promise<any> | null {
        if(context.request.headers['token'])
        {
            const token = context.request.headers['token']
            const user : UserAttribute | boolean = verifyToken(token.toString())
            if(user)
            {
                return next()
            }
        }
        context.response.status = 302
        context.response.body = 'Forbidden'
        return
    }

}