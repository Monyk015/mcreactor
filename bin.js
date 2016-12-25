/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	__webpack_require__(2);
	const Koa = __webpack_require__(3);
	const Router = __webpack_require__(4);
	const AuthController_1 = __webpack_require__(5);
	const FeedController_1 = __webpack_require__(20);
	const UserController_1 = __webpack_require__(22);
	const PostController_1 = __webpack_require__(24);
	const CommentController_1 = __webpack_require__(25);
	const TagController_1 = __webpack_require__(26);
	const path = __webpack_require__(27);
	const convert = __webpack_require__(28);
	const serve = __webpack_require__(29);
	const app = new Koa();
	app.use(__webpack_require__(30)());
	app.use(convert(serve('./public')));
	// app.use(convert(serve('./public/images')))
	let cors = __webpack_require__(31);
	let logger = __webpack_require__(32);
	app.use(convert(logger()));
	app.use(convert(cors()));
	const pug_1 = __webpack_require__(33);
	pug_1.default.use(app);
	app.use(convert(__webpack_require__(35)()));
	const CookieMiddleware_1 = __webpack_require__(36);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("es6-shim");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("reflect-metadata");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const models_1 = __webpack_require__(6);
	const jwt_1 = __webpack_require__(17);
	const Router = __webpack_require__(4);
	const hash = __webpack_require__(19);
	const AuthController = new Router();
	AuthController
	    .get('/login', (ctx) => {
	    ctx.render('auth/login');
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
	    ctx.render('auth/register');
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const CommentaryRate_1 = __webpack_require__(7);
	exports.CommentaryRate = CommentaryRate_1.default;
	const PostRate_1 = __webpack_require__(10);
	exports.PostRate = PostRate_1.default;
	const Post_1 = __webpack_require__(11);
	exports.Post = Post_1.default;
	const Commentary_1 = __webpack_require__(12);
	exports.Commentary = Commentary_1.default;
	const Tag_1 = __webpack_require__(13);
	exports.Tag = Tag_1.default;
	const User_1 = __webpack_require__(14);
	exports.User = User_1.default;
	const db_1 = __webpack_require__(8);
	const Subscription_1 = __webpack_require__(15);
	exports.Subscription = Subscription_1.default;
	const Ban_1 = __webpack_require__(16);
	exports.Ban = Ban_1.default;
	Post_1.default.belongsTo(User_1.default);
	User_1.default.hasMany(Post_1.default);
	User_1.default.hasMany(Commentary_1.default);
	Commentary_1.default.belongsTo(User_1.default);
	Post_1.default.hasMany(Commentary_1.default);
	Commentary_1.default.belongsTo(Post_1.default);
	const PostTag = db_1.default.define('PostTag', {}, { tableName: 'PostTag' });
	Tag_1.default.belongsToMany(Post_1.default, { through: 'PostTag' });
	Post_1.default.belongsToMany(Tag_1.default, { through: 'PostTag' });
	PostRate_1.default.belongsTo(Post_1.default);
	PostRate_1.default.belongsTo(User_1.default);
	Post_1.default.hasMany(PostRate_1.default);
	CommentaryRate_1.default.belongsTo(Commentary_1.default);
	CommentaryRate_1.default.belongsTo(User_1.default);
	Commentary_1.default.hasMany(CommentaryRate_1.default);
	Subscription_1.default.belongsTo(User_1.default);
	Subscription_1.default.belongsTo(Tag_1.default);
	User_1.default.hasMany(Subscription_1.default);
	Tag_1.default.hasMany(Subscription_1.default);
	Ban_1.default.belongsTo(User_1.default);
	Ban_1.default.belongsTo(Tag_1.default);
	User_1.default.hasMany(Ban_1.default);
	Tag_1.default.hasMany(Ban_1.default);
	// ;(async () =>
	// {
	//     await User.sync({force:true})
	//     await Post.sync({force:true})
	//     await Tag.sync({force:true})
	//     await PostTag.sync({force:true})
	//     await Commentary.sync({force:true})
	//     await PostRate.sync({force:true})
	//     await CommentaryRate.sync({force:true})
	//     await Ban.sync({force:true})
	//     await Subscription.sync({force:true})
	// })()


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const CommentaryRate = db_1.default.define("CommentaryRate", {
	    rate: {
	        type: Sequelize.INTEGER(2),
	        allowNull: false,
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CommentaryRate;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 05.11.2016.
	 */
	const Sequelize = __webpack_require__(9);
	const db = new Sequelize('mysql://root:root@localhost:3306/mcreactor');
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = db;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const PostRate = db_1.default.define("PostRate", {
	    rate: {
	        type: Sequelize.INTEGER(2),
	        allowNull: false,
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PostRate;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const Post = db_1.default.define("Post", {
	    content: {
	        type: Sequelize.STRING,
	        allowNull: false,
	    },
	    image: {
	        type: Sequelize.STRING,
	        allowNull: true
	    },
	    rating: {
	        type: Sequelize.INTEGER,
	        defaultValue: 0
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Post;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const Commentary = db_1.default.define("Commentary", {
	    content: {
	        type: Sequelize.STRING,
	        allowNull: false,
	    },
	    rating: {
	        type: Sequelize.INTEGER,
	        allowNull: true,
	        defaultValue: 0
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Commentary;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const Tag = db_1.default.define("Tag", {
	    name: {
	        type: Sequelize.STRING,
	        allowNull: false,
	        unique: true
	    }
	}, {
	    indexes: [
	        {
	            fields: ['name'],
	            unique: true
	        }
	    ],
	    timestamps: true,
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Tag;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(8);
	const Sequelize = __webpack_require__(9);
	const User = db_1.default.define("User", {
	    nickname: {
	        type: Sequelize.STRING(30),
	        allowNull: false,
	    },
	    email: {
	        type: Sequelize.STRING(30),
	        allowNull: false,
	        unique: true
	    },
	    password: {
	        type: Sequelize.STRING(100),
	        allowNull: false
	    },
	    rating: {
	        type: Sequelize.INTEGER
	    },
	    isBanned: {
	        type: Sequelize.BOOLEAN,
	        allowNull: true
	    },
	    isAdmin: {
	        type: Sequelize.BOOLEAN,
	        allowNull: true
	    },
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = User;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const db_1 = __webpack_require__(8);
	const Subscription = db_1.default.define("Subscription", {}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Subscription;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const db_1 = __webpack_require__(8);
	const Ban = db_1.default.define("Ban", {}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Ban;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt = __webpack_require__(18);
	const secret = 'veryverysecret';
	function generateToken(user) {
	    return jwt.sign(user, secret);
	}
	exports.generateToken = generateToken;
	function verifyToken(token) {
	    if (token) {
	        let user;
	        try {
	            user = jwt.verify(token, secret);
	        }
	        catch (err) {
	            return false;
	        }
	        return user;
	    }
	    return false;
	}
	exports.verifyToken = verifyToken;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("sha256");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Router = __webpack_require__(4);
	const multer = __webpack_require__(21);
	const upload = multer({ dest: './public/images' });
	const FeedController = new Router();
	FeedController
	    .get('/', (ctx) => {
	    ctx.render('index');
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = FeedController;


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("koa-multer");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Monyk on 05.11.2016.
	 */
	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const Router = __webpack_require__(4);
	const models_1 = __webpack_require__(6);
	const AuthMiddleware_1 = __webpack_require__(23);
	const UserController = new Router();
	// UserController.use(authMiddleware)
	UserController
	    .get('/user', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    ctx.body = yield models_1.User.findAll({ raw: true, order: 'id' });
	}))
	    .get('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    ctx.body = yield models_1.User.findById(id, { raw: true });
	}))
	    .put('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    let user = ctx.request.body;
	    const foundUser = yield models_1.User.findById(id); //todo: restring access
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
	    ctx.body = { success: true, subscriptions: subscriptions };
	}))
	    .get('/user/:id/tag/:tagId/subscribe', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        let userId = ctx.params.id;
	        let tagId = ctx.params.tagId;
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
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UserController;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt_1 = __webpack_require__(17);
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


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const PostRate_1 = __webpack_require__(10);
	const CommentaryRate_1 = __webpack_require__(7);
	const db_1 = __webpack_require__(8);
	const AuthMiddleware_1 = __webpack_require__(23);
	const models_1 = __webpack_require__(6);
	const Router = __webpack_require__(4);
	const PostController = new Router();
	const multer = __webpack_require__(21);
	const upload = multer({ dest: './public/images' });
	PostController
	    .post('/post', upload.single('image'), AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        let userId = ctx.user.id;
	        let tags = ctx.req.body.tags
	            .split(',')
	            .map(tag => {
	            return { 'name': tag.trim() };
	        });
	        yield models_1.Tag.bulkCreate(tags, {
	            updateOnDuplicate: ['name']
	        });
	        let image = ctx.req.file ? ctx.req.file.filename : null;
	        let post = yield models_1.Post.create({
	            content: ctx.req.body.content,
	            image: image,
	            UserId: userId
	        });
	        yield post.setTags(yield models_1.Tag.findAll({
	            where: {
	                name: {
	                    in: ctx.req.body.tags.split(',').map(tag => tag.trim())
	                }
	            }
	        }));
	        ctx.body = { success: true, message: '' };
	    }
	    catch (e) {
	        ctx.body = { success: false, message: `Something went wrong: ${e}` };
	    }
	}))
	    .get('/post/:id', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    const id = ctx.params.id;
	    ctx.body = yield getPosts(ctx.user, {
	        id: id
	    });
	}))
	    .get('/post', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    ctx.body = yield getPosts(ctx.user);
	}))
	    .get('/post/tag/:id', AuthMiddleware_1.default(true), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    ctx.body = yield getPosts(ctx.user, {
	        id: {
	            $in: db_1.default.literal("(select `PostId` from `PostTag` where `TagId` = " + id + ")")
	        }
	    });
	}))
	    .get('/post/user/subscribed', AuthMiddleware_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.user.id;
	    ctx.body = yield getPosts(ctx.user, {
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
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PostController;
	function getPosts(forUser = null, where = null) {
	    return __awaiter(this, void 0, void 0, function* () {
	        return yield models_1.Post.findAll({
	            where,
	            include: [
	                {
	                    model: PostRate_1.default,
	                    where: forUser ? {
	                        UserId: forUser.id
	                    } : null,
	                    required: false
	                },
	                models_1.Tag,
	                models_1.User,
	                {
	                    model: models_1.Commentary,
	                    include: [models_1.User, {
	                            model: CommentaryRate_1.default,
	                            where: forUser ? {
	                                UserId: forUser.id
	                            } : null,
	                            required: false
	                        }]
	                }
	            ],
	            order: [
	                ['createdAt', 'DESC'],
	                [models_1.Commentary, 'createdAt']
	            ]
	        });
	    });
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const AuthMiddleware_1 = __webpack_require__(23);
	const models_1 = __webpack_require__(6);
	const Router = __webpack_require__(4);
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
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CommentController;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const models_1 = __webpack_require__(6);
	const Router = __webpack_require__(4);
	const TagController = new Router();
	TagController
	    .get('/tag/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    let tag = yield models_1.Tag.findById(id);
	    ctx.body = { success: true, tagName: tag.name };
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TagController;


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("koa-logger");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Pug = __webpack_require__(34);
	const pug = new Pug({
	    viewPath: './views',
	    noCache: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = pug;


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("koa-pug");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("koa-json");

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	const cookieMiddleware = (context, next) => {
	    const cookieHeader = context.headers.cookie;
	    if (cookieHeader) {
	        const cookies = cookieHeader.split(';');
	        context.cookie = {};
	        cookies.forEach(function (item) {
	            const crumbs = item.split('=');
	            if (crumbs.length > 1)
	                context.cookie[crumbs[0].trim()] = crumbs[1].trim();
	        });
	    }
	    return next();
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cookieMiddleware;


/***/ }
/******/ ]);
//# sourceMappingURL=bin.js.map