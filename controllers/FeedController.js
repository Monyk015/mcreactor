"use strict";
const Router = require("koa-router");
const multer = require('koa-multer');
const upload = multer({ dest: './public/images' });
const FeedController = new Router();
FeedController
    .get('/', (ctx) => {
    ctx.render('index');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeedController;
//# sourceMappingURL=FeedController.js.map