import { MiddlewareGlobalBefore, MiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa'

@MiddlewareGlobalBefore()
export class CookieMiddleware implements MiddlewareInterface {

    use(context: Context, next: (err?: any) => Promise<any>): Promise<any> | null {
        const cookieHeader = context.headers.cookie;
        if (cookieHeader) {
            const cookies = cookieHeader.split(';');
            context.cookie = {};
            cookies.forEach(function (item) {
                const crumbs = item.split('=');
                if (crumbs.length > 1) context.cookie[crumbs[0].trim()] = crumbs[1].trim();
            });
        }
        return next()
    }
}
