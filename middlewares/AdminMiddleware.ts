import { Context } from 'koa';

 const adminMiddleware = (context: Context, next: (err?: any) => Promise<any>): Promise<any> | null => {
        if (context.user && context.user.isAdmin) 
        {
            return next()
        }
        context.status = 403
        context.body = '403 Forbidden'
        return
    }

export default adminMiddleware
