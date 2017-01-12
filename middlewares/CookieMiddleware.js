"use strict";
const cookieMiddleware = (context, next) => {
    const cookieHeader = context.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        context.cookie = {};
        cookies.forEach(function (item) {
            const crumbs = item.split('=');
            if (crumbs.length > 1)
                context.cookie[crumbs[0].trim()] = crumbs[1].trim();
        });
    }
    return next();
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cookieMiddleware;
//# sourceMappingURL=CookieMiddleware.js.map