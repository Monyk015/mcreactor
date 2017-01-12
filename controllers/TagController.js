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
const Router = require("koa-router");
const TagController = new Router();
TagController
    .get('/tag/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    let tag = yield models_1.Tag.findById(id);
    ctx.body = { success: true, tagName: tag.name };
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagController;
//# sourceMappingURL=TagController.js.map