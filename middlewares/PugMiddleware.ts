import { Middleware, MiddlewareInterface} from 'routing-controllers';
import {Context} from 'koa'
import {Response} from '~koa/lib/response'

const pug = require('pug');
const path = require('path');
const defaults = require('lodash.defaults');

@Middleware()
export class PugMiddleware implements MiddlewareInterface {

    use(ctx: Context, next: (err?: any) => Promise<any>): Promise<any> | null 
	    {
	        ctx.response.render = function (file) {
	        ctx.body = pug.renderFile(path.resolve('../views', file + '.pug'), defaults({}))
	    }
	    return next()
    }
}