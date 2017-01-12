"use strict";
require("es6-shim");
require("reflect-metadata");
const Koa = require("koa");
const Router = require("koa-router");
const AuthController_1 = require("./controllers/AuthController");
const FeedController_1 = require("./controllers/FeedController");
const UserController_1 = require("./controllers/UserController");
const PostController_1 = require("./controllers/PostController");
const CommentController_1 = require("./controllers/CommentController");
const TagController_1 = require("./controllers/TagController");
const path = require('path');
const convert = require('koa-convert');
const serve = require('koa-static');
const app = new Koa();
app.use(require('koa-bodyparser')());
app.use(convert(serve('./public')));
// app.use(convert(serve('./public/images')))
let cors = require('koa-cors');
let logger = require('koa-logger');
app.use(convert(logger()));
app.use(convert(cors()));
const pug_1 = require("./config/pug");
pug_1.default.use(app);
app.use(convert(require('koa-json')()));
const CookieMiddleware_1 = require("./middlewares/CookieMiddleware");
app.use(CookieMiddleware_1.default);
const router = new Router();
router
    .use('', UserController_1.default.routes())
    .use('', AuthController_1.default.routes())
    .use('', FeedController_1.default.routes())
    .use('', PostController_1.default.routes())
    .use('', CommentController_1.default.routes())
    .use('', TagController_1.default.routes());
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);
//# sourceMappingURL=app.js.map