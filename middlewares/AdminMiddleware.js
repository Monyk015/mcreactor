"use strict";
const adminMiddleware = (context, next) => {
    if (context.user && context.user.isAdmin) {
        return next();
    }
    context.status = 403;
    context.body = '403 Forbidden';
    return;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminMiddleware;
//# sourceMappingURL=AdminMiddleware.js.map