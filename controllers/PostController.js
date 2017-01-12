"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const PostRate_1 = require("../models/PostRate");
const db_1 = require("../config/db");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const models_1 = require("../models/models");
const Router = require("koa-router");
const post_1 = require("../lib/post");
const AdminMiddleware_1 = require("../middlewares/AdminMiddleware");
const PostController = new Router();
const multer = require('koa-multer');
const upload = multer({ dest: './public/images' });
PostController
    .post('/post', upload.single('image'), AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = ctx.user.id;
        let tags = ctx.req.body.tags
            .split(',')
            .filter(tag => tag != '')
            .map(tag => {
            return { 'name': tag.trim() };
        });
        let image = ctx.req.file ? ctx.req.file.filename : null;
        let post = yield models_1.Post.create({
            content: ctx.req.body.content,
            image: image,
            UserId: userId
        });
        if (tags.length) {
            yield models_1.Tag.bulkCreate(tags, {
                updateOnDuplicate: ['name']
            });
            yield post.setTags(yield models_1.Tag.findAll({
                where: {
                    name: {
                        in: ctx.req.body.tags.split(',').map(tag => tag.trim())
                    }
                }
            }));
        }
        ctx.body = { success: true, message: '' };
    }
    catch (e) {
        ctx.body = { success: false, message: `Something went wrong: ${e}` };
    }
}))
    .get('/post/:id', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    const id = ctx.params.id;
    ctx.body = yield post_1.default(ctx.user ? ctx.user.id : null, {
        id: id
    });
}))
    .get('/post', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = yield post_1.default(ctx.user ? ctx.user.id : null, ctx.user ? {
        id: {
            $notIn: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` in (select `TagId` from `Bans` where `UserId` = " + ctx.user.id + "))")
        }
    } : null); //exclude banned posts when user is logged in
}))
    .get('/best', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = yield post_1.default(ctx.user ? ctx.user.id : null, ctx.user ? {
        id: {
            $notIn: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` in (select `TagId` from `Bans` where `UserId` = " + ctx.user.id + "))")
        },
        rating: {
            $gte: 50
        }
    } : {
        rating: {
            $gte: 50
        }
    }); //exclude banned posts when user is logged in
}))
    .get('/good', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = yield post_1.default(ctx.user ? ctx.user.id : null, ctx.user ? {
        id: {
            $notIn: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` in (select `TagId` from `Bans` where `UserId` = " + ctx.user.id + "))")
        },
        rating: {
            $gte: 20
        }
    } : {
        rating: {
            $gte: 20
        }
    }); //exclude banned posts when user is logged in
}))
    .get('/post/tag/:id', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    ctx.body = yield post_1.default(ctx.user.id, {
        id: {
            $in: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` = " + id + ")")
        }
    });
}))
    .get('/post/user/subscribed', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.user.id;
    ctx.body = yield post_1.default(ctx.user.id, {
        id: {
            $in: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` in (select `TagId` from `Subscriptions` where `UserId` = " + id + "))")
        }
    });
}))
    .get('/post/:id/rate/:rate', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    let rate = ctx.params.rate;
    let previousRate = yield PostRate_1.default.findOne({
        where: {
            PostId: id,
            UserId: ctx.user.id
        },
        include: [models_1.Post, models_1.User]
    });
    if (previousRate) {
        previousRate.User.rating -= previousRate.rate;
        previousRate.Post.rating -= previousRate.rate;
        if (rate == 'neutral') {
            yield previousRate.destroy();
        }
        else {
            previousRate.rate = (rate == 'like' ? 1 : -1);
            previousRate.User.rating += previousRate.rate;
            previousRate.Post.rating += previousRate.rate;
            yield previousRate.save();
        }
        yield previousRate.User.save();
        yield previousRate.Post.save();
        ctx.body = { success: true, rating: previousRate.Post.rating };
    }
    else if (rate != 'neutral') {
        let newRate = yield PostRate_1.default.create({
            rate: (rate == 'like' ? 1 : -1),
            UserId: ctx.user.id,
            PostId: id
        });
        let post = yield models_1.Post.findById(id, {
            include: [models_1.User]
        });
        post.User.rating += newRate.rate;
        post.rating += newRate.rate;
        yield newRate.save();
        yield post.save();
        yield post.User.save();
        ctx.body = { success: true, rating: post.rating };
    }
    else {
        ctx.body = { success: true };
    }
}))
    .get('/user/:id/profile', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let userId = ctx.params.id;
    ctx.body = yield post_1.default(ctx.user ? ctx.user.id : null, {
        UserId: userId
    });
}))
    .get('/post/:id/delete', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let postId = ctx.params.id;
    yield models_1.Post.destroy({
        where: {
            id: postId
        }
    });
    ctx.body = { success: true };
}))
    .post('/post/filter', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let filter = ctx.request.body;
    let whereClause = {};
    if (filter.tagsArray && filter.tagsArray.length) {
        filter.tags = filter.tagsArray
            .filter(tag => tag != '')
            .map(tag => "'" + tag.trim() + "'");
        whereClause.id = {
            $in: db_1.default.literal(" (select `Posts`.`id` from `Posts` " +
                "where (select count(`TagId`) from `PostTag` inner join `Tags` on `Tags`.`id` = `PostTag`.`TagId` " +
                "where `PostTag`.`PostId` = `Posts`.`id` and `Tags`.`name` in (" + filter.tags.join(',') + ") ) = " + filter.tags.length + " ) ")
        };
    }
    if (filter.content)
        whereClause.content = {
            $like: `%${filter.content}%`
        };
    if (filter.dateFrom || filter.dateTo) {
        whereClause.createdAt = {};
        if (filter.dateFrom)
            whereClause.createdAt.$gte = new Date(filter.dateFrom);
        if (filter.dateTo) {
            let date = new Date(filter.dateTo);
            date.setHours(23, 59, 59, 0);
            whereClause.createdAt.$lte = date;
        }
    }
    if (filter.ratingTo || filter.ratingFrom) {
        whereClause.rating = {};
        if (filter.ratingTo)
            whereClause.rating.$lte = filter.ratingTo;
        if (filter.ratingFrom)
            whereClause.rating.$gte = filter.ratingFrom;
    }
    console.log(whereClause);
    let posts = yield post_1.default(ctx.user ? ctx.user.id : null, whereClause);
    ctx.body = { success: true, posts };
}))
    .get('/stats', AuthMiddleware_1.default(), AdminMiddleware_1.default, (ctx) => __awaiter(this, void 0, void 0, function* () {
    let postCountByDay = yield models_1.Post.findAll({
        attributes: [db_1.default.fn('date', db_1.default.col('createdAt')), db_1.default.fn('count', 'id')],
        group: [db_1.default.fn('date', db_1.default.col('createdAt'))],
        raw: true
    });
    let commentCountByDay = yield models_1.Commentary.findAll({
        attributes: [db_1.default.fn('date', db_1.default.col('createdAt')), db_1.default.fn('count', 'id')],
        group: [db_1.default.fn('date', db_1.default.col('createdAt'))],
        raw: true
    });
    ctx.body = { postCountByDay, commentCountByDay };
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PostController;
//# sourceMappingURL=PostController.js.map