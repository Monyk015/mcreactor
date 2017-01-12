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
function getPosts(userId = null, where = null) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield models_1.Post.findAll({
            where,
            include: [
                {
                    model: models_1.PostRate,
                    where: userId ? {
                        UserId: userId
                    } : null,
                    required: false
                },
                models_1.Tag,
                models_1.User,
                {
                    model: models_1.Commentary,
                    include: [models_1.User, {
                            model: models_1.CommentaryRate,
                            where: userId ? {
                                UserId: userId
                            } : null,
                            required: false
                        }]
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                [models_1.Tag, 'name'],
                [models_1.Commentary, 'createdAt']
            ]
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPosts;
//# sourceMappingURL=post.js.map