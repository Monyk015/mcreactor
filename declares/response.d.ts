declare module '~koa/lib/response' {
    export interface Response {
        render?: (String) => any
    }
}
