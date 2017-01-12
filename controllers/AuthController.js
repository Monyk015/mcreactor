"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const models_1 = require("../models/models");
const jwt_1 = require("../config/jwt");
const Router = require("koa-router");
const hash = require('sha256');
const AuthController = new Router();
AuthController
    .get('/login', (ctx) => {
    ctx.body = [];
})
    .post('/login', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const user = ctx.request.body;
    const found = yield models_1.User.findOne({
        where: {
            email: user.email
        },
        include: [
            models_1.Subscription
        ]
    });
    if (found && found.password == hash(user.password))
        ctx.body = { success: true, token: jwt_1.generateToken(found.dataValues) };
    else if (!found)
        ctx.body = { success: false, message: 'Wrong email' };
    else
        ctx.body = { success: false, message: 'Wrong password' };
}))
    .get('/register', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = [];
}))
    .post('/register', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let user = ctx.request.body;
    if (user.password != user.confirmPassword)
        ctx.body = { success: false, message: 'Passwords do not match' };
    user.password = hash(user.password);
    try {
        let createdUser = yield models_1.User.create(user);
    }
    catch (err) {
        console.log(err);
        if (err.name == "SequelizeUniqueConstraintError")
            ctx.body = { success: false, message: 'Email busy' };
        ctx.body = { success: false, message: 'Some error' };
    }
    ctx.body = { success: true, message: '' };
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map