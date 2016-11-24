import { UserAttribute } from '../models/User';
declare module '~koa/lib/request' {
    export interface Request {
        user?: UserAttribute
    }
}
