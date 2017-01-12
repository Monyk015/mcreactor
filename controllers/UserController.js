/**
 * Created by Monyk on 05.11.2016.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Router = require("koa-router");
const models_1 = require("../models/models");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const AdminMiddleware_1 = require("../middlewares/AdminMiddleware");
const UserController = new Router();
// UserController.use(authMiddleware)
UserController
    .get('/user', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = yield models_1.User.findAll({ raw: true, order: 'id' });
}))
    .get('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    ctx.body = yield models_1.User.findById(id);
}))
    .put('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    let user = ctx.request.body;
    const foundUser = yield models_1.User.findById(id);
    if (foundUser) {
        ctx.body = (yield foundUser.update(user)).get();
    }
    ctx.body = { success: false, message: 'User not found' };
}))
    .get('/user/:id/subscriptions', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    let subscriptions = yield models_1.Subscription.findAll({
        where: {
            UserId: id
        },
        include: [models_1.Tag]
    });
    let bans = yield models_1.Ban.findAll({
        where: {
            UserId: id
        },
        include: [models_1.Tag]
    });
    ctx.body = { success: true, subscriptions: subscriptions, bans: bans };
}))
    .get('/user/:id/tag/:tagId/subscribe', (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = ctx.params.id;
        let tagId = ctx.params.tagId;
        yield models_1.Ban.destroy({
            where: {
                UserId: userId,
                TagId: tagId
            }
        });
        yield models_1.Subscription.create({
            UserId: userId,
            TagId: tagId
        });
    }
    catch (e) {
        ctx.body = { success: false, message: 'Something went wrong' };
        return;
    }
    ctx.body = { success: true };
}))
    .get('/user/:id/tag/:tagId/unsubscribe', (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = ctx.params.id;
        let tagId = ctx.params.tagId;
        yield models_1.Subscription.destroy({
            where: {
                UserId: userId,
                TagId: tagId
            }
        });
    }
    catch (e) {
        ctx.body = { success: false, message: 'Something went wrong' };
        return;
    }
    ctx.body = { success: true };
}))
    .get('/user/:id/tag/:tagId/ban', (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = ctx.params.id;
        let tagId = ctx.params.tagId;
        yield models_1.Subscription.destroy({
            where: {
                UserId: userId,
                TagId: tagId
            }
        });
        yield models_1.Ban.create({
            UserId: userId,
            TagId: tagId
        });
    }
    catch (e) {
        ctx.body = { success: false, message: 'Something went wrong' };
        return;
    }
    ctx.body = { success: true };
}))
    .get('/user/:id/tag/:tagId/unban', (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = ctx.params.id;
        let tagId = ctx.params.tagId;
        yield models_1.Ban.destroy({
            where: {
                UserId: userId,
                TagId: tagId
            }
        });
    }
    catch (e) {
        ctx.body = { success: false, message: 'Something went wrong' };
        return;
    }
    ctx.body = { success: true };
}))
    .get('/user/:id/ban', AuthMiddleware_1.default(), AdminMiddleware_1.default, (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    yield models_1.User.update({
        isBanned: true
    }, {
        where: {
            id: id
        }
    });
    yield models_1.Post.destroy({
        where: {
            UserId: id
        }
    });
    ctx.body = { success: true };
}))
    .get('/user/:id/unban', AuthMiddleware_1.default(), AdminMiddleware_1.default, (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    yield models_1.User.update({
        isBanned: false
    }, {
        where: {
            id: id
        }
    });
    ctx.body = { success: true };
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserController;
//# sourceMappingURL=UserController.js.map