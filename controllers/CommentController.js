"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const models_1 = require("../models/models");
const Router = require("koa-router");
const CommentController = new Router();
CommentController
    .post('/post/:id/comment', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let commentary = ctx.request.body;
        commentary.PostId = ctx.params.id;
        commentary.UserId = ctx.user.id;
        yield models_1.Commentary.create(commentary);
        let comments = yield models_1.Commentary.findAll({
            where: {
                PostId: commentary.PostId
            },
            include: [models_1.User]
        });
        ctx.body = { success: true, message: 'comment created', comments: comments };
    }
    catch (e) {
        ctx.body = { success: false, message: `something went wrong: ${e}` };
    }
}))
    .get('/comment/:id/rate/:rate', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    let rate = ctx.params.rate;
    let previousRate = yield models_1.CommentaryRate.findOne({
        where: {
            CommentaryId: id,
            UserId: ctx.user.id
        },
        include: [models_1.Commentary, models_1.User]
    });
    if (previousRate) {
        previousRate.User.rating -= previousRate.rate;
        previousRate.Commentary.rating -= previousRate.rate;
        if (rate == 'neutral') {
            yield previousRate.destroy();
        }
        else {
            previousRate.rate = (rate == 'like' ? 1 : -1);
            previousRate.User.rating += previousRate.rate;
            previousRate.Commentary.rating += previousRate.rate;
            yield previousRate.save();
        }
        yield previousRate.User.save();
        yield previousRate.Commentary.save();
        ctx.body = { success: true, rating: previousRate.Commentary.rating };
    }
    else if (rate != 'neutral') {
        let newRate = yield models_1.CommentaryRate.create({
            rate: (rate == 'like' ? 1 : -1),
            UserId: ctx.user.id,
            CommentaryId: id
        });
        let commentary = yield models_1.Commentary.findById(id, {
            include: [models_1.User]
        });
        commentary.User.rating += newRate.rate;
        commentary.rating += newRate.rate;
        yield newRate.save();
        yield commentary.save();
        yield commentary.User.save();
        ctx.body = { success: true, rating: commentary.rating };
    }
}))
    .get('/comment/:id/delete', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let commentId = ctx.params.id;
    yield models_1.Commentary.destroy({
        where: {
            id: commentId
        }
    });
    ctx.body = { success: true };
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentController;
//# sourceMappingURL=CommentController.js.map