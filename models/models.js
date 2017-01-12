"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const CommentaryRate_1 = require("./CommentaryRate");
exports.CommentaryRate = CommentaryRate_1.default;
const PostRate_1 = require("./PostRate");
exports.PostRate = PostRate_1.default;
const Post_1 = require("./Post");
exports.Post = Post_1.default;
const Commentary_1 = require("./Commentary");
exports.Commentary = Commentary_1.default;
const Tag_1 = require("./Tag");
exports.Tag = Tag_1.default;
const User_1 = require("./User");
exports.User = User_1.default;
const db_1 = require("../config/db");
const Subscription_1 = require("./Subscription");
exports.Subscription = Subscription_1.default;
const Ban_1 = require("./Ban");
exports.Ban = Ban_1.default;
const users_1 = require("../mocks/users");
const fs = require("fs");
Post_1.default.belongsTo(User_1.default);
User_1.default.hasMany(Post_1.default);
User_1.default.hasMany(Commentary_1.default);
Commentary_1.default.belongsTo(User_1.default);
Post_1.default.hasMany(Commentary_1.default, {
    onDelete: 'CASCADE'
});
Commentary_1.default.belongsTo(Post_1.default);
const PostTag = db_1.default.define('PostTag', {}, { tableName: 'PostTag' });
Tag_1.default.belongsToMany(Post_1.default, { through: 'PostTag' });
Post_1.default.belongsToMany(Tag_1.default, { through: 'PostTag' });
PostRate_1.default.belongsTo(Post_1.default);
PostRate_1.default.belongsTo(User_1.default);
Post_1.default.hasMany(PostRate_1.default, {
    onDelete: 'CASCADE'
});
CommentaryRate_1.default.belongsTo(Commentary_1.default);
CommentaryRate_1.default.belongsTo(User_1.default);
Commentary_1.default.hasMany(CommentaryRate_1.default, {
    onDelete: 'CASCADE'
});
Subscription_1.default.belongsTo(User_1.default);
Subscription_1.default.belongsTo(Tag_1.default);
User_1.default.hasMany(Subscription_1.default, {
    onDelete: 'CASCADE'
});
Tag_1.default.hasMany(Subscription_1.default, {
    onDelete: 'CASCADE'
});
Ban_1.default.belongsTo(User_1.default);
Ban_1.default.belongsTo(Tag_1.default);
User_1.default.hasMany(Ban_1.default, {
    onDelete: 'CASCADE'
});
Tag_1.default.hasMany(Ban_1.default);
(() => __awaiter(this, void 0, void 0, function* () {
    yield User_1.default.sync({ force: true });
    yield Post_1.default.sync({ force: true });
    yield Tag_1.default.sync({ force: true });
    yield PostTag.sync({ force: true });
    yield Commentary_1.default.sync({ force: true });
    yield PostRate_1.default.sync({ force: true });
    yield CommentaryRate_1.default.sync({ force: true });
    yield Ban_1.default.sync({ force: true });
    yield Subscription_1.default.sync({ force: true });
    (() => __awaiter(this, void 0, void 0, function* () {
        yield User_1.default.bulkCreate(users_1.default.map(user => {
            user.password = require('sha256')(user.password);
            return user;
        }));
        let query = fs.readFileSync('./mocks/posts.sql', 'utf-8');
        yield db_1.default.query(query);
    }))();
}))();
//# sourceMappingURL=models.js.map