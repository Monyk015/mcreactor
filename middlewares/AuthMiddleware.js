"use strict";
const jwt_1 = require("../config/jwt");
const authMiddleware = (allowNotLoggedIn = false) => {
    return (context, next) => {
        let token = false;
        if (context.cookie)
            token = context.cookie.token;
        if (token) {
            const user = jwt_1.verifyToken(token.toString());
            if (user) {
                context.user = user;
                return next();
            }
        }
        context.user = null;
        if (!allowNotLoggedIn) {
            context.response.status = 403;
            context.response.body = '403 Forbidden';
            return;
        }
        else {
            return next();
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map