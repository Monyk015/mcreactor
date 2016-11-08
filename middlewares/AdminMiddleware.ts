import { Middleware, MiddlewareInterface } from 'routing-controllers';
import { UserAttribute } from '../models/User';
import { Context } from 'koa';
import { verifyToken } from '../config/jwt';
import { AuthMiddleware } from './AuthMiddleware';


@Middleware()
export class AdminMiddleware implements MiddlewareInterface {
    use(context: Context, next: (err?: any) => Promise<any>): Promise<any> | null {
        if (context.request.user && context.request.user.isAdmin) 
        {
            return next()
        }
        context.response.status = 403
        context.response.body = '403 Forbidden'
        return
    }
}
