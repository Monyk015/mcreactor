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
	const FeedController_1 = __webpack_require__(22);
	const UserController_1 = __webpack_require__(24);
	const PostController_1 = __webpack_require__(27);
	const CommentController_1 = __webpack_require__(29);
	const TagController_1 = __webpack_require__(30);
	const path = __webpack_require__(31);
	const convert = __webpack_require__(32);
	const serve = __webpack_require__(33);
	const app = new Koa();
	app.use(__webpack_require__(34)());
	app.use(convert(serve('./public')));
	// app.use(convert(serve('./public/images')))
	let cors = __webpack_require__(35);
	let logger = __webpack_require__(36);
	app.use(convert(logger()));
	app.use(convert(cors()));
	const pug_1 = __webpack_require__(37);
	pug_1.default.use(app);
	app.use(convert(__webpack_require__(39)()));
	const CookieMiddleware_1 = __webpack_require__(40);
	const notifier_1 = __webpack_require__(41);
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
	notifier_1.default(2);
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
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const models_1 = __webpack_require__(6);
	const jwt_1 = __webpack_require__(20);
	const Router = __webpack_require__(4);
	const hash = __webpack_require__(19);
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
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
	const users_1 = __webpack_require__(17);
	const fs = __webpack_require__(18);
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
	            user.password = __webpack_require__(19)(user.password);
	            return user;
	        }));
	        let query = fs.readFileSync('./mocks/posts.sql', 'utf-8');
	        yield db_1.default.query(query);
	        query = fs.readFileSync('./mocks/Tags.sql', 'utf-8');
	        yield db_1.default.query(query);
	        query = fs.readFileSync('./mocks/PostTag.sql', 'utf-8');
	        yield query.split(';').forEach((command) => __awaiter(this, void 0, void 0, function* () {
	            if (command != '')
	                yield db_1.default.query(command);
	        }));
	        query = fs.readFileSync('./mocks/Commentaries.sql', 'utf-8');
	        yield query.split(';').forEach((command) => __awaiter(this, void 0, void 0, function* () {
	            if (command != '')
	                yield db_1.default.query(command);
	        }));
	    }))();
	}))();


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
	const db = new Sequelize('mysql://root:root@db/mcreactor', {
	    dialectOptions: {
	        multipleStatements: true
	    }
	});
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
	        type: Sequelize.TEXT,
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
	        type: Sequelize.TEXT,
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
	        type: Sequelize.STRING(50),
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
/***/ function(module, exports) {

	"use strict";
	const users = [{
	        "isAdmin": true,
	        "rating": 21,
	        "isBanned": null,
	        "email": "admin@gmail.com",
	        "nickname": "admin",
	        "password": "admin"
	    }, {
	        "isAdmin": false,
	        "rating": 87,
	        "isBanned": null,
	        "email": "jburton1@smugmug.com",
	        "nickname": "cramos1",
	        "password": "aAJfgYUpMgs"
	    }, {
	        "isAdmin": false,
	        "rating": 42,
	        "isBanned": null,
	        "email": "kday2@photobucket.com",
	        "nickname": "jprice2",
	        "password": "fQ7IZbm"
	    }, {
	        "isAdmin": false,
	        "rating": 12,
	        "isBanned": false,
	        "email": "gyoung3@dyndns.org",
	        "nickname": "dpierce3",
	        "password": "za5DeM"
	    }, {
	        "isAdmin": false,
	        "rating": 96,
	        "isBanned": null,
	        "email": "gburns4@smugmug.com",
	        "nickname": "jclark4",
	        "password": "SyAHlw8L69K2"
	    }, {
	        "isAdmin": false,
	        "rating": 67,
	        "isBanned": null,
	        "email": "smorales5@godaddy.com",
	        "nickname": "ralvarez5",
	        "password": "54QgRT2OHLJC"
	    }, {
	        "isAdmin": false,
	        "rating": 41,
	        "isBanned": null,
	        "email": "kmoreno6@seesaa.net",
	        "nickname": "lmurray6",
	        "password": "aS1ZtShNaph"
	    }, {
	        "isAdmin": false,
	        "rating": 24,
	        "isBanned": null,
	        "email": "aferguson7@google.com",
	        "nickname": "mnguyen7",
	        "password": "3DQeUgDK"
	    }];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = users;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("sha256");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt = __webpack_require__(21);
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
/* 21 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Router = __webpack_require__(4);
	const multer = __webpack_require__(23);
	const upload = multer({ dest: './public/images' });
	const FeedController = new Router();
	FeedController
	    .get('/', (ctx) => {
	    ctx.render('index');
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = FeedController;


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("koa-multer");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

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
	const Router = __webpack_require__(4);
	const models_1 = __webpack_require__(6);
	const AuthMiddleware_1 = __webpack_require__(25);
	const AdminMiddleware_1 = __webpack_require__(26);
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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt_1 = __webpack_require__(20);
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
/* 26 */
/***/ function(module, exports) {

	"use strict";
	const adminMiddleware = (context, next) => {
	    if (context.user && context.user.isAdmin) {
	        return next();
	    }
	    context.status = 403;
	    context.body = '403 Forbidden';
	    return;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = adminMiddleware;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const PostRate_1 = __webpack_require__(10);
	const db_1 = __webpack_require__(8);
	const AuthMiddleware_1 = __webpack_require__(25);
	const models_1 = __webpack_require__(6);
	const Router = __webpack_require__(4);
	const post_1 = __webpack_require__(28);
	const AdminMiddleware_1 = __webpack_require__(26);
	const notifier_1 = __webpack_require__(41);
	const PostController = new Router();
	const multer = __webpack_require__(23);
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
	        if (previousRate.Post.rating >= 50) {
	            notifier_1.default(id);
	        }
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
	        if (post.rating >= 50) {
	            notifier_1.default(id);
	        }
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
	    let ratingCountByTag = yield db_1.default.query("SELECT `Tag`.`name` as 'name', sum(`Posts`.`rating`) as 'rating'" +
	        " FROM `Tags` AS `Tag` LEFT OUTER JOIN (`PostTag` AS `Posts.PostTag` INNER JOIN `Posts` AS `Posts` ON `Posts`.`id` = `Posts.PostTag`.`PostId`)" +
	        " ON `Tag`.`id` = `Posts.PostTag`.`TagId` GROUP BY `Tag`.`id`;");
	    let ratingAvgByTag = yield db_1.default.query("SELECT `Tag`.`name` as 'name', avg(`Posts`.`rating`) as 'rating'" +
	        " FROM `Tags` AS `Tag` LEFT OUTER JOIN (`PostTag` AS `Posts.PostTag` INNER JOIN `Posts` AS `Posts` ON `Posts`.`id` = `Posts.PostTag`.`PostId`)" +
	        " ON `Tag`.`id` = `Posts.PostTag`.`TagId` GROUP BY `Tag`.`id`;");
	    ctx.body = { postCountByDay, commentCountByDay, ratingCountByTag, ratingAvgByTag };
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PostController;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const models_1 = __webpack_require__(6);
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


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const AuthMiddleware_1 = __webpack_require__(25);
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


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
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
/* 31 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("koa-logger");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Pug = __webpack_require__(38);
	const pug = new Pug({
	    viewPath: './views',
	    noCache: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = pug;


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("koa-pug");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("koa-json");

/***/ },
/* 40 */
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


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const models_1 = __webpack_require__(6);
	const mailer_1 = __webpack_require__(42);
	function notifyAboutNewBestPost(postId) {
	    return __awaiter(this, void 0, void 0, function* () {
	        let users = yield models_1.Post.findAll({
	            attributes: ['Tags.Subscriptions.User.email'],
	            include: [{
	                    model: models_1.Tag,
	                    include: [{
	                            model: models_1.Subscription,
	                            include: [models_1.User]
	                        }]
	                }],
	            where: {
	                id: postId
	            },
	            raw: true
	        });
	        users.forEach(user => {
	            if (user.email)
	                mailer_1.default(user.email, postId);
	        });
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = notifyAboutNewBestPost;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	let nodemailer = __webpack_require__(43);
	let transporter = nodemailer.createTransport('smtps://monyashadow@gmail.com:Geopardus123@smtp.gmail.com');
	function sendEmail(targetEmail, postId) {
	    let mailOptions = {
	        to: targetEmail,
	        subject: 'New best post in your subscribed',
	        html: `<p>
	                <a href="http://localhost:3000/#/post/${postId}">Here it is</a>
	               </p>`
	    };
	    transporter.sendMail(mailOptions, function (error, info) {
	        if (error) {
	            return console.log(error);
	        }
	        console.log('Message sent: ' + info.response + ' target email: ' + targetEmail);
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = sendEmail;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mailcomposer = __webpack_require__(44);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var util = __webpack_require__(51);
	var shared = __webpack_require__(65);
	var directTransport = __webpack_require__(66);
	var smtpTransport = __webpack_require__(76);
	var smtpPoolTransport = __webpack_require__(80);
	var templateSender = __webpack_require__(84);
	var packageData = __webpack_require__(85);
	var httpProxy = __webpack_require__(86);
	var Socks = __webpack_require__(87);
	var urllib = __webpack_require__(59);
	
	// Export createTransport method
	module.exports.createTransport = function (transporter, defaults) {
	    var urlConfig;
	    var options;
	    var mailer;
	    var proxyUrl;
	
	    // if no transporter configuration is provided use direct as default
	    transporter = transporter || directTransport({
	        debug: true
	    });
	
	    if (
	        // provided transporter is a configuration object, not transporter plugin
	        (typeof transporter === 'object' && typeof transporter.send !== 'function') ||
	        // provided transporter looks like a connection url
	        (typeof transporter === 'string' && /^(smtps?|direct):/i.test(transporter))
	    ) {
	
	        if ((urlConfig = typeof transporter === 'string' ? transporter : transporter.url)) {
	            // parse a configuration URL into configuration options
	            options = shared.parseConnectionUrl(urlConfig);
	        } else {
	            options = transporter;
	        }
	
	        if (options.proxy && typeof options.proxy === 'string') {
	            proxyUrl = options.proxy;
	        }
	
	        if (options.transport && typeof options.transport === 'string') {
	            try {
	                transporter = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(options);
	            } catch (E) {
	                // if transporter loader fails, return an error when sending mail
	                transporter = {
	                    send: function (mail, callback) {
	                        var errmsg = 'Requested transport plugin  "nodemailer-' + (options.transport).toLowerCase() + '-transport" could not be initiated';
	                        var err = new Error(errmsg);
	                        err.code = 'EINIT';
	                        setImmediate(function () {
	                            return callback(err);
	                        });
	                    }
	                };
	            }
	        } else if (options.direct) {
	            transporter = directTransport(options);
	        } else if (options.pool) {
	            transporter = smtpPoolTransport(options);
	        } else {
	            transporter = smtpTransport(options);
	        }
	    }
	
	    mailer = new Nodemailer(transporter, options, defaults);
	
	    if (proxyUrl) {
	        setupProxy(mailer, proxyUrl);
	    }
	
	    return mailer;
	};
	
	/**
	 * Sets up proxy handler for a Nodemailer object
	 *
	 * @param {Object} mailer Nodemailer instance to modify
	 * @param {String} proxyUrl Proxy configuration url
	 */
	function setupProxy(mailer, proxyUrl) {
	    var proxy = urllib.parse(proxyUrl);
	
	    // setup socket handler for the mailer object
	    mailer.getSocket = function (options, callback) {
	        switch (proxy.protocol) {
	
	            // Connect using a HTTP CONNECT method
	            case 'http:':
	            case 'https:':
	                httpProxy(proxy.href, options.port, options.host, function (err, socket) {
	                    if (err) {
	                        return callback(err);
	                    }
	                    return callback(null, {
	                        connection: socket
	                    });
	                });
	                return;
	
	                // Connect using a SOCKS4/5 proxy
	            case 'socks:':
	            case 'socks5:':
	            case 'socks4:':
	            case 'socks4a:':
	                Socks.createConnection({
	                    proxy: {
	                        ipaddress: proxy.hostname,
	                        port: proxy.port,
	                        type: Number(proxy.protocol.replace(/\D/g, '')) || 5
	                    },
	                    target: {
	                        host: options.host,
	                        port: options.port
	                    },
	                    command: 'connect',
	                    authentication: !proxy.auth ? false : {
	                        username: decodeURIComponent(proxy.auth.split(':').shift()),
	                        password: decodeURIComponent(proxy.auth.split(':').pop())
	                    }
	                }, function (err, socket) {
	                    if (err) {
	                        return callback(err);
	                    }
	                    return callback(null, {
	                        connection: socket
	                    });
	                });
	                return;
	        }
	
	        callback(new Error('Unknown proxy configuration'));
	    };
	}
	
	/**
	 * Creates an object for exposing the Nodemailer API
	 *
	 * @constructor
	 * @param {Object} transporter Transport object instance to pass the mails to
	 */
	function Nodemailer(transporter, options, defaults) {
	    EventEmitter.call(this);
	
	    this._options = options || {};
	
	    this._defaults = defaults || {};
	
	    this._plugins = {
	        compile: [],
	        stream: []
	    };
	
	    this.transporter = transporter;
	    this.logger = this.transporter.logger || shared.getLogger({
	        logger: false
	    });
	
	    // setup emit handlers for the transporter
	    if (typeof transporter.on === 'function') {
	
	        // deprecated log interface
	        this.transporter.on('log', function (log) {
	            this.logger.debug('%s: %s', log.type, log.message);
	        }.bind(this));
	
	        // transporter errors
	        this.transporter.on('error', function (err) {
	            this.logger.error('Transport Error: %s', err.message);
	            this.emit('error', err);
	        }.bind(this));
	
	        // indicates if the sender has became idle
	        this.transporter.on('idle', function () {
	            var args = Array.prototype.slice.call(arguments);
	            args.unshift('idle');
	            this.emit.apply(this, args);
	        }.bind(this));
	    }
	}
	util.inherits(Nodemailer, EventEmitter);
	
	/**
	 * Creates a template based sender function
	 *
	 * @param {Object} templates Object with string values where key is a message field and value is a template
	 * @param {Object} defaults Optional default message fields
	 * @return {Function} E-mail sender
	 */
	Nodemailer.prototype.templateSender = function (templates, defaults) {
	    return templateSender(this, templates, defaults);
	};
	
	Nodemailer.prototype.use = function (step, plugin) {
	    step = (step || '').toString();
	    if (!this._plugins.hasOwnProperty(step)) {
	        this._plugins[step] = [plugin];
	    } else {
	        this._plugins[step].push(plugin);
	    }
	};
	
	/**
	 * Optional methods passed to the underlying transport object
	 */
	['close', 'isIdle', 'verify'].forEach(function (method) {
	    Nodemailer.prototype[method] = function ( /* possible arguments */ ) {
	        var args = Array.prototype.slice.call(arguments);
	        if (typeof this.transporter[method] === 'function') {
	            return this.transporter[method].apply(this.transporter, args);
	        } else {
	            return false;
	        }
	    };
	});
	
	/**
	 * Sends an email using the preselected transport object
	 *
	 * @param {Object} data E-data description
	 * @param {Function} callback Callback to run once the sending succeeded or failed
	 */
	Nodemailer.prototype.sendMail = function (data, callback) {
	    var promise;
	
	    if (!callback && typeof Promise === 'function') {
	        promise = new Promise(function (resolve, reject) {
	            callback = shared.callbackPromise(resolve, reject);
	        });
	    }
	
	    if (typeof this.getSocket === 'function') {
	        this.transporter.getSocket = this.getSocket.bind(this);
	        this.getSocket = false;
	    }
	
	    data = data || {};
	    data.headers = data.headers || {};
	    callback = callback || function () {};
	
	    // apply defaults
	    Object.keys(this._defaults).forEach(function (key) {
	        if (!(key in data)) {
	            data[key] = this._defaults[key];
	        } else if (key === 'headers') {
	            // headers is a special case. Allow setting individual default headers
	            Object.keys(this._defaults.headers || {}).forEach(function (key) {
	                if (!(key in data.headers)) {
	                    data.headers[key] = this._defaults.headers[key];
	                }
	            }.bind(this));
	        }
	    }.bind(this));
	
	    // force specific keys from transporter options
	    ['disableFileAccess', 'disableUrlAccess'].forEach(function (key) {
	        if (key in this._options) {
	            data[key] = this._options[key];
	        }
	    }.bind(this));
	
	    var mail = {
	        data: data,
	        message: null,
	        resolveContent: shared.resolveContent
	    };
	
	    if (typeof this.transporter === 'string') {
	        callback(new Error('Unsupported configuration, downgrade Nodemailer to v0.7.1 to use it'));
	        return promise;
	    }
	
	    this.logger.info('Sending mail using %s/%s', this.transporter.name, this.transporter.version);
	
	    this._processPlugins('compile', mail, function (err) {
	        if (err) {
	            this.logger.error('PluginCompile Error: %s', err.message);
	            return callback(err);
	        }
	
	        mail.message = mailcomposer(mail.data);
	
	        if (mail.data.xMailer !== false) {
	            mail.message.setHeader('X-Mailer', mail.data.xMailer || this._getVersionString());
	        }
	
	        if (mail.data.priority) {
	            switch ((mail.data.priority || '').toString().toLowerCase()) {
	                case 'high':
	                    mail.message.setHeader('X-Priority', '1 (Highest)');
	                    mail.message.setHeader('X-MSMail-Priority', 'High');
	                    mail.message.setHeader('Importance', 'High');
	                    break;
	                case 'low':
	                    mail.message.setHeader('X-Priority', '5 (Lowest)');
	                    mail.message.setHeader('X-MSMail-Priority', 'Low');
	                    mail.message.setHeader('Importance', 'Low');
	                    break;
	                default:
	                    // do not add anything, since all messages are 'Normal' by default
	            }
	        }
	
	        // add optional List-* headers
	        if (mail.data.list && typeof mail.data.list === 'object') {
	            this._getListHeaders(mail.data.list).forEach(function (listHeader) {
	                listHeader.value.forEach(function (value) {
	                    mail.message.addHeader(listHeader.key, value);
	                });
	            });
	        }
	
	        this._processPlugins('stream', mail, function (err) {
	            if (err) {
	                this.logger.error('PluginStream Error: %s', err.message);
	                return callback(err);
	            }
	
	            this.transporter.send(mail, function () {
	                var args = Array.prototype.slice.call(arguments);
	                if (args[0]) {
	                    this.logger.error('Send Error: %s', args[0].message);
	                }
	                callback.apply(null, args);
	            }.bind(this));
	        }.bind(this));
	    }.bind(this));
	
	    return promise;
	};
	
	Nodemailer.prototype._getVersionString = function () {
	    return util.format(
	        '%s (%s; +%s; %s/%s)',
	        packageData.name,
	        packageData.version,
	        packageData.homepage,
	        this.transporter.name,
	        this.transporter.version
	    );
	};
	
	Nodemailer.prototype._processPlugins = function (step, mail, callback) {
	    step = (step || '').toString();
	
	    if (!this._plugins.hasOwnProperty(step) || !this._plugins[step].length) {
	        return callback(null);
	    }
	
	    var plugins = Array.prototype.slice.call(this._plugins[step]);
	
	    this.logger.debug('Using %s plugins for %s', plugins.length, step);
	
	    var processPlugins = function () {
	        if (!plugins.length) {
	            return callback(null);
	        }
	        var plugin = plugins.shift();
	        plugin(mail, function (err) {
	            if (err) {
	                return callback(err);
	            }
	            processPlugins();
	        });
	    }.bind(this);
	
	    processPlugins();
	};
	
	/**
	 * This method takes list headers structure and converts it into
	 * header list with key-value pairs
	 *
	 * @param {Object} listData Structured List-* headers
	 * @return {Array} An array of headers
	 */
	Nodemailer.prototype._getListHeaders = function (listData) {
	    // make sure an url looks like <protocol:url>
	    var formatListUrl = function (url) {
	        url = url.replace(/[\s<]+|[\s>]+/g, '');
	        if (/^(https?|mailto|ftp):/.test(url)) {
	            return '<' + url + '>';
	        }
	        if (/^[^@]+@[^@]+$/.test(url)) {
	            return '<mailto:' + url + '>';
	        }
	
	        return '<http://' + url + '>';
	    };
	
	    return Object.keys(listData).map(function (key) {
	        return {
	            key: 'list-' + key.toLowerCase().trim(),
	            value: [].concat(listData[key] || []).map(function (value) {
	                if (typeof value === 'string') {
	                    return formatListUrl(value);
	                }
	                return {
	                    prepared: true,
	                    value: [].concat(value || []).map(function (value) {
	                        if (typeof value === 'string') {
	                            return formatListUrl(value);
	                        }
	                        if (value && value.url) {
	                            return formatListUrl(value.url) + (value.comment ? ' (' + value.comment + ')' : '');
	                        }
	                        return '';
	                    }).join(', ')
	                };
	            })
	        };
	    });
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BuildMail = __webpack_require__(45);
	var libmime = __webpack_require__(46);
	
	module.exports = function (mail) {
	    return new MailComposer(mail).compile();
	};
	
	module.exports.MailComposer = MailComposer;
	
	/**
	 * Creates the object for composing a BuildMail instance out from the mail options
	 *
	 * @constructor
	 * @param {Object} mail Mail options
	 */
	function MailComposer(mail) {
	    if (!(this instanceof MailComposer)) {
	        return new MailComposer(mail);
	    }
	
	    this.mail = mail || {};
	    this.message = false;
	}
	
	/**
	 * Builds BuildMail instance
	 */
	MailComposer.prototype.compile = function () {
	    this._alternatives = this.getAlternatives();
	    this._htmlNode = this._alternatives.filter(function (alternative) {
	        return /^text\/html\b/i.test(alternative.contentType);
	    }).pop();
	    this._attachments = this.getAttachments(!!this._htmlNode);
	
	    this._useRelated = !!(this._htmlNode && this._attachments.related.length);
	    this._useAlternative = this._alternatives.length > 1;
	    this._useMixed = this._attachments.attached.length > 1 || (this._alternatives.length && this._attachments.attached.length === 1);
	
	    // Compose MIME tree
	    if (this.mail.raw) {
	        this.message = new BuildMail().setRaw(this.mail.raw);
	    } else if (this._useMixed) {
	        this.message = this._createMixed();
	    } else if (this._useAlternative) {
	        this.message = this._createAlternative();
	    } else if (this._useRelated) {
	        this.message = this._createRelated();
	    } else {
	        this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
	            contentType: 'text/plain',
	            content: ''
	        });
	    }
	
	    // Add custom headers
	    if (this.mail.headers) {
	        this.message.addHeader(this.mail.headers);
	    }
	
	    // Add headers to the root node, always overrides custom headers
	    [
	        'from',
	        'sender',
	        'to',
	        'cc',
	        'bcc',
	        'reply-to',
	        'in-reply-to',
	        'references',
	        'subject',
	        'message-id',
	        'date'
	    ].forEach(function (header) {
	        var key = header.replace(/-(\w)/g, function (o, c) {
	            return c.toUpperCase();
	        });
	        if (this.mail[key]) {
	            this.message.setHeader(header, this.mail[key]);
	        }
	    }.bind(this));
	
	    // Sets custom envelope
	    if (this.mail.envelope) {
	        this.message.setEnvelope(this.mail.envelope);
	    }
	
	    // ensure Message-Id value
	    this.message.messageId();
	
	    return this.message;
	};
	
	/**
	 * List all attachments. Resulting attachment objects can be used as input for BuildMail nodes
	 *
	 * @param {Boolean} findRelated If true separate related attachments from attached ones
	 * @returns {Object} An object of arrays (`related` and `attached`)
	 */
	MailComposer.prototype.getAttachments = function (findRelated) {
	    var attachments = [].concat(this.mail.attachments || []).map(function (attachment, i) {
	        var data;
	        var isMessageNode = /^message\//i.test(attachment.contentType);
	
	        if (/^data:/i.test(attachment.path || attachment.href)) {
	            attachment = this._processDataUrl(attachment);
	        }
	
	        data = {
	            contentType: attachment.contentType ||
	                libmime.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin'),
	            contentDisposition: attachment.contentDisposition || (isMessageNode ? 'inline' : 'attachment'),
	            contentTransferEncoding: attachment.contentTransferEncoding
	        };
	
	        if (attachment.filename) {
	            data.filename = attachment.filename;
	        } else if (!isMessageNode && attachment.filename !== false) {
	            data.filename = (attachment.path || attachment.href || '').split('/').pop() || 'attachment-' + (i + 1);
	            if (data.filename.indexOf('.') < 0) {
	                data.filename += '.' + libmime.detectExtension(data.contentType);
	            }
	        }
	
	        if (/^https?:\/\//i.test(attachment.path)) {
	            attachment.href = attachment.path;
	            attachment.path = undefined;
	        }
	
	        if (attachment.cid) {
	            data.cid = attachment.cid;
	        }
	
	        if (attachment.raw) {
	            data.raw = attachment.raw;
	        } else if (attachment.path) {
	            data.content = {
	                path: attachment.path
	            };
	        } else if (attachment.href) {
	            data.content = {
	                href: attachment.href
	            };
	        } else {
	            data.content = attachment.content || '';
	        }
	
	        if (attachment.encoding) {
	            data.encoding = attachment.encoding;
	        }
	
	        if (attachment.headers) {
	            data.headers = attachment.headers;
	        }
	
	        return data;
	    }.bind(this));
	
	    if (!findRelated) {
	        return {
	            attached: attachments,
	            related: []
	        };
	    } else {
	        return {
	            attached: attachments.filter(function (attachment) {
	                return !attachment.cid;
	            }),
	            related: attachments.filter(function (attachment) {
	                return !!attachment.cid;
	            })
	        };
	    }
	};
	
	/**
	 * List alternatives. Resulting objects can be used as input for BuildMail nodes
	 *
	 * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
	 */
	MailComposer.prototype.getAlternatives = function () {
	    var alternatives = [],
	        text, html, watchHtml, icalEvent;
	
	    if (this.mail.text) {
	        if (typeof this.mail.text === 'object' && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
	            text = this.mail.text;
	        } else {
	            text = {
	                content: this.mail.text
	            };
	        }
	        text.contentType = 'text/plain' + (!text.encoding && libmime.isPlainText(text.content) ? '' : '; charset=utf-8');
	    }
	
	    if (this.mail.watchHtml) {
	        if (typeof this.mail.watchHtml === 'object' && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
	            watchHtml = this.mail.watchHtml;
	        } else {
	            watchHtml = {
	                content: this.mail.watchHtml
	            };
	        }
	        watchHtml.contentType = 'text/watch-html' + (!watchHtml.encoding && libmime.isPlainText(watchHtml.content) ? '' : '; charset=utf-8');
	    }
	
	    if (this.mail.icalEvent) {
	        if (typeof this.mail.icalEvent === 'object' && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
	            icalEvent = this.mail.icalEvent;
	        } else {
	            icalEvent = {
	                content: this.mail.icalEvent
	            };
	        }
	        icalEvent.contentType = 'text/calendar; charset="utf-8"; method=' + (icalEvent.method || 'PUBLISH').toString().trim().toUpperCase();
	        if (!icalEvent.headers) {
	            icalEvent.headers = {};
	        }
	        icalEvent.headers['Content-Transfer-Encoding'] = 'base64';
	    }
	
	    if (this.mail.html) {
	        if (typeof this.mail.html === 'object' && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
	            html = this.mail.html;
	        } else {
	            html = {
	                content: this.mail.html
	            };
	        }
	        html.contentType = 'text/html' + (!html.encoding && libmime.isPlainText(html.content) ? '' : '; charset=utf-8');
	    }
	
	    [].
	    concat(text || []).
	    concat(watchHtml || []).
	    concat(html || []).
	    concat(icalEvent || []).
	    concat(this.mail.alternatives || []).
	    forEach(function (alternative) {
	        var data;
	
	        if (/^data:/i.test(alternative.path || alternative.href)) {
	            alternative = this._processDataUrl(alternative);
	        }
	
	        data = {
	            contentType: alternative.contentType ||
	                libmime.detectMimeType(alternative.filename || alternative.path || alternative.href || 'txt'),
	            contentTransferEncoding: alternative.contentTransferEncoding
	        };
	
	        if (alternative.filename) {
	            data.filename = alternative.filename;
	        }
	
	        if (/^https?:\/\//i.test(alternative.path)) {
	            alternative.href = alternative.path;
	            alternative.path = undefined;
	        }
	
	        if (alternative.raw) {
	            data.raw = alternative.raw;
	        } else if (alternative.path) {
	            data.content = {
	                path: alternative.path
	            };
	        } else if (alternative.href) {
	            data.content = {
	                href: alternative.href
	            };
	        } else {
	            data.content = alternative.content || '';
	        }
	
	        if (alternative.encoding) {
	            data.encoding = alternative.encoding;
	        }
	
	        if (alternative.headers) {
	            data.headers = alternative.headers;
	        }
	
	        alternatives.push(data);
	    }.bind(this));
	
	    return alternatives;
	};
	
	/**
	 * Builds multipart/mixed node. It should always contain different type of elements on the same level
	 * eg. text + attachments
	 *
	 * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	 * @returns {Object} BuildMail node element
	 */
	MailComposer.prototype._createMixed = function (parentNode) {
	    var node;
	
	    if (!parentNode) {
	        node = new BuildMail('multipart/mixed', {
	            baseBoundary: this.mail.baseBoundary,
	            textEncoding: this.mail.textEncoding,
	            boundaryPrefix: this.mail.boundaryPrefix,
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    } else {
	        node = parentNode.createChild('multipart/mixed', {
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    }
	
	    if (this._useAlternative) {
	        this._createAlternative(node);
	    } else if (this._useRelated) {
	        this._createRelated(node);
	    }
	
	    [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach(function (element) {
	        // if the element is a html node from related subpart then ignore it
	        if (!this._useRelated || element !== this._htmlNode) {
	            this._createContentNode(node, element);
	        }
	    }.bind(this));
	
	    return node;
	};
	
	/**
	 * Builds multipart/alternative node. It should always contain same type of elements on the same level
	 * eg. text + html view of the same data
	 *
	 * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	 * @returns {Object} BuildMail node element
	 */
	MailComposer.prototype._createAlternative = function (parentNode) {
	    var node;
	
	    if (!parentNode) {
	        node = new BuildMail('multipart/alternative', {
	            baseBoundary: this.mail.baseBoundary,
	            textEncoding: this.mail.textEncoding,
	            boundaryPrefix: this.mail.boundaryPrefix,
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    } else {
	        node = parentNode.createChild('multipart/alternative', {
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    }
	
	    this._alternatives.forEach(function (alternative) {
	        if (this._useRelated && this._htmlNode === alternative) {
	            this._createRelated(node);
	        } else {
	            this._createContentNode(node, alternative);
	        }
	    }.bind(this));
	
	    return node;
	};
	
	/**
	 * Builds multipart/related node. It should always contain html node with related attachments
	 *
	 * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	 * @returns {Object} BuildMail node element
	 */
	MailComposer.prototype._createRelated = function (parentNode) {
	    var node;
	
	    if (!parentNode) {
	        node = new BuildMail('multipart/related; type="text/html"', {
	            baseBoundary: this.mail.baseBoundary,
	            textEncoding: this.mail.textEncoding,
	            boundaryPrefix: this.mail.boundaryPrefix,
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    } else {
	        node = parentNode.createChild('multipart/related; type="text/html"', {
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    }
	
	    this._createContentNode(node, this._htmlNode);
	
	    this._attachments.related.forEach(function (alternative) {
	        this._createContentNode(node, alternative);
	    }.bind(this));
	
	    return node;
	};
	
	/**
	 * Creates a regular node with contents
	 *
	 * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	 * @param {Object} element Node data
	 * @returns {Object} BuildMail node element
	 */
	MailComposer.prototype._createContentNode = function (parentNode, element) {
	    element = element || {};
	    element.content = element.content || '';
	
	    var node;
	    var encoding = (element.encoding || 'utf8')
	        .toString()
	        .toLowerCase()
	        .replace(/[-_\s]/g, '');
	
	    if (!parentNode) {
	        node = new BuildMail(element.contentType, {
	            filename: element.filename,
	            baseBoundary: this.mail.baseBoundary,
	            textEncoding: this.mail.textEncoding,
	            boundaryPrefix: this.mail.boundaryPrefix,
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    } else {
	        node = parentNode.createChild(element.contentType, {
	            filename: element.filename,
	            disableUrlAccess: this.mail.disableUrlAccess,
	            disableFileAccess: this.mail.disableFileAccess
	        });
	    }
	
	    // add custom headers
	    if (element.headers) {
	        node.addHeader(element.headers);
	    }
	
	    if (element.cid) {
	        node.setHeader('Content-Id', '<' + element.cid.replace(/[<>]/g, '') + '>');
	    }
	
	    if (element.contentTransferEncoding) {
	        node.setHeader('Content-Transfer-Encoding', element.contentTransferEncoding);
	    } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
	        node.setHeader('Content-Transfer-Encoding', this.mail.encoding);
	    }
	
	    if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
	        node.setHeader('Content-Disposition', element.contentDisposition || (element.cid ? 'inline' : 'attachment'));
	    }
	
	    if (typeof element.content === 'string' && ['utf8', 'usascii', 'ascii'].indexOf(encoding) < 0) {
	        element.content = new Buffer(element.content, encoding);
	    }
	
	    // prefer pregenerated raw content
	    if (element.raw) {
	        node.setRaw(element.raw);
	    } else {
	        node.setContent(element.content);
	    }
	
	    return node;
	};
	
	/**
	 * Parses data uri and converts it to a Buffer
	 *
	 * @param {Object} element Content element
	 * @return {Object} Parsed element
	 */
	MailComposer.prototype._processDataUrl = function (element) {
	    var parts = (element.path || element.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
	    if (!parts) {
	        return element;
	    }
	
	    element.content = /\bbase64$/i.test(parts[1]) ? new Buffer(parts[2], 'base64') : new Buffer(decodeURIComponent(parts[2]));
	
	    if ('path' in element) {
	        element.path = false;
	    }
	
	    if ('href' in element) {
	        element.href = false;
	    }
	
	    parts[1].split(';').forEach(function (item) {
	        if (/^\w+\/[^\/]+$/i.test(item)) {
	            element.contentType = element.contentType || item.toLowerCase();
	        }
	    });
	
	    return element;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var libmime = __webpack_require__(46);
	var libqp = __webpack_require__(52);
	var libbase64 = __webpack_require__(49);
	var punycode = __webpack_require__(54);
	var addressparser = __webpack_require__(55);
	var stream = __webpack_require__(50);
	var PassThrough = stream.PassThrough;
	var fs = __webpack_require__(18);
	var fetch = __webpack_require__(56);
	var crypto = __webpack_require__(62);
	var os = __webpack_require__(63);
	
	module.exports = MimeNode;
	
	/**
	 * Creates a new mime tree node. Assumes 'multipart/*' as the content type
	 * if it is a branch, anything else counts as leaf. If rootNode is missing from
	 * the options, assumes this is the root.
	 *
	 * @param {String} contentType Define the content type for the node. Can be left blank for attachments (derived from filename)
	 * @param {Object} [options] optional options
	 * @param {Object} [options.rootNode] root node for this tree
	 * @param {Object} [options.parentNode] immediate parent for this node
	 * @param {Object} [options.filename] filename for an attachment node
	 * @param {String} [options.baseBoundary] shared part of the unique multipart boundary
	 * @param {Boolean} [options.keepBcc] If true, do not exclude Bcc from the generated headers
	 * @param {String} [options.textEncoding] either 'Q' (the default) or 'B'
	 */
	function MimeNode(contentType, options) {
	    this.nodeCounter = 0;
	
	    options = options || {};
	
	    /**
	     * shared part of the unique multipart boundary
	     */
	    this.baseBoundary = options.baseBoundary || Date.now().toString() + Math.random();
	    this.boundaryPrefix = options.boundaryPrefix || '----sinikael';
	
	    this.disableFileAccess = !!options.disableFileAccess;
	    this.disableUrlAccess = !!options.disableUrlAccess;
	
	    /**
	     * If date headers is missing and current node is the root, this value is used instead
	     */
	    this.date = new Date();
	
	    /**
	     * Root node for current mime tree
	     */
	    this.rootNode = options.rootNode || this;
	
	    /**
	     * If true include Bcc in generated headers (if available)
	     */
	    this.keepBcc = !!options.keepBcc;
	
	    /**
	     * If filename is specified but contentType is not (probably an attachment)
	     * detect the content type from filename extension
	     */
	    if (options.filename) {
	        /**
	         * Filename for this node. Useful with attachments
	         */
	        this.filename = options.filename;
	        if (!contentType) {
	            contentType = libmime.detectMimeType(this.filename.split('.').pop());
	        }
	    }
	
	    /**
	     * Indicates which encoding should be used for header strings: "Q" or "B"
	     */
	    this.textEncoding = (options.textEncoding || '').toString().trim().charAt(0).toUpperCase();
	
	    /**
	     * Immediate parent for this node (or undefined if not set)
	     */
	    this.parentNode = options.parentNode;
	
	    /**
	     * Hostname for default message-id values
	     */
	    this.hostname = options.hostname;
	
	    /**
	     * An array for possible child nodes
	     */
	    this.childNodes = [];
	
	    /**
	     * Used for generating unique boundaries (prepended to the shared base)
	     */
	    this._nodeId = ++this.rootNode.nodeCounter;
	
	    /**
	     * A list of header values for this node in the form of [{key:'', value:''}]
	     */
	    this._headers = [];
	
	    /**
	     * True if the content only uses ASCII printable characters
	     * @type {Boolean}
	     */
	    this._isPlainText = false;
	
	    /**
	     * True if the content is plain text but has longer lines than allowed
	     * @type {Boolean}
	     */
	    this._hasLongLines = false;
	
	    /**
	     * If set, use instead this value for envelopes instead of generating one
	     * @type {Boolean}
	     */
	    this._envelope = false;
	
	    /**
	     * If set then use this value as the stream content instead of building it
	     * @type {String|Buffer|Stream}
	     */
	    this._raw = false;
	
	    /**
	     * Additional transform streams that the message will be piped before
	     * exposing by createReadStream
	     * @type {Array}
	     */
	    this._transforms = [];
	
	    /**
	     * If content type is set (or derived from the filename) add it to headers
	     */
	    if (contentType) {
	        this.setHeader('Content-Type', contentType);
	    }
	}
	
	/////// PUBLIC METHODS
	
	/**
	 * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
	 *
	 * @param {String} [contentType] Optional content type
	 * @param {Object} [options] Optional options object
	 * @return {Object} Created node object
	 */
	MimeNode.prototype.createChild = function (contentType, options) {
	    if (!options && typeof contentType === 'object') {
	        options = contentType;
	        contentType = undefined;
	    }
	    var node = new MimeNode(contentType, options);
	    this.appendChild(node);
	    return node;
	};
	
	/**
	 * Appends an existing node to the mime tree. Removes the node from an existing
	 * tree if needed
	 *
	 * @param {Object} childNode node to be appended
	 * @return {Object} Appended node object
	 */
	MimeNode.prototype.appendChild = function (childNode) {
	
	    if (childNode.rootNode !== this.rootNode) {
	        childNode.rootNode = this.rootNode;
	        childNode._nodeId = ++this.rootNode.nodeCounter;
	    }
	
	    childNode.parentNode = this;
	
	    this.childNodes.push(childNode);
	    return childNode;
	};
	
	/**
	 * Replaces current node with another node
	 *
	 * @param {Object} node Replacement node
	 * @return {Object} Replacement node
	 */
	MimeNode.prototype.replace = function (node) {
	    if (node === this) {
	        return this;
	    }
	
	    this.parentNode.childNodes.forEach(function (childNode, i) {
	        if (childNode === this) {
	
	            node.rootNode = this.rootNode;
	            node.parentNode = this.parentNode;
	            node._nodeId = this._nodeId;
	
	            this.rootNode = this;
	            this.parentNode = undefined;
	
	            node.parentNode.childNodes[i] = node;
	        }
	    }.bind(this));
	
	    return node;
	};
	
	/**
	 * Removes current node from the mime tree
	 *
	 * @return {Object} removed node
	 */
	MimeNode.prototype.remove = function () {
	    if (!this.parentNode) {
	        return this;
	    }
	
	    for (var i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
	        if (this.parentNode.childNodes[i] === this) {
	            this.parentNode.childNodes.splice(i, 1);
	            this.parentNode = undefined;
	            this.rootNode = this;
	            return this;
	        }
	    }
	};
	
	/**
	 * Sets a header value. If the value for selected key exists, it is overwritten.
	 * You can set multiple values as well by using [{key:'', value:''}] or
	 * {key: 'value'} as the first argument.
	 *
	 * @param {String|Array|Object} key Header key or a list of key value pairs
	 * @param {String} value Header value
	 * @return {Object} current node
	 */
	MimeNode.prototype.setHeader = function (key, value) {
	    var added = false,
	        headerValue;
	
	    // Allow setting multiple headers at once
	    if (!value && key && typeof key === 'object') {
	        // allow {key:'content-type', value: 'text/plain'}
	        if (key.key && 'value' in key) {
	            this.setHeader(key.key, key.value);
	        }
	        // allow [{key:'content-type', value: 'text/plain'}]
	        else if (Array.isArray(key)) {
	            key.forEach(function (i) {
	                this.setHeader(i.key, i.value);
	            }.bind(this));
	        }
	        // allow {'content-type': 'text/plain'}
	        else {
	            Object.keys(key).forEach(function (i) {
	                this.setHeader(i, key[i]);
	            }.bind(this));
	        }
	        return this;
	    }
	
	    key = this._normalizeHeaderKey(key);
	
	    headerValue = {
	        key: key,
	        value: value
	    };
	
	    // Check if the value exists and overwrite
	    for (var i = 0, len = this._headers.length; i < len; i++) {
	        if (this._headers[i].key === key) {
	            if (!added) {
	                // replace the first match
	                this._headers[i] = headerValue;
	                added = true;
	            } else {
	                // remove following matches
	                this._headers.splice(i, 1);
	                i--;
	                len--;
	            }
	        }
	    }
	
	    // match not found, append the value
	    if (!added) {
	        this._headers.push(headerValue);
	    }
	
	    return this;
	};
	
	/**
	 * Adds a header value. If the value for selected key exists, the value is appended
	 * as a new field and old one is not touched.
	 * You can set multiple values as well by using [{key:'', value:''}] or
	 * {key: 'value'} as the first argument.
	 *
	 * @param {String|Array|Object} key Header key or a list of key value pairs
	 * @param {String} value Header value
	 * @return {Object} current node
	 */
	MimeNode.prototype.addHeader = function (key, value) {
	
	    // Allow setting multiple headers at once
	    if (!value && key && typeof key === 'object') {
	        // allow {key:'content-type', value: 'text/plain'}
	        if (key.key && key.value) {
	            this.addHeader(key.key, key.value);
	        }
	        // allow [{key:'content-type', value: 'text/plain'}]
	        else if (Array.isArray(key)) {
	            key.forEach(function (i) {
	                this.addHeader(i.key, i.value);
	            }.bind(this));
	        }
	        // allow {'content-type': 'text/plain'}
	        else {
	            Object.keys(key).forEach(function (i) {
	                this.addHeader(i, key[i]);
	            }.bind(this));
	        }
	        return this;
	    } else if (Array.isArray(value)) {
	        value.forEach(function (val) {
	            this.addHeader(key, val);
	        }.bind(this));
	        return this;
	    }
	
	    this._headers.push({
	        key: this._normalizeHeaderKey(key),
	        value: value
	    });
	
	    return this;
	};
	
	/**
	 * Retrieves the first mathcing value of a selected key
	 *
	 * @param {String} key Key to search for
	 * @retun {String} Value for the key
	 */
	MimeNode.prototype.getHeader = function (key) {
	    key = this._normalizeHeaderKey(key);
	    for (var i = 0, len = this._headers.length; i < len; i++) {
	        if (this._headers[i].key === key) {
	            return this._headers[i].value;
	        }
	    }
	};
	
	/**
	 * Sets body content for current node. If the value is a string, charset is added automatically
	 * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
	 * the charset yourself
	 *
	 * @param (String|Buffer) content Body content
	 * @return {Object} current node
	 */
	MimeNode.prototype.setContent = function (content) {
	    var _self = this;
	    this.content = content;
	    if (typeof this.content.pipe === 'function') {
	        // pre-stream handler. might be triggered if a stream is set as content
	        // and 'error' fires before anything is done with this stream
	        this._contentErrorHandler = function (err) {
	            _self.content.removeListener('error', _self._contentErrorHandler);
	            _self.content = err;
	        };
	        this.content.once('error', this._contentErrorHandler);
	    } else if (typeof this.content === 'string') {
	        this._isPlainText = libmime.isPlainText(this.content);
	        if (this._isPlainText && libmime.hasLongerLines(this.content, 76)) {
	            // If there are lines longer than 76 symbols/bytes do not use 7bit
	            this._hasLongLines = true;
	        }
	    }
	    return this;
	};
	
	MimeNode.prototype.build = function (callback) {
	    var stream = this.createReadStream();
	    var buf = [];
	    var buflen = 0;
	    var returned = false;
	
	    stream.on('readable', function () {
	        var chunk;
	
	        while ((chunk = stream.read()) !== null) {
	            buf.push(chunk);
	            buflen += chunk.length;
	        }
	    });
	
	    stream.once('error', function (err) {
	        if (returned) {
	            return;
	        }
	        returned = true;
	
	        return callback(err);
	    });
	
	    stream.once('end', function (chunk) {
	        if (returned) {
	            return;
	        }
	        returned = true;
	
	        if (chunk && chunk.length) {
	            buf.push(chunk);
	            buflen += chunk.length;
	        }
	        return callback(null, Buffer.concat(buf, buflen));
	    });
	};
	
	MimeNode.prototype.getTransferEncoding = function () {
	    var transferEncoding = false;
	    var contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();
	
	    if (this.content) {
	        transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
	        if (!transferEncoding || ['base64', 'quoted-printable'].indexOf(transferEncoding) < 0) {
	            if (/^text\//i.test(contentType)) {
	                // If there are no special symbols, no need to modify the text
	                if (this._isPlainText && !this._hasLongLines) {
	                    transferEncoding = '7bit';
	                } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
	                    // detect preferred encoding for string value
	                    transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
	                } else {
	                    // we can not check content for a stream, so either use preferred encoding or fallback to QP
	                    transferEncoding = this.transferEncoding === 'B' ? 'base64' : 'quoted-printable';
	                }
	            } else if (!/^(multipart|message)\//i.test(contentType)) {
	                transferEncoding = transferEncoding || 'base64';
	            }
	        }
	    }
	    return transferEncoding;
	};
	
	/**
	 * Builds the header block for the mime node. Append \r\n\r\n before writing the content
	 *
	 * @returns {String} Headers
	 */
	MimeNode.prototype.buildHeaders = function () {
	    var _self = this;
	    var transferEncoding = this.getTransferEncoding();
	    var headers = [];
	
	    if (transferEncoding) {
	        this.setHeader('Content-Transfer-Encoding', transferEncoding);
	    }
	
	    if (this.filename && !this.getHeader('Content-Disposition')) {
	        this.setHeader('Content-Disposition', 'attachment');
	    }
	
	    // Ensure mandatory header fields
	    if (this.rootNode === this) {
	        if (!this.getHeader('Date')) {
	            this.setHeader('Date', this.date.toUTCString().replace(/GMT/, '+0000'));
	        }
	
	        // ensure that Message-Id is present
	        this.messageId();
	
	        if (!this.getHeader('MIME-Version')) {
	            this.setHeader('MIME-Version', '1.0');
	        }
	    }
	
	    this._headers.forEach(function (header) {
	        var key = header.key;
	        var value = header.value;
	        var structured;
	        var param;
	        var options = {};
	        var formattedHeaders = ['From', 'Sender', 'To', 'Cc', 'Bcc', 'Reply-To', 'Date', 'References'];
	
	        if (value && formattedHeaders.indexOf(key) < 0 && typeof value === 'object') {
	            Object.keys(value).forEach(function (key) {
	                if (key !== 'value') {
	                    options[key] = value[key];
	                }
	            });
	            value = (value.value || '').toString();
	            if (!value.trim()) {
	                return;
	            }
	        }
	
	        if (options.prepared) {
	            // header value is
	            headers.push(key + ': ' + value);
	            return;
	        }
	
	        switch (header.key) {
	            case 'Content-Disposition':
	                structured = libmime.parseHeaderValue(value);
	                if (_self.filename) {
	                    structured.params.filename = _self.filename;
	                }
	                value = libmime.buildHeaderValue(structured);
	                break;
	            case 'Content-Type':
	                structured = libmime.parseHeaderValue(value);
	
	                _self._handleContentType(structured);
	
	                if (structured.value.match(/^text\/plain\b/) && typeof _self.content === 'string' && /[\u0080-\uFFFF]/.test(_self.content)) {
	                    structured.params.charset = 'utf-8';
	                }
	
	                value = libmime.buildHeaderValue(structured);
	
	                if (_self.filename) {
	                    // add support for non-compliant clients like QQ webmail
	                    // we can't build the value with buildHeaderValue as the value is non standard and
	                    // would be converted to parameter continuation encoding that we do not want
	                    param = this._encodeWords(_self.filename);
	                    if (param !== _self.filename || /[\s"=;]/.test(param)) {
	                        // include value in quotes if needed
	                        param = '"' + param + '"';
	                    }
	                    value += '; name=' + param;
	                }
	                break;
	            case 'Bcc':
	                if (!_self.keepBcc) {
	                    // skip BCC values
	                    return;
	                }
	                break;
	        }
	
	        value = _self._encodeHeaderValue(key, value);
	
	        // skip empty lines
	        if (!(value || '').toString().trim()) {
	            return;
	        }
	
	        headers.push(libmime.foldLines(key + ': ' + value, 76));
	    }.bind(this));
	
	    return headers.join('\r\n');
	};
	
	/**
	 * Streams the rfc2822 message from the current node. If this is a root node,
	 * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
	 *
	 * @return {String} Compiled message
	 */
	MimeNode.prototype.createReadStream = function (options) {
	    options = options || {};
	
	    var outputStream = new PassThrough(options);
	    var transform;
	
	    this.stream(outputStream, options, function (err) {
	        if (err) {
	            outputStream.emit('error', err);
	            return;
	        }
	        outputStream.end();
	    });
	
	    for (var i = 0, len = this._transforms.length; i < len; i++) {
	        transform = typeof this._transforms[i] === 'function' ? this._transforms[i]() : this._transforms[i];
	        outputStream.once('error', function (err) {
	            transform.emit('error', err);
	        });
	        outputStream = outputStream.pipe(transform);
	    }
	
	    return outputStream;
	};
	
	/**
	 * Appends a transform stream object to the transforms list. Final output
	 * is passed through this stream before exposing
	 *
	 * @param {Object} transform Read-Write stream
	 */
	MimeNode.prototype.transform = function (transform) {
	    this._transforms.push(transform);
	};
	
	MimeNode.prototype.stream = function (outputStream, options, done) {
	    var _self = this;
	    var transferEncoding = this.getTransferEncoding();
	    var contentStream;
	    var localStream;
	
	    // protect actual callback against multiple triggering
	    var returned = false;
	    var callback = function (err) {
	        if (returned) {
	            return;
	        }
	        returned = true;
	        done(err);
	    };
	
	    // pushes node content
	    function sendContent() {
	        if (_self.content) {
	
	            if (Object.prototype.toString.call(_self.content) === '[object Error]') {
	                // content is already errored
	                return callback(_self.content);
	            }
	
	            if (typeof _self.content.pipe === 'function') {
	                _self.content.removeListener('error', _self._contentErrorHandler);
	                _self._contentErrorHandler = function (err) {
	                    return callback(err);
	                };
	                _self.content.once('error', _self._contentErrorHandler);
	            }
	
	            if (['quoted-printable', 'base64'].indexOf(transferEncoding) >= 0) {
	                contentStream = new(transferEncoding === 'base64' ? libbase64 : libqp).Encoder(options);
	
	                contentStream.pipe(outputStream, {
	                    end: false
	                });
	                contentStream.once('end', finalize);
	                contentStream.once('error', function (err) {
	                    return callback(err);
	                });
	
	                localStream = _self._getStream(_self.content);
	                localStream.pipe(contentStream);
	            } else {
	                // anything that is not QP or Base54 passes as-is
	                localStream = _self._getStream(_self.content);
	                localStream.pipe(outputStream, {
	                    end: false
	                });
	                localStream.once('end', finalize);
	            }
	
	            localStream.once('error', function (err) {
	                return callback(err);
	            });
	
	            return;
	        } else {
	            return setImmediate(finalize);
	        }
	    }
	
	    // for multipart nodes, push child nodes
	    // for content nodes end the stream
	    function finalize() {
	        var childId = 0;
	        var processChildNode = function () {
	            if (childId >= _self.childNodes.length) {
	                outputStream.write('\r\n--' + _self.boundary + '--\r\n');
	                return callback();
	            }
	            var child = _self.childNodes[childId++];
	            outputStream.write((childId > 1 ? '\r\n' : '') + '--' + _self.boundary + '\r\n');
	            child.stream(outputStream, options, function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                setImmediate(processChildNode);
	            });
	        };
	
	        if (_self.multipart) {
	            setImmediate(processChildNode);
	        } else {
	            return callback();
	        }
	    }
	
	    if (this._raw) {
	        setImmediate(function () {
	            if (Object.prototype.toString.call(_self._raw) === '[object Error]') {
	                // content is already errored
	                return callback(_self._raw);
	            }
	
	            // remove default error handler (if set)
	            if (typeof _self._raw.pipe === 'function') {
	                _self._raw.removeListener('error', _self._contentErrorHandler);
	            }
	
	            var raw = _self._getStream(_self._raw);
	            raw.pipe(outputStream, {
	                end: false
	            });
	            raw.on('error', function (err) {
	                outputStream.emit('error', err);
	            });
	            raw.on('end', finalize);
	        });
	    } else {
	        outputStream.write(this.buildHeaders() + '\r\n\r\n');
	        setImmediate(sendContent);
	    }
	};
	
	/**
	 * Sets envelope to be used instead of the generated one
	 *
	 * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
	 */
	MimeNode.prototype.setEnvelope = function (envelope) {
	    var list;
	
	    this._envelope = {
	        from: false,
	        to: []
	    };
	
	    if (envelope.from) {
	        list = [];
	        this._convertAddresses(this._parseAddresses(envelope.from), list);
	        list = list.filter(function (address) {
	            return address && address.address;
	        });
	        if (list.length && list[0]) {
	            this._envelope.from = list[0].address;
	        }
	    }
	    ['to', 'cc', 'bcc'].forEach(function (key) {
	        if (envelope[key]) {
	            this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
	        }
	    }.bind(this));
	
	    this._envelope.to = this._envelope.to.map(function (to) {
	        return to.address;
	    }).filter(function (address) {
	        return address;
	    });
	
	    var standardFields = ['to', 'cc', 'bcc', 'from'];
	    Object.keys(envelope).forEach(function (key) {
	        if (standardFields.indexOf(key) === -1) {
	            this._envelope[key] = envelope[key];
	        }
	    }.bind(this));
	
	    return this;
	};
	
	/**
	 * Generates and returns an object with parsed address fields
	 *
	 * @return {Object} Address object
	 */
	MimeNode.prototype.getAddresses = function () {
	    var addresses = {};
	
	    this._headers.forEach(function (header) {
	        var key = header.key.toLowerCase();
	        if (['from', 'sender', 'reply-to', 'to', 'cc', 'bcc'].indexOf(key) >= 0) {
	            if (!Array.isArray(addresses[key])) {
	                addresses[key] = [];
	            }
	
	            this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
	        }
	    }.bind(this));
	
	    return addresses;
	};
	
	/**
	 * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
	 *
	 * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
	 */
	MimeNode.prototype.getEnvelope = function () {
	    if (this._envelope) {
	        return this._envelope;
	    }
	
	    var envelope = {
	        from: false,
	        to: []
	    };
	    this._headers.forEach(function (header) {
	        var list = [];
	        if (header.key === 'From' || (!envelope.from && ['Reply-To', 'Sender'].indexOf(header.key) >= 0)) {
	            this._convertAddresses(this._parseAddresses(header.value), list);
	            if (list.length && list[0]) {
	                envelope.from = list[0].address;
	            }
	        } else if (['To', 'Cc', 'Bcc'].indexOf(header.key) >= 0) {
	            this._convertAddresses(this._parseAddresses(header.value), envelope.to);
	        }
	    }.bind(this));
	
	    envelope.to = envelope.to.map(function (to) {
	        return to.address;
	    });
	
	    return envelope;
	};
	
	/**
	 * Returns Message-Id value. If it does not exist, then creates one
	 *
	 * @return {String} Message-Id value
	 */
	MimeNode.prototype.messageId = function () {
	    var messageId = this.getHeader('Message-ID');
	    // You really should define your own Message-Id field!
	    if (!messageId) {
	        messageId = this._generateMessageId();
	        this.setHeader('Message-ID', messageId);
	    }
	    return messageId;
	};
	
	/**
	 * Sets pregenerated content that will be used as the output of this node
	 *
	 * @param {String|Buffer|Stream} Raw MIME contents
	 */
	MimeNode.prototype.setRaw = function (raw) {
	    var _self = this;
	
	    this._raw = raw;
	
	    if (this._raw && typeof this._raw.pipe === 'function') {
	        // pre-stream handler. might be triggered if a stream is set as content
	        // and 'error' fires before anything is done with this stream
	        this._contentErrorHandler = function (err) {
	            _self._raw.removeListener('error', _self._contentErrorHandler);
	            _self._raw = err;
	        };
	        _self._raw.once('error', this._contentErrorHandler);
	    }
	
	    return this;
	};
	
	/////// PRIVATE METHODS
	
	/**
	 * Detects and returns handle to a stream related with the content.
	 *
	 * @param {Mixed} content Node content
	 * @returns {Object} Stream object
	 */
	MimeNode.prototype._getStream = function (content) {
	    var contentStream;
	
	    if (typeof content.pipe === 'function') {
	        // assume as stream
	        return content;
	    } else if (content && typeof content.path === 'string' && !content.href) {
	        if (this.disableFileAccess) {
	            contentStream = new PassThrough();
	            setImmediate(function () {
	                contentStream.emit('error', new Error('File access rejected for ' + content.path));
	            });
	            return contentStream;
	        }
	        // read file
	        return fs.createReadStream(content.path);
	    } else if (content && typeof content.href === 'string') {
	        if (this.disableUrlAccess) {
	            contentStream = new PassThrough();
	            setImmediate(function () {
	                contentStream.emit('error', new Error('Url access rejected for ' + content.href));
	            });
	            return contentStream;
	        }
	        // fetch URL
	        return fetch(content.href);
	    } else {
	        // pass string or buffer content as a stream
	        contentStream = new PassThrough();
	        setImmediate(function () {
	            contentStream.end(content || '');
	        });
	        return contentStream;
	    }
	};
	
	/**
	 * Parses addresses. Takes in a single address or an array or an
	 * array of address arrays (eg. To: [[first group], [second group],...])
	 *
	 * @param {Mixed} addresses Addresses to be parsed
	 * @return {Array} An array of address objects
	 */
	MimeNode.prototype._parseAddresses = function (addresses) {
	    return [].concat.apply([], [].concat(addresses).map(function (address) {
	        if (address && address.address) {
	            address.address = this._normalizeAddress(address.address);
	            address.name = address.name || '';
	            return [address];
	        }
	        return addressparser(address);
	    }.bind(this)));
	};
	
	/**
	 * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
	 *
	 * @param {String} key Key to be normalized
	 * @return {String} key in Camel-Case form
	 */
	MimeNode.prototype._normalizeHeaderKey = function (key) {
	    return (key || '').toString().
	        // no newlines in keys
	    replace(/\r?\n|\r/g, ' ').
	    trim().toLowerCase().
	        // use uppercase words, except MIME
	    replace(/^X\-SMTPAPI$|^(MIME|DKIM)\b|^[a-z]|\-(SPF|FBL|ID|MD5)$|\-[a-z]/ig,
	            function (c) {
	                return c.toUpperCase();
	            }).
	        // special case
	    replace(/^Content\-Features$/i, 'Content-features');
	};
	
	/**
	 * Checks if the content type is multipart and defines boundary if needed.
	 * Doesn't return anything, modifies object argument instead.
	 *
	 * @param {Object} structured Parsed header value for 'Content-Type' key
	 */
	MimeNode.prototype._handleContentType = function (structured) {
	    this.contentType = structured.value.trim().toLowerCase();
	
	    this.multipart = this.contentType.split('/').reduce(function (prev, value) {
	        return prev === 'multipart' ? value : false;
	    });
	
	    if (this.multipart) {
	        this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
	    } else {
	        this.boundary = false;
	    }
	};
	
	/**
	 * Generates a multipart boundary value
	 *
	 * @return {String} boundary value
	 */
	MimeNode.prototype._generateBoundary = function () {
	    return this.rootNode.boundaryPrefix + '-?=_' + this._nodeId + '-' + this.rootNode.baseBoundary;
	};
	
	/**
	 * Encodes a header value for use in the generated rfc2822 email.
	 *
	 * @param {String} key Header key
	 * @param {String} value Header value
	 */
	MimeNode.prototype._encodeHeaderValue = function (key, value) {
	    key = this._normalizeHeaderKey(key);
	
	    switch (key) {
	
	        // Structured headers
	        case 'From':
	        case 'Sender':
	        case 'To':
	        case 'Cc':
	        case 'Bcc':
	        case 'Reply-To':
	            return this._convertAddresses(this._parseAddresses(value));
	
	            // values enclosed in <>
	        case 'Message-ID':
	        case 'In-Reply-To':
	        case 'Content-Id':
	            value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
	
	            if (value.charAt(0) !== '<') {
	                value = '<' + value;
	            }
	
	            if (value.charAt(value.length - 1) !== '>') {
	                value = value + '>';
	            }
	            return value;
	
	            // space separated list of values enclosed in <>
	        case 'References':
	            value = [].concat.apply([], [].concat(value || '').map(function (elm) {
	                elm = (elm || '').toString().replace(/\r?\n|\r/g, ' ').trim();
	                return elm.replace(/<[^>]*>/g, function (str) {
	                    return str.replace(/\s/g, '');
	                }).split(/\s+/);
	            })).map(function (elm) {
	                if (elm.charAt(0) !== '<') {
	                    elm = '<' + elm;
	                }
	                if (elm.charAt(elm.length - 1) !== '>') {
	                    elm = elm + '>';
	                }
	                return elm;
	            });
	
	            return value.join(' ').trim();
	
	        case 'Date':
	            if (Object.prototype.toString.call(value) === '[object Date]') {
	                return value.toUTCString().replace(/GMT/, '+0000');
	            }
	
	            value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
	            return this._encodeWords(value);
	
	        default:
	            value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
	            // encodeWords only encodes if needed, otherwise the original string is returned
	            return this._encodeWords(value);
	    }
	};
	
	/**
	 * Rebuilds address object using punycode and other adjustments
	 *
	 * @param {Array} addresses An array of address objects
	 * @param {Array} [uniqueList] An array to be populated with addresses
	 * @return {String} address string
	 */
	MimeNode.prototype._convertAddresses = function (addresses, uniqueList) {
	    var values = [];
	
	    uniqueList = uniqueList || [];
	
	    [].concat(addresses || []).forEach(function (address) {
	        if (address.address) {
	            address.address = this._normalizeAddress(address.address);
	
	            if (!address.name) {
	                values.push(address.address);
	            } else if (address.name) {
	                values.push(this._encodeAddressName(address.name) + ' <' + address.address + '>');
	            }
	
	            if (address.address) {
	                if (!uniqueList.filter(
	                        function (a) {
	                            return a.address === address.address;
	                        }).length) {
	                    uniqueList.push(address);
	                }
	            }
	        } else if (address.group) {
	            values.push(this._encodeAddressName(address.name) + ':' + (address.group.length ? this._convertAddresses(address.group, uniqueList) : '').trim() + ';');
	        }
	    }.bind(this));
	
	    return values.join(', ');
	};
	
	/**
	 * Normalizes an email address
	 *
	 * @param {Array} address An array of address objects
	 * @return {String} address string
	 */
	MimeNode.prototype._normalizeAddress = function (address) {
	    address = (address || '').toString().trim();
	
	    var lastAt = address.lastIndexOf('@');
	    var user = address.substr(0, lastAt);
	    var domain = address.substr(lastAt + 1);
	
	    // Usernames are not touched and are kept as is even if these include unicode
	    // Domains are punycoded by default
	    // 'jõgeva.ee' will be converted to 'xn--jgeva-dua.ee'
	    // non-unicode domains are left as is
	
	    return user + '@' + punycode.toASCII(domain.toLowerCase());
	};
	
	/**
	 * If needed, mime encodes the name part
	 *
	 * @param {String} name Name part of an address
	 * @returns {String} Mime word encoded string if needed
	 */
	MimeNode.prototype._encodeAddressName = function (name) {
	    if (!/^[\w ']*$/.test(name)) {
	        if (/^[\x20-\x7e]*$/.test(name)) {
	            return '"' + name.replace(/([\\"])/g, '\\$1') + '"';
	        } else {
	            return libmime.encodeWord(name, this._getTextEncoding(name), 52);
	        }
	    }
	    return name;
	};
	
	/**
	 * If needed, mime encodes the name part
	 *
	 * @param {String} name Name part of an address
	 * @returns {String} Mime word encoded string if needed
	 */
	MimeNode.prototype._encodeWords = function (value) {
	    return libmime.encodeWords(value, this._getTextEncoding(value), 52);
	};
	
	/**
	 * Detects best mime encoding for a text value
	 *
	 * @param {String} value Value to check for
	 * @return {String} either 'Q' or 'B'
	 */
	MimeNode.prototype._getTextEncoding = function (value) {
	    value = (value || '').toString();
	
	    var encoding = this.textEncoding;
	    var latinLen;
	    var nonLatinLen;
	
	    if (!encoding) {
	        // count latin alphabet symbols and 8-bit range symbols + control symbols
	        // if there are more latin characters, then use quoted-printable
	        // encoding, otherwise use base64
	        nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
	        latinLen = (value.match(/[a-z]/gi) || []).length;
	        // if there are more latin symbols than binary/unicode, then prefer Q, otherwise B
	        encoding = nonLatinLen < latinLen ? 'Q' : 'B';
	    }
	    return encoding;
	};
	
	/**
	 * Generates a message id
	 *
	 * @return {String} Random Message-ID value
	 */
	MimeNode.prototype._generateMessageId = function () {
	    return '<' + [2, 2, 2, 6].reduce(
	            // crux to generate UUID-like random strings
	            function (prev, len) {
	                return prev + '-' + crypto.randomBytes(len).toString('hex');
	            }, crypto.randomBytes(4).toString('hex')) +
	        '@' +
	        // try to use the domain of the FROM address or fallback to server hostname
	        (this.getEnvelope().from || this.hostname || os.hostname() || 'localhost').split('@').pop() + '>';
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var libcharset = __webpack_require__(47);
	var libbase64 = __webpack_require__(49);
	var libqp = __webpack_require__(52);
	var mimetypes = __webpack_require__(53);
	
	var libmime = module.exports = {
	
	    /**
	     * Checks if a value is plaintext string (uses only printable 7bit chars)
	     *
	     * @param {String} value String to be tested
	     * @returns {Boolean} true if it is a plaintext string
	     */
	    isPlainText: function (value) {
	        if (typeof value !== 'string' || /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/.test(value)) {
	            return false;
	        } else {
	            return true;
	        }
	    },
	
	    /**
	     * Checks if a multi line string containes lines longer than the selected value.
	     *
	     * Useful when detecting if a mail message needs any processing at all –
	     * if only plaintext characters are used and lines are short, then there is
	     * no need to encode the values in any way. If the value is plaintext but has
	     * longer lines then allowed, then use format=flowed
	     *
	     * @param {Number} lineLength Max line length to check for
	     * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
	     */
	    hasLongerLines: function (str, lineLength) {
	        return new RegExp('^.{' + (lineLength + 1) + ',}', 'm').test(str);
	    },
	
	    /**
	     * Decodes a string from a format=flowed soft wrapping.
	     *
	     * @param {String} str Plaintext string with format=flowed to decode
	     * @param {Boolean} [delSp] If true, delete leading spaces (delsp=yes)
	     * @return {String} Mime decoded string
	     */
	    decodeFlowed: function (str, delSp) {
	        str = (str || '').toString();
	
	        return str.
	        split(/\r?\n/).
	            // remove soft linebreaks
	            // soft linebreaks are added after space symbols
	        reduce(
	                function (previousValue, currentValue, index) {
	                    var body = previousValue;
	                    if (delSp) {
	                        // delsp adds spaces to text to be able to fold it
	                        // these spaces can be removed once the text is unfolded
	                        body = body.replace(/[ ]+$/, '');
	                    }
	                    if (/ $/.test(previousValue) && !/(^|\n)\-\- $/.test(previousValue) || index === 1) {
	                        return body + currentValue;
	                    } else {
	                        return body + '\n' + currentValue;
	                    }
	                }
	            ).
	            // remove whitespace stuffing
	            // http://tools.ietf.org/html/rfc3676#section-4.4
	        replace(/^ /gm, '');
	    },
	
	    /**
	     * Adds soft line breaks to content marked with format=flowed to
	     * ensure that no line in the message is never longer than lineLength
	     *
	     * @param {String} str Plaintext string that requires wrapping
	     * @param {Number} [lineLength=76] Maximum length of a line
	     * @return {String} String with forced line breaks
	     */
	    encodeFlowed: function (str, lineLength) {
	        lineLength = lineLength || 76;
	
	        var flowed = [];
	        str.split(/\r?\n/).forEach(function (line) {
	            flowed.push(libmime.foldLines(line.
	                // space stuffing http://tools.ietf.org/html/rfc3676#section-4.2
	                replace(/^( |From|>)/igm, ' $1'),
	                lineLength, true));
	        });
	        return flowed.join('\r\n');
	    },
	
	    /**
	     * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
	     *
	     * @param {String|Buffer} data String to be encoded
	     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
	     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
	     * @return {String} Single or several mime words joined together
	     */
	    encodeWord: function (data, mimeWordEncoding, maxLength) {
	        mimeWordEncoding = (mimeWordEncoding || 'Q').toString().toUpperCase().trim().charAt(0);
	        maxLength = maxLength || 0;
	
	        var encodedStr,
	            toCharset = 'UTF-8',
	            i, len, parts, lpart, chr;
	
	        if (maxLength && maxLength > 7 + toCharset.length) {
	            maxLength -= (7 + toCharset.length);
	        }
	
	        if (mimeWordEncoding === 'Q') {
	            // https://tools.ietf.org/html/rfc2047#section-5 rule (3)
	            encodedStr = libqp.encode(data).replace(/[^a-z0-9!*+\-\/=]/ig, function (chr) {
	                var ord = chr.charCodeAt(0).toString(16).toUpperCase();
	                if (chr === ' ') {
	                    return '_';
	                } else {
	                    return '=' + (ord.length === 1 ? '0' + ord : ord);
	                }
	            });
	        } else if (mimeWordEncoding === 'B') {
	            encodedStr = typeof data === 'string' ? data : libbase64.encode(data);
	            maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
	        }
	
	        if (maxLength && (mimeWordEncoding !== 'B' ? encodedStr : libbase64.encode(data)).length > maxLength) {
	            if (mimeWordEncoding === 'Q') {
	                encodedStr = splitMimeEncodedString(encodedStr, maxLength).join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
	            } else {
	                // RFC2047 6.3 (2) states that encoded-word must include an integral number of characters, so no chopping unicode sequences
	                parts = [];
	                lpart = '';
	                for (i = 0, len = encodedStr.length; i < len; i++) {
	                    chr = encodedStr.charAt(i);
	                    // check if we can add this character to the existing string
	                    // without breaking byte length limit
	                    if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
	                        lpart += chr;
	                    } else {
	                        // we hit the length limit, so push the existing string and start over
	                        parts.push(libbase64.encode(lpart));
	                        lpart = chr;
	                    }
	                }
	                if (lpart) {
	                    parts.push(libbase64.encode(lpart));
	                }
	
	                if (parts.length > 1) {
	                    encodedStr = parts.join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
	                } else {
	                    encodedStr = parts.join('');
	                }
	            }
	        } else if (mimeWordEncoding === 'B') {
	            encodedStr = libbase64.encode(data);
	        }
	
	        return '=?' + toCharset + '?' + mimeWordEncoding + '?' + encodedStr + (encodedStr.substr(-2) === '?=' ? '' : '?=');
	    },
	
	    /**
	     * Decode a complete mime word encoded string
	     *
	     * @param {String} str Mime word encoded string
	     * @return {String} Decoded unicode string
	     */
	    decodeWord: function (str) {
	        str = (str || '').toString().trim();
	
	        var fromCharset, encoding, match;
	
	        match = str.match(/^\=\?([\w_\-\*]+)\?([QqBb])\?([^\?]+)\?\=$/i);
	        if (!match) {
	            return str;
	        }
	
	        // RFC2231 added language tag to the encoding
	        // see: https://tools.ietf.org/html/rfc2231#section-5
	        // this implementation silently ignores this tag
	        fromCharset = match[1].split('*').shift();
	
	        encoding = (match[2] || 'Q').toString().toUpperCase();
	        str = (match[3] || '');
	
	        if (encoding === 'Q') {
	            // remove spaces between = and hex char, this might indicate invalidly applied line splitting
	            str = str.replace(/=\s+([0-9a-fA-F])/, '=$1');
	        }
	
	        // convert all underscores to spaces
	        str = str.replace(/_/g, ' ').replace(/ $/, '=20');
	
	        if (encoding === 'B') {
	            return libcharset.decode(libbase64.decode(str), fromCharset);
	        } else if (encoding === 'Q') {
	            return libcharset.decode(libqp.decode(str), fromCharset);
	        } else {
	            return str;
	        }
	    },
	
	    /**
	     * Finds word sequences with non ascii text and converts these to mime words
	     *
	     * @param {String|Buffer} data String to be encoded
	     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
	     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
	     * @param {String} [fromCharset='UTF-8'] Source sharacter set
	     * @return {String} String with possible mime words
	     */
	    encodeWords: function (data, mimeWordEncoding, maxLength, fromCharset) {
	        if (!fromCharset && typeof maxLength === 'string' && !maxLength.match(/^[0-9]+$/)) {
	            fromCharset = maxLength;
	            maxLength = undefined;
	        }
	
	        maxLength = maxLength || 0;
	
	        var decodedValue = libcharset.decode(libcharset.convert((data || ''), fromCharset));
	        var encodedValue;
	
	        var firstMatch = decodedValue.match(/(?:^|\s)([^\s]*[\u0080-\uFFFF])/);
	        if (!firstMatch) {
	            return decodedValue;
	        }
	        var lastMatch = decodedValue.match(/([\u0080-\uFFFF][^\s]*)[^\u0080-\uFFFF]*$/);
	        if (!lastMatch) {
	            // should not happen
	            return decodedValue;
	        }
	        var startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
	            index: 0
	        }).index;
	        var endIndex = lastMatch.index + (lastMatch[1] || '').length;
	
	        encodedValue =
	            (startIndex ? decodedValue.substr(0, startIndex) : '') +
	            libmime.encodeWord(decodedValue.substring(startIndex, endIndex), mimeWordEncoding || 'Q', maxLength) +
	            (endIndex < decodedValue.length ? decodedValue.substr(endIndex) : '');
	
	        return encodedValue;
	    },
	
	    /**
	     * Decode a string that might include one or several mime words
	     *
	     * @param {String} str String including some mime words that will be encoded
	     * @return {String} Decoded unicode string
	     */
	    decodeWords: function (str) {
	        return (str || '').toString().
	
	        // find base64 words that can be joined
	        replace(/(=\?([^?]+)\?[Bb]\?[^?]+[^^=]\?=)\s*(?==\?([^?]+)\?[Bb]\?[^?]+\?=)/g,
	            function (match, left, chLeft, chRight) {
	                // only mark b64 chunks to be joined if charsets match
	                if (libcharset.normalizeCharset(chLeft || '').toLowerCase().trim() === libcharset.normalizeCharset(chRight || '').toLowerCase().trim()) {
	                    // set a joiner marker
	                    return left + '__\x00JOIN\x00__';
	                }
	                return match;
	            }).
	
	        // find QP words that can be joined
	        replace(/(=\?([^?]+)\?[Qq]\?[^?]+\?=)\s*(?==\?([^?]+)\?[Qq]\?[^?]+\?=)/g,
	            function (match, left, chLeft, chRight) {
	                // only mark QP chunks to be joined if charsets match
	                if (libcharset.normalizeCharset(chLeft || '').toLowerCase().trim() === libcharset.normalizeCharset(chRight || '').toLowerCase().trim()) {
	                    // set a joiner marker
	                    return left + '__\x00JOIN\x00__';
	                }
	                return match;
	            }).
	
	        // join base64 encoded words
	        replace(/(\?=)?__\x00JOIN\x00__(=\?([^?]+)\?[QqBb]\?)?/g, '').
	
	        // remove spaces between mime encoded words
	        replace(/(=\?[^?]+\?[QqBb]\?[^?]+\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]+\?=)/g, '$1').
	
	        // decode words
	        replace(/\=\?([\w_\-\*]+)\?([QqBb])\?[^\?]+\?\=/g, function (mimeWord) {
	            return libmime.decodeWord(mimeWord);
	        });
	    },
	
	    /**
	     * Splits a string by :
	     * The result is not mime word decoded, you need to do your own decoding based
	     * on the rules for the specific header key
	     *
	     * @param {String} headerLine Single header line, might include linebreaks as well if folded
	     * @return {Object} And object of {key, value}
	     */
	    decodeHeader: function (headerLine) {
	        var line = (headerLine || '').toString().replace(/(?:\r?\n|\r)[ \t]*/g, ' ').trim(),
	            match = line.match(/^\s*([^:]+):(.*)$/),
	            key = (match && match[1] || '').trim().toLowerCase(),
	            value = (match && match[2] || '').trim();
	
	        return {
	            key: key,
	            value: value
	        };
	    },
	
	    /**
	     * Parses a block of header lines. Does not decode mime words as every
	     * header might have its own rules (eg. formatted email addresses and such)
	     *
	     * @param {String} headers Headers string
	     * @return {Object} An object of headers, where header keys are object keys. NB! Several values with the same key make up an Array
	     */
	    decodeHeaders: function (headers) {
	        var lines = headers.split(/\r?\n|\r/),
	            headersObj = {},
	            header,
	            i, len;
	
	        for (i = lines.length - 1; i >= 0; i--) {
	            if (i && lines[i].match(/^\s/)) {
	                lines[i - 1] += '\r\n' + lines[i];
	                lines.splice(i, 1);
	            }
	        }
	
	        for (i = 0, len = lines.length; i < len; i++) {
	            header = libmime.decodeHeader(lines[i]);
	            if (!headersObj[header.key]) {
	                headersObj[header.key] = [header.value];
	            } else {
	                headersObj[header.key].push(header.value);
	            }
	        }
	
	        return headersObj;
	    },
	
	    /**
	     * Joins parsed header value together as 'value; param1=value1; param2=value2'
	     * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
	     *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
	     * @param {Object} structured Parsed header value
	     * @return {String} joined header value
	     */
	    buildHeaderValue: function (structured) {
	        var paramsArray = [];
	
	        Object.keys(structured.params || {}).forEach(function (param) {
	            // filename might include unicode characters so it is a special case
	            var value = structured.params[param];
	            if (!libmime.isPlainText(value) || value.length >= 75) {
	                libmime.buildHeaderParam(param, value, 50).forEach(function (encodedParam) {
	                    if (!/[\s"\\;:\/=\(\),<>@\[\]\?]|^[\-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === '*') {
	                        paramsArray.push(encodedParam.key + '=' + encodedParam.value);
	                    } else {
	                        paramsArray.push(encodedParam.key + '=' + JSON.stringify(encodedParam.value));
	                    }
	                });
	            } else if (/[\s'"\\;:\/=\(\),<>@\[\]\?]|^\-/.test(value)) {
	                paramsArray.push(param + '=' + JSON.stringify(value));
	            } else {
	                paramsArray.push(param + '=' + value);
	            }
	        }.bind(this));
	
	        return structured.value + (paramsArray.length ? '; ' + paramsArray.join('; ') : '');
	    },
	
	    /**
	     * Parses a header value with key=value arguments into a structured
	     * object.
	     *
	     *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
	     *   {
	     *     'value': 'text/plain',
	     *     'params': {
	     *       'charset': 'UTF-8'
	     *     }
	     *   }
	     *
	     * @param {String} str Header value
	     * @return {Object} Header value as a parsed structure
	     */
	    parseHeaderValue: function (str) {
	        var response = {
	                value: false,
	                params: {}
	            },
	            key = false,
	            value = '',
	            type = 'value',
	            quote = false,
	            escaped = false,
	            chr;
	
	        for (var i = 0, len = str.length; i < len; i++) {
	            chr = str.charAt(i);
	            if (type === 'key') {
	                if (chr === '=') {
	                    key = value.trim().toLowerCase();
	                    type = 'value';
	                    value = '';
	                    continue;
	                }
	                value += chr;
	            } else {
	                if (escaped) {
	                    value += chr;
	                } else if (chr === '\\') {
	                    escaped = true;
	                    continue;
	                } else if (quote && chr === quote) {
	                    quote = false;
	                } else if (!quote && chr === '"') {
	                    quote = chr;
	                } else if (!quote && chr === ';') {
	                    if (key === false) {
	                        response.value = value.trim();
	                    } else {
	                        response.params[key] = value.trim();
	                    }
	                    type = 'key';
	                    value = '';
	                } else {
	                    value += chr;
	                }
	                escaped = false;
	
	            }
	        }
	
	        if (type === 'value') {
	            if (key === false) {
	                response.value = value.trim();
	            } else {
	                response.params[key] = value.trim();
	            }
	        } else if (value.trim()) {
	            response.params[value.trim().toLowerCase()] = '';
	        }
	
	        // handle parameter value continuations
	        // https://tools.ietf.org/html/rfc2231#section-3
	
	        // preprocess values
	        Object.keys(response.params).forEach(function (key) {
	            var actualKey, nr, match, value;
	            if ((match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/))) {
	                actualKey = key.substr(0, match.index);
	                nr = Number(match[2] || match[3]) || 0;
	
	                if (!response.params[actualKey] || typeof response.params[actualKey] !== 'object') {
	                    response.params[actualKey] = {
	                        charset: false,
	                        values: []
	                    };
	                }
	
	                value = response.params[key];
	
	                if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
	                    response.params[actualKey].charset = match[1] || 'iso-8859-1';
	                    value = match[2];
	                }
	
	                response.params[actualKey].values[nr] = value;
	
	                // remove the old reference
	                delete response.params[key];
	            }
	        });
	
	        // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
	        Object.keys(response.params).forEach(function (key) {
	            var value;
	            if (response.params[key] && Array.isArray(response.params[key].values)) {
	                value = response.params[key].values.map(function (val) {
	                    return val || '';
	                }).join('');
	
	                if (response.params[key].charset) {
	                    // convert "%AB" to "=?charset?Q?=AB?="
	                    response.params[key] = '=?' +
	                        response.params[key].charset +
	                        '?Q?' +
	                        value.
	                        // fix invalidly encoded chars
	                    replace(/[=\?_\s]/g,
	                            function (s) {
	                                var c = s.charCodeAt(0).toString(16);
	                                if (s === ' ') {
	                                    return '_';
	                                } else {
	                                    return '%' + (c.length < 2 ? '0' : '') + c;
	                                }
	                            }
	                        ).
	                        // change from urlencoding to percent encoding
	                    replace(/%/g, '=') +
	                        '?=';
	                } else {
	                    response.params[key] = value;
	                }
	            }
	        }.bind(this));
	
	        return response;
	    },
	
	    /**
	     * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
	     * Useful for splitting long parameter values.
	     *
	     * For example
	     *      title="unicode string"
	     * becomes
	     *     title*0*=utf-8''unicode
	     *     title*1*=%20string
	     *
	     * @param {String|Buffer} data String to be encoded
	     * @param {Number} [maxLength=50] Max length for generated chunks
	     * @param {String} [fromCharset='UTF-8'] Source sharacter set
	     * @return {Array} A list of encoded keys and headers
	     */
	    buildHeaderParam: function (key, data, maxLength, fromCharset) {
	        var list = [];
	        var encodedStr = typeof data === 'string' ? data : libmime.decode(data, fromCharset);
	        var encodedStrArr;
	        var chr, ord;
	        var line;
	        var startPos = 0;
	        var isEncoded = false;
	        var i, len;
	
	        maxLength = maxLength || 50;
	
	        // process ascii only text
	        if (libmime.isPlainText(data)) {
	
	            // check if conversion is even needed
	            if (encodedStr.length <= maxLength) {
	                return [{
	                    key: key,
	                    value: encodedStr
	                }];
	            }
	
	            encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), function (str) {
	                list.push({
	                    line: str
	                });
	                return '';
	            });
	
	            if (encodedStr) {
	                list.push({
	                    line: encodedStr
	                });
	            }
	
	        } else {
	
	            if (/[\uD800-\uDBFF]/.test(encodedStr)) {
	                // string containts surrogate pairs, so normalize it to an array of bytes
	                encodedStrArr = [];
	                for (i = 0, len = encodedStr.length; i < len; i++) {
	                    chr = encodedStr.charAt(i);
	                    ord = chr.charCodeAt(0);
	                    if (ord >= 0xD800 && ord <= 0xDBFF && i < len - 1) {
	                        chr += encodedStr.charAt(i + 1);
	                        encodedStrArr.push(chr);
	                        i++;
	                    } else {
	                        encodedStrArr.push(chr);
	                    }
	                }
	                encodedStr = encodedStrArr;
	            }
	
	            // first line includes the charset and language info and needs to be encoded
	            // even if it does not contain any unicode characters
	            line = 'utf-8\'\'';
	            isEncoded = true;
	            startPos = 0;
	
	            // process text with unicode or special chars
	            for (i = 0, len = encodedStr.length; i < len; i++) {
	
	                chr = encodedStr[i];
	
	                if (isEncoded) {
	                    chr = safeEncodeURIComponent(chr);
	                } else {
	                    // try to urlencode current char
	                    chr = chr === ' ' ? chr : safeEncodeURIComponent(chr);
	                    // By default it is not required to encode a line, the need
	                    // only appears when the string contains unicode or special chars
	                    // in this case we start processing the line over and encode all chars
	                    if (chr !== encodedStr[i]) {
	                        // Check if it is even possible to add the encoded char to the line
	                        // If not, there is no reason to use this line, just push it to the list
	                        // and start a new line with the char that needs encoding
	                        if ((safeEncodeURIComponent(line) + chr).length >= maxLength) {
	                            list.push({
	                                line: line,
	                                encoded: isEncoded
	                            });
	                            line = '';
	                            startPos = i - 1;
	                        } else {
	                            isEncoded = true;
	                            i = startPos;
	                            line = '';
	                            continue;
	                        }
	                    }
	                }
	
	                // if the line is already too long, push it to the list and start a new one
	                if ((line + chr).length >= maxLength) {
	                    list.push({
	                        line: line,
	                        encoded: isEncoded
	                    });
	                    line = chr = encodedStr[i] === ' ' ? ' ' : safeEncodeURIComponent(encodedStr[i]);
	                    if (chr === encodedStr[i]) {
	                        isEncoded = false;
	                        startPos = i - 1;
	                    } else {
	                        isEncoded = true;
	                    }
	                } else {
	                    line += chr;
	                }
	            }
	
	            if (line) {
	                list.push({
	                    line: line,
	                    encoded: isEncoded
	                });
	            }
	        }
	
	        return list.map(function (item, i) {
	            return {
	                // encoded lines: {name}*{part}*
	                // unencoded lines: {name}*{part}
	                // if any line needs to be encoded then the first line (part==0) is always encoded
	                key: key + '*' + i + (item.encoded ? '*' : ''),
	                value: item.line
	            };
	        });
	    },
	
	
	    /**
	     * Returns file extension for a content type string. If no suitable extensions
	     * are found, 'bin' is used as the default extension
	     *
	     * @param {String} mimeType Content type to be checked for
	     * @return {String} File extension
	     */
	    detectExtension: function (mimeType) {
	        mimeType = (mimeType || '').toString().toLowerCase().replace(/\s/g, '');
	        if (!(mimeType in mimetypes.list)) {
	            return 'bin';
	        }
	
	        if (typeof mimetypes.list[mimeType] === 'string') {
	            return mimetypes.list[mimeType];
	        }
	
	        var mimeParts = mimeType.split('/');
	
	        // search for name match
	        for (var i = 0, len = mimetypes.list[mimeType].length; i < len; i++) {
	            if (mimeParts[1] === mimetypes.list[mimeType][i]) {
	                return mimetypes.list[mimeType][i];
	            }
	        }
	
	        // use the first one
	        return mimetypes.list[mimeType][0] !== '*' ? mimetypes.list[mimeType][0] : 'bin';
	    },
	
	    /**
	     * Returns content type for a file extension. If no suitable content types
	     * are found, 'application/octet-stream' is used as the default content type
	     *
	     * @param {String} extension Extension to be checked for
	     * @return {String} File extension
	     */
	    detectMimeType: function (extension) {
	        extension = (extension || '').toString().toLowerCase().replace(/\s/g, '').replace(/^\./g, '').split('.').pop();
	
	        if (!(extension in mimetypes.extensions)) {
	            return 'application/octet-stream';
	        }
	
	        if (typeof mimetypes.extensions[extension] === 'string') {
	            return mimetypes.extensions[extension];
	        }
	
	        var mimeParts;
	
	        // search for name match
	        for (var i = 0, len = mimetypes.extensions[extension].length; i < len; i++) {
	            mimeParts = mimetypes.extensions[extension][i].split('/');
	            if (mimeParts[1] === extension) {
	                return mimetypes.extensions[extension][i];
	            }
	        }
	
	        // use the first one
	        return mimetypes.extensions[extension][0];
	    },
	
	    /**
	     * Folds long lines, useful for folding header lines (afterSpace=false) and
	     * flowed text (afterSpace=true)
	     *
	     * @param {String} str String to be folded
	     * @param {Number} [lineLength=76] Maximum length of a line
	     * @param {Boolean} afterSpace If true, leave a space in th end of a line
	     * @return {String} String with folded lines
	     */
	    foldLines: function (str, lineLength, afterSpace) {
	        str = (str || '').toString();
	        lineLength = lineLength || 76;
	
	        var pos = 0,
	            len = str.length,
	            result = '',
	            line, match;
	
	        while (pos < len) {
	            line = str.substr(pos, lineLength);
	            if (line.length < lineLength) {
	                result += line;
	                break;
	            }
	            if ((match = line.match(/^[^\n\r]*(\r?\n|\r)/))) {
	                line = match[0];
	                result += line;
	                pos += line.length;
	                continue;
	            } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
	                line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)));
	            } else if ((match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/))) {
	                line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0));
	            }
	
	            result += line;
	            pos += line.length;
	            if (pos < len) {
	                result += '\r\n';
	            }
	        }
	
	        return result;
	    }
	};
	
	/**
	 * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
	 *
	 * @param {String} str Mime encoded string to be split up
	 * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
	 * @return {Array} Split string
	 */
	function splitMimeEncodedString(str, maxlen) {
	    var curLine, match, chr, done,
	        lines = [];
	
	    // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
	    maxlen = Math.max(maxlen || 0, 12);
	
	    while (str.length) {
	        curLine = str.substr(0, maxlen);
	
	        // move incomplete escaped char back to main
	        if ((match = curLine.match(/\=[0-9A-F]?$/i))) {
	            curLine = curLine.substr(0, match.index);
	        }
	
	        done = false;
	        while (!done) {
	            done = true;
	            // check if not middle of a unicode char sequence
	            if ((match = str.substr(curLine.length).match(/^\=([0-9A-F]{2})/i))) {
	                chr = parseInt(match[1], 16);
	                // invalid sequence, move one char back anc recheck
	                if (chr < 0xC2 && chr > 0x7F) {
	                    curLine = curLine.substr(0, curLine.length - 3);
	                    done = false;
	                }
	            }
	        }
	
	        if (curLine.length) {
	            lines.push(curLine);
	        }
	        str = str.substr(curLine.length);
	    }
	
	    return lines;
	}
	
	function encodeURICharComponent(chr) {
	    var i, len, ord;
	    var res = '';
	
	    ord = chr.charCodeAt(0).toString(16).toUpperCase();
	    if (ord.length % 2) {
	        ord = '0' + ord;
	    }
	    if (ord.length > 2) {
	        for (i = 0, len = ord.length / 2; i < len; i++) {
	            res += '%' + ord.substr(i, 2);
	        }
	    } else {
	        res += '%' + ord;
	    }
	
	    return res;
	}
	
	function safeEncodeURIComponent(str) {
	    str = (str || '').toString();
	
	    try {
	        // might throw if we try to encode invalid sequences, eg. partial emoji
	        str = encodeURIComponent(str);
	    } catch (E) {
	        // should never run
	        return str.replace(/[^\x00-\x1F *'()<>@,;:\\"\[\]?=\u007F-\uFFFF]+/g, '');
	    }
	
	    // ensure chars that are not handled by encodeURICompent are converted as well
	    return str.replace(/[\x00-\x1F *'()<>@,;:\\"\[\]?=\u007F-\uFFFF]/g, encodeURICharComponent);
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var iconv = __webpack_require__(48);
	
	/**
	 * Character set encoding and decoding functions
	 */
	var charset = module.exports = {
	
	    /**
	     * Encodes an unicode string into an Buffer object as UTF-8
	     *
	     * We force UTF-8 here, no strange encodings allowed.
	     *
	     * @param {String} str String to be encoded
	     * @return {Buffer} UTF-8 encoded typed array
	     */
	    encode: function (str) {
	        return new Buffer(str, 'utf-8');
	    },
	
	    /**
	     * Decodes a string from Buffer to an unicode string using specified encoding
	     *
	     * @param {Buffer} buf Binary data to be decoded
	     * @param {String} [fromCharset='UTF-8'] Binary data is decoded into string using this charset
	     * @return {String} Decded string
	     */
	    decode: function (buf, fromCharset) {
	        fromCharset = charset.normalizeCharset(fromCharset || 'UTF-8');
	
	        if (/^(us\-)?ascii|utf\-8|7bit$/i.test(fromCharset)) {
	            return buf.toString('utf-8');
	        }
	
	        return iconv.decode(buf, fromCharset);
	    },
	
	    /**
	     * Convert a string from specific encoding to UTF-8 Buffer
	     *
	     * @param {String|Buffer} str String to be encoded
	     * @param {String} [fromCharset='UTF-8'] Source encoding for the string
	     * @return {Buffer} UTF-8 encoded typed array
	     */
	    convert: function (data, fromCharset) {
	        fromCharset = charset.normalizeCharset(fromCharset || 'UTF-8');
	
	        var bufString;
	
	        if (typeof data !== 'string') {
	            if (/^(us\-)?ascii|utf\-8|7bit$/i.test(fromCharset)) {
	                return data;
	            }
	            bufString = charset.decode(data, fromCharset);
	            return charset.encode(bufString);
	        }
	        return charset.encode(data);
	    },
	
	    /**
	     * Converts well known invalid character set names to proper names.
	     * eg. win-1257 will be converted to WINDOWS-1257
	     *
	     * @param {String} charset Charset name to convert
	     * @return {String} Canoninicalized charset name
	     */
	    normalizeCharset: function (charset) {
	        var match;
	
	        if ((match = charset.match(/^utf[\-_]?(\d+)$/i))) {
	            return 'UTF-' + match[1];
	        }
	
	        if ((match = charset.match(/^win(?:dows)?[\-_]?(\d+)$/i))) {
	            return 'WINDOWS-' + match[1];
	        }
	
	        if ((match = charset.match(/^latin[\-_]?(\d+)$/i))) {
	            return 'ISO-8859-' + match[1];
	        }
	
	        return charset;
	    }
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("iconv-lite");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var stream = __webpack_require__(50);
	var util = __webpack_require__(51);
	var Transform = stream.Transform;
	
	// expose to the world
	module.exports = {
	    encode: encode,
	    decode: decode,
	    wrap: wrap,
	    Encoder: Encoder,
	    Decoder: Decoder
	};
	
	/**
	 * Encodes a Buffer into a base64 encoded string
	 *
	 * @param {Buffer} buffer Buffer to convert
	 * @returns {String} base64 encoded string
	 */
	function encode(buffer) {
	    if (typeof buffer === 'string') {
	        buffer = new Buffer(buffer, 'utf-8');
	    }
	
	    return buffer.toString('base64');
	}
	
	/**
	 * Decodes a base64 encoded string to a Buffer object
	 *
	 * @param {String} str base64 encoded string
	 * @returns {Buffer} Decoded value
	 */
	function decode(str) {
	    str = (str || '');
	    return new Buffer(str, 'base64');
	}
	
	/**
	 * Adds soft line breaks to a base64 string
	 *
	 * @param {String} str base64 encoded string that might need line wrapping
	 * @param {Number} [lineLength=76] Maximum allowed length for a line
	 * @returns {String} Soft-wrapped base64 encoded string
	 */
	function wrap(str, lineLength) {
	    str = (str || '').toString();
	    lineLength = lineLength || 76;
	
	    if (str.length <= lineLength) {
	        return str;
	    }
	
	    return str.replace(new RegExp('.{' + lineLength + '}', 'g'), '$&\r\n').trim();
	}
	
	/**
	 * Creates a transform stream for encoding data to base64 encoding
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 * @param {Number} [options.lineLength=76] Maximum lenght for lines, set to false to disable wrapping
	 */
	function Encoder(options) {
	    // init Transform
	    this.options = options || {};
	
	    if (this.options.lineLength !== false) {
	        this.options.lineLength = this.options.lineLength || 76;
	    }
	
	    this._curLine = '';
	    this._remainingBytes = false;
	
	    this.inputBytes = 0;
	    this.outputBytes = 0;
	
	    Transform.call(this, this.options);
	}
	util.inherits(Encoder, Transform);
	
	Encoder.prototype._transform = function(chunk, encoding, done) {
	    var b64, _self = this;
	
	    if (encoding !== 'buffer') {
	        chunk = new Buffer(chunk, encoding);
	    }
	
	    if (!chunk || !chunk.length) {
	        return done();
	    }
	
	    this.inputBytes += chunk.length;
	
	    if (this._remainingBytes && this._remainingBytes.length) {
	        chunk = Buffer.concat([this._remainingBytes, chunk]);
	        this._remainingBytes = false;
	    }
	
	    if (chunk.length % 3) {
	        this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
	        chunk = chunk.slice(0, chunk.length - chunk.length % 3);
	    } else {
	        this._remainingBytes = false;
	    }
	
	    b64 = this._curLine + encode(chunk);
	
	    if (this.options.lineLength) {
	        b64 = wrap(b64, this.options.lineLength);
	        b64 = b64.replace(/(^|\n)([^\n]*)$/, function(match, lineBreak, lastLine) {
	            _self._curLine = lastLine;
	            return lineBreak;
	        });
	    }
	
	    if (b64) {
	        this.outputBytes += b64.length;
	        this.push(b64);
	    }
	
	    done();
	};
	
	Encoder.prototype._flush = function(done) {
	    if (this._remainingBytes && this._remainingBytes.length) {
	        this._curLine += encode(this._remainingBytes);
	    }
	    if (this._curLine) {
	        this._curLine = wrap(this._curLine, this.options.lineLength);
	        this.outputBytes += this._curLine.length;
	        this.push(this._curLine, 'ascii');
	        this._curLine = '';
	    }
	    done();
	};
	
	/**
	 * Creates a transform stream for decoding base64 encoded strings
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 */
	function Decoder(options) {
	    // init Transform
	    this.options = options || {};
	    this._curLine = '';
	
	    this.inputBytes = 0;
	    this.outputBytes = 0;
	
	    Transform.call(this, this.options);
	}
	util.inherits(Decoder, Transform);
	
	Decoder.prototype._transform = function(chunk, encoding, done) {
	    var b64, buf;
	
	    chunk = chunk.toString('ascii');
	
	    if (!chunk || !chunk.length) {
	        return done();
	    }
	
	    this.inputBytes += chunk.length;
	
	    b64 = (this._curLine + chunk);
	    this._curLine = '';
	
	    b64 = b64.replace(/[^a-zA-Z0-9+\/=]/g, '');
	
	    if (b64.length % 4) {
	        this._curLine = b64.substr(-b64.length % 4);
	        if (this._curLine.length == b64.length) {
	            b64 = '';
	        } else {
	            b64 = b64.substr(0, this._curLine.length);
	        }
	    }
	
	    if (b64) {
	        buf = decode(b64);
	        this.outputBytes += buf.length;
	        this.push(buf);
	    }
	
	    done();
	};
	
	Decoder.prototype._flush = function(done) {
	    var b64, buf;
	    if (this._curLine) {
	        buf = decode(this._curLine);
	        this.outputBytes += buf.length;
	        this.push(buf);
	        this._curLine = '';
	    }
	    done();
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var stream = __webpack_require__(50);
	var util = __webpack_require__(51);
	var Transform = stream.Transform;
	
	// expose to the world
	module.exports = {
	    encode: encode,
	    decode: decode,
	    wrap: wrap,
	    Encoder: Encoder,
	    Decoder: Decoder
	};
	
	/**
	 * Encodes a Buffer into a Quoted-Printable encoded string
	 *
	 * @param {Buffer} buffer Buffer to convert
	 * @returns {String} Quoted-Printable encoded string
	 */
	function encode(buffer) {
	    if (typeof buffer === 'string') {
	        buffer = new Buffer(buffer, 'utf-8');
	    }
	
	    // usable characters that do not need encoding
	    var ranges = [
	        // https://tools.ietf.org/html/rfc2045#section-6.7
	        [0x09], // <TAB>
	        [0x0A], // <LF>
	        [0x0D], // <CR>
	        [0x20, 0x3C], // <SP>!"#$%&'()*+,-./0123456789:;
	        [0x3E, 0x7E] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
	    ];
	    var result = '';
	    var ord;
	
	    for (var i = 0, len = buffer.length; i < len; i++) {
	        ord = buffer[i];
	        // if the char is in allowed range, then keep as is, unless it is a ws in the end of a line
	        if (checkRanges(ord, ranges) && !((ord === 0x20 || ord === 0x09) && (i === len - 1 || buffer[i + 1] === 0x0a || buffer[i + 1] === 0x0d))) {
	            result += String.fromCharCode(ord);
	            continue;
	        }
	        result += '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase();
	    }
	
	    return result;
	}
	
	/**
	 * Decodes a Quoted-Printable encoded string to a Buffer object
	 *
	 * @param {String} str Quoted-Printable encoded string
	 * @returns {Buffer} Decoded value
	 */
	function decode(str) {
	    str = (str || '').toString().
	        // remove invalid whitespace from the end of lines
	    replace(/[\t ]+$/gm, '').
	        // remove soft line breaks
	    replace(/\=(?:\r?\n|$)/g, '');
	
	    var encodedBytesCount = (str.match(/\=[\da-fA-F]{2}/g) || []).length,
	        bufferLength = str.length - encodedBytesCount * 2,
	        chr, hex,
	        buffer = new Buffer(bufferLength),
	        bufferPos = 0;
	
	    for (var i = 0, len = str.length; i < len; i++) {
	        chr = str.charAt(i);
	        if (chr === '=' && (hex = str.substr(i + 1, 2)) && /[\da-fA-F]{2}/.test(hex)) {
	            buffer[bufferPos++] = parseInt(hex, 16);
	            i += 2;
	            continue;
	        }
	        buffer[bufferPos++] = chr.charCodeAt(0);
	    }
	
	    return buffer;
	}
	
	/**
	 * Adds soft line breaks to a Quoted-Printable string
	 *
	 * @param {String} str Quoted-Printable encoded string that might need line wrapping
	 * @param {Number} [lineLength=76] Maximum allowed length for a line
	 * @returns {String} Soft-wrapped Quoted-Printable encoded string
	 */
	function wrap(str, lineLength) {
	    str = (str || '').toString();
	    lineLength = lineLength || 76;
	
	    if (str.length <= lineLength) {
	        return str;
	    }
	
	    var pos = 0,
	        len = str.length,
	        match, code, line,
	        lineMargin = Math.floor(lineLength / 3),
	        result = '';
	
	    // insert soft linebreaks where needed
	    while (pos < len) {
	        line = str.substr(pos, lineLength);
	        if ((match = line.match(/\r\n/))) {
	            line = line.substr(0, match.index + match[0].length);
	            result += line;
	            pos += line.length;
	            continue;
	        }
	
	        if (line.substr(-1) === '\n') {
	            // nothing to change here
	            result += line;
	            pos += line.length;
	            continue;
	        } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
	            // truncate to nearest line break
	            line = line.substr(0, line.length - (match[0].length - 1));
	            result += line;
	            pos += line.length;
	            continue;
	        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t\.,!\?][^ \t\.,!\?]*$/))) {
	            // truncate to nearest space
	            line = line.substr(0, line.length - (match[0].length - 1));
	        } else {
	            if (line.match(/\=[\da-f]{0,2}$/i)) {
	
	                // push incomplete encoding sequences to the next line
	                if ((match = line.match(/\=[\da-f]{0,1}$/i))) {
	                    line = line.substr(0, line.length - match[0].length);
	                }
	
	                // ensure that utf-8 sequences are not split
	                while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/\=[\da-f]{2}$/ig))) {
	                    code = parseInt(match[0].substr(1, 2), 16);
	                    if (code < 128) {
	                        break;
	                    }
	
	                    line = line.substr(0, line.length - 3);
	
	                    if (code >= 0xC0) {
	                        break;
	                    }
	                }
	            }
	        }
	
	        if (pos + line.length < len && line.substr(-1) !== '\n') {
	            if (line.length === lineLength && line.match(/\=[\da-f]{2}$/i)) {
	                line = line.substr(0, line.length - 3);
	            } else if (line.length === lineLength) {
	                line = line.substr(0, line.length - 1);
	            }
	            pos += line.length;
	            line += '=\r\n';
	        } else {
	            pos += line.length;
	        }
	
	        result += line;
	    }
	
	    return result;
	}
	
	/**
	 * Helper function to check if a number is inside provided ranges
	 *
	 * @param {Number} nr Number to check for
	 * @param {Array} ranges An Array of allowed values
	 * @returns {Boolean} True if the value was found inside allowed ranges, false otherwise
	 */
	function checkRanges(nr, ranges) {
	    for (var i = ranges.length - 1; i >= 0; i--) {
	        if (!ranges[i].length) {
	            continue;
	        }
	        if (ranges[i].length === 1 && nr === ranges[i][0]) {
	            return true;
	        }
	        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
	            return true;
	        }
	    }
	    return false;
	}
	
	/**
	 * Creates a transform stream for encoding data to Quoted-Printable encoding
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 * @param {Number} [options.lineLength=76] Maximum lenght for lines, set to false to disable wrapping
	 */
	function Encoder(options) {
	    // init Transform
	    this.options = options || {};
	
	    if (this.options.lineLength !== false) {
	        this.options.lineLength = this.options.lineLength || 76;
	    }
	
	    this._curLine = '';
	
	    this.inputBytes = 0;
	    this.outputBytes = 0;
	
	    Transform.call(this, this.options);
	}
	util.inherits(Encoder, Transform);
	
	Encoder.prototype._transform = function(chunk, encoding, done) {
	    var qp, _self = this;
	
	    if (encoding !== 'buffer') {
	        chunk = new Buffer(chunk, encoding);
	    }
	
	    if (!chunk || !chunk.length) {
	        return done();
	    }
	
	    this.inputBytes += chunk.length;
	
	    if (this.options.lineLength) {
	        qp = this._curLine + encode(chunk);
	        qp = wrap(qp, this.options.lineLength);
	        qp = qp.replace(/(^|\n)([^\n]*)$/, function(match, lineBreak, lastLine) {
	            _self._curLine = lastLine;
	            return lineBreak;
	        });
	
	        if (qp) {
	            this.outputBytes += qp.length;
	            this.push(qp);
	        }
	
	    } else {
	        qp = encode(chunk);
	        this.outputBytes += qp.length;
	        this.push(qp, 'ascii');
	    }
	
	    done();
	};
	
	Encoder.prototype._flush = function(done) {
	    if (this._curLine) {
	        this.outputBytes += this._curLine.length;
	        this.push(this._curLine, 'ascii');
	    }
	    done();
	};
	
	/**
	 * Creates a transform stream for decoding Quoted-Printable encoded strings
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 */
	function Decoder(options) {
	    // init Transform
	    this.options = options || {};
	    this._curLine = '';
	
	    this.inputBytes = 0;
	    this.outputBytes = 0;
	
	    Transform.call(this, this.options);
	}
	util.inherits(Decoder, Transform);
	
	Decoder.prototype._transform = function(chunk, encoding, done) {
	    var qp, buf, _self = this;
	
	    chunk = chunk.toString('ascii');
	
	    if (!chunk || !chunk.length) {
	        return done();
	    }
	
	    this.inputBytes += chunk.length;
	
	    qp = (this._curLine + chunk);
	    this._curLine = '';
	    qp = qp.replace(/=[^\n]?$/, function(lastLine) {
	        _self._curLine = lastLine;
	        return '';
	    });
	
	    if (qp) {
	        buf = decode(qp);
	        this.outputBytes += buf.length;
	        this.push(buf);
	    }
	
	    done();
	};
	
	Decoder.prototype._flush = function(done) {
	    var qp, buf;
	    if (this._curLine) {
	        buf = decode(this._curLine);
	        this.outputBytes += buf.length;
	        this.push(buf);
	    }
	    done();
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	/* eslint quote-props: 0 */
	
	'use strict';
	
	module.exports = {
	    list: {
	        'application/acad': 'dwg',
	        'application/applixware': 'aw',
	        'application/arj': 'arj',
	        'application/atom+xml': 'xml',
	        'application/atomcat+xml': 'atomcat',
	        'application/atomsvc+xml': 'atomsvc',
	        'application/base64': ['mm', 'mme'],
	        'application/binhex': 'hqx',
	        'application/binhex4': 'hqx',
	        'application/book': ['book', 'boo'],
	        'application/ccxml+xml,': 'ccxml',
	        'application/cdf': 'cdf',
	        'application/cdmi-capability': 'cdmia',
	        'application/cdmi-container': 'cdmic',
	        'application/cdmi-domain': 'cdmid',
	        'application/cdmi-object': 'cdmio',
	        'application/cdmi-queue': 'cdmiq',
	        'application/clariscad': 'ccad',
	        'application/commonground': 'dp',
	        'application/cu-seeme': 'cu',
	        'application/davmount+xml': 'davmount',
	        'application/drafting': 'drw',
	        'application/dsptype': 'tsp',
	        'application/dssc+der': 'dssc',
	        'application/dssc+xml': 'xdssc',
	        'application/dxf': 'dxf',
	        'application/ecmascript': ['js', 'es'],
	        'application/emma+xml': 'emma',
	        'application/envoy': 'evy',
	        'application/epub+zip': 'epub',
	        'application/excel': ['xls', 'xl', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw'],
	        'application/exi': 'exi',
	        'application/font-tdpfr': 'pfr',
	        'application/fractals': 'fif',
	        'application/freeloader': 'frl',
	        'application/futuresplash': 'spl',
	        'application/gnutar': 'tgz',
	        'application/groupwise': 'vew',
	        'application/hlp': 'hlp',
	        'application/hta': 'hta',
	        'application/hyperstudio': 'stk',
	        'application/i-deas': 'unv',
	        'application/iges': ['iges', 'igs'],
	        'application/inf': 'inf',
	        'application/internet-property-stream': 'acx',
	        'application/ipfix': 'ipfix',
	        'application/java': 'class',
	        'application/java-archive': 'jar',
	        'application/java-byte-code': 'class',
	        'application/java-serialized-object': 'ser',
	        'application/java-vm': 'class',
	        'application/javascript': 'js',
	        'application/json': 'json',
	        'application/lha': 'lha',
	        'application/lzx': 'lzx',
	        'application/mac-binary': 'bin',
	        'application/mac-binhex': 'hqx',
	        'application/mac-binhex40': 'hqx',
	        'application/mac-compactpro': 'cpt',
	        'application/macbinary': 'bin',
	        'application/mads+xml': 'mads',
	        'application/marc': 'mrc',
	        'application/marcxml+xml': 'mrcx',
	        'application/mathematica': 'ma',
	        'application/mathml+xml': 'mathml',
	        'application/mbedlet': 'mbd',
	        'application/mbox': 'mbox',
	        'application/mcad': 'mcd',
	        'application/mediaservercontrol+xml': 'mscml',
	        'application/metalink4+xml': 'meta4',
	        'application/mets+xml': 'mets',
	        'application/mime': 'aps',
	        'application/mods+xml': 'mods',
	        'application/mp21': 'm21',
	        'application/mp4': 'mp4',
	        'application/mspowerpoint': ['ppt', 'pot', 'pps', 'ppz'],
	        'application/msword': ['doc', 'dot', 'w6w', 'wiz', 'word'],
	        'application/mswrite': 'wri',
	        'application/mxf': 'mxf',
	        'application/netmc': 'mcp',
	        'application/octet-stream': ['*'],
	        'application/oda': 'oda',
	        'application/oebps-package+xml': 'opf',
	        'application/ogg': 'ogx',
	        'application/olescript': 'axs',
	        'application/onenote': 'onetoc',
	        'application/patch-ops-error+xml': 'xer',
	        'application/pdf': 'pdf',
	        'application/pgp-encrypted': 'asc',
	        'application/pgp-signature': 'pgp',
	        'application/pics-rules': 'prf',
	        'application/pkcs-12': 'p12',
	        'application/pkcs-crl': 'crl',
	        'application/pkcs10': 'p10',
	        'application/pkcs7-mime': ['p7c', 'p7m'],
	        'application/pkcs7-signature': 'p7s',
	        'application/pkcs8': 'p8',
	        'application/pkix-attr-cert': 'ac',
	        'application/pkix-cert': ['cer', 'crt'],
	        'application/pkix-crl': 'crl',
	        'application/pkix-pkipath': 'pkipath',
	        'application/pkixcmp': 'pki',
	        'application/plain': 'text',
	        'application/pls+xml': 'pls',
	        'application/postscript': ['ps', 'ai', 'eps'],
	        'application/powerpoint': 'ppt',
	        'application/pro_eng': ['part', 'prt'],
	        'application/prs.cww': 'cww',
	        'application/pskc+xml': 'pskcxml',
	        'application/rdf+xml': 'rdf',
	        'application/reginfo+xml': 'rif',
	        'application/relax-ng-compact-syntax': 'rnc',
	        'application/resource-lists+xml': 'rl',
	        'application/resource-lists-diff+xml': 'rld',
	        'application/ringing-tones': 'rng',
	        'application/rls-services+xml': 'rs',
	        'application/rsd+xml': 'rsd',
	        'application/rss+xml': 'xml',
	        'application/rtf': ['rtf', 'rtx'],
	        'application/sbml+xml': 'sbml',
	        'application/scvp-cv-request': 'scq',
	        'application/scvp-cv-response': 'scs',
	        'application/scvp-vp-request': 'spq',
	        'application/scvp-vp-response': 'spp',
	        'application/sdp': 'sdp',
	        'application/sea': 'sea',
	        'application/set': 'set',
	        'application/set-payment-initiation': 'setpay',
	        'application/set-registration-initiation': 'setreg',
	        'application/shf+xml': 'shf',
	        'application/sla': 'stl',
	        'application/smil': ['smi', 'smil'],
	        'application/smil+xml': 'smi',
	        'application/solids': 'sol',
	        'application/sounder': 'sdr',
	        'application/sparql-query': 'rq',
	        'application/sparql-results+xml': 'srx',
	        'application/srgs': 'gram',
	        'application/srgs+xml': 'grxml',
	        'application/sru+xml': 'sru',
	        'application/ssml+xml': 'ssml',
	        'application/step': ['step', 'stp'],
	        'application/streamingmedia': 'ssm',
	        'application/tei+xml': 'tei',
	        'application/thraud+xml': 'tfi',
	        'application/timestamped-data': 'tsd',
	        'application/toolbook': 'tbk',
	        'application/vda': 'vda',
	        'application/vnd.3gpp.pic-bw-large': 'plb',
	        'application/vnd.3gpp.pic-bw-small': 'psb',
	        'application/vnd.3gpp.pic-bw-var': 'pvb',
	        'application/vnd.3gpp2.tcap': 'tcap',
	        'application/vnd.3m.post-it-notes': 'pwn',
	        'application/vnd.accpac.simply.aso': 'aso',
	        'application/vnd.accpac.simply.imp': 'imp',
	        'application/vnd.acucobol': 'acu',
	        'application/vnd.acucorp': 'atc',
	        'application/vnd.adobe.air-application-installer-package+zip': 'air',
	        'application/vnd.adobe.fxp': 'fxp',
	        'application/vnd.adobe.xdp+xml': 'xdp',
	        'application/vnd.adobe.xfdf': 'xfdf',
	        'application/vnd.ahead.space': 'ahead',
	        'application/vnd.airzip.filesecure.azf': 'azf',
	        'application/vnd.airzip.filesecure.azs': 'azs',
	        'application/vnd.amazon.ebook': 'azw',
	        'application/vnd.americandynamics.acc': 'acc',
	        'application/vnd.amiga.ami': 'ami',
	        'application/vnd.android.package-archive': 'apk',
	        'application/vnd.anser-web-certificate-issue-initiation': 'cii',
	        'application/vnd.anser-web-funds-transfer-initiation': 'fti',
	        'application/vnd.antix.game-component': 'atx',
	        'application/vnd.apple.installer+xml': 'mpkg',
	        'application/vnd.apple.mpegurl': 'm3u8',
	        'application/vnd.aristanetworks.swi': 'swi',
	        'application/vnd.audiograph': 'aep',
	        'application/vnd.blueice.multipass': 'mpm',
	        'application/vnd.bmi': 'bmi',
	        'application/vnd.businessobjects': 'rep',
	        'application/vnd.chemdraw+xml': 'cdxml',
	        'application/vnd.chipnuts.karaoke-mmd': 'mmd',
	        'application/vnd.cinderella': 'cdy',
	        'application/vnd.claymore': 'cla',
	        'application/vnd.cloanto.rp9': 'rp9',
	        'application/vnd.clonk.c4group': 'c4g',
	        'application/vnd.cluetrust.cartomobile-config': 'c11amc',
	        'application/vnd.cluetrust.cartomobile-config-pkg': 'c11amz',
	        'application/vnd.commonspace': 'csp',
	        'application/vnd.contact.cmsg': 'cdbcmsg',
	        'application/vnd.cosmocaller': 'cmc',
	        'application/vnd.crick.clicker': 'clkx',
	        'application/vnd.crick.clicker.keyboard': 'clkk',
	        'application/vnd.crick.clicker.palette': 'clkp',
	        'application/vnd.crick.clicker.template': 'clkt',
	        'application/vnd.crick.clicker.wordbank': 'clkw',
	        'application/vnd.criticaltools.wbs+xml': 'wbs',
	        'application/vnd.ctc-posml': 'pml',
	        'application/vnd.cups-ppd': 'ppd',
	        'application/vnd.curl.car': 'car',
	        'application/vnd.curl.pcurl': 'pcurl',
	        'application/vnd.data-vision.rdz': 'rdz',
	        'application/vnd.denovo.fcselayout-link': 'fe_launch',
	        'application/vnd.dna': 'dna',
	        'application/vnd.dolby.mlp': 'mlp',
	        'application/vnd.dpgraph': 'dpg',
	        'application/vnd.dreamfactory': 'dfac',
	        'application/vnd.dvb.ait': 'ait',
	        'application/vnd.dvb.service': 'svc',
	        'application/vnd.dynageo': 'geo',
	        'application/vnd.ecowin.chart': 'mag',
	        'application/vnd.enliven': 'nml',
	        'application/vnd.epson.esf': 'esf',
	        'application/vnd.epson.msf': 'msf',
	        'application/vnd.epson.quickanime': 'qam',
	        'application/vnd.epson.salt': 'slt',
	        'application/vnd.epson.ssf': 'ssf',
	        'application/vnd.eszigno3+xml': 'es3',
	        'application/vnd.ezpix-album': 'ez2',
	        'application/vnd.ezpix-package': 'ez3',
	        'application/vnd.fdf': 'fdf',
	        'application/vnd.fdsn.seed': 'seed',
	        'application/vnd.flographit': 'gph',
	        'application/vnd.fluxtime.clip': 'ftc',
	        'application/vnd.framemaker': 'fm',
	        'application/vnd.frogans.fnc': 'fnc',
	        'application/vnd.frogans.ltf': 'ltf',
	        'application/vnd.fsc.weblaunch': 'fsc',
	        'application/vnd.fujitsu.oasys': 'oas',
	        'application/vnd.fujitsu.oasys2': 'oa2',
	        'application/vnd.fujitsu.oasys3': 'oa3',
	        'application/vnd.fujitsu.oasysgp': 'fg5',
	        'application/vnd.fujitsu.oasysprs': 'bh2',
	        'application/vnd.fujixerox.ddd': 'ddd',
	        'application/vnd.fujixerox.docuworks': 'xdw',
	        'application/vnd.fujixerox.docuworks.binder': 'xbd',
	        'application/vnd.fuzzysheet': 'fzs',
	        'application/vnd.genomatix.tuxedo': 'txd',
	        'application/vnd.geogebra.file': 'ggb',
	        'application/vnd.geogebra.tool': 'ggt',
	        'application/vnd.geometry-explorer': 'gex',
	        'application/vnd.geonext': 'gxt',
	        'application/vnd.geoplan': 'g2w',
	        'application/vnd.geospace': 'g3w',
	        'application/vnd.gmx': 'gmx',
	        'application/vnd.google-earth.kml+xml': 'kml',
	        'application/vnd.google-earth.kmz': 'kmz',
	        'application/vnd.grafeq': 'gqf',
	        'application/vnd.groove-account': 'gac',
	        'application/vnd.groove-help': 'ghf',
	        'application/vnd.groove-identity-message': 'gim',
	        'application/vnd.groove-injector': 'grv',
	        'application/vnd.groove-tool-message': 'gtm',
	        'application/vnd.groove-tool-template': 'tpl',
	        'application/vnd.groove-vcard': 'vcg',
	        'application/vnd.hal+xml': 'hal',
	        'application/vnd.handheld-entertainment+xml': 'zmm',
	        'application/vnd.hbci': 'hbci',
	        'application/vnd.hhe.lesson-player': 'les',
	        'application/vnd.hp-hpgl': ['hgl', 'hpg', 'hpgl'],
	        'application/vnd.hp-hpid': 'hpid',
	        'application/vnd.hp-hps': 'hps',
	        'application/vnd.hp-jlyt': 'jlt',
	        'application/vnd.hp-pcl': 'pcl',
	        'application/vnd.hp-pclxl': 'pclxl',
	        'application/vnd.hydrostatix.sof-data': 'sfd-hdstx',
	        'application/vnd.hzn-3d-crossword': 'x3d',
	        'application/vnd.ibm.minipay': 'mpy',
	        'application/vnd.ibm.modcap': 'afp',
	        'application/vnd.ibm.rights-management': 'irm',
	        'application/vnd.ibm.secure-container': 'sc',
	        'application/vnd.iccprofile': 'icc',
	        'application/vnd.igloader': 'igl',
	        'application/vnd.immervision-ivp': 'ivp',
	        'application/vnd.immervision-ivu': 'ivu',
	        'application/vnd.insors.igm': 'igm',
	        'application/vnd.intercon.formnet': 'xpw',
	        'application/vnd.intergeo': 'i2g',
	        'application/vnd.intu.qbo': 'qbo',
	        'application/vnd.intu.qfx': 'qfx',
	        'application/vnd.ipunplugged.rcprofile': 'rcprofile',
	        'application/vnd.irepository.package+xml': 'irp',
	        'application/vnd.is-xpr': 'xpr',
	        'application/vnd.isac.fcs': 'fcs',
	        'application/vnd.jam': 'jam',
	        'application/vnd.jcp.javame.midlet-rms': 'rms',
	        'application/vnd.jisp': 'jisp',
	        'application/vnd.joost.joda-archive': 'joda',
	        'application/vnd.kahootz': 'ktz',
	        'application/vnd.kde.karbon': 'karbon',
	        'application/vnd.kde.kchart': 'chrt',
	        'application/vnd.kde.kformula': 'kfo',
	        'application/vnd.kde.kivio': 'flw',
	        'application/vnd.kde.kontour': 'kon',
	        'application/vnd.kde.kpresenter': 'kpr',
	        'application/vnd.kde.kspread': 'ksp',
	        'application/vnd.kde.kword': 'kwd',
	        'application/vnd.kenameaapp': 'htke',
	        'application/vnd.kidspiration': 'kia',
	        'application/vnd.kinar': 'kne',
	        'application/vnd.koan': 'skp',
	        'application/vnd.kodak-descriptor': 'sse',
	        'application/vnd.las.las+xml': 'lasxml',
	        'application/vnd.llamagraphics.life-balance.desktop': 'lbd',
	        'application/vnd.llamagraphics.life-balance.exchange+xml': 'lbe',
	        'application/vnd.lotus-1-2-3': '123',
	        'application/vnd.lotus-approach': 'apr',
	        'application/vnd.lotus-freelance': 'pre',
	        'application/vnd.lotus-notes': 'nsf',
	        'application/vnd.lotus-organizer': 'org',
	        'application/vnd.lotus-screencam': 'scm',
	        'application/vnd.lotus-wordpro': 'lwp',
	        'application/vnd.macports.portpkg': 'portpkg',
	        'application/vnd.mcd': 'mcd',
	        'application/vnd.medcalcdata': 'mc1',
	        'application/vnd.mediastation.cdkey': 'cdkey',
	        'application/vnd.mfer': 'mwf',
	        'application/vnd.mfmp': 'mfm',
	        'application/vnd.micrografx.flo': 'flo',
	        'application/vnd.micrografx.igx': 'igx',
	        'application/vnd.mif': 'mif',
	        'application/vnd.mobius.daf': 'daf',
	        'application/vnd.mobius.dis': 'dis',
	        'application/vnd.mobius.mbk': 'mbk',
	        'application/vnd.mobius.mqy': 'mqy',
	        'application/vnd.mobius.msl': 'msl',
	        'application/vnd.mobius.plc': 'plc',
	        'application/vnd.mobius.txf': 'txf',
	        'application/vnd.mophun.application': 'mpn',
	        'application/vnd.mophun.certificate': 'mpc',
	        'application/vnd.mozilla.xul+xml': 'xul',
	        'application/vnd.ms-artgalry': 'cil',
	        'application/vnd.ms-cab-compressed': 'cab',
	        'application/vnd.ms-excel': ['xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlb', 'xll'],
	        'application/vnd.ms-excel.addin.macroenabled.12': 'xlam',
	        'application/vnd.ms-excel.sheet.binary.macroenabled.12': 'xlsb',
	        'application/vnd.ms-excel.sheet.macroenabled.12': 'xlsm',
	        'application/vnd.ms-excel.template.macroenabled.12': 'xltm',
	        'application/vnd.ms-fontobject': 'eot',
	        'application/vnd.ms-htmlhelp': 'chm',
	        'application/vnd.ms-ims': 'ims',
	        'application/vnd.ms-lrm': 'lrm',
	        'application/vnd.ms-officetheme': 'thmx',
	        'application/vnd.ms-outlook': 'msg',
	        'application/vnd.ms-pki.certstore': 'sst',
	        'application/vnd.ms-pki.pko': 'pko',
	        'application/vnd.ms-pki.seccat': 'cat',
	        'application/vnd.ms-pki.stl': 'stl',
	        'application/vnd.ms-pkicertstore': 'sst',
	        'application/vnd.ms-pkiseccat': 'cat',
	        'application/vnd.ms-pkistl': 'stl',
	        'application/vnd.ms-powerpoint': ['ppt', 'pot', 'pps', 'ppa', 'pwz'],
	        'application/vnd.ms-powerpoint.addin.macroenabled.12': 'ppam',
	        'application/vnd.ms-powerpoint.presentation.macroenabled.12': 'pptm',
	        'application/vnd.ms-powerpoint.slide.macroenabled.12': 'sldm',
	        'application/vnd.ms-powerpoint.slideshow.macroenabled.12': 'ppsm',
	        'application/vnd.ms-powerpoint.template.macroenabled.12': 'potm',
	        'application/vnd.ms-project': 'mpp',
	        'application/vnd.ms-word.document.macroenabled.12': 'docm',
	        'application/vnd.ms-word.template.macroenabled.12': 'dotm',
	        'application/vnd.ms-works': ['wks', 'wcm', 'wdb', 'wps'],
	        'application/vnd.ms-wpl': 'wpl',
	        'application/vnd.ms-xpsdocument': 'xps',
	        'application/vnd.mseq': 'mseq',
	        'application/vnd.musician': 'mus',
	        'application/vnd.muvee.style': 'msty',
	        'application/vnd.neurolanguage.nlu': 'nlu',
	        'application/vnd.noblenet-directory': 'nnd',
	        'application/vnd.noblenet-sealer': 'nns',
	        'application/vnd.noblenet-web': 'nnw',
	        'application/vnd.nokia.configuration-message': 'ncm',
	        'application/vnd.nokia.n-gage.data': 'ngdat',
	        'application/vnd.nokia.n-gage.symbian.install': 'n-gage',
	        'application/vnd.nokia.radio-preset': 'rpst',
	        'application/vnd.nokia.radio-presets': 'rpss',
	        'application/vnd.nokia.ringing-tone': 'rng',
	        'application/vnd.novadigm.edm': 'edm',
	        'application/vnd.novadigm.edx': 'edx',
	        'application/vnd.novadigm.ext': 'ext',
	        'application/vnd.oasis.opendocument.chart': 'odc',
	        'application/vnd.oasis.opendocument.chart-template': 'otc',
	        'application/vnd.oasis.opendocument.database': 'odb',
	        'application/vnd.oasis.opendocument.formula': 'odf',
	        'application/vnd.oasis.opendocument.formula-template': 'odft',
	        'application/vnd.oasis.opendocument.graphics': 'odg',
	        'application/vnd.oasis.opendocument.graphics-template': 'otg',
	        'application/vnd.oasis.opendocument.image': 'odi',
	        'application/vnd.oasis.opendocument.image-template': 'oti',
	        'application/vnd.oasis.opendocument.presentation': 'odp',
	        'application/vnd.oasis.opendocument.presentation-template': 'otp',
	        'application/vnd.oasis.opendocument.spreadsheet': 'ods',
	        'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
	        'application/vnd.oasis.opendocument.text': 'odt',
	        'application/vnd.oasis.opendocument.text-master': 'odm',
	        'application/vnd.oasis.opendocument.text-template': 'ott',
	        'application/vnd.oasis.opendocument.text-web': 'oth',
	        'application/vnd.olpc-sugar': 'xo',
	        'application/vnd.oma.dd2+xml': 'dd2',
	        'application/vnd.openofficeorg.extension': 'oxt',
	        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
	        'application/vnd.openxmlformats-officedocument.presentationml.slide': 'sldx',
	        'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'ppsx',
	        'application/vnd.openxmlformats-officedocument.presentationml.template': 'potx',
	        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
	        'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'xltx',
	        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
	        'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'dotx',
	        'application/vnd.osgeo.mapguide.package': 'mgp',
	        'application/vnd.osgi.dp': 'dp',
	        'application/vnd.palm': 'pdb',
	        'application/vnd.pawaafile': 'paw',
	        'application/vnd.pg.format': 'str',
	        'application/vnd.pg.osasli': 'ei6',
	        'application/vnd.picsel': 'efif',
	        'application/vnd.pmi.widget': 'wg',
	        'application/vnd.pocketlearn': 'plf',
	        'application/vnd.powerbuilder6': 'pbd',
	        'application/vnd.previewsystems.box': 'box',
	        'application/vnd.proteus.magazine': 'mgz',
	        'application/vnd.publishare-delta-tree': 'qps',
	        'application/vnd.pvi.ptid1': 'ptid',
	        'application/vnd.quark.quarkxpress': 'qxd',
	        'application/vnd.realvnc.bed': 'bed',
	        'application/vnd.recordare.musicxml': 'mxl',
	        'application/vnd.recordare.musicxml+xml': 'musicxml',
	        'application/vnd.rig.cryptonote': 'cryptonote',
	        'application/vnd.rim.cod': 'cod',
	        'application/vnd.rn-realmedia': 'rm',
	        'application/vnd.rn-realplayer': 'rnx',
	        'application/vnd.route66.link66+xml': 'link66',
	        'application/vnd.sailingtracker.track': 'st',
	        'application/vnd.seemail': 'see',
	        'application/vnd.sema': 'sema',
	        'application/vnd.semd': 'semd',
	        'application/vnd.semf': 'semf',
	        'application/vnd.shana.informed.formdata': 'ifm',
	        'application/vnd.shana.informed.formtemplate': 'itp',
	        'application/vnd.shana.informed.interchange': 'iif',
	        'application/vnd.shana.informed.package': 'ipk',
	        'application/vnd.simtech-mindmapper': 'twd',
	        'application/vnd.smaf': 'mmf',
	        'application/vnd.smart.teacher': 'teacher',
	        'application/vnd.solent.sdkm+xml': 'sdkm',
	        'application/vnd.spotfire.dxp': 'dxp',
	        'application/vnd.spotfire.sfs': 'sfs',
	        'application/vnd.stardivision.calc': 'sdc',
	        'application/vnd.stardivision.draw': 'sda',
	        'application/vnd.stardivision.impress': 'sdd',
	        'application/vnd.stardivision.math': 'smf',
	        'application/vnd.stardivision.writer': 'sdw',
	        'application/vnd.stardivision.writer-global': 'sgl',
	        'application/vnd.stepmania.stepchart': 'sm',
	        'application/vnd.sun.xml.calc': 'sxc',
	        'application/vnd.sun.xml.calc.template': 'stc',
	        'application/vnd.sun.xml.draw': 'sxd',
	        'application/vnd.sun.xml.draw.template': 'std',
	        'application/vnd.sun.xml.impress': 'sxi',
	        'application/vnd.sun.xml.impress.template': 'sti',
	        'application/vnd.sun.xml.math': 'sxm',
	        'application/vnd.sun.xml.writer': 'sxw',
	        'application/vnd.sun.xml.writer.global': 'sxg',
	        'application/vnd.sun.xml.writer.template': 'stw',
	        'application/vnd.sus-calendar': 'sus',
	        'application/vnd.svd': 'svd',
	        'application/vnd.symbian.install': 'sis',
	        'application/vnd.syncml+xml': 'xsm',
	        'application/vnd.syncml.dm+wbxml': 'bdm',
	        'application/vnd.syncml.dm+xml': 'xdm',
	        'application/vnd.tao.intent-module-archive': 'tao',
	        'application/vnd.tmobile-livetv': 'tmo',
	        'application/vnd.trid.tpt': 'tpt',
	        'application/vnd.triscape.mxs': 'mxs',
	        'application/vnd.trueapp': 'tra',
	        'application/vnd.ufdl': 'ufd',
	        'application/vnd.uiq.theme': 'utz',
	        'application/vnd.umajin': 'umj',
	        'application/vnd.unity': 'unityweb',
	        'application/vnd.uoml+xml': 'uoml',
	        'application/vnd.vcx': 'vcx',
	        'application/vnd.visio': 'vsd',
	        'application/vnd.visionary': 'vis',
	        'application/vnd.vsf': 'vsf',
	        'application/vnd.wap.wbxml': 'wbxml',
	        'application/vnd.wap.wmlc': 'wmlc',
	        'application/vnd.wap.wmlscriptc': 'wmlsc',
	        'application/vnd.webturbo': 'wtb',
	        'application/vnd.wolfram.player': 'nbp',
	        'application/vnd.wordperfect': 'wpd',
	        'application/vnd.wqd': 'wqd',
	        'application/vnd.wt.stf': 'stf',
	        'application/vnd.xara': ['web', 'xar'],
	        'application/vnd.xfdl': 'xfdl',
	        'application/vnd.yamaha.hv-dic': 'hvd',
	        'application/vnd.yamaha.hv-script': 'hvs',
	        'application/vnd.yamaha.hv-voice': 'hvp',
	        'application/vnd.yamaha.openscoreformat': 'osf',
	        'application/vnd.yamaha.openscoreformat.osfpvg+xml': 'osfpvg',
	        'application/vnd.yamaha.smaf-audio': 'saf',
	        'application/vnd.yamaha.smaf-phrase': 'spf',
	        'application/vnd.yellowriver-custom-menu': 'cmp',
	        'application/vnd.zul': 'zir',
	        'application/vnd.zzazz.deck+xml': 'zaz',
	        'application/vocaltec-media-desc': 'vmd',
	        'application/vocaltec-media-file': 'vmf',
	        'application/voicexml+xml': 'vxml',
	        'application/widget': 'wgt',
	        'application/winhlp': 'hlp',
	        'application/wordperfect': ['wp', 'wp5', 'wp6', 'wpd'],
	        'application/wordperfect6.0': ['w60', 'wp5'],
	        'application/wordperfect6.1': 'w61',
	        'application/wsdl+xml': 'wsdl',
	        'application/wspolicy+xml': 'wspolicy',
	        'application/x-123': 'wk1',
	        'application/x-7z-compressed': '7z',
	        'application/x-abiword': 'abw',
	        'application/x-ace-compressed': 'ace',
	        'application/x-aim': 'aim',
	        'application/x-authorware-bin': 'aab',
	        'application/x-authorware-map': 'aam',
	        'application/x-authorware-seg': 'aas',
	        'application/x-bcpio': 'bcpio',
	        'application/x-binary': 'bin',
	        'application/x-binhex40': 'hqx',
	        'application/x-bittorrent': 'torrent',
	        'application/x-bsh': ['bsh', 'sh', 'shar'],
	        'application/x-bytecode.elisp': 'elc',
	        'applicaiton/x-bytecode.python': 'pyc',
	        'application/x-bzip': 'bz',
	        'application/x-bzip2': ['boz', 'bz2'],
	        'application/x-cdf': 'cdf',
	        'application/x-cdlink': 'vcd',
	        'application/x-chat': ['cha', 'chat'],
	        'application/x-chess-pgn': 'pgn',
	        'application/x-cmu-raster': 'ras',
	        'application/x-cocoa': 'cco',
	        'application/x-compactpro': 'cpt',
	        'application/x-compress': 'z',
	        'application/x-compressed': ['tgz', 'gz', 'z', 'zip'],
	        'application/x-conference': 'nsc',
	        'application/x-cpio': 'cpio',
	        'application/x-cpt': 'cpt',
	        'application/x-csh': 'csh',
	        'application/x-debian-package': 'deb',
	        'application/x-deepv': 'deepv',
	        'application/x-director': ['dir', 'dcr', 'dxr'],
	        'application/x-doom': 'wad',
	        'application/x-dtbncx+xml': 'ncx',
	        'application/x-dtbook+xml': 'dtb',
	        'application/x-dtbresource+xml': 'res',
	        'application/x-dvi': 'dvi',
	        'application/x-elc': 'elc',
	        'application/x-envoy': ['env', 'evy'],
	        'application/x-esrehber': 'es',
	        'application/x-excel': ['xls', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw'],
	        'application/x-font-bdf': 'bdf',
	        'application/x-font-ghostscript': 'gsf',
	        'application/x-font-linux-psf': 'psf',
	        'application/x-font-otf': 'otf',
	        'application/x-font-pcf': 'pcf',
	        'application/x-font-snf': 'snf',
	        'application/x-font-ttf': 'ttf',
	        'application/x-font-type1': 'pfa',
	        'application/x-font-woff': 'woff',
	        'application/x-frame': 'mif',
	        'application/x-freelance': 'pre',
	        'application/x-futuresplash': 'spl',
	        'application/x-gnumeric': 'gnumeric',
	        'application/x-gsp': 'gsp',
	        'application/x-gss': 'gss',
	        'application/x-gtar': 'gtar',
	        'application/x-gzip': ['gz', 'gzip'],
	        'application/x-hdf': 'hdf',
	        'application/x-helpfile': ['help', 'hlp'],
	        'application/x-httpd-imap': 'imap',
	        'application/x-ima': 'ima',
	        'application/x-internet-signup': ['ins', 'isp'],
	        'application/x-internett-signup': 'ins',
	        'application/x-inventor': 'iv',
	        'application/x-ip2': 'ip',
	        'application/x-iphone': 'iii',
	        'application/x-java-class': 'class',
	        'application/x-java-commerce': 'jcm',
	        'application/x-java-jnlp-file': 'jnlp',
	        'application/x-javascript': 'js',
	        'application/x-koan': ['skd', 'skm', 'skp', 'skt'],
	        'application/x-ksh': 'ksh',
	        'application/x-latex': ['latex', 'ltx'],
	        'application/x-lha': 'lha',
	        'application/x-lisp': 'lsp',
	        'application/x-livescreen': 'ivy',
	        'application/x-lotus': 'wq1',
	        'application/x-lotusscreencam': 'scm',
	        'application/x-lzh': 'lzh',
	        'application/x-lzx': 'lzx',
	        'application/x-mac-binhex40': 'hqx',
	        'application/x-macbinary': 'bin',
	        'application/x-magic-cap-package-1.0': 'mc$',
	        'application/x-mathcad': 'mcd',
	        'application/x-meme': 'mm',
	        'application/x-midi': ['mid', 'midi'],
	        'application/x-mif': 'mif',
	        'application/x-mix-transfer': 'nix',
	        'application/x-mobipocket-ebook': 'prc',
	        'application/x-mplayer2': 'asx',
	        'application/x-ms-application': 'application',
	        'application/x-ms-wmd': 'wmd',
	        'application/x-ms-wmz': 'wmz',
	        'application/x-ms-xbap': 'xbap',
	        'application/x-msaccess': 'mdb',
	        'application/x-msbinder': 'obd',
	        'application/x-mscardfile': 'crd',
	        'application/x-msclip': 'clp',
	        'application/x-msdownload': ['exe', 'dll'],
	        'application/x-msexcel': ['xls', 'xla', 'xlw'],
	        'application/x-msmediaview': ['mvb', 'm13', 'm14'],
	        'application/x-msmetafile': 'wmf',
	        'application/x-msmoney': 'mny',
	        'application/x-mspowerpoint': 'ppt',
	        'application/x-mspublisher': 'pub',
	        'application/x-msschedule': 'scd',
	        'application/x-msterminal': 'trm',
	        'application/x-mswrite': 'wri',
	        'application/x-navi-animation': 'ani',
	        'application/x-navidoc': 'nvd',
	        'application/x-navimap': 'map',
	        'application/x-navistyle': 'stl',
	        'application/x-netcdf': ['cdf', 'nc'],
	        'application/x-newton-compatible-pkg': 'pkg',
	        'application/x-nokia-9000-communicator-add-on-software': 'aos',
	        'application/x-omc': 'omc',
	        'application/x-omcdatamaker': 'omcd',
	        'application/x-omcregerator': 'omcr',
	        'application/x-pagemaker': ['pm4', 'pm5'],
	        'application/x-pcl': 'pcl',
	        'application/x-perfmon': ['pma', 'pmc', 'pml', 'pmr', 'pmw'],
	        'application/x-pixclscript': 'plx',
	        'application/x-pkcs10': 'p10',
	        'application/x-pkcs12': ['p12', 'pfx'],
	        'application/x-pkcs7-certificates': ['p7b', 'spc'],
	        'application/x-pkcs7-certreqresp': 'p7r',
	        'application/x-pkcs7-mime': ['p7m', 'p7c'],
	        'application/x-pkcs7-signature': ['p7s', 'p7a'],
	        'application/x-pointplus': 'css',
	        'application/x-portable-anymap': 'pnm',
	        'application/x-project': ['mpc', 'mpt', 'mpv', 'mpx'],
	        'application/x-qpro': 'wb1',
	        'application/x-rar-compressed': 'rar',
	        'application/x-rtf': 'rtf',
	        'application/x-sdp': 'sdp',
	        'application/x-sea': 'sea',
	        'application/x-seelogo': 'sl',
	        'application/x-sh': 'sh',
	        'application/x-shar': ['shar', 'sh'],
	        'application/x-shockwave-flash': 'swf',
	        'application/x-silverlight-app': 'xap',
	        'application/x-sit': 'sit',
	        'application/x-sprite': ['spr', 'sprite'],
	        'application/x-stuffit': 'sit',
	        'application/x-stuffitx': 'sitx',
	        'application/x-sv4cpio': 'sv4cpio',
	        'application/x-sv4crc': 'sv4crc',
	        'application/x-tar': 'tar',
	        'application/x-tbook': ['sbk', 'tbk'],
	        'application/x-tcl': 'tcl',
	        'application/x-tex': 'tex',
	        'application/x-tex-tfm': 'tfm',
	        'application/x-texinfo': ['texi', 'texinfo'],
	        'application/x-troff': ['roff', 't', 'tr'],
	        'application/x-troff-man': 'man',
	        'application/x-troff-me': 'me',
	        'application/x-troff-ms': 'ms',
	        'application/x-troff-msvideo': 'avi',
	        'application/x-ustar': 'ustar',
	        'application/x-visio': ['vsd', 'vst', 'vsw'],
	        'application/x-vnd.audioexplosion.mzz': 'mzz',
	        'application/x-vnd.ls-xpix': 'xpix',
	        'application/x-vrml': 'vrml',
	        'application/x-wais-source': ['src', 'wsrc'],
	        'application/x-winhelp': 'hlp',
	        'application/x-wintalk': 'wtk',
	        'application/x-world': ['wrl', 'svr'],
	        'application/x-wpwin': 'wpd',
	        'application/x-wri': 'wri',
	        'application/x-x509-ca-cert': ['cer', 'crt', 'der'],
	        'application/x-x509-user-cert': 'crt',
	        'application/x-xfig': 'fig',
	        'application/x-xpinstall': 'xpi',
	        'application/x-zip-compressed': 'zip',
	        'application/xcap-diff+xml': 'xdf',
	        'application/xenc+xml': 'xenc',
	        'application/xhtml+xml': 'xhtml',
	        'application/xml': 'xml',
	        'application/xml-dtd': 'dtd',
	        'application/xop+xml': 'xop',
	        'application/xslt+xml': 'xslt',
	        'application/xspf+xml': 'xspf',
	        'application/xv+xml': 'mxml',
	        'application/yang': 'yang',
	        'application/yin+xml': 'yin',
	        'application/ynd.ms-pkipko': 'pko',
	        'application/zip': 'zip',
	        'audio/adpcm': 'adp',
	        'audio/aiff': ['aiff', 'aif', 'aifc'],
	        'audio/basic': ['snd', 'au'],
	        'audio/it': 'it',
	        'audio/make': ['funk', 'my', 'pfunk'],
	        'audio/make.my.funk': 'pfunk',
	        'audio/mid': ['mid', 'rmi'],
	        'audio/midi': ['midi', 'kar', 'mid'],
	        'audio/mod': 'mod',
	        'audio/mp4': 'mp4a',
	        'audio/mpeg': ['mpga', 'mp3', 'm2a', 'mp2', 'mpa', 'mpg'],
	        'audio/mpeg3': 'mp3',
	        'audio/nspaudio': ['la', 'lma'],
	        'audio/ogg': 'oga',
	        'audio/s3m': 's3m',
	        'audio/tsp-audio': 'tsi',
	        'audio/tsplayer': 'tsp',
	        'audio/vnd.dece.audio': 'uva',
	        'audio/vnd.digital-winds': 'eol',
	        'audio/vnd.dra': 'dra',
	        'audio/vnd.dts': 'dts',
	        'audio/vnd.dts.hd': 'dtshd',
	        'audio/vnd.lucent.voice': 'lvp',
	        'audio/vnd.ms-playready.media.pya': 'pya',
	        'audio/vnd.nuera.ecelp4800': 'ecelp4800',
	        'audio/vnd.nuera.ecelp7470': 'ecelp7470',
	        'audio/vnd.nuera.ecelp9600': 'ecelp9600',
	        'audio/vnd.qcelp': 'qcp',
	        'audio/vnd.rip': 'rip',
	        'audio/voc': 'voc',
	        'audio/voxware': 'vox',
	        'audio/wav': 'wav',
	        'audio/webm': 'weba',
	        'audio/x-aac': 'aac',
	        'audio/x-adpcm': 'snd',
	        'audio/x-aiff': ['aiff', 'aif', 'aifc'],
	        'audio/x-au': 'au',
	        'audio/x-gsm': ['gsd', 'gsm'],
	        'audio/x-jam': 'jam',
	        'audio/x-liveaudio': 'lam',
	        'audio/x-mid': ['mid', 'midi'],
	        'audio/x-midi': ['midi', 'mid'],
	        'audio/x-mod': 'mod',
	        'audio/x-mpeg': 'mp2',
	        'audio/x-mpeg-3': 'mp3',
	        'audio/x-mpegurl': 'm3u',
	        'audio/x-mpequrl': 'm3u',
	        'audio/x-ms-wax': 'wax',
	        'audio/x-ms-wma': 'wma',
	        'audio/x-nspaudio': ['la', 'lma'],
	        'audio/x-pn-realaudio': ['ra', 'ram', 'rm', 'rmm', 'rmp'],
	        'audio/x-pn-realaudio-plugin': ['ra', 'rmp', 'rpm'],
	        'audio/x-psid': 'sid',
	        'audio/x-realaudio': 'ra',
	        'audio/x-twinvq': 'vqf',
	        'audio/x-twinvq-plugin': ['vqe', 'vql'],
	        'audio/x-vnd.audioexplosion.mjuicemediafile': 'mjf',
	        'audio/x-voc': 'voc',
	        'audio/x-wav': 'wav',
	        'audio/xm': 'xm',
	        'chemical/x-cdx': 'cdx',
	        'chemical/x-cif': 'cif',
	        'chemical/x-cmdf': 'cmdf',
	        'chemical/x-cml': 'cml',
	        'chemical/x-csml': 'csml',
	        'chemical/x-pdb': ['pdb', 'xyz'],
	        'chemical/x-xyz': 'xyz',
	        'drawing/x-dwf': 'dwf',
	        'i-world/i-vrml': 'ivr',
	        'image/bmp': ['bmp', 'bm'],
	        'image/cgm': 'cgm',
	        'image/cis-cod': 'cod',
	        'image/cmu-raster': ['ras', 'rast'],
	        'image/fif': 'fif',
	        'image/florian': ['flo', 'turbot'],
	        'image/g3fax': 'g3',
	        'image/gif': 'gif',
	        'image/ief': ['ief', 'iefs'],
	        'image/jpeg': ['jpeg', 'jpe', 'jpg', 'jfif', 'jfif-tbnl'],
	        'image/jutvision': 'jut',
	        'image/ktx': 'ktx',
	        'image/naplps': ['nap', 'naplps'],
	        'image/pict': ['pic', 'pict'],
	        'image/pipeg': 'jfif',
	        'image/pjpeg': ['jfif', 'jpe', 'jpeg', 'jpg'],
	        'image/png': ['png', 'x-png'],
	        'image/prs.btif': 'btif',
	        'image/svg+xml': 'svg',
	        'image/tiff': ['tif', 'tiff'],
	        'image/vasa': 'mcf',
	        'image/vnd.adobe.photoshop': 'psd',
	        'image/vnd.dece.graphic': 'uvi',
	        'image/vnd.djvu': 'djvu',
	        'image/vnd.dvb.subtitle': 'sub',
	        'image/vnd.dwg': ['dwg', 'dxf', 'svf'],
	        'image/vnd.dxf': 'dxf',
	        'image/vnd.fastbidsheet': 'fbs',
	        'image/vnd.fpx': 'fpx',
	        'image/vnd.fst': 'fst',
	        'image/vnd.fujixerox.edmics-mmr': 'mmr',
	        'image/vnd.fujixerox.edmics-rlc': 'rlc',
	        'image/vnd.ms-modi': 'mdi',
	        'image/vnd.net-fpx': ['fpx', 'npx'],
	        'image/vnd.rn-realflash': 'rf',
	        'image/vnd.rn-realpix': 'rp',
	        'image/vnd.wap.wbmp': 'wbmp',
	        'image/vnd.xiff': 'xif',
	        'image/webp': 'webp',
	        'image/x-cmu-raster': 'ras',
	        'image/x-cmx': 'cmx',
	        'image/x-dwg': ['dwg', 'dxf', 'svf'],
	        'image/x-freehand': 'fh',
	        'image/x-icon': 'ico',
	        'image/x-jg': 'art',
	        'image/x-jps': 'jps',
	        'image/x-niff': ['niff', 'nif'],
	        'image/x-pcx': 'pcx',
	        'image/x-pict': ['pct', 'pic'],
	        'image/x-portable-anymap': 'pnm',
	        'image/x-portable-bitmap': 'pbm',
	        'image/x-portable-graymap': 'pgm',
	        'image/x-portable-greymap': 'pgm',
	        'image/x-portable-pixmap': 'ppm',
	        'image/x-quicktime': ['qif', 'qti', 'qtif'],
	        'image/x-rgb': 'rgb',
	        'image/x-tiff': ['tif', 'tiff'],
	        'image/x-windows-bmp': 'bmp',
	        'image/x-xbitmap': 'xbm',
	        'image/x-xbm': 'xbm',
	        'image/x-xpixmap': ['xpm', 'pm'],
	        'image/x-xwd': 'xwd',
	        'image/x-xwindowdump': 'xwd',
	        'image/xbm': 'xbm',
	        'image/xpm': 'xpm',
	        'message/rfc822': ['eml', 'mht', 'mhtml', 'nws', 'mime'],
	        'model/iges': ['iges', 'igs'],
	        'model/mesh': 'msh',
	        'model/vnd.collada+xml': 'dae',
	        'model/vnd.dwf': 'dwf',
	        'model/vnd.gdl': 'gdl',
	        'model/vnd.gtw': 'gtw',
	        'model/vnd.mts': 'mts',
	        'model/vnd.vtu': 'vtu',
	        'model/vrml': ['vrml', 'wrl', 'wrz'],
	        'model/x-pov': 'pov',
	        'multipart/x-gzip': 'gzip',
	        'multipart/x-ustar': 'ustar',
	        'multipart/x-zip': 'zip',
	        'music/crescendo': ['mid', 'midi'],
	        'music/x-karaoke': 'kar',
	        'paleovu/x-pv': 'pvu',
	        'text/asp': 'asp',
	        'text/calendar': 'ics',
	        'text/css': 'css',
	        'text/csv': 'csv',
	        'text/ecmascript': 'js',
	        'text/h323': '323',
	        'text/html': ['html', 'htm', 'stm', 'acgi', 'htmls', 'htx', 'shtml'],
	        'text/iuls': 'uls',
	        'text/javascript': 'js',
	        'text/mcf': 'mcf',
	        'text/n3': 'n3',
	        'text/pascal': 'pas',
	        'text/plain': ['txt', 'bas', 'c', 'h', 'c++', 'cc', 'com', 'conf', 'cxx', 'def', 'f', 'f90', 'for', 'g', 'hh', 'idc', 'jav', 'java', 'list', 'log', 'lst', 'm', 'mar', 'pl', 'sdml', 'text'],
	        'text/plain-bas': 'par',
	        'text/prs.lines.tag': 'dsc',
	        'text/richtext': ['rtx', 'rt', 'rtf'],
	        'text/scriplet': 'wsc',
	        'text/scriptlet': 'sct',
	        'text/sgml': ['sgm', 'sgml'],
	        'text/tab-separated-values': 'tsv',
	        'text/troff': 't',
	        'text/turtle': 'ttl',
	        'text/uri-list': ['uni', 'unis', 'uri', 'uris'],
	        'text/vnd.abc': 'abc',
	        'text/vnd.curl': 'curl',
	        'text/vnd.curl.dcurl': 'dcurl',
	        'text/vnd.curl.mcurl': 'mcurl',
	        'text/vnd.curl.scurl': 'scurl',
	        'text/vnd.fly': 'fly',
	        'text/vnd.fmi.flexstor': 'flx',
	        'text/vnd.graphviz': 'gv',
	        'text/vnd.in3d.3dml': '3dml',
	        'text/vnd.in3d.spot': 'spot',
	        'text/vnd.rn-realtext': 'rt',
	        'text/vnd.sun.j2me.app-descriptor': 'jad',
	        'text/vnd.wap.wml': 'wml',
	        'text/vnd.wap.wmlscript': 'wmls',
	        'text/webviewhtml': 'htt',
	        'text/x-asm': ['asm', 's'],
	        'text/x-audiosoft-intra': 'aip',
	        'text/x-c': ['c', 'cc', 'cpp'],
	        'text/x-component': 'htc',
	        'text/x-fortran': ['for', 'f', 'f77', 'f90'],
	        'text/x-h': ['h', 'hh'],
	        'text/x-java-source': ['java', 'jav'],
	        'text/x-java-source,java': 'java',
	        'text/x-la-asf': 'lsx',
	        'text/x-m': 'm',
	        'text/x-pascal': 'p',
	        'text/x-script': 'hlb',
	        'text/x-script.csh': 'csh',
	        'text/x-script.elisp': 'el',
	        'text/x-script.guile': 'scm',
	        'text/x-script.ksh': 'ksh',
	        'text/x-script.lisp': 'lsp',
	        'text/x-script.perl': 'pl',
	        'text/x-script.perl-module': 'pm',
	        'text/x-script.phyton': 'py',
	        'text/x-script.rexx': 'rexx',
	        'text/x-script.scheme': 'scm',
	        'text/x-script.sh': 'sh',
	        'text/x-script.tcl': 'tcl',
	        'text/x-script.tcsh': 'tcsh',
	        'text/x-script.zsh': 'zsh',
	        'text/x-server-parsed-html': ['shtml', 'ssi'],
	        'text/x-setext': 'etx',
	        'text/x-sgml': ['sgm', 'sgml'],
	        'text/x-speech': ['spc', 'talk'],
	        'text/x-uil': 'uil',
	        'text/x-uuencode': ['uu', 'uue'],
	        'text/x-vcalendar': 'vcs',
	        'text/x-vcard': 'vcf',
	        'text/xml': 'xml',
	        'video/3gpp': '3gp',
	        'video/3gpp2': '3g2',
	        'video/animaflex': 'afl',
	        'video/avi': 'avi',
	        'video/avs-video': 'avs',
	        'video/dl': 'dl',
	        'video/fli': 'fli',
	        'video/gl': 'gl',
	        'video/h261': 'h261',
	        'video/h263': 'h263',
	        'video/h264': 'h264',
	        'video/jpeg': 'jpgv',
	        'video/jpm': 'jpm',
	        'video/mj2': 'mj2',
	        'video/mp4': 'mp4',
	        'video/mpeg': ['mpeg', 'mp2', 'mpa', 'mpe', 'mpg', 'mpv2', 'm1v', 'm2v', 'mp3'],
	        'video/msvideo': 'avi',
	        'video/ogg': 'ogv',
	        'video/quicktime': ['mov', 'qt', 'moov'],
	        'video/vdo': 'vdo',
	        'video/vivo': ['viv', 'vivo'],
	        'video/vnd.dece.hd': 'uvh',
	        'video/vnd.dece.mobile': 'uvm',
	        'video/vnd.dece.pd': 'uvp',
	        'video/vnd.dece.sd': 'uvs',
	        'video/vnd.dece.video': 'uvv',
	        'video/vnd.fvt': 'fvt',
	        'video/vnd.mpegurl': 'mxu',
	        'video/vnd.ms-playready.media.pyv': 'pyv',
	        'video/vnd.rn-realvideo': 'rv',
	        'video/vnd.uvvu.mp4': 'uvu',
	        'video/vnd.vivo': ['viv', 'vivo'],
	        'video/vosaic': 'vos',
	        'video/webm': 'webm',
	        'video/x-amt-demorun': 'xdr',
	        'video/x-amt-showrun': 'xsr',
	        'video/x-atomic3d-feature': 'fmf',
	        'video/x-dl': 'dl',
	        'video/x-dv': ['dif', 'dv'],
	        'video/x-f4v': 'f4v',
	        'video/x-fli': 'fli',
	        'video/x-flv': 'flv',
	        'video/x-gl': 'gl',
	        'video/x-isvideo': 'isu',
	        'video/x-la-asf': ['lsf', 'lsx'],
	        'video/x-m4v': 'm4v',
	        'video/x-motion-jpeg': 'mjpg',
	        'video/x-mpeg': ['mp3', 'mp2'],
	        'video/x-mpeq2a': 'mp2',
	        'video/x-ms-asf': ['asf', 'asr', 'asx'],
	        'video/x-ms-asf-plugin': 'asx',
	        'video/x-ms-wm': 'wm',
	        'video/x-ms-wmv': 'wmv',
	        'video/x-ms-wmx': 'wmx',
	        'video/x-ms-wvx': 'wvx',
	        'video/x-msvideo': 'avi',
	        'video/x-qtc': 'qtc',
	        'video/x-scm': 'scm',
	        'video/x-sgi-movie': ['movie', 'mv'],
	        'windows/metafile': 'wmf',
	        'www/mime': 'mime',
	        'x-conference/x-cooltalk': 'ice',
	        'x-music/x-midi': ['mid', 'midi'],
	        'x-world/x-3dmf': ['3dm', '3dmf', 'qd3', 'qd3d'],
	        'x-world/x-svr': 'svr',
	        'x-world/x-vrml': ['flr', 'vrml', 'wrl', 'wrz', 'xaf', 'xof'],
	        'x-world/x-vrt': 'vrt',
	        'xgl/drawing': 'xgz',
	        'xgl/movie': 'xmz'
	    },
	
	    extensions: {
	        '*': 'application/octet-stream',
	        '123': 'application/vnd.lotus-1-2-3',
	        '323': 'text/h323',
	        '3dm': 'x-world/x-3dmf',
	        '3dmf': 'x-world/x-3dmf',
	        '3dml': 'text/vnd.in3d.3dml',
	        '3g2': 'video/3gpp2',
	        '3gp': 'video/3gpp',
	        '7z': 'application/x-7z-compressed',
	        'a': 'application/octet-stream',
	        'aab': 'application/x-authorware-bin',
	        'aac': 'audio/x-aac',
	        'aam': 'application/x-authorware-map',
	        'aas': 'application/x-authorware-seg',
	        'abc': 'text/vnd.abc',
	        'abw': 'application/x-abiword',
	        'ac': 'application/pkix-attr-cert',
	        'acc': 'application/vnd.americandynamics.acc',
	        'ace': 'application/x-ace-compressed',
	        'acgi': 'text/html',
	        'acu': 'application/vnd.acucobol',
	        'acx': 'application/internet-property-stream',
	        'adp': 'audio/adpcm',
	        'aep': 'application/vnd.audiograph',
	        'afl': 'video/animaflex',
	        'afp': 'application/vnd.ibm.modcap',
	        'ahead': 'application/vnd.ahead.space',
	        'ai': 'application/postscript',
	        'aif': ['audio/aiff', 'audio/x-aiff'],
	        'aifc': ['audio/aiff', 'audio/x-aiff'],
	        'aiff': ['audio/aiff', 'audio/x-aiff'],
	        'aim': 'application/x-aim',
	        'aip': 'text/x-audiosoft-intra',
	        'air': 'application/vnd.adobe.air-application-installer-package+zip',
	        'ait': 'application/vnd.dvb.ait',
	        'ami': 'application/vnd.amiga.ami',
	        'ani': 'application/x-navi-animation',
	        'aos': 'application/x-nokia-9000-communicator-add-on-software',
	        'apk': 'application/vnd.android.package-archive',
	        'application': 'application/x-ms-application',
	        'apr': 'application/vnd.lotus-approach',
	        'aps': 'application/mime',
	        'arc': 'application/octet-stream',
	        'arj': ['application/arj', 'application/octet-stream'],
	        'art': 'image/x-jg',
	        'asf': 'video/x-ms-asf',
	        'asm': 'text/x-asm',
	        'aso': 'application/vnd.accpac.simply.aso',
	        'asp': 'text/asp',
	        'asr': 'video/x-ms-asf',
	        'asx': ['video/x-ms-asf', 'application/x-mplayer2', 'video/x-ms-asf-plugin'],
	        'atc': 'application/vnd.acucorp',
	        'atomcat': 'application/atomcat+xml',
	        'atomsvc': 'application/atomsvc+xml',
	        'atx': 'application/vnd.antix.game-component',
	        'au': ['audio/basic', 'audio/x-au'],
	        'avi': ['video/avi', 'video/msvideo', 'application/x-troff-msvideo', 'video/x-msvideo'],
	        'avs': 'video/avs-video',
	        'aw': 'application/applixware',
	        'axs': 'application/olescript',
	        'azf': 'application/vnd.airzip.filesecure.azf',
	        'azs': 'application/vnd.airzip.filesecure.azs',
	        'azw': 'application/vnd.amazon.ebook',
	        'bas': 'text/plain',
	        'bcpio': 'application/x-bcpio',
	        'bdf': 'application/x-font-bdf',
	        'bdm': 'application/vnd.syncml.dm+wbxml',
	        'bed': 'application/vnd.realvnc.bed',
	        'bh2': 'application/vnd.fujitsu.oasysprs',
	        'bin': ['application/octet-stream', 'application/mac-binary', 'application/macbinary', 'application/x-macbinary', 'application/x-binary'],
	        'bm': 'image/bmp',
	        'bmi': 'application/vnd.bmi',
	        'bmp': ['image/bmp', 'image/x-windows-bmp'],
	        'boo': 'application/book',
	        'book': 'application/book',
	        'box': 'application/vnd.previewsystems.box',
	        'boz': 'application/x-bzip2',
	        'bsh': 'application/x-bsh',
	        'btif': 'image/prs.btif',
	        'bz': 'application/x-bzip',
	        'bz2': 'application/x-bzip2',
	        'c': ['text/plain', 'text/x-c'],
	        'c++': 'text/plain',
	        'c11amc': 'application/vnd.cluetrust.cartomobile-config',
	        'c11amz': 'application/vnd.cluetrust.cartomobile-config-pkg',
	        'c4g': 'application/vnd.clonk.c4group',
	        'cab': 'application/vnd.ms-cab-compressed',
	        'car': 'application/vnd.curl.car',
	        'cat': ['application/vnd.ms-pkiseccat', 'application/vnd.ms-pki.seccat'],
	        'cc': ['text/plain', 'text/x-c'],
	        'ccad': 'application/clariscad',
	        'cco': 'application/x-cocoa',
	        'ccxml': 'application/ccxml+xml,',
	        'cdbcmsg': 'application/vnd.contact.cmsg',
	        'cdf': ['application/cdf', 'application/x-cdf', 'application/x-netcdf'],
	        'cdkey': 'application/vnd.mediastation.cdkey',
	        'cdmia': 'application/cdmi-capability',
	        'cdmic': 'application/cdmi-container',
	        'cdmid': 'application/cdmi-domain',
	        'cdmio': 'application/cdmi-object',
	        'cdmiq': 'application/cdmi-queue',
	        'cdx': 'chemical/x-cdx',
	        'cdxml': 'application/vnd.chemdraw+xml',
	        'cdy': 'application/vnd.cinderella',
	        'cer': ['application/pkix-cert', 'application/x-x509-ca-cert'],
	        'cgm': 'image/cgm',
	        'cha': 'application/x-chat',
	        'chat': 'application/x-chat',
	        'chm': 'application/vnd.ms-htmlhelp',
	        'chrt': 'application/vnd.kde.kchart',
	        'cif': 'chemical/x-cif',
	        'cii': 'application/vnd.anser-web-certificate-issue-initiation',
	        'cil': 'application/vnd.ms-artgalry',
	        'cla': 'application/vnd.claymore',
	        'class': ['application/octet-stream', 'application/java', 'application/java-byte-code', 'application/java-vm', 'application/x-java-class'],
	        'clkk': 'application/vnd.crick.clicker.keyboard',
	        'clkp': 'application/vnd.crick.clicker.palette',
	        'clkt': 'application/vnd.crick.clicker.template',
	        'clkw': 'application/vnd.crick.clicker.wordbank',
	        'clkx': 'application/vnd.crick.clicker',
	        'clp': 'application/x-msclip',
	        'cmc': 'application/vnd.cosmocaller',
	        'cmdf': 'chemical/x-cmdf',
	        'cml': 'chemical/x-cml',
	        'cmp': 'application/vnd.yellowriver-custom-menu',
	        'cmx': 'image/x-cmx',
	        'cod': ['image/cis-cod', 'application/vnd.rim.cod'],
	        'com': ['application/octet-stream', 'text/plain'],
	        'conf': 'text/plain',
	        'cpio': 'application/x-cpio',
	        'cpp': 'text/x-c',
	        'cpt': ['application/mac-compactpro', 'application/x-compactpro', 'application/x-cpt'],
	        'crd': 'application/x-mscardfile',
	        'crl': ['application/pkix-crl', 'application/pkcs-crl'],
	        'crt': ['application/pkix-cert', 'application/x-x509-user-cert', 'application/x-x509-ca-cert'],
	        'cryptonote': 'application/vnd.rig.cryptonote',
	        'csh': ['text/x-script.csh', 'application/x-csh'],
	        'csml': 'chemical/x-csml',
	        'csp': 'application/vnd.commonspace',
	        'css': ['text/css', 'application/x-pointplus'],
	        'csv': 'text/csv',
	        'cu': 'application/cu-seeme',
	        'curl': 'text/vnd.curl',
	        'cww': 'application/prs.cww',
	        'cxx': 'text/plain',
	        'dae': 'model/vnd.collada+xml',
	        'daf': 'application/vnd.mobius.daf',
	        'davmount': 'application/davmount+xml',
	        'dcr': 'application/x-director',
	        'dcurl': 'text/vnd.curl.dcurl',
	        'dd2': 'application/vnd.oma.dd2+xml',
	        'ddd': 'application/vnd.fujixerox.ddd',
	        'deb': 'application/x-debian-package',
	        'deepv': 'application/x-deepv',
	        'def': 'text/plain',
	        'der': 'application/x-x509-ca-cert',
	        'dfac': 'application/vnd.dreamfactory',
	        'dif': 'video/x-dv',
	        'dir': 'application/x-director',
	        'dis': 'application/vnd.mobius.dis',
	        'djvu': 'image/vnd.djvu',
	        'dl': ['video/dl', 'video/x-dl'],
	        'dll': 'application/x-msdownload',
	        'dms': 'application/octet-stream',
	        'dna': 'application/vnd.dna',
	        'doc': 'application/msword',
	        'docm': 'application/vnd.ms-word.document.macroenabled.12',
	        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	        'dot': 'application/msword',
	        'dotm': 'application/vnd.ms-word.template.macroenabled.12',
	        'dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
	        'dp': ['application/commonground', 'application/vnd.osgi.dp'],
	        'dpg': 'application/vnd.dpgraph',
	        'dra': 'audio/vnd.dra',
	        'drw': 'application/drafting',
	        'dsc': 'text/prs.lines.tag',
	        'dssc': 'application/dssc+der',
	        'dtb': 'application/x-dtbook+xml',
	        'dtd': 'application/xml-dtd',
	        'dts': 'audio/vnd.dts',
	        'dtshd': 'audio/vnd.dts.hd',
	        'dump': 'application/octet-stream',
	        'dv': 'video/x-dv',
	        'dvi': 'application/x-dvi',
	        'dwf': ['model/vnd.dwf', 'drawing/x-dwf'],
	        'dwg': ['application/acad', 'image/vnd.dwg', 'image/x-dwg'],
	        'dxf': ['application/dxf', 'image/vnd.dwg', 'image/vnd.dxf', 'image/x-dwg'],
	        'dxp': 'application/vnd.spotfire.dxp',
	        'dxr': 'application/x-director',
	        'ecelp4800': 'audio/vnd.nuera.ecelp4800',
	        'ecelp7470': 'audio/vnd.nuera.ecelp7470',
	        'ecelp9600': 'audio/vnd.nuera.ecelp9600',
	        'edm': 'application/vnd.novadigm.edm',
	        'edx': 'application/vnd.novadigm.edx',
	        'efif': 'application/vnd.picsel',
	        'ei6': 'application/vnd.pg.osasli',
	        'el': 'text/x-script.elisp',
	        'elc': ['application/x-elc', 'application/x-bytecode.elisp'],
	        'eml': 'message/rfc822',
	        'emma': 'application/emma+xml',
	        'env': 'application/x-envoy',
	        'eol': 'audio/vnd.digital-winds',
	        'eot': 'application/vnd.ms-fontobject',
	        'eps': 'application/postscript',
	        'epub': 'application/epub+zip',
	        'es': ['application/ecmascript', 'application/x-esrehber'],
	        'es3': 'application/vnd.eszigno3+xml',
	        'esf': 'application/vnd.epson.esf',
	        'etx': 'text/x-setext',
	        'evy': ['application/envoy', 'application/x-envoy'],
	        'exe': ['application/octet-stream', 'application/x-msdownload'],
	        'exi': 'application/exi',
	        'ext': 'application/vnd.novadigm.ext',
	        'ez2': 'application/vnd.ezpix-album',
	        'ez3': 'application/vnd.ezpix-package',
	        'f': ['text/plain', 'text/x-fortran'],
	        'f4v': 'video/x-f4v',
	        'f77': 'text/x-fortran',
	        'f90': ['text/plain', 'text/x-fortran'],
	        'fbs': 'image/vnd.fastbidsheet',
	        'fcs': 'application/vnd.isac.fcs',
	        'fdf': 'application/vnd.fdf',
	        'fe_launch': 'application/vnd.denovo.fcselayout-link',
	        'fg5': 'application/vnd.fujitsu.oasysgp',
	        'fh': 'image/x-freehand',
	        'fif': ['application/fractals', 'image/fif'],
	        'fig': 'application/x-xfig',
	        'fli': ['video/fli', 'video/x-fli'],
	        'flo': ['image/florian', 'application/vnd.micrografx.flo'],
	        'flr': 'x-world/x-vrml',
	        'flv': 'video/x-flv',
	        'flw': 'application/vnd.kde.kivio',
	        'flx': 'text/vnd.fmi.flexstor',
	        'fly': 'text/vnd.fly',
	        'fm': 'application/vnd.framemaker',
	        'fmf': 'video/x-atomic3d-feature',
	        'fnc': 'application/vnd.frogans.fnc',
	        'for': ['text/plain', 'text/x-fortran'],
	        'fpx': ['image/vnd.fpx', 'image/vnd.net-fpx'],
	        'frl': 'application/freeloader',
	        'fsc': 'application/vnd.fsc.weblaunch',
	        'fst': 'image/vnd.fst',
	        'ftc': 'application/vnd.fluxtime.clip',
	        'fti': 'application/vnd.anser-web-funds-transfer-initiation',
	        'funk': 'audio/make',
	        'fvt': 'video/vnd.fvt',
	        'fxp': 'application/vnd.adobe.fxp',
	        'fzs': 'application/vnd.fuzzysheet',
	        'g': 'text/plain',
	        'g2w': 'application/vnd.geoplan',
	        'g3': 'image/g3fax',
	        'g3w': 'application/vnd.geospace',
	        'gac': 'application/vnd.groove-account',
	        'gdl': 'model/vnd.gdl',
	        'geo': 'application/vnd.dynageo',
	        'gex': 'application/vnd.geometry-explorer',
	        'ggb': 'application/vnd.geogebra.file',
	        'ggt': 'application/vnd.geogebra.tool',
	        'ghf': 'application/vnd.groove-help',
	        'gif': 'image/gif',
	        'gim': 'application/vnd.groove-identity-message',
	        'gl': ['video/gl', 'video/x-gl'],
	        'gmx': 'application/vnd.gmx',
	        'gnumeric': 'application/x-gnumeric',
	        'gph': 'application/vnd.flographit',
	        'gqf': 'application/vnd.grafeq',
	        'gram': 'application/srgs',
	        'grv': 'application/vnd.groove-injector',
	        'grxml': 'application/srgs+xml',
	        'gsd': 'audio/x-gsm',
	        'gsf': 'application/x-font-ghostscript',
	        'gsm': 'audio/x-gsm',
	        'gsp': 'application/x-gsp',
	        'gss': 'application/x-gss',
	        'gtar': 'application/x-gtar',
	        'gtm': 'application/vnd.groove-tool-message',
	        'gtw': 'model/vnd.gtw',
	        'gv': 'text/vnd.graphviz',
	        'gxt': 'application/vnd.geonext',
	        'gz': ['application/x-gzip', 'application/x-compressed'],
	        'gzip': ['multipart/x-gzip', 'application/x-gzip'],
	        'h': ['text/plain', 'text/x-h'],
	        'h261': 'video/h261',
	        'h263': 'video/h263',
	        'h264': 'video/h264',
	        'hal': 'application/vnd.hal+xml',
	        'hbci': 'application/vnd.hbci',
	        'hdf': 'application/x-hdf',
	        'help': 'application/x-helpfile',
	        'hgl': 'application/vnd.hp-hpgl',
	        'hh': ['text/plain', 'text/x-h'],
	        'hlb': 'text/x-script',
	        'hlp': ['application/winhlp', 'application/hlp', 'application/x-helpfile', 'application/x-winhelp'],
	        'hpg': 'application/vnd.hp-hpgl',
	        'hpgl': 'application/vnd.hp-hpgl',
	        'hpid': 'application/vnd.hp-hpid',
	        'hps': 'application/vnd.hp-hps',
	        'hqx': ['application/mac-binhex40', 'application/binhex', 'application/binhex4', 'application/mac-binhex', 'application/x-binhex40', 'application/x-mac-binhex40'],
	        'hta': 'application/hta',
	        'htc': 'text/x-component',
	        'htke': 'application/vnd.kenameaapp',
	        'htm': 'text/html',
	        'html': 'text/html',
	        'htmls': 'text/html',
	        'htt': 'text/webviewhtml',
	        'htx': 'text/html',
	        'hvd': 'application/vnd.yamaha.hv-dic',
	        'hvp': 'application/vnd.yamaha.hv-voice',
	        'hvs': 'application/vnd.yamaha.hv-script',
	        'i2g': 'application/vnd.intergeo',
	        'icc': 'application/vnd.iccprofile',
	        'ice': 'x-conference/x-cooltalk',
	        'ico': 'image/x-icon',
	        'ics': 'text/calendar',
	        'idc': 'text/plain',
	        'ief': 'image/ief',
	        'iefs': 'image/ief',
	        'ifm': 'application/vnd.shana.informed.formdata',
	        'iges': ['application/iges', 'model/iges'],
	        'igl': 'application/vnd.igloader',
	        'igm': 'application/vnd.insors.igm',
	        'igs': ['application/iges', 'model/iges'],
	        'igx': 'application/vnd.micrografx.igx',
	        'iif': 'application/vnd.shana.informed.interchange',
	        'iii': 'application/x-iphone',
	        'ima': 'application/x-ima',
	        'imap': 'application/x-httpd-imap',
	        'imp': 'application/vnd.accpac.simply.imp',
	        'ims': 'application/vnd.ms-ims',
	        'inf': 'application/inf',
	        'ins': ['application/x-internet-signup', 'application/x-internett-signup'],
	        'ip': 'application/x-ip2',
	        'ipfix': 'application/ipfix',
	        'ipk': 'application/vnd.shana.informed.package',
	        'irm': 'application/vnd.ibm.rights-management',
	        'irp': 'application/vnd.irepository.package+xml',
	        'isp': 'application/x-internet-signup',
	        'isu': 'video/x-isvideo',
	        'it': 'audio/it',
	        'itp': 'application/vnd.shana.informed.formtemplate',
	        'iv': 'application/x-inventor',
	        'ivp': 'application/vnd.immervision-ivp',
	        'ivr': 'i-world/i-vrml',
	        'ivu': 'application/vnd.immervision-ivu',
	        'ivy': 'application/x-livescreen',
	        'jad': 'text/vnd.sun.j2me.app-descriptor',
	        'jam': ['application/vnd.jam', 'audio/x-jam'],
	        'jar': 'application/java-archive',
	        'jav': ['text/plain', 'text/x-java-source'],
	        'java': ['text/plain', 'text/x-java-source,java', 'text/x-java-source'],
	        'jcm': 'application/x-java-commerce',
	        'jfif': ['image/pipeg', 'image/jpeg', 'image/pjpeg'],
	        'jfif-tbnl': 'image/jpeg',
	        'jisp': 'application/vnd.jisp',
	        'jlt': 'application/vnd.hp-jlyt',
	        'jnlp': 'application/x-java-jnlp-file',
	        'joda': 'application/vnd.joost.joda-archive',
	        'jpe': ['image/jpeg', 'image/pjpeg'],
	        'jpeg': ['image/jpeg', 'image/pjpeg'],
	        'jpg': ['image/jpeg', 'image/pjpeg'],
	        'jpgv': 'video/jpeg',
	        'jpm': 'video/jpm',
	        'jps': 'image/x-jps',
	        'js': ['application/javascript', 'application/ecmascript', 'text/javascript', 'text/ecmascript', 'application/x-javascript'],
	        'json': 'application/json',
	        'jut': 'image/jutvision',
	        'kar': ['audio/midi', 'music/x-karaoke'],
	        'karbon': 'application/vnd.kde.karbon',
	        'kfo': 'application/vnd.kde.kformula',
	        'kia': 'application/vnd.kidspiration',
	        'kml': 'application/vnd.google-earth.kml+xml',
	        'kmz': 'application/vnd.google-earth.kmz',
	        'kne': 'application/vnd.kinar',
	        'kon': 'application/vnd.kde.kontour',
	        'kpr': 'application/vnd.kde.kpresenter',
	        'ksh': ['application/x-ksh', 'text/x-script.ksh'],
	        'ksp': 'application/vnd.kde.kspread',
	        'ktx': 'image/ktx',
	        'ktz': 'application/vnd.kahootz',
	        'kwd': 'application/vnd.kde.kword',
	        'la': ['audio/nspaudio', 'audio/x-nspaudio'],
	        'lam': 'audio/x-liveaudio',
	        'lasxml': 'application/vnd.las.las+xml',
	        'latex': 'application/x-latex',
	        'lbd': 'application/vnd.llamagraphics.life-balance.desktop',
	        'lbe': 'application/vnd.llamagraphics.life-balance.exchange+xml',
	        'les': 'application/vnd.hhe.lesson-player',
	        'lha': ['application/octet-stream', 'application/lha', 'application/x-lha'],
	        'lhx': 'application/octet-stream',
	        'link66': 'application/vnd.route66.link66+xml',
	        'list': 'text/plain',
	        'lma': ['audio/nspaudio', 'audio/x-nspaudio'],
	        'log': 'text/plain',
	        'lrm': 'application/vnd.ms-lrm',
	        'lsf': 'video/x-la-asf',
	        'lsp': ['application/x-lisp', 'text/x-script.lisp'],
	        'lst': 'text/plain',
	        'lsx': ['video/x-la-asf', 'text/x-la-asf'],
	        'ltf': 'application/vnd.frogans.ltf',
	        'ltx': 'application/x-latex',
	        'lvp': 'audio/vnd.lucent.voice',
	        'lwp': 'application/vnd.lotus-wordpro',
	        'lzh': ['application/octet-stream', 'application/x-lzh'],
	        'lzx': ['application/lzx', 'application/octet-stream', 'application/x-lzx'],
	        'm': ['text/plain', 'text/x-m'],
	        'm13': 'application/x-msmediaview',
	        'm14': 'application/x-msmediaview',
	        'm1v': 'video/mpeg',
	        'm21': 'application/mp21',
	        'm2a': 'audio/mpeg',
	        'm2v': 'video/mpeg',
	        'm3u': ['audio/x-mpegurl', 'audio/x-mpequrl'],
	        'm3u8': 'application/vnd.apple.mpegurl',
	        'm4v': 'video/x-m4v',
	        'ma': 'application/mathematica',
	        'mads': 'application/mads+xml',
	        'mag': 'application/vnd.ecowin.chart',
	        'man': 'application/x-troff-man',
	        'map': 'application/x-navimap',
	        'mar': 'text/plain',
	        'mathml': 'application/mathml+xml',
	        'mbd': 'application/mbedlet',
	        'mbk': 'application/vnd.mobius.mbk',
	        'mbox': 'application/mbox',
	        'mc$': 'application/x-magic-cap-package-1.0',
	        'mc1': 'application/vnd.medcalcdata',
	        'mcd': ['application/mcad', 'application/vnd.mcd', 'application/x-mathcad'],
	        'mcf': ['image/vasa', 'text/mcf'],
	        'mcp': 'application/netmc',
	        'mcurl': 'text/vnd.curl.mcurl',
	        'mdb': 'application/x-msaccess',
	        'mdi': 'image/vnd.ms-modi',
	        'me': 'application/x-troff-me',
	        'meta4': 'application/metalink4+xml',
	        'mets': 'application/mets+xml',
	        'mfm': 'application/vnd.mfmp',
	        'mgp': 'application/vnd.osgeo.mapguide.package',
	        'mgz': 'application/vnd.proteus.magazine',
	        'mht': 'message/rfc822',
	        'mhtml': 'message/rfc822',
	        'mid': ['audio/mid', 'audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid'],
	        'midi': ['audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid'],
	        'mif': ['application/vnd.mif', 'application/x-mif', 'application/x-frame'],
	        'mime': ['message/rfc822', 'www/mime'],
	        'mj2': 'video/mj2',
	        'mjf': 'audio/x-vnd.audioexplosion.mjuicemediafile',
	        'mjpg': 'video/x-motion-jpeg',
	        'mlp': 'application/vnd.dolby.mlp',
	        'mm': ['application/base64', 'application/x-meme'],
	        'mmd': 'application/vnd.chipnuts.karaoke-mmd',
	        'mme': 'application/base64',
	        'mmf': 'application/vnd.smaf',
	        'mmr': 'image/vnd.fujixerox.edmics-mmr',
	        'mny': 'application/x-msmoney',
	        'mod': ['audio/mod', 'audio/x-mod'],
	        'mods': 'application/mods+xml',
	        'moov': 'video/quicktime',
	        'mov': 'video/quicktime',
	        'movie': 'video/x-sgi-movie',
	        'mp2': ['video/mpeg', 'audio/mpeg', 'video/x-mpeg', 'audio/x-mpeg', 'video/x-mpeq2a'],
	        'mp3': ['audio/mpeg', 'audio/mpeg3', 'video/mpeg', 'audio/x-mpeg-3', 'video/x-mpeg'],
	        'mp4': ['video/mp4', 'application/mp4'],
	        'mp4a': 'audio/mp4',
	        'mpa': ['video/mpeg', 'audio/mpeg'],
	        'mpc': ['application/vnd.mophun.certificate', 'application/x-project'],
	        'mpe': 'video/mpeg',
	        'mpeg': 'video/mpeg',
	        'mpg': ['video/mpeg', 'audio/mpeg'],
	        'mpga': 'audio/mpeg',
	        'mpkg': 'application/vnd.apple.installer+xml',
	        'mpm': 'application/vnd.blueice.multipass',
	        'mpn': 'application/vnd.mophun.application',
	        'mpp': 'application/vnd.ms-project',
	        'mpt': 'application/x-project',
	        'mpv': 'application/x-project',
	        'mpv2': 'video/mpeg',
	        'mpx': 'application/x-project',
	        'mpy': 'application/vnd.ibm.minipay',
	        'mqy': 'application/vnd.mobius.mqy',
	        'mrc': 'application/marc',
	        'mrcx': 'application/marcxml+xml',
	        'ms': 'application/x-troff-ms',
	        'mscml': 'application/mediaservercontrol+xml',
	        'mseq': 'application/vnd.mseq',
	        'msf': 'application/vnd.epson.msf',
	        'msg': 'application/vnd.ms-outlook',
	        'msh': 'model/mesh',
	        'msl': 'application/vnd.mobius.msl',
	        'msty': 'application/vnd.muvee.style',
	        'mts': 'model/vnd.mts',
	        'mus': 'application/vnd.musician',
	        'musicxml': 'application/vnd.recordare.musicxml+xml',
	        'mv': 'video/x-sgi-movie',
	        'mvb': 'application/x-msmediaview',
	        'mwf': 'application/vnd.mfer',
	        'mxf': 'application/mxf',
	        'mxl': 'application/vnd.recordare.musicxml',
	        'mxml': 'application/xv+xml',
	        'mxs': 'application/vnd.triscape.mxs',
	        'mxu': 'video/vnd.mpegurl',
	        'my': 'audio/make',
	        'mzz': 'application/x-vnd.audioexplosion.mzz',
	        'n-gage': 'application/vnd.nokia.n-gage.symbian.install',
	        'n3': 'text/n3',
	        'nap': 'image/naplps',
	        'naplps': 'image/naplps',
	        'nbp': 'application/vnd.wolfram.player',
	        'nc': 'application/x-netcdf',
	        'ncm': 'application/vnd.nokia.configuration-message',
	        'ncx': 'application/x-dtbncx+xml',
	        'ngdat': 'application/vnd.nokia.n-gage.data',
	        'nif': 'image/x-niff',
	        'niff': 'image/x-niff',
	        'nix': 'application/x-mix-transfer',
	        'nlu': 'application/vnd.neurolanguage.nlu',
	        'nml': 'application/vnd.enliven',
	        'nnd': 'application/vnd.noblenet-directory',
	        'nns': 'application/vnd.noblenet-sealer',
	        'nnw': 'application/vnd.noblenet-web',
	        'npx': 'image/vnd.net-fpx',
	        'nsc': 'application/x-conference',
	        'nsf': 'application/vnd.lotus-notes',
	        'nvd': 'application/x-navidoc',
	        'nws': 'message/rfc822',
	        'o': 'application/octet-stream',
	        'oa2': 'application/vnd.fujitsu.oasys2',
	        'oa3': 'application/vnd.fujitsu.oasys3',
	        'oas': 'application/vnd.fujitsu.oasys',
	        'obd': 'application/x-msbinder',
	        'oda': 'application/oda',
	        'odb': 'application/vnd.oasis.opendocument.database',
	        'odc': 'application/vnd.oasis.opendocument.chart',
	        'odf': 'application/vnd.oasis.opendocument.formula',
	        'odft': 'application/vnd.oasis.opendocument.formula-template',
	        'odg': 'application/vnd.oasis.opendocument.graphics',
	        'odi': 'application/vnd.oasis.opendocument.image',
	        'odm': 'application/vnd.oasis.opendocument.text-master',
	        'odp': 'application/vnd.oasis.opendocument.presentation',
	        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
	        'odt': 'application/vnd.oasis.opendocument.text',
	        'oga': 'audio/ogg',
	        'ogv': 'video/ogg',
	        'ogx': 'application/ogg',
	        'omc': 'application/x-omc',
	        'omcd': 'application/x-omcdatamaker',
	        'omcr': 'application/x-omcregerator',
	        'onetoc': 'application/onenote',
	        'opf': 'application/oebps-package+xml',
	        'org': 'application/vnd.lotus-organizer',
	        'osf': 'application/vnd.yamaha.openscoreformat',
	        'osfpvg': 'application/vnd.yamaha.openscoreformat.osfpvg+xml',
	        'otc': 'application/vnd.oasis.opendocument.chart-template',
	        'otf': 'application/x-font-otf',
	        'otg': 'application/vnd.oasis.opendocument.graphics-template',
	        'oth': 'application/vnd.oasis.opendocument.text-web',
	        'oti': 'application/vnd.oasis.opendocument.image-template',
	        'otp': 'application/vnd.oasis.opendocument.presentation-template',
	        'ots': 'application/vnd.oasis.opendocument.spreadsheet-template',
	        'ott': 'application/vnd.oasis.opendocument.text-template',
	        'oxt': 'application/vnd.openofficeorg.extension',
	        'p': 'text/x-pascal',
	        'p10': ['application/pkcs10', 'application/x-pkcs10'],
	        'p12': ['application/pkcs-12', 'application/x-pkcs12'],
	        'p7a': 'application/x-pkcs7-signature',
	        'p7b': 'application/x-pkcs7-certificates',
	        'p7c': ['application/pkcs7-mime', 'application/x-pkcs7-mime'],
	        'p7m': ['application/pkcs7-mime', 'application/x-pkcs7-mime'],
	        'p7r': 'application/x-pkcs7-certreqresp',
	        'p7s': ['application/pkcs7-signature', 'application/x-pkcs7-signature'],
	        'p8': 'application/pkcs8',
	        'par': 'text/plain-bas',
	        'part': 'application/pro_eng',
	        'pas': 'text/pascal',
	        'paw': 'application/vnd.pawaafile',
	        'pbd': 'application/vnd.powerbuilder6',
	        'pbm': 'image/x-portable-bitmap',
	        'pcf': 'application/x-font-pcf',
	        'pcl': ['application/vnd.hp-pcl', 'application/x-pcl'],
	        'pclxl': 'application/vnd.hp-pclxl',
	        'pct': 'image/x-pict',
	        'pcurl': 'application/vnd.curl.pcurl',
	        'pcx': 'image/x-pcx',
	        'pdb': ['application/vnd.palm', 'chemical/x-pdb'],
	        'pdf': 'application/pdf',
	        'pfa': 'application/x-font-type1',
	        'pfr': 'application/font-tdpfr',
	        'pfunk': ['audio/make', 'audio/make.my.funk'],
	        'pfx': 'application/x-pkcs12',
	        'pgm': ['image/x-portable-graymap', 'image/x-portable-greymap'],
	        'pgn': 'application/x-chess-pgn',
	        'pgp': 'application/pgp-signature',
	        'pic': ['image/pict', 'image/x-pict'],
	        'pict': 'image/pict',
	        'pkg': 'application/x-newton-compatible-pkg',
	        'pki': 'application/pkixcmp',
	        'pkipath': 'application/pkix-pkipath',
	        'pko': ['application/ynd.ms-pkipko', 'application/vnd.ms-pki.pko'],
	        'pl': ['text/plain', 'text/x-script.perl'],
	        'plb': 'application/vnd.3gpp.pic-bw-large',
	        'plc': 'application/vnd.mobius.plc',
	        'plf': 'application/vnd.pocketlearn',
	        'pls': 'application/pls+xml',
	        'plx': 'application/x-pixclscript',
	        'pm': ['text/x-script.perl-module', 'image/x-xpixmap'],
	        'pm4': 'application/x-pagemaker',
	        'pm5': 'application/x-pagemaker',
	        'pma': 'application/x-perfmon',
	        'pmc': 'application/x-perfmon',
	        'pml': ['application/vnd.ctc-posml', 'application/x-perfmon'],
	        'pmr': 'application/x-perfmon',
	        'pmw': 'application/x-perfmon',
	        'png': 'image/png',
	        'pnm': ['application/x-portable-anymap', 'image/x-portable-anymap'],
	        'portpkg': 'application/vnd.macports.portpkg',
	        'pot': ['application/vnd.ms-powerpoint', 'application/mspowerpoint'],
	        'potm': 'application/vnd.ms-powerpoint.template.macroenabled.12',
	        'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
	        'pov': 'model/x-pov',
	        'ppa': 'application/vnd.ms-powerpoint',
	        'ppam': 'application/vnd.ms-powerpoint.addin.macroenabled.12',
	        'ppd': 'application/vnd.cups-ppd',
	        'ppm': 'image/x-portable-pixmap',
	        'pps': ['application/vnd.ms-powerpoint', 'application/mspowerpoint'],
	        'ppsm': 'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
	        'ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
	        'ppt': ['application/vnd.ms-powerpoint', 'application/mspowerpoint', 'application/powerpoint', 'application/x-mspowerpoint'],
	        'pptm': 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
	        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	        'ppz': 'application/mspowerpoint',
	        'prc': 'application/x-mobipocket-ebook',
	        'pre': ['application/vnd.lotus-freelance', 'application/x-freelance'],
	        'prf': 'application/pics-rules',
	        'prt': 'application/pro_eng',
	        'ps': 'application/postscript',
	        'psb': 'application/vnd.3gpp.pic-bw-small',
	        'psd': ['application/octet-stream', 'image/vnd.adobe.photoshop'],
	        'psf': 'application/x-font-linux-psf',
	        'pskcxml': 'application/pskc+xml',
	        'ptid': 'application/vnd.pvi.ptid1',
	        'pub': 'application/x-mspublisher',
	        'pvb': 'application/vnd.3gpp.pic-bw-var',
	        'pvu': 'paleovu/x-pv',
	        'pwn': 'application/vnd.3m.post-it-notes',
	        'pwz': 'application/vnd.ms-powerpoint',
	        'py': 'text/x-script.phyton',
	        'pya': 'audio/vnd.ms-playready.media.pya',
	        'pyc': 'applicaiton/x-bytecode.python',
	        'pyv': 'video/vnd.ms-playready.media.pyv',
	        'qam': 'application/vnd.epson.quickanime',
	        'qbo': 'application/vnd.intu.qbo',
	        'qcp': 'audio/vnd.qcelp',
	        'qd3': 'x-world/x-3dmf',
	        'qd3d': 'x-world/x-3dmf',
	        'qfx': 'application/vnd.intu.qfx',
	        'qif': 'image/x-quicktime',
	        'qps': 'application/vnd.publishare-delta-tree',
	        'qt': 'video/quicktime',
	        'qtc': 'video/x-qtc',
	        'qti': 'image/x-quicktime',
	        'qtif': 'image/x-quicktime',
	        'qxd': 'application/vnd.quark.quarkxpress',
	        'ra': ['audio/x-realaudio', 'audio/x-pn-realaudio', 'audio/x-pn-realaudio-plugin'],
	        'ram': 'audio/x-pn-realaudio',
	        'rar': 'application/x-rar-compressed',
	        'ras': ['image/cmu-raster', 'application/x-cmu-raster', 'image/x-cmu-raster'],
	        'rast': 'image/cmu-raster',
	        'rcprofile': 'application/vnd.ipunplugged.rcprofile',
	        'rdf': 'application/rdf+xml',
	        'rdz': 'application/vnd.data-vision.rdz',
	        'rep': 'application/vnd.businessobjects',
	        'res': 'application/x-dtbresource+xml',
	        'rexx': 'text/x-script.rexx',
	        'rf': 'image/vnd.rn-realflash',
	        'rgb': 'image/x-rgb',
	        'rif': 'application/reginfo+xml',
	        'rip': 'audio/vnd.rip',
	        'rl': 'application/resource-lists+xml',
	        'rlc': 'image/vnd.fujixerox.edmics-rlc',
	        'rld': 'application/resource-lists-diff+xml',
	        'rm': ['application/vnd.rn-realmedia', 'audio/x-pn-realaudio'],
	        'rmi': 'audio/mid',
	        'rmm': 'audio/x-pn-realaudio',
	        'rmp': ['audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio'],
	        'rms': 'application/vnd.jcp.javame.midlet-rms',
	        'rnc': 'application/relax-ng-compact-syntax',
	        'rng': ['application/ringing-tones', 'application/vnd.nokia.ringing-tone'],
	        'rnx': 'application/vnd.rn-realplayer',
	        'roff': 'application/x-troff',
	        'rp': 'image/vnd.rn-realpix',
	        'rp9': 'application/vnd.cloanto.rp9',
	        'rpm': 'audio/x-pn-realaudio-plugin',
	        'rpss': 'application/vnd.nokia.radio-presets',
	        'rpst': 'application/vnd.nokia.radio-preset',
	        'rq': 'application/sparql-query',
	        'rs': 'application/rls-services+xml',
	        'rsd': 'application/rsd+xml',
	        'rt': ['text/richtext', 'text/vnd.rn-realtext'],
	        'rtf': ['application/rtf', 'text/richtext', 'application/x-rtf'],
	        'rtx': ['text/richtext', 'application/rtf'],
	        'rv': 'video/vnd.rn-realvideo',
	        's': 'text/x-asm',
	        's3m': 'audio/s3m',
	        'saf': 'application/vnd.yamaha.smaf-audio',
	        'saveme': 'application/octet-stream',
	        'sbk': 'application/x-tbook',
	        'sbml': 'application/sbml+xml',
	        'sc': 'application/vnd.ibm.secure-container',
	        'scd': 'application/x-msschedule',
	        'scm': ['application/vnd.lotus-screencam', 'video/x-scm', 'text/x-script.guile', 'application/x-lotusscreencam', 'text/x-script.scheme'],
	        'scq': 'application/scvp-cv-request',
	        'scs': 'application/scvp-cv-response',
	        'sct': 'text/scriptlet',
	        'scurl': 'text/vnd.curl.scurl',
	        'sda': 'application/vnd.stardivision.draw',
	        'sdc': 'application/vnd.stardivision.calc',
	        'sdd': 'application/vnd.stardivision.impress',
	        'sdkm': 'application/vnd.solent.sdkm+xml',
	        'sdml': 'text/plain',
	        'sdp': ['application/sdp', 'application/x-sdp'],
	        'sdr': 'application/sounder',
	        'sdw': 'application/vnd.stardivision.writer',
	        'sea': ['application/sea', 'application/x-sea'],
	        'see': 'application/vnd.seemail',
	        'seed': 'application/vnd.fdsn.seed',
	        'sema': 'application/vnd.sema',
	        'semd': 'application/vnd.semd',
	        'semf': 'application/vnd.semf',
	        'ser': 'application/java-serialized-object',
	        'set': 'application/set',
	        'setpay': 'application/set-payment-initiation',
	        'setreg': 'application/set-registration-initiation',
	        'sfd-hdstx': 'application/vnd.hydrostatix.sof-data',
	        'sfs': 'application/vnd.spotfire.sfs',
	        'sgl': 'application/vnd.stardivision.writer-global',
	        'sgm': ['text/sgml', 'text/x-sgml'],
	        'sgml': ['text/sgml', 'text/x-sgml'],
	        'sh': ['application/x-shar', 'application/x-bsh', 'application/x-sh', 'text/x-script.sh'],
	        'shar': ['application/x-bsh', 'application/x-shar'],
	        'shf': 'application/shf+xml',
	        'shtml': ['text/html', 'text/x-server-parsed-html'],
	        'sid': 'audio/x-psid',
	        'sis': 'application/vnd.symbian.install',
	        'sit': ['application/x-stuffit', 'application/x-sit'],
	        'sitx': 'application/x-stuffitx',
	        'skd': 'application/x-koan',
	        'skm': 'application/x-koan',
	        'skp': ['application/vnd.koan', 'application/x-koan'],
	        'skt': 'application/x-koan',
	        'sl': 'application/x-seelogo',
	        'sldm': 'application/vnd.ms-powerpoint.slide.macroenabled.12',
	        'sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
	        'slt': 'application/vnd.epson.salt',
	        'sm': 'application/vnd.stepmania.stepchart',
	        'smf': 'application/vnd.stardivision.math',
	        'smi': ['application/smil', 'application/smil+xml'],
	        'smil': 'application/smil',
	        'snd': ['audio/basic', 'audio/x-adpcm'],
	        'snf': 'application/x-font-snf',
	        'sol': 'application/solids',
	        'spc': ['text/x-speech', 'application/x-pkcs7-certificates'],
	        'spf': 'application/vnd.yamaha.smaf-phrase',
	        'spl': ['application/futuresplash', 'application/x-futuresplash'],
	        'spot': 'text/vnd.in3d.spot',
	        'spp': 'application/scvp-vp-response',
	        'spq': 'application/scvp-vp-request',
	        'spr': 'application/x-sprite',
	        'sprite': 'application/x-sprite',
	        'src': 'application/x-wais-source',
	        'sru': 'application/sru+xml',
	        'srx': 'application/sparql-results+xml',
	        'sse': 'application/vnd.kodak-descriptor',
	        'ssf': 'application/vnd.epson.ssf',
	        'ssi': 'text/x-server-parsed-html',
	        'ssm': 'application/streamingmedia',
	        'ssml': 'application/ssml+xml',
	        'sst': ['application/vnd.ms-pkicertstore', 'application/vnd.ms-pki.certstore'],
	        'st': 'application/vnd.sailingtracker.track',
	        'stc': 'application/vnd.sun.xml.calc.template',
	        'std': 'application/vnd.sun.xml.draw.template',
	        'step': 'application/step',
	        'stf': 'application/vnd.wt.stf',
	        'sti': 'application/vnd.sun.xml.impress.template',
	        'stk': 'application/hyperstudio',
	        'stl': ['application/vnd.ms-pkistl', 'application/sla', 'application/vnd.ms-pki.stl', 'application/x-navistyle'],
	        'stm': 'text/html',
	        'stp': 'application/step',
	        'str': 'application/vnd.pg.format',
	        'stw': 'application/vnd.sun.xml.writer.template',
	        'sub': 'image/vnd.dvb.subtitle',
	        'sus': 'application/vnd.sus-calendar',
	        'sv4cpio': 'application/x-sv4cpio',
	        'sv4crc': 'application/x-sv4crc',
	        'svc': 'application/vnd.dvb.service',
	        'svd': 'application/vnd.svd',
	        'svf': ['image/vnd.dwg', 'image/x-dwg'],
	        'svg': 'image/svg+xml',
	        'svr': ['x-world/x-svr', 'application/x-world'],
	        'swf': 'application/x-shockwave-flash',
	        'swi': 'application/vnd.aristanetworks.swi',
	        'sxc': 'application/vnd.sun.xml.calc',
	        'sxd': 'application/vnd.sun.xml.draw',
	        'sxg': 'application/vnd.sun.xml.writer.global',
	        'sxi': 'application/vnd.sun.xml.impress',
	        'sxm': 'application/vnd.sun.xml.math',
	        'sxw': 'application/vnd.sun.xml.writer',
	        't': ['text/troff', 'application/x-troff'],
	        'talk': 'text/x-speech',
	        'tao': 'application/vnd.tao.intent-module-archive',
	        'tar': 'application/x-tar',
	        'tbk': ['application/toolbook', 'application/x-tbook'],
	        'tcap': 'application/vnd.3gpp2.tcap',
	        'tcl': ['text/x-script.tcl', 'application/x-tcl'],
	        'tcsh': 'text/x-script.tcsh',
	        'teacher': 'application/vnd.smart.teacher',
	        'tei': 'application/tei+xml',
	        'tex': 'application/x-tex',
	        'texi': 'application/x-texinfo',
	        'texinfo': 'application/x-texinfo',
	        'text': ['application/plain', 'text/plain'],
	        'tfi': 'application/thraud+xml',
	        'tfm': 'application/x-tex-tfm',
	        'tgz': ['application/gnutar', 'application/x-compressed'],
	        'thmx': 'application/vnd.ms-officetheme',
	        'tif': ['image/tiff', 'image/x-tiff'],
	        'tiff': ['image/tiff', 'image/x-tiff'],
	        'tmo': 'application/vnd.tmobile-livetv',
	        'torrent': 'application/x-bittorrent',
	        'tpl': 'application/vnd.groove-tool-template',
	        'tpt': 'application/vnd.trid.tpt',
	        'tr': 'application/x-troff',
	        'tra': 'application/vnd.trueapp',
	        'trm': 'application/x-msterminal',
	        'tsd': 'application/timestamped-data',
	        'tsi': 'audio/tsp-audio',
	        'tsp': ['application/dsptype', 'audio/tsplayer'],
	        'tsv': 'text/tab-separated-values',
	        'ttf': 'application/x-font-ttf',
	        'ttl': 'text/turtle',
	        'turbot': 'image/florian',
	        'twd': 'application/vnd.simtech-mindmapper',
	        'txd': 'application/vnd.genomatix.tuxedo',
	        'txf': 'application/vnd.mobius.txf',
	        'txt': 'text/plain',
	        'ufd': 'application/vnd.ufdl',
	        'uil': 'text/x-uil',
	        'uls': 'text/iuls',
	        'umj': 'application/vnd.umajin',
	        'uni': 'text/uri-list',
	        'unis': 'text/uri-list',
	        'unityweb': 'application/vnd.unity',
	        'unv': 'application/i-deas',
	        'uoml': 'application/vnd.uoml+xml',
	        'uri': 'text/uri-list',
	        'uris': 'text/uri-list',
	        'ustar': ['application/x-ustar', 'multipart/x-ustar'],
	        'utz': 'application/vnd.uiq.theme',
	        'uu': ['application/octet-stream', 'text/x-uuencode'],
	        'uue': 'text/x-uuencode',
	        'uva': 'audio/vnd.dece.audio',
	        'uvh': 'video/vnd.dece.hd',
	        'uvi': 'image/vnd.dece.graphic',
	        'uvm': 'video/vnd.dece.mobile',
	        'uvp': 'video/vnd.dece.pd',
	        'uvs': 'video/vnd.dece.sd',
	        'uvu': 'video/vnd.uvvu.mp4',
	        'uvv': 'video/vnd.dece.video',
	        'vcd': 'application/x-cdlink',
	        'vcf': 'text/x-vcard',
	        'vcg': 'application/vnd.groove-vcard',
	        'vcs': 'text/x-vcalendar',
	        'vcx': 'application/vnd.vcx',
	        'vda': 'application/vda',
	        'vdo': 'video/vdo',
	        'vew': 'application/groupwise',
	        'vis': 'application/vnd.visionary',
	        'viv': ['video/vivo', 'video/vnd.vivo'],
	        'vivo': ['video/vivo', 'video/vnd.vivo'],
	        'vmd': 'application/vocaltec-media-desc',
	        'vmf': 'application/vocaltec-media-file',
	        'voc': ['audio/voc', 'audio/x-voc'],
	        'vos': 'video/vosaic',
	        'vox': 'audio/voxware',
	        'vqe': 'audio/x-twinvq-plugin',
	        'vqf': 'audio/x-twinvq',
	        'vql': 'audio/x-twinvq-plugin',
	        'vrml': ['model/vrml', 'x-world/x-vrml', 'application/x-vrml'],
	        'vrt': 'x-world/x-vrt',
	        'vsd': ['application/vnd.visio', 'application/x-visio'],
	        'vsf': 'application/vnd.vsf',
	        'vst': 'application/x-visio',
	        'vsw': 'application/x-visio',
	        'vtu': 'model/vnd.vtu',
	        'vxml': 'application/voicexml+xml',
	        'w60': 'application/wordperfect6.0',
	        'w61': 'application/wordperfect6.1',
	        'w6w': 'application/msword',
	        'wad': 'application/x-doom',
	        'wav': ['audio/wav', 'audio/x-wav'],
	        'wax': 'audio/x-ms-wax',
	        'wb1': 'application/x-qpro',
	        'wbmp': 'image/vnd.wap.wbmp',
	        'wbs': 'application/vnd.criticaltools.wbs+xml',
	        'wbxml': 'application/vnd.wap.wbxml',
	        'wcm': 'application/vnd.ms-works',
	        'wdb': 'application/vnd.ms-works',
	        'web': 'application/vnd.xara',
	        'weba': 'audio/webm',
	        'webm': 'video/webm',
	        'webp': 'image/webp',
	        'wg': 'application/vnd.pmi.widget',
	        'wgt': 'application/widget',
	        'wiz': 'application/msword',
	        'wk1': 'application/x-123',
	        'wks': 'application/vnd.ms-works',
	        'wm': 'video/x-ms-wm',
	        'wma': 'audio/x-ms-wma',
	        'wmd': 'application/x-ms-wmd',
	        'wmf': ['windows/metafile', 'application/x-msmetafile'],
	        'wml': 'text/vnd.wap.wml',
	        'wmlc': 'application/vnd.wap.wmlc',
	        'wmls': 'text/vnd.wap.wmlscript',
	        'wmlsc': 'application/vnd.wap.wmlscriptc',
	        'wmv': 'video/x-ms-wmv',
	        'wmx': 'video/x-ms-wmx',
	        'wmz': 'application/x-ms-wmz',
	        'woff': 'application/x-font-woff',
	        'word': 'application/msword',
	        'wp': 'application/wordperfect',
	        'wp5': ['application/wordperfect', 'application/wordperfect6.0'],
	        'wp6': 'application/wordperfect',
	        'wpd': ['application/wordperfect', 'application/vnd.wordperfect', 'application/x-wpwin'],
	        'wpl': 'application/vnd.ms-wpl',
	        'wps': 'application/vnd.ms-works',
	        'wq1': 'application/x-lotus',
	        'wqd': 'application/vnd.wqd',
	        'wri': ['application/mswrite', 'application/x-wri', 'application/x-mswrite'],
	        'wrl': ['model/vrml', 'x-world/x-vrml', 'application/x-world'],
	        'wrz': ['model/vrml', 'x-world/x-vrml'],
	        'wsc': 'text/scriplet',
	        'wsdl': 'application/wsdl+xml',
	        'wspolicy': 'application/wspolicy+xml',
	        'wsrc': 'application/x-wais-source',
	        'wtb': 'application/vnd.webturbo',
	        'wtk': 'application/x-wintalk',
	        'wvx': 'video/x-ms-wvx',
	        'x-png': 'image/png',
	        'x3d': 'application/vnd.hzn-3d-crossword',
	        'xaf': 'x-world/x-vrml',
	        'xap': 'application/x-silverlight-app',
	        'xar': 'application/vnd.xara',
	        'xbap': 'application/x-ms-xbap',
	        'xbd': 'application/vnd.fujixerox.docuworks.binder',
	        'xbm': ['image/xbm', 'image/x-xbm', 'image/x-xbitmap'],
	        'xdf': 'application/xcap-diff+xml',
	        'xdm': 'application/vnd.syncml.dm+xml',
	        'xdp': 'application/vnd.adobe.xdp+xml',
	        'xdr': 'video/x-amt-demorun',
	        'xdssc': 'application/dssc+xml',
	        'xdw': 'application/vnd.fujixerox.docuworks',
	        'xenc': 'application/xenc+xml',
	        'xer': 'application/patch-ops-error+xml',
	        'xfdf': 'application/vnd.adobe.xfdf',
	        'xfdl': 'application/vnd.xfdl',
	        'xgz': 'xgl/drawing',
	        'xhtml': 'application/xhtml+xml',
	        'xif': 'image/vnd.xiff',
	        'xl': 'application/excel',
	        'xla': ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel'],
	        'xlam': 'application/vnd.ms-excel.addin.macroenabled.12',
	        'xlb': ['application/excel', 'application/vnd.ms-excel', 'application/x-excel'],
	        'xlc': ['application/vnd.ms-excel', 'application/excel', 'application/x-excel'],
	        'xld': ['application/excel', 'application/x-excel'],
	        'xlk': ['application/excel', 'application/x-excel'],
	        'xll': ['application/excel', 'application/vnd.ms-excel', 'application/x-excel'],
	        'xlm': ['application/vnd.ms-excel', 'application/excel', 'application/x-excel'],
	        'xls': ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel'],
	        'xlsb': 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
	        'xlsm': 'application/vnd.ms-excel.sheet.macroenabled.12',
	        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	        'xlt': ['application/vnd.ms-excel', 'application/excel', 'application/x-excel'],
	        'xltm': 'application/vnd.ms-excel.template.macroenabled.12',
	        'xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
	        'xlv': ['application/excel', 'application/x-excel'],
	        'xlw': ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel'],
	        'xm': 'audio/xm',
	        'xml': ['application/xml', 'text/xml', 'application/atom+xml', 'application/rss+xml'],
	        'xmz': 'xgl/movie',
	        'xo': 'application/vnd.olpc-sugar',
	        'xof': 'x-world/x-vrml',
	        'xop': 'application/xop+xml',
	        'xpi': 'application/x-xpinstall',
	        'xpix': 'application/x-vnd.ls-xpix',
	        'xpm': ['image/xpm', 'image/x-xpixmap'],
	        'xpr': 'application/vnd.is-xpr',
	        'xps': 'application/vnd.ms-xpsdocument',
	        'xpw': 'application/vnd.intercon.formnet',
	        'xslt': 'application/xslt+xml',
	        'xsm': 'application/vnd.syncml+xml',
	        'xspf': 'application/xspf+xml',
	        'xsr': 'video/x-amt-showrun',
	        'xul': 'application/vnd.mozilla.xul+xml',
	        'xwd': ['image/x-xwd', 'image/x-xwindowdump'],
	        'xyz': ['chemical/x-xyz', 'chemical/x-pdb'],
	        'yang': 'application/yang',
	        'yin': 'application/yin+xml',
	        'z': ['application/x-compressed', 'application/x-compress'],
	        'zaz': 'application/vnd.zzazz.deck+xml',
	        'zip': ['application/zip', 'multipart/x-zip', 'application/x-zip-compressed', 'application/x-compressed'],
	        'zir': 'application/vnd.zul',
	        'zmm': 'application/vnd.handheld-entertainment+xml',
	        'zoo': 'application/octet-stream',
	        'zsh': 'text/x-script.zsh'
	    }
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("punycode");

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	// expose to the world
	module.exports = addressparser;
	
	/**
	 * Parses structured e-mail addresses from an address field
	 *
	 * Example:
	 *
	 *    'Name <address@domain>'
	 *
	 * will be converted to
	 *
	 *     [{name: 'Name', address: 'address@domain'}]
	 *
	 * @param {String} str Address field
	 * @return {Array} An array of address objects
	 */
	function addressparser(str) {
	    var tokenizer = new Tokenizer(str);
	    var tokens = tokenizer.tokenize();
	
	    var addresses = [];
	    var address = [];
	    var parsedAddresses = [];
	
	    tokens.forEach(function (token) {
	        if (token.type === 'operator' && (token.value === ',' || token.value === ';')) {
	            if (address.length) {
	                addresses.push(address);
	            }
	            address = [];
	        } else {
	            address.push(token);
	        }
	    });
	
	    if (address.length) {
	        addresses.push(address);
	    }
	
	    addresses.forEach(function (address) {
	        address = _handleAddress(address);
	        if (address.length) {
	            parsedAddresses = parsedAddresses.concat(address);
	        }
	    });
	
	    return parsedAddresses;
	}
	
	/**
	 * Converts tokens for a single address into an address object
	 *
	 * @param {Array} tokens Tokens object
	 * @return {Object} Address object
	 */
	function _handleAddress(tokens) {
	    var token;
	    var isGroup = false;
	    var state = 'text';
	    var address;
	    var addresses = [];
	    var data = {
	        address: [],
	        comment: [],
	        group: [],
	        text: []
	    };
	    var i;
	    var len;
	
	    // Filter out <addresses>, (comments) and regular text
	    for (i = 0, len = tokens.length; i < len; i++) {
	        token = tokens[i];
	        if (token.type === 'operator') {
	            switch (token.value) {
	                case '<':
	                    state = 'address';
	                    break;
	                case '(':
	                    state = 'comment';
	                    break;
	                case ':':
	                    state = 'group';
	                    isGroup = true;
	                    break;
	                default:
	                    state = 'text';
	            }
	        } else if (token.value) {
	            if (state === 'address') {
	                // handle use case where unquoted name includes a "<"
	                // Apple Mail truncates everything between an unexpected < and an address
	                // and so will we
	                token.value = token.value.replace(/^[^<]*<\s*/, '');
	            }
	            data[state].push(token.value);
	        }
	    }
	
	    // If there is no text but a comment, replace the two
	    if (!data.text.length && data.comment.length) {
	        data.text = data.comment;
	        data.comment = [];
	    }
	
	    if (isGroup) {
	        // http://tools.ietf.org/html/rfc2822#appendix-A.1.3
	        data.text = data.text.join(' ');
	        addresses.push({
	            name: data.text || (address && address.name),
	            group: data.group.length ? addressparser(data.group.join(',')) : []
	        });
	    } else {
	        // If no address was found, try to detect one from regular text
	        if (!data.address.length && data.text.length) {
	            for (i = data.text.length - 1; i >= 0; i--) {
	                if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
	                    data.address = data.text.splice(i, 1);
	                    break;
	                }
	            }
	
	            var _regexHandler = function (address) {
	                if (!data.address.length) {
	                    data.address = [address.trim()];
	                    return ' ';
	                } else {
	                    return address;
	                }
	            };
	
	            // still no address
	            if (!data.address.length) {
	                for (i = data.text.length - 1; i >= 0; i--) {
	                    // fixed the regex to parse email address correctly when email address has more than one @
	                    data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
	                    if (data.address.length) {
	                        break;
	                    }
	                }
	            }
	        }
	
	        // If there's still is no text but a comment exixts, replace the two
	        if (!data.text.length && data.comment.length) {
	            data.text = data.comment;
	            data.comment = [];
	        }
	
	        // Keep only the first address occurence, push others to regular text
	        if (data.address.length > 1) {
	            data.text = data.text.concat(data.address.splice(1));
	        }
	
	        // Join values with spaces
	        data.text = data.text.join(' ');
	        data.address = data.address.join(' ');
	
	        if (!data.address && isGroup) {
	            return [];
	        } else {
	            address = {
	                address: data.address || data.text || '',
	                name: data.text || data.address || ''
	            };
	
	            if (address.address === address.name) {
	                if ((address.address || '').match(/@/)) {
	                    address.name = '';
	                } else {
	                    address.address = '';
	                }
	
	            }
	
	            addresses.push(address);
	        }
	    }
	
	    return addresses;
	}
	
	/**
	 * Creates a Tokenizer object for tokenizing address field strings
	 *
	 * @constructor
	 * @param {String} str Address field string
	 */
	function Tokenizer(str) {
	    this.str = (str || '').toString();
	    this.operatorCurrent = '';
	    this.operatorExpecting = '';
	    this.node = null;
	    this.escaped = false;
	
	    this.list = [];
	}
	
	/**
	 * Operator tokens and which tokens are expected to end the sequence
	 */
	Tokenizer.prototype.operators = {
	    '"': '"',
	    '(': ')',
	    '<': '>',
	    ',': '',
	    ':': ';',
	    // Semicolons are not a legal delimiter per the RFC2822 grammar other
	    // than for terminating a group, but they are also not valid for any
	    // other use in this context.  Given that some mail clients have
	    // historically allowed the semicolon as a delimiter equivalent to the
	    // comma in their UI, it makes sense to treat them the same as a comma
	    // when used outside of a group.
	    ';': ''
	};
	
	/**
	 * Tokenizes the original input string
	 *
	 * @return {Array} An array of operator|text tokens
	 */
	Tokenizer.prototype.tokenize = function () {
	    var chr, list = [];
	    for (var i = 0, len = this.str.length; i < len; i++) {
	        chr = this.str.charAt(i);
	        this.checkChar(chr);
	    }
	
	    this.list.forEach(function (node) {
	        node.value = (node.value || '').toString().trim();
	        if (node.value) {
	            list.push(node);
	        }
	    });
	
	    return list;
	};
	
	/**
	 * Checks if a character is an operator or text and acts accordingly
	 *
	 * @param {String} chr Character from the address field
	 */
	Tokenizer.prototype.checkChar = function (chr) {
	    if ((chr in this.operators || chr === '\\') && this.escaped) {
	        this.escaped = false;
	    } else if (this.operatorExpecting && chr === this.operatorExpecting) {
	        this.node = {
	            type: 'operator',
	            value: chr
	        };
	        this.list.push(this.node);
	        this.node = null;
	        this.operatorExpecting = '';
	        this.escaped = false;
	        return;
	    } else if (!this.operatorExpecting && chr in this.operators) {
	        this.node = {
	            type: 'operator',
	            value: chr
	        };
	        this.list.push(this.node);
	        this.node = null;
	        this.operatorExpecting = this.operators[chr];
	        this.escaped = false;
	        return;
	    }
	
	    if (!this.escaped && chr === '\\') {
	        this.escaped = true;
	        return;
	    }
	
	    if (!this.node) {
	        this.node = {
	            type: 'text',
	            value: ''
	        };
	        this.list.push(this.node);
	    }
	
	    if (this.escaped && chr !== '\\') {
	        this.node.value += '\\';
	    }
	
	    this.node.value += chr;
	    this.escaped = false;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var http = __webpack_require__(57);
	var https = __webpack_require__(58);
	var urllib = __webpack_require__(59);
	var zlib = __webpack_require__(60);
	var PassThrough = __webpack_require__(50).PassThrough;
	var Cookies = __webpack_require__(61);
	
	var MAX_REDIRECTS = 5;
	
	module.exports = function (url, options) {
	    return fetch(url, options);
	};
	
	module.exports.Cookies = Cookies;
	
	function fetch(url, options) {
	    options = options || {};
	
	    options.fetchRes = options.fetchRes || new PassThrough();
	    options.cookies = options.cookies || new Cookies();
	    options.redirects = options.redirects || 0;
	    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
	
	    if (options.cookie) {
	        [].concat(options.cookie || []).forEach(function (cookie) {
	            options.cookies.set(cookie, url);
	        });
	        options.cookie = false;
	    }
	
	    var fetchRes = options.fetchRes;
	    var parsed = urllib.parse(url);
	    var method = (options.method || '').toString().trim().toUpperCase() || 'GET';
	    var finished = false;
	    var cookies;
	    var body;
	
	    var handler = parsed.protocol === 'https:' ? https : http;
	
	    var headers = {
	        'accept-encoding': 'gzip,deflate'
	    };
	
	    Object.keys(options.headers || {}).forEach(function (key) {
	        headers[key.toLowerCase().trim()] = options.headers[key];
	    });
	
	    if (options.userAgent) {
	        headers['User-Agent'] = options.userAgent;
	    }
	
	    if (parsed.auth) {
	        headers.Authorization = 'Basic ' + new Buffer(parsed.auth).toString('base64');
	    }
	
	    if ((cookies = options.cookies.get(url))) {
	        headers.cookie = cookies;
	    }
	
	    if (options.body) {
	        if (options.contentType !== false) {
	            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
	        }
	
	        if (typeof options.body.pipe === 'function') {
	            // it's a stream
	            headers['Transfer-Encoding'] = 'chunked';
	            body = options.body;
	            body.on('error', function (err) {
	                if (finished) {
	                    return;
	                }
	                finished = true;
	                fetchRes.emit('error', err);
	            });
	        } else {
	            if (options.body instanceof Buffer) {
	                body = options.body;
	            } else if (typeof options.body === 'object') {
	                body = new Buffer(Object.keys(options.body).map(function (key) {
	                    var value = options.body[key].toString().trim();
	                    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
	                }).join('&'));
	            } else {
	                body = new Buffer(options.body.toString().trim());
	            }
	
	            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
	            headers['Content-Length'] = body.length;
	        }
	        // if method is not provided, use POST instead of GET
	        method = (options.method || '').toString().trim().toUpperCase() || 'POST';
	    }
	
	    var req;
	    var reqOptions = {
	        method: method,
	        host: parsed.hostname,
	        path: parsed.path,
	        port: parsed.port ? parsed.port : (parsed.protocol === 'https:' ? 443 : 80),
	        headers: headers,
	        rejectUnauthorized: false,
	        agent: false
	    };
	
	    if (options.tls) {
	        Object.keys(options.tls).forEach(function (key) {
	            reqOptions[key] = options.tls[key];
	        });
	    }
	
	    try {
	        req = handler.request(reqOptions);
	    } catch (E) {
	        finished = true;
	        setImmediate(function () {
	            fetchRes.emit('error', E);
	        });
	        return fetchRes;
	    }
	
	    if (options.timeout) {
	        req.setTimeout(options.timeout, function () {
	            if (finished) {
	                return;
	            }
	            finished = true;
	            req.abort();
	            fetchRes.emit('error', new Error('Request Tiemout'));
	        });
	    }
	
	    req.on('error', function (err) {
	        if (finished) {
	            return;
	        }
	        finished = true;
	        fetchRes.emit('error', err);
	    });
	
	    req.on('response', function (res) {
	        var inflate;
	
	        if (finished) {
	            return;
	        }
	
	        switch (res.headers['content-encoding']) {
	            case 'gzip':
	            case 'deflate':
	                inflate = zlib.createUnzip();
	                break;
	        }
	
	        if (res.headers['set-cookie']) {
	            [].concat(res.headers['set-cookie'] || []).forEach(function (cookie) {
	                options.cookies.set(cookie, url);
	            });
	        }
	
	        if ([301, 302, 303, 307, 308].indexOf(res.statusCode) >= 0 && res.headers.location) {
	            // redirect
	            options.redirects++;
	            if (options.redirects > options.maxRedirects) {
	                finished = true;
	                fetchRes.emit('error', new Error('Maximum redirect count exceeded'));
	                req.abort();
	                return;
	            }
	            return fetch(urllib.resolve(url, res.headers.location), options);
	        }
	
	        if (res.statusCode >= 300) {
	            finished = true;
	            fetchRes.emit('error', new Error('Invalid status code ' + res.statusCode));
	            req.abort();
	            return;
	        }
	
	        res.on('error', function (err) {
	            if (finished) {
	                return;
	            }
	            finished = true;
	            fetchRes.emit('error', err);
	            req.abort();
	        });
	
	        if (inflate) {
	            res.pipe(inflate).pipe(fetchRes);
	            inflate.on('error', function (err) {
	                if (finished) {
	                    return;
	                }
	                finished = true;
	                fetchRes.emit('error', err);
	                req.abort();
	            });
	        } else {
	            res.pipe(fetchRes);
	        }
	    });
	
	    setImmediate(function () {
	        if (body) {
	            try {
	                if (typeof body.pipe === 'function') {
	                    return body.pipe(req);
	                } else {
	                    req.write(body);
	                }
	            } catch (err) {
	                finished = true;
	                fetchRes.emit('error', err);
	                return;
	            }
	        }
	        req.end();
	    });
	
	    return fetchRes;
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("zlib");

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// module to handle cookies
	
	var urllib = __webpack_require__(59);
	
	var SESSION_TIMEOUT = 1800; // 30 min
	
	module.exports = Cookies;
	
	/**
	 * Creates a biskviit cookie jar for managing cookie values in memory
	 *
	 * @constructor
	 * @param {Object} [options] Optional options object
	 */
	function Cookies(options) {
	    this.options = options || {};
	    this.cookies = [];
	}
	
	/**
	 * Stores a cookie string to the cookie storage
	 *
	 * @param {String} cookieStr Value from the 'Set-Cookie:' header
	 * @param {String} url Current URL
	 */
	Cookies.prototype.set = function (cookieStr, url) {
	    var urlparts = urllib.parse(url || '');
	    var cookie = this.parse(cookieStr);
	    var domain;
	
	    if (cookie.domain) {
	        domain = cookie.domain.replace(/^\./, '');
	
	        // do not allow cross origin cookies
	        if (
	            // can't be valid if the requested domain is shorter than current hostname
	            urlparts.hostname.length < domain.length ||
	
	            // prefix domains with dot to be sure that partial matches are not used
	            ('.' + urlparts.hostname).substr(-domain.length + 1) !== ('.' + domain)) {
	            cookie.domain = urlparts.hostname;
	        }
	    } else {
	        cookie.domain = urlparts.hostname;
	    }
	
	    if (!cookie.path) {
	        cookie.path = this.getPath(urlparts.pathname);
	    }
	
	    // if no expire date, then use sessionTimeout value
	    if (!cookie.expires) {
	        cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
	    }
	
	    return this.add(cookie);
	};
	
	/**
	 * Returns cookie string for the 'Cookie:' header.
	 *
	 * @param {String} url URL to check for
	 * @returns {String} Cookie header or empty string if no matches were found
	 */
	Cookies.prototype.get = function (url) {
	    return this.list(url).map(function (cookie) {
	        return cookie.name + '=' + cookie.value;
	    }).join('; ');
	};
	
	/**
	 * Lists all valied cookie objects for the specified URL
	 *
	 * @param {String} url URL to check for
	 * @returns {Array} An array of cookie objects
	 */
	Cookies.prototype.list = function (url) {
	    var result = [];
	    var i;
	    var cookie;
	
	    for (i = this.cookies.length - 1; i >= 0; i--) {
	        cookie = this.cookies[i];
	
	        if (this.isExpired(cookie)) {
	            this.cookies.splice(i, i);
	            continue;
	        }
	
	        if (this.match(cookie, url)) {
	            result.unshift(cookie);
	        }
	    }
	
	    return result;
	};
	
	/**
	 * Parses cookie string from the 'Set-Cookie:' header
	 *
	 * @param {String} cookieStr String from the 'Set-Cookie:' header
	 * @returns {Object} Cookie object
	 */
	Cookies.prototype.parse = function (cookieStr) {
	    var cookie = {};
	
	    (cookieStr || '').toString().split(';').forEach(function (cookiePart) {
	        var valueParts = cookiePart.split('=');
	        var key = valueParts.shift().trim().toLowerCase();
	        var value = valueParts.join('=').trim();
	        var domain;
	
	        if (!key) {
	            // skip empty parts
	            return;
	        }
	
	        switch (key) {
	
	            case 'expires':
	                value = new Date(value);
	                // ignore date if can not parse it
	                if (value.toString() !== 'Invalid Date') {
	                    cookie.expires = value;
	                }
	                break;
	
	            case 'path':
	                cookie.path = value;
	                break;
	
	            case 'domain':
	                domain = value.toLowerCase();
	                if (domain.length && domain.charAt(0) !== '.') {
	                    domain = '.' + domain; // ensure preceeding dot for user set domains
	                }
	                cookie.domain = domain;
	                break;
	
	            case 'max-age':
	                cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
	                break;
	
	            case 'secure':
	                cookie.secure = true;
	                break;
	
	            case 'httponly':
	                cookie.httponly = true;
	                break;
	
	            default:
	                if (!cookie.name) {
	                    cookie.name = key;
	                    cookie.value = value;
	                }
	        }
	    });
	
	    return cookie;
	};
	
	/**
	 * Checks if a cookie object is valid for a specified URL
	 *
	 * @param {Object} cookie Cookie object
	 * @param {String} url URL to check for
	 * @returns {Boolean} true if cookie is valid for specifiec URL
	 */
	Cookies.prototype.match = function (cookie, url) {
	    var urlparts = urllib.parse(url || '');
	
	    // check if hostname matches
	    // .foo.com also matches subdomains, foo.com does not
	    if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== '.' || ('.' + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
	        return false;
	    }
	
	    // check if path matches
	    var path = this.getPath(urlparts.pathname);
	    if (path.substr(0, cookie.path.length) !== cookie.path) {
	        return false;
	    }
	
	    // check secure argument
	    if (cookie.secure && urlparts.protocol !== 'https:') {
	        return false;
	    }
	
	    return true;
	};
	
	/**
	 * Adds (or updates/removes if needed) a cookie object to the cookie storage
	 *
	 * @param {Object} cookie Cookie value to be stored
	 */
	Cookies.prototype.add = function (cookie) {
	    var i;
	    var len;
	
	    // nothing to do here
	    if (!cookie || !cookie.name) {
	        return false;
	    }
	
	    // overwrite if has same params
	    for (i = 0, len = this.cookies.length; i < len; i++) {
	        if (this.compare(this.cookies[i], cookie)) {
	
	            // check if the cookie needs to be removed instead
	            if (this.isExpired(cookie)) {
	                this.cookies.splice(i, 1); // remove expired/unset cookie
	                return false;
	            }
	
	            this.cookies[i] = cookie;
	            return true;
	        }
	    }
	
	    // add as new if not already expired
	    if (!this.isExpired(cookie)) {
	        this.cookies.push(cookie);
	    }
	
	    return true;
	};
	
	/**
	 * Checks if two cookie objects are the same
	 *
	 * @param {Object} a Cookie to check against
	 * @param {Object} b Cookie to check against
	 * @returns {Boolean} True, if the cookies are the same
	 */
	Cookies.prototype.compare = function (a, b) {
	    return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
	};
	
	/**
	 * Checks if a cookie is expired
	 *
	 * @param {Object} cookie Cookie object to check against
	 * @returns {Boolean} True, if the cookie is expired
	 */
	Cookies.prototype.isExpired = function (cookie) {
	    return (cookie.expires && cookie.expires < new Date()) || !cookie.value;
	};
	
	/**
	 * Returns normalized cookie path for an URL path argument
	 *
	 * @param {String} pathname
	 * @returns {String} Normalized path
	 */
	Cookies.prototype.getPath = function (pathname) {
	    var path = (pathname || '/').split('/');
	    path.pop(); // remove filename part
	    path = path.join('/').trim();
	
	    // ensure path prefix /
	    if (path.charAt(0) !== '/') {
	        path = '/' + path;
	    }
	
	    // ensure path suffix /
	    if (path.substr(-1) !== '/') {
	        path += '/';
	    }
	
	    return path;
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var urllib = __webpack_require__(59);
	var util = __webpack_require__(51);
	var fs = __webpack_require__(18);
	var fetch = __webpack_require__(56);
	
	/**
	 * Parses connection url to a structured configuration object
	 *
	 * @param {String} str Connection url
	 * @return {Object} Configuration object
	 */
	module.exports.parseConnectionUrl = function (str) {
	    str = str || '';
	    var options = {};
	
	    [urllib.parse(str, true)].forEach(function (url) {
	        var auth;
	
	        switch (url.protocol) {
	            case 'smtp:':
	                options.secure = false;
	                break;
	            case 'smtps:':
	                options.secure = true;
	                break;
	            case 'direct:':
	                options.direct = true;
	                break;
	        }
	
	        if (!isNaN(url.port) && Number(url.port)) {
	            options.port = Number(url.port);
	        }
	
	        if (url.hostname) {
	            options.host = url.hostname;
	        }
	
	        if (url.auth) {
	            auth = url.auth.split(':');
	
	            if (!options.auth) {
	                options.auth = {};
	            }
	
	            options.auth.user = auth.shift();
	            options.auth.pass = auth.join(':');
	        }
	
	        Object.keys(url.query || {}).forEach(function (key) {
	            var obj = options;
	            var lKey = key;
	            var value = url.query[key];
	
	            if (!isNaN(value)) {
	                value = Number(value);
	            }
	
	            switch (value) {
	                case 'true':
	                    value = true;
	                    break;
	                case 'false':
	                    value = false;
	                    break;
	            }
	
	            // tls is nested object
	            if (key.indexOf('tls.') === 0) {
	                lKey = key.substr(4);
	                if (!options.tls) {
	                    options.tls = {};
	                }
	                obj = options.tls;
	            } else if (key.indexOf('.') >= 0) {
	                // ignore nested properties besides tls
	                return;
	            }
	
	            if (!(lKey in obj)) {
	                obj[lKey] = value;
	            }
	        });
	    });
	
	    return options;
	};
	
	/**
	 * Returns a bunyan-compatible logger interface. Uses either provided logger or
	 * creates a default console logger
	 *
	 * @param {Object} [options] Options object that might include 'logger' value
	 * @return {Object} bunyan compatible logger
	 */
	module.exports.getLogger = function (options) {
	    options = options || {};
	
	    if (!options.logger) {
	        // use vanity logger
	        return {
	            info: function () {},
	            debug: function () {},
	            error: function () {}
	        };
	    }
	
	    if (options.logger === true) {
	        // create console logger
	        return createDefaultLogger();
	    }
	
	    // return whatever was passed
	    return options.logger;
	};
	
	/**
	 * Wrapper for creating a callback than either resolves or rejects a promise
	 * based on input
	 *
	 * @param {Function} resolve Function to run if callback is called
	 * @param {Function} reject Function to run if callback ends with an error
	 */
	module.exports.callbackPromise = function (resolve, reject) {
	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        var err = args.shift();
	        if (err) {
	            reject(err);
	        } else {
	            resolve.apply(null, args);
	        }
	    };
	};
	
	/**
	 * Resolves a String or a Buffer value for content value. Useful if the value
	 * is a Stream or a file or an URL. If the value is a Stream, overwrites
	 * the stream object with the resolved value (you can't stream a value twice).
	 *
	 * This is useful when you want to create a plugin that needs a content value,
	 * for example the `html` or `text` value as a String or a Buffer but not as
	 * a file path or an URL.
	 *
	 * @param {Object} data An object or an Array you want to resolve an element for
	 * @param {String|Number} key Property name or an Array index
	 * @param {Function} callback Callback function with (err, value)
	 */
	module.exports.resolveContent = function (data, key, callback) {
	    var promise;
	
	    if (!callback && typeof Promise === 'function') {
	        promise = new Promise(function (resolve, reject) {
	            callback = module.exports.callbackPromise(resolve, reject);
	        });
	    }
	
	    var content = data && data[key] && data[key].content || data[key];
	    var contentStream;
	    var encoding = (typeof data[key] === 'object' && data[key].encoding || 'utf8')
	        .toString()
	        .toLowerCase()
	        .replace(/[-_\s]/g, '');
	
	    if (!content) {
	        return callback(null, content);
	    }
	
	    if (typeof content === 'object') {
	        if (typeof content.pipe === 'function') {
	            return resolveStream(content, function (err, value) {
	                if (err) {
	                    return callback(err);
	                }
	                // we can't stream twice the same content, so we need
	                // to replace the stream object with the streaming result
	                data[key] = value;
	                callback(null, value);
	            });
	        } else if (/^https?:\/\//i.test(content.path || content.href)) {
	            contentStream = fetch(content.path || content.href);
	            return resolveStream(contentStream, callback);
	        } else if (/^data:/i.test(content.path || content.href)) {
	            var parts = (content.path || content.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
	            if (!parts) {
	                return callback(null, new Buffer(0));
	            }
	            return callback(null, /\bbase64$/i.test(parts[1]) ? new Buffer(parts[2], 'base64') : new Buffer(decodeURIComponent(parts[2])));
	        } else if (content.path) {
	            return resolveStream(fs.createReadStream(content.path), callback);
	        }
	    }
	
	    if (typeof data[key].content === 'string' && ['utf8', 'usascii', 'ascii'].indexOf(encoding) < 0) {
	        content = new Buffer(data[key].content, encoding);
	    }
	
	    // default action, return as is
	    setImmediate(callback.bind(null, null, content));
	
	    return promise;
	};
	
	/**
	 * Streams a stream value into a Buffer
	 *
	 * @param {Object} stream Readable stream
	 * @param {Function} callback Callback function with (err, value)
	 */
	function resolveStream(stream, callback) {
	    var responded = false;
	    var chunks = [];
	    var chunklen = 0;
	
	    stream.on('error', function (err) {
	        if (responded) {
	            return;
	        }
	
	        responded = true;
	        callback(err);
	    });
	
	    stream.on('readable', function () {
	        var chunk;
	        while ((chunk = stream.read()) !== null) {
	            chunks.push(chunk);
	            chunklen += chunk.length;
	        }
	    });
	
	    stream.on('end', function () {
	        if (responded) {
	            return;
	        }
	        responded = true;
	
	        var value;
	
	        try {
	            value = Buffer.concat(chunks, chunklen);
	        } catch (E) {
	            return callback(E);
	        }
	        callback(null, value);
	    });
	}
	
	/**
	 * Generates a bunyan-like logger that prints to console
	 *
	 * @returns {Object} Bunyan logger instance
	 */
	function createDefaultLogger() {
	
	    var logger = {
	        _print: function ( /* level, message */ ) {
	            var args = Array.prototype.slice.call(arguments);
	            var level = args.shift();
	            var message;
	
	            if (args.length > 1) {
	                message = util.format.apply(util, args);
	            } else {
	                message = args.shift();
	            }
	
	            console.log('[%s] %s: %s',
	                new Date().toISOString().substr(0, 19).replace(/T/, ' '),
	                level.toUpperCase(),
	                message);
	        }
	    };
	
	    logger.info = logger._print.bind(null, 'info');
	    logger.debug = logger._print.bind(null, 'debug');
	    logger.error = logger._print.bind(null, 'error');
	
	    return logger;
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createQueue = __webpack_require__(67);
	var SMTPConnection = __webpack_require__(68);
	var dns = __webpack_require__(74);
	var net = __webpack_require__(70);
	var os = __webpack_require__(63);
	var util = __webpack_require__(51);
	var packageData = __webpack_require__(75);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var shared = __webpack_require__(65);
	
	// Expose to the world
	module.exports = function (options) {
	    return new DirectMailer(options);
	};
	
	/**
	 * Creates a new DirectMailer instance. Provides method 'send' to queue
	 * outgoing e-mails. The queue is processed in the background.
	 *
	 * @constructor
	 * @param {Object} [options] Optional options object
	 */
	function DirectMailer(options) {
	    EventEmitter.call(this);
	    this.options = options || {};
	    this._queue = createQueue();
	    this._started = false;
	    this._lastId = 0;
	
	    if (options && typeof options.getSocket === 'function') {
	        this.getSocket = options.getSocket;
	    }
	
	    this.logger = shared.getLogger(this.options);
	
	    // temporary object
	    var connection = new SMTPConnection({});
	
	    this.name = 'SMTP (direct)';
	    this.version = packageData.version + '[client:' + connection.version + ']';
	}
	util.inherits(DirectMailer, EventEmitter);
	
	// Adds a dynamic property 'length'
	Object.defineProperty(DirectMailer.prototype, 'length', {
	    get: function () {
	        return this._queue._instantQueue.length + this._queue._sortedQueue.length;
	    }
	});
	
	/**
	 * Placeholder function for creating proxy sockets. This method immediatelly returns
	 * without a socket
	 *
	 * @param {Object} options Connection options
	 * @param {Function} callback Callback function to run with the socket keys
	 */
	DirectMailer.prototype.getSocket = function (options, callback) {
	    // return immediatelly
	    return callback(null, false);
	};
	
	/**
	 * Adds an outgoing message to the queue. Recipient addresses are sorted
	 * by the receiving domain and for every domain, a copy of the message is queued.
	 *
	 * If input is deemed invalid, an error is thrown, so be ready to catch these
	 * when calling directmail.send(...)
	 *
	 * @param {Object} mail Mail object
	 * @param {Function} callback Callback function
	 */
	DirectMailer.prototype.send = function (mail, callback) {
	
	    var envelope = mail.message.getEnvelope();
	    var domainEnvelopes = {};
	
	    if (!envelope.from) {
	        return callback(new Error('"From" address missing'));
	    }
	
	    envelope.to = [].concat(envelope.to || []);
	
	    if (!envelope.to.length) {
	        return callback('"Recipients" addresses missing');
	    }
	
	    // We cant't run existing streams more than once so we need to change these
	    // to buffers. Filenames, URLs etc are not affected – for every
	    // message copy a new file stream will be created
	    this._clearStreams(mail, function (err) {
	        if (err) {
	            return callback(err);
	        }
	
	        this._formatMessage(mail.message);
	
	        envelope.to.forEach(function (recipient) {
	            recipient = (recipient || '').toString();
	
	            var domain = (recipient.split('@').pop() || '').toLowerCase().trim();
	
	            if (!domainEnvelopes[domain]) {
	                domainEnvelopes[domain] = {
	                    from: envelope.from,
	                    to: [recipient]
	                };
	            } else if (domainEnvelopes[domain].to.indexOf(recipient) < 0) {
	                domainEnvelopes[domain].to.push(recipient);
	            }
	        });
	
	        var returned = 0;
	        var domains = Object.keys(domainEnvelopes);
	        var combinedInfo = {
	            accepted: [],
	            rejected: [],
	            pending: [],
	            errors: [],
	            envelope: mail.message.getEnvelope()
	        };
	
	        domains.forEach((function (domain) {
	            var called = false;
	            var id = ++this._lastId;
	            var item = {
	                envelope: domainEnvelopes[domain],
	                data: mail.data,
	                message: mail.message,
	                domain: domain,
	                id: id,
	                callback: function (err, info) {
	                    if (called) {
	                        this.logger.info('Callback for #%s already called. Updated values: %s', id, JSON.stringify(err || info));
	                        return;
	                    }
	
	                    called = true;
	                    returned++;
	
	                    if (err) {
	                        combinedInfo.errors.push(err);
	                        if (err.recipients) {
	                            combinedInfo.rejected = combinedInfo.rejected.concat(err.recipients || []);
	                        }
	                    } else if (info) {
	                        combinedInfo.accepted = combinedInfo.accepted.concat(info.accepted || []);
	                        combinedInfo.rejected = combinedInfo.rejected.concat(info.rejected || []);
	                        combinedInfo.pending = combinedInfo.pending.concat(info.pending || []);
	                        combinedInfo.messageId = info.messageId;
	                    }
	
	                    if (returned >= domains.length) {
	                        if (combinedInfo.errors.length === domains.length) {
	                            var error = new Error('Sending failed');
	                            error.errors = combinedInfo.errors;
	                            return callback(error);
	                        } else {
	                            return callback(null, combinedInfo);
	                        }
	                    }
	                }.bind(this)
	            };
	
	            this._queue.insert(item);
	        }).bind(this));
	
	        // start send loop if needed
	        if (!this._started) {
	            this._started = true;
	
	            // do not start the loop before current execution context is finished
	            setImmediate(this._loop.bind(this));
	        }
	
	    }.bind(this));
	};
	
	/**
	 * Looping function to fetch a message from the queue and send it.
	 */
	DirectMailer.prototype._loop = function () {
	
	    // callback is fired when a message is added to the queue
	    this._queue.get((function (data) {
	
	        this.logger.info('Retrieved message #%s from the queue, resolving %s', data.id, data.domain);
	
	        // Resolve destination MX server
	        this._resolveMx(data.domain, (function (err, list) {
	
	            if (err) {
	                this.logger.info('Resolving %s for #%s failed', data.domain, data.id);
	                this.logger.info(err);
	            } else if (!list || !list.length) {
	                this.logger.info('Could not resolve any MX servers for %s', data.domain);
	            }
	            if (err || !list || !list.length) {
	                data.callback(err || new Error('Could not resolve MX for ' + data.domain));
	                return setImmediate(this._loop.bind(this));
	            }
	
	            // Sort MX list by priority field
	            list.sort(function (a, b) {
	                return (a && a.priority || 0) - (b && b.priority || 0);
	            });
	
	            // Use the first server on the list
	            var exchanges = list.map(function (item) {
	                return item.exchange;
	            });
	
	            // Try to send the message
	            this._process([].concat(exchanges), data, (function (err, response) {
	                if (err) {
	                    this.logger.info('Failed processing message #%s', data.id);
	                } else {
	                    this.logger.info('Server responded for #%s: %s', data.id, JSON.stringify(response));
	                }
	
	                if (err) {
	                    if (err.responseCode && err.responseCode >= 500) {
	                        err.domain = data.domain;
	                        err.exchange = exchanges[0];
	                        err.recipients = data.envelope.to;
	                        data.callback(err);
	                    } else {
	                        data.replies = (data.replies || 0) + 1;
	                        if (data.replies <= 5) {
	                            this._queue.insert(data, this.options.retryDelay || data.replies * 15 * 60 * 1000);
	                            this.logger.info('Message #%s requeued', data.id);
	                            data.callback(null, {
	                                pending: {
	                                    domain: data.domain,
	                                    exchange: exchanges[0],
	                                    recipients: data.envelope.to,
	                                    response: err.response
	                                }
	                            });
	                        } else {
	                            err.domain = data.domain;
	                            err.exchange = exchanges[0];
	                            err.recipients = data.envelope.to;
	                            data.callback(err);
	                        }
	                    }
	                } else {
	                    data.callback(null, response);
	                }
	
	                setImmediate(this._loop.bind(this));
	            }).bind(this));
	        }).bind(this));
	    }).bind(this));
	};
	
	/**
	 * Sends a message to provided MX server
	 *
	 * @param {Array} exchanges Priority list of MX servers
	 * @param {Object} data Message object
	 * @param {Function} callback Callback to run once the message is either sent or sending fails
	 */
	DirectMailer.prototype._process = function (exchanges, data, callback) {
	    var exchange = exchanges[0];
	
	    this.logger.info('%s resolved to %s for #%s', data.domain, exchange, data.id);
	
	    this.logger.info('Connecting to %s:%s for message #%s %s STARTTLS', exchange, this.options.port || 25, data.id, data.ignoreTLS ? 'without' : 'with');
	
	    var options = {
	        host: exchange,
	        port: this.options.port || 25,
	        requireTLS: !data.ignoreTLS,
	        ignoreTLS: data.ignoreTLS,
	        tls: {
	            rejectUnauthorized: false
	        }
	    };
	
	    // Add options from DirectMailer options to simplesmtp client
	    Object.keys(this.options).forEach((function (key) {
	        options[key] = this.options[key];
	    }).bind(this));
	
	    this.getSocket(options, function (err, socketOptions) {
	        if (err) {
	            // try next host
	            exchanges.shift();
	            if (!exchanges.length) {
	                // no more hosts to try
	                return callback(err);
	            }
	            this.logger.info('Failed to connect to %s, trying next MX', exchange);
	            return this._process(exchanges, data, callback);
	        }
	
	        if (socketOptions && socketOptions.connection) {
	            this.logger.info('Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
	            Object.keys(socketOptions).forEach(function (key) {
	                options[key] = socketOptions[key];
	            });
	        }
	
	        var connection = new SMTPConnection(options);
	        var returned = false;
	        var connected = false;
	
	        connection.once('error', function (err) {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            if (err.code === 'ETLS') {
	                // STARTTLS failed, try again, this time without encryption
	                data.ignoreTLS = true;
	                return this._process(exchanges, data, callback);
	            }
	            if (!connected) {
	                // try next host
	                exchanges.shift();
	                if (!exchanges.length) {
	                    // no more hosts to try
	                    return callback(err);
	                }
	                this.logger.info('Failed to connect to %s, trying next MX', exchange);
	                return this._process(exchanges, data, callback);
	            }
	            return callback(err);
	        }.bind(this));
	
	        var sendMessage = function () {
	            var messageId = (data.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
	            var recipients = [].concat(data.envelope.to || []);
	            if (recipients.length > 3) {
	                recipients.push('...and ' + recipients.splice(2).length + ' more');
	            }
	
	            this.logger.info('Sending message <%s> to <%s>', messageId, recipients.join(', '));
	            connection.send(data.envelope, data.message.createReadStream(), function (err, info) {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	
	                connection.close();
	                if (err) {
	                    return callback(err);
	                }
	
	                info.messageId = (data.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
	                return callback(null, info);
	            });
	        }.bind(this);
	
	        connection.connect(function () {
	            connected = true;
	            if (returned) {
	                return;
	            }
	            sendMessage();
	        }.bind(this));
	    }.bind(this));
	};
	
	/**
	 * Adds additional headers to the outgoing message
	 *
	 * @param {Object} message BuildMail message object
	 */
	DirectMailer.prototype._formatMessage = function (message) {
	    var hostname = this._resolveHostname(this.options.name);
	
	    // set the first header as 'Received:'
	    message._headers.unshift({
	        key: 'Received',
	        value: 'from localhost (127.0.0.1) by ' + hostname + ' with SMTP; ' + Date()
	    });
	};
	
	/**
	 * Detects stream objects and resolves these to buffers before sending. File paths,
	 * urls etc. are not affected.
	 *
	 * @param {Object} message BuildMail message object
	 * @param {Function} callback Callback to run
	 */
	DirectMailer.prototype._clearStreams = function (mail, callback) {
	    var streamNodes = [];
	
	    function walkNode(node) {
	        if (node.content && typeof node.content.pipe === 'function') {
	            streamNodes.push(node);
	        }
	        if (node.childNodes && node.childNodes.length) {
	            node.childNodes.forEach(walkNode);
	        }
	    }
	    walkNode(mail.message);
	
	    function resolveNodes() {
	        if (!streamNodes.length) {
	            return callback();
	        }
	        var node = streamNodes.shift();
	
	        mail.resolveContent(node, 'content', function (err) {
	            if (err) {
	                return callback(err);
	            }
	            setImmediate(resolveNodes);
	        });
	    }
	
	    resolveNodes();
	};
	
	/**
	 * Resolves MX server for a domain. This solution is somewhat incomplete as
	 * it only considers the hostname with lowest priority and ignores all the rest
	 *
	 * @param {String} domain Domain to resolve the MX to
	 * @param {Function} callback Callback function to run
	 */
	DirectMailer.prototype._resolveMx = function (domain, callback) {
	    domain = domain.replace(/^\[(ipv6:)?|\]$/gi, '');
	
	    // Do not try to resolve the domain name if it is an IP address
	    if (net.isIP(domain)) {
	        return callback(null, [{
	            priority: 0,
	            exchange: domain
	        }]);
	    }
	
	    dns.resolveMx(domain, function (err, list) {
	        if (err) {
	            if (err.code === 'ENODATA' || err.code === 'ENOTFOUND') {
	                // fallback to A
	                dns.resolve4(domain, function (err, list) {
	                    if (err) {
	                        if (err.code === 'ENODATA' || err.code === 'ENOTFOUND') {
	                            // fallback to AAAA
	                            dns.resolve6(domain, function (err, list) {
	                                if (err) {
	                                    return callback(err);
	                                }
	
	                                // return the first resolved Ipv6 with priority 0
	                                return callback(null, [].concat(list || []).map(function (entry) {
	                                    return {
	                                        priority: 0,
	                                        exchange: entry
	                                    };
	                                }).slice(0, 1));
	                            });
	                        } else {
	                            return callback(err);
	                        }
	                        return;
	                    }
	
	                    // return the first resolved Ipv4 with priority 0
	                    return callback(null, [].concat(list || []).map(function (entry) {
	                        return {
	                            priority: 0,
	                            exchange: entry
	                        };
	                    }).slice(0, 1));
	                });
	            } else {
	                return callback(err);
	            }
	            return;
	        }
	        callback(null, list);
	    });
	};
	
	/**
	 * Resolves current hostname. If resolved name is an IP address, uses 'localhost'.
	 *
	 * @param {String} [name] Preferred hostname
	 * @return {String} Resolved hostname
	 */
	DirectMailer.prototype._resolveHostname = function (name) {
	    if (!name || net.isIP(name.replace(/[\[\]]/g, '').trim())) {
	        name = (os.hostname && os.hostname()) || '';
	    }
	
	    if (!name || net.isIP(name.replace(/[\[\]]/g, '').trim())) {
	        name = 'localhost';
	    }
	
	    return name.toLowerCase();
	};


/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	// expose to the world
	module.exports = function () {
	    return new MessageQueue();
	};
	
	/**
	 * Creates a queue object
	 *
	 * @constructor
	 */
	function MessageQueue() {
	    this._instantQueue = [];
	    this._sortedQueue = [];
	    this._shiftTimer = null;
	    this._callbackQueue = [];
	}
	
	/**
	 * Sets a callback to be run when something comes available from the queue
	 *
	 * @param {Function} callback Callback function to run with queue element as an argument
	 */
	MessageQueue.prototype.get = function (callback) {
	    if (this._instantQueue.length) {
	        return callback(this._instantQueue.pop());
	    } else {
	        this._callbackQueue.unshift(callback);
	    }
	};
	
	/**
	 * Adds an element to the queue. If delay (ms) is set, the data will not be available before
	 * specified delay has passed. Otherwise the data will be available for processing immediatelly.
	 *
	 * @param {Mixed} data Value to be queued
	 * @param {Number} [delay] If set, delay the availability of the data by {delay} milliseconds
	 */
	MessageQueue.prototype.insert = function (data, delay) {
	    var container, added = -1;
	    if (typeof delay !== 'number') {
	        this._instantQueue.unshift(data);
	        this._processInsert();
	        return true;
	    } else {
	        container = {
	            data: data,
	            available: Date.now() + delay
	        };
	        for (var i = 0, len = this._sortedQueue.length; i < len; i++) {
	            if (this._sortedQueue[i].available >= container.available) {
	                this._sortedQueue.splice(i, 0, container);
	                added = i;
	                break;
	            }
	        }
	        if (added < 0) {
	            this._sortedQueue.push(container);
	            added = 0;
	        }
	
	        if (added === 0) {
	            this._updateShiftTimer();
	        }
	    }
	};
	
	/**
	 * Clears previous timer and creates a new one (if needed) to process the element
	 * in the queue that needs to be processed first.
	 */
	MessageQueue.prototype._updateShiftTimer = function () {
	    var nextShift, now = Date.now();
	    clearTimeout(this._shiftTimer);
	
	    if (!this._sortedQueue.length) {
	        return;
	    }
	
	    nextShift = this._sortedQueue[0].available;
	
	    if (nextShift <= now) {
	        this._shiftSorted();
	    } else {
	        setTimeout(this._shiftSorted.bind(this),
	            // add +15ms to ensure that data is already available when the timer is fired
	            this._sortedQueue[0].available - Date.now() + 15);
	    }
	};
	
	/**
	 * Moves an element from the delayed queue to the immediate queue if an elmenet
	 * becomes avilable
	 */
	MessageQueue.prototype._shiftSorted = function () {
	    var container;
	    if (!this._sortedQueue.length) {
	        return;
	    }
	
	    if (this._sortedQueue[0].available <= Date.now()) {
	        container = this._sortedQueue.shift();
	        this.insert(container.data);
	    }
	
	    this._updateShiftTimer();
	};
	
	/**
	 * If data from a queue is available and a callback is set, run the callback
	 * with available data
	 */
	MessageQueue.prototype._processInsert = function () {
	    if (this._instantQueue.length && this._callbackQueue.length) {
	        this._callbackQueue.pop()(this._instantQueue.pop());
	    }
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var packageInfo = __webpack_require__(69);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var util = __webpack_require__(51);
	var net = __webpack_require__(70);
	var tls = __webpack_require__(71);
	var os = __webpack_require__(63);
	var crypto = __webpack_require__(62);
	var DataStream = __webpack_require__(72);
	var PassThrough = __webpack_require__(50).PassThrough;
	var shared = __webpack_require__(65);
	var ntlm = __webpack_require__(73);
	
	// default timeout values in ms
	var CONNECTION_TIMEOUT = 2 * 60 * 1000; // how much to wait for the connection to be established
	var SOCKET_TIMEOUT = 10 * 60 * 1000; // how much to wait for socket inactivity before disconnecting the client
	var GREETING_TIMEOUT = 30 * 1000; // how much to wait after connection is established but SMTP greeting is not receieved
	
	module.exports = SMTPConnection;
	
	/**
	 * Generates a SMTP connection object
	 *
	 * Optional options object takes the following possible properties:
	 *
	 *  * **port** - is the port to connect to (defaults to 25 or 465)
	 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
	 *  * **secure** - use SSL
	 *  * **ignoreTLS** - ignore server support for STARTTLS
	 *  * **requireTLS** - forces the client to use STARTTLS
	 *  * **name** - the name of the client server
	 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
	 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 10000)
	 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish
	 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 1 hour)
	 *  * **lmtp** - if true, uses LMTP instead of SMTP protocol
	 *  * **logger** - bunyan compatible logger interface
	 *  * **debug** - if true pass SMTP traffic to the logger
	 *  * **tls** - options for createCredentials
	 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
	 *  * **secured** - boolean indicates that the provided socket has already been upgraded to tls
	 *
	 * @constructor
	 * @namespace SMTP Client module
	 * @param {Object} [options] Option properties
	 */
	function SMTPConnection(options) {
	    EventEmitter.call(this);
	
	    this.id = crypto.randomBytes(8).toString('base64').replace(/\W/g, '');
	    this.stage = 'init';
	
	    this.options = options || {};
	
	    this.secureConnection = !!this.options.secure;
	    this.alreadySecured = !!this.options.secured;
	
	    this.port = this.options.port || (this.secureConnection ? 465 : 25);
	    this.host = this.options.host || 'localhost';
	
	    if (typeof this.options.secure === 'undefined' && this.port === 465) {
	        // if secure option is not set but port is 465, then default to secure
	        this.secureConnection = true;
	    }
	
	    this.name = this.options.name || this._getHostname();
	
	    this.logger = shared.getLogger(this.options);
	
	    /**
	     * Expose version nr, just for the reference
	     * @type {String}
	     */
	    this.version = packageInfo.version;
	
	    /**
	     * If true, then the user is authenticated
	     * @type {Boolean}
	     */
	    this.authenticated = false;
	
	    /**
	     * If set to true, this instance is no longer active
	     * @private
	     */
	    this.destroyed = false;
	
	    /**
	     * Defines if the current connection is secure or not. If not,
	     * STARTTLS can be used if available
	     * @private
	     */
	    this.secure = !!this.secureConnection;
	
	    /**
	     * Store incomplete messages coming from the server
	     * @private
	     */
	    this._remainder = '';
	
	    /**
	     * Unprocessed responses from the server
	     * @type {Array}
	     */
	    this._responseQueue = [];
	
	    /**
	     * The socket connecting to the server
	     * @publick
	     */
	    this._socket = false;
	
	    /**
	     * Lists supported auth mechanisms
	     * @private
	     */
	    this._supportedAuth = [];
	
	    /**
	     * Includes current envelope (from, to)
	     * @private
	     */
	    this._envelope = false;
	
	    /**
	     * Lists supported extensions
	     * @private
	     */
	    this._supportedExtensions = [];
	
	    /**
	     * Defines the maximum allowed size for a single message
	     * @private
	     */
	    this._maxAllowedSize = 0;
	
	    /**
	     * Function queue to run if a data chunk comes from the server
	     * @private
	     */
	    this._responseActions = [];
	    this._recipientQueue = [];
	
	    /**
	     * Timeout variable for waiting the greeting
	     * @private
	     */
	    this._greetingTimeout = false;
	
	    /**
	     * Timeout variable for waiting the connection to start
	     * @private
	     */
	    this._connectionTimeout = false;
	
	    /**
	     * If the socket is deemed already closed
	     * @private
	     */
	    this._destroyed = false;
	
	    /**
	     * If the socket is already being closed
	     * @private
	     */
	    this._closing = false;
	}
	util.inherits(SMTPConnection, EventEmitter);
	
	/**
	 * Creates a connection to a SMTP server and sets up connection
	 * listener
	 */
	SMTPConnection.prototype.connect = function (connectCallback) {
	    if (typeof connectCallback === 'function') {
	        this.once('connect', function () {
	            this.logger.debug('[%s] SMTP handshake finished', this.id);
	            connectCallback();
	        }.bind(this));
	    }
	
	    var opts = {
	        port: this.port,
	        host: this.host
	    };
	
	    if (this.options.localAddress) {
	        opts.localAddress = this.options.localAddress;
	    }
	
	    if (this.options.connection) {
	        // connection is already opened
	        this._socket = this.options.connection;
	        if (this.secureConnection && !this.alreadySecured) {
	            setImmediate(this._upgradeConnection.bind(this, function (err) {
	                if (err) {
	                    this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'CONN');
	                    return;
	                }
	                this._onConnect();
	            }.bind(this)));
	        } else {
	            setImmediate(this._onConnect.bind(this));
	        }
	    } else if (this.options.socket) {
	        // socket object is set up but not yet connected
	        this._socket = this.options.socket;
	        try {
	            this._socket.connect(this.port, this.host, this._onConnect.bind(this));
	        } catch (E) {
	            return setImmediate(this._onError.bind(this, E, 'ECONNECTION', false, 'CONN'));
	        }
	    } else if (this.secureConnection) {
	        // connect using tls
	        if (this.options.tls) {
	            Object.keys(this.options.tls).forEach(function (key) {
	                opts[key] = this.options.tls[key];
	            }.bind(this));
	        }
	        try {
	            this._socket = tls.connect(this.port, this.host, opts, this._onConnect.bind(this));
	        } catch (E) {
	            return setImmediate(this._onError.bind(this, E, 'ECONNECTION', false, 'CONN'));
	        }
	    } else {
	        // connect using plaintext
	        try {
	            this._socket = net.connect(opts, this._onConnect.bind(this));
	        } catch (E) {
	            return setImmediate(this._onError.bind(this, E, 'ECONNECTION', false, 'CONN'));
	        }
	    }
	
	    this._connectionTimeout = setTimeout(function () {
	        this._onError('Connection timeout', 'ETIMEDOUT', false, 'CONN');
	    }.bind(this), this.options.connectionTimeout || CONNECTION_TIMEOUT);
	
	    this._socket.on('error', function (err) {
	        this._onError(err, 'ECONNECTION', false, 'CONN');
	    }.bind(this));
	};
	
	/**
	 * Sends QUIT
	 */
	SMTPConnection.prototype.quit = function () {
	    this._sendCommand('QUIT');
	    this._responseActions.push(this.close);
	};
	
	/**
	 * Closes the connection to the server
	 */
	SMTPConnection.prototype.close = function () {
	    clearTimeout(this._connectionTimeout);
	    clearTimeout(this._greetingTimeout);
	    this._responseActions = [];
	
	    // allow to run this function only once
	    if (this._closing) {
	        return;
	    }
	    this._closing = true;
	
	    var closeMethod = 'end';
	
	    if (this.stage === 'init') {
	        // Close the socket immediately when connection timed out
	        closeMethod = 'destroy';
	    }
	
	    this.logger.debug('[%s] Closing connection to the server using "%s"', this.id, closeMethod);
	
	    var socket = this._socket && this._socket.socket || this._socket;
	
	    if (socket && !socket.destroyed) {
	        try {
	            this._socket[closeMethod]();
	        } catch (E) {
	            // just ignore
	        }
	    }
	
	    this._destroy();
	};
	
	/**
	 * Authenticate user
	 */
	SMTPConnection.prototype.login = function (authData, callback) {
	    this._auth = authData || {};
	    this._user = this._auth.xoauth2 && this._auth.xoauth2.options && this._auth.xoauth2.options.user || this._auth.user || '';
	
	    this._authMethod = false;
	    if (this.options.authMethod) {
	        this._authMethod = this.options.authMethod.toUpperCase().trim();
	    } else if (this._auth.xoauth2 && this._supportedAuth.indexOf('XOAUTH2') >= 0) {
	        this._authMethod = 'XOAUTH2';
	    } else if (this._auth.domain && this._supportedAuth.indexOf('NTLM') >= 0) {
	        this._authMethod = 'NTLM';
	    } else {
	        // use first supported
	        this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
	    }
	
	    switch (this._authMethod) {
	        case 'XOAUTH2':
	            this._handleXOauth2Token(false, callback);
	            return;
	        case 'LOGIN':
	            this._responseActions.push(function (str) {
	                this._actionAUTH_LOGIN_USER(str, callback);
	            }.bind(this));
	            this._sendCommand('AUTH LOGIN');
	            return;
	        case 'PLAIN':
	            this._responseActions.push(function (str) {
	                this._actionAUTHComplete(str, callback);
	            }.bind(this));
	            this._sendCommand('AUTH PLAIN ' + new Buffer(
	                //this._auth.user+'\u0000'+
	                '\u0000' + // skip authorization identity as it causes problems with some servers
	                this._auth.user + '\u0000' +
	                this._auth.pass, 'utf-8').toString('base64'));
	            return;
	        case 'CRAM-MD5':
	            this._responseActions.push(function (str) {
	                this._actionAUTH_CRAM_MD5(str, callback);
	            }.bind(this));
	            this._sendCommand('AUTH CRAM-MD5');
	            return;
	        case 'NTLM':
	            this._responseActions.push(function (str) {
	                this._actionAUTH_NTLM_TYPE1(str, callback);
	            }.bind(this));
	            this._sendCommand('AUTH ' + ntlm.createType1Message({
	                domain: this._auth.domain || '',
	                workstation: this._auth.workstation || ''
	            }));
	            return;
	    }
	
	    return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', 'EAUTH', false, 'API'));
	};
	
	/**
	 * Sends a message
	 *
	 * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
	 * @param {Object} message String, Buffer or a Stream
	 * @param {Function} callback Callback to return once sending is completed
	 */
	SMTPConnection.prototype.send = function (envelope, message, done) {
	    if (!message) {
	        return done(this._formatError('Empty message', 'EMESSAGE', false, 'API'));
	    }
	
	    // reject larger messages than allowed
	    if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
	        return setImmediate(function () {
	            done(this._formatError('Message size larger than allowed ' + this._maxAllowedSize, 'EMESSAGE', false, 'MAIL FROM'));
	        }.bind(this));
	    }
	
	    // ensure that callback is only called once
	    var returned = false;
	    var callback = function () {
	        if (returned) {
	            return;
	        }
	        returned = true;
	
	        done.apply(null, Array.prototype.slice.call(arguments));
	    };
	
	    if (typeof message.on === 'function') {
	        message.on('error', function (err) {
	            return callback(this._formatError(err, 'ESTREAM', false, 'API'));
	        }.bind(this));
	    }
	
	    this._setEnvelope(envelope, function (err, info) {
	        if (err) {
	            return callback(err);
	        }
	        var stream = this._createSendStream(function (err, str) {
	            if (err) {
	                return callback(err);
	            }
	            info.response = str;
	            return callback(null, info);
	        });
	        if (typeof message.pipe === 'function') {
	            message.pipe(stream);
	        } else {
	            stream.write(message);
	            stream.end();
	        }
	
	    }.bind(this));
	};
	
	/**
	 * Resets connection state
	 *
	 * @param {Function} callback Callback to return once connection is reset
	 */
	SMTPConnection.prototype.reset = function (callback) {
	    this._sendCommand('RSET');
	    this._responseActions.push(function (str) {
	        if (str.charAt(0) !== '2') {
	            return callback(this._formatError('Could not reset session state:\n' + str, 'EPROTOCOL', str, 'RSET'));
	        }
	        this._envelope = false;
	        return callback(null, true);
	    }.bind(this));
	};
	
	/**
	 * Connection listener that is run when the connection to
	 * the server is opened
	 *
	 * @event
	 */
	SMTPConnection.prototype._onConnect = function () {
	    clearTimeout(this._connectionTimeout);
	
	    this.logger.info('[%s] %s established to %s:%s', this.id, this.secure ? 'Secure connection' : 'Connection', this._socket.remoteAddress, this._socket.remotePort);
	
	    if (this._destroyed) {
	        // Connection was established after we already had canceled it
	        this.close();
	        return;
	    }
	
	    this.stage = 'connected';
	
	    // clear existing listeners for the socket
	    this._socket.removeAllListeners('data');
	    this._socket.removeAllListeners('timeout');
	    this._socket.removeAllListeners('close');
	    this._socket.removeAllListeners('end');
	
	    this._socket.on('data', this._onData.bind(this));
	    this._socket.once('close', this._onClose.bind(this));
	    this._socket.once('end', this._onEnd.bind(this));
	
	    this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
	    this._socket.on('timeout', this._onTimeout.bind(this));
	
	    this._greetingTimeout = setTimeout(function () {
	        // if still waiting for greeting, give up
	        if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
	            this._onError('Greeting never received', 'ETIMEDOUT', false, 'CONN');
	        }
	    }.bind(this), this.options.greetingTimeout || GREETING_TIMEOUT);
	
	    this._responseActions.push(this._actionGreeting);
	
	    // we have a 'data' listener set up so resume socket if it was paused
	    this._socket.resume();
	};
	
	/**
	 * 'data' listener for data coming from the server
	 *
	 * @event
	 * @param {Buffer} chunk Data chunk coming from the server
	 */
	SMTPConnection.prototype._onData = function (chunk) {
	    if (this._destroyed || !chunk || !chunk.length) {
	        return;
	    }
	
	    var data = (chunk || '').toString('binary');
	    var lines = (this._remainder + data).split(/\r?\n/);
	    var lastline;
	
	    this._remainder = lines.pop();
	
	    for (var i = 0, len = lines.length; i < len; i++) {
	        if (this._responseQueue.length) {
	            lastline = this._responseQueue[this._responseQueue.length - 1];
	            if (/^\d+\-/.test(lastline.split('\n').pop())) {
	                this._responseQueue[this._responseQueue.length - 1] += '\n' + lines[i];
	                continue;
	            }
	        }
	        this._responseQueue.push(lines[i]);
	    }
	
	    this._processResponse();
	};
	
	/**
	 * 'error' listener for the socket
	 *
	 * @event
	 * @param {Error} err Error object
	 * @param {String} type Error name
	 */
	SMTPConnection.prototype._onError = function (err, type, data, command) {
	    clearTimeout(this._connectionTimeout);
	    clearTimeout(this._greetingTimeout);
	
	    if (this._destroyed) {
	        // just ignore, already closed
	        // this might happen when a socket is canceled because of reached timeout
	        // but the socket timeout error itself receives only after
	        return;
	    }
	
	    err = this._formatError(err, type, data, command);
	
	    this.logger.error('[%s] %s', this.id, err.message);
	
	    this.emit('error', err);
	    this.close();
	};
	
	SMTPConnection.prototype._formatError = function (message, type, response, command) {
	    var err;
	
	    if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
	        err = message;
	    } else {
	        err = new Error(message);
	    }
	
	    if (type && type !== 'Error') {
	        err.code = type;
	    }
	
	    if (response) {
	        err.response = response;
	        err.message += ': ' + response;
	    }
	
	    var responseCode = typeof response === 'string' && Number((response.match(/^\d+/) || [])[0]) || false;
	    if (responseCode) {
	        err.responseCode = responseCode;
	    }
	
	    if (command) {
	        err.command = command;
	    }
	
	    return err;
	};
	
	/**
	 * 'close' listener for the socket
	 *
	 * @event
	 */
	SMTPConnection.prototype._onClose = function () {
	    this.logger.info('[%s] Connection closed', this.id);
	
	    if ([this._actionGreeting, this.close].indexOf(this._responseActions[0]) < 0 && !this._destroyed) {
	        return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', false, 'CONN');
	    }
	
	    this._destroy();
	};
	
	/**
	 * 'end' listener for the socket
	 *
	 * @event
	 */
	SMTPConnection.prototype._onEnd = function () {
	    this._destroy();
	};
	
	/**
	 * 'timeout' listener for the socket
	 *
	 * @event
	 */
	SMTPConnection.prototype._onTimeout = function () {
	    return this._onError(new Error('Timeout'), 'ETIMEDOUT', false, 'CONN');
	};
	
	/**
	 * Destroys the client, emits 'end'
	 */
	SMTPConnection.prototype._destroy = function () {
	    if (this._destroyed) {
	        return;
	    }
	    this._destroyed = true;
	    this.emit('end');
	};
	
	/**
	 * Upgrades the connection to TLS
	 *
	 * @param {Function} callback Callback function to run when the connection
	 *        has been secured
	 */
	SMTPConnection.prototype._upgradeConnection = function (callback) {
	    // do not remove all listeners or it breaks node v0.10 as there's
	    // apparently a 'finish' event set that would be cleared as well
	
	    // we can safely keep 'error', 'end', 'close' etc. events
	    this._socket.removeAllListeners('data'); // incoming data is going to be gibberish from this point onwards
	    this._socket.removeAllListeners('timeout'); // timeout will be re-set for the new socket object
	
	    var socketPlain = this._socket;
	    var opts = {
	        socket: this._socket,
	        host: this.host
	    };
	
	    Object.keys(this.options.tls || {}).forEach(function (key) {
	        opts[key] = this.options.tls[key];
	    }.bind(this));
	
	    this._socket = tls.connect(opts, function () {
	        this.secure = true;
	        this._socket.on('data', this._onData.bind(this));
	
	        socketPlain.removeAllListeners('close');
	        socketPlain.removeAllListeners('end');
	
	        return callback(null, true);
	    }.bind(this));
	
	    this._socket.on('error', this._onError.bind(this));
	    this._socket.once('close', this._onClose.bind(this));
	    this._socket.once('end', this._onEnd.bind(this));
	
	    this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT); // 10 min.
	    this._socket.on('timeout', this._onTimeout.bind(this));
	
	    // resume in case the socket was paused
	    socketPlain.resume();
	};
	
	/**
	 * Processes queued responses from the server
	 *
	 * @param {Boolean} force If true, ignores _processing flag
	 */
	SMTPConnection.prototype._processResponse = function () {
	    if (!this._responseQueue.length) {
	        return false;
	    }
	
	    var str = (this._responseQueue.shift() || '').toString();
	
	    if (/^\d+\-/.test(str.split('\n').pop())) {
	        // keep waiting for the final part of multiline response
	        return;
	    }
	
	    if (this.options.debug) {
	        this.logger.debug('[%s] S: %s', this.id, str.replace(/\r?\n$/, ''));
	    }
	
	    if (!str.trim()) { // skip unexpected empty lines
	        setImmediate(this._processResponse.bind(this, true));
	    }
	
	    var action = this._responseActions.shift();
	
	    if (typeof action === 'function') {
	        action.call(this, str);
	        setImmediate(this._processResponse.bind(this, true));
	    } else {
	        return this._onError(new Error('Unexpected Response'), 'EPROTOCOL', str, 'CONN');
	    }
	};
	
	/**
	 * Send a command to the server, append \r\n
	 *
	 * @param {String} str String to be sent to the server
	 */
	SMTPConnection.prototype._sendCommand = function (str) {
	    if (this._destroyed) {
	        // Connection already closed, can't send any more data
	        return;
	    }
	
	    if (this._socket.destroyed) {
	        return this.close();
	    }
	
	    if (this.options.debug) {
	        this.logger.debug('[%s] C: %s', this.id, (str || '').toString().replace(/\r?\n$/, ''));
	    }
	
	    this._socket.write(new Buffer(str + '\r\n', 'utf-8'));
	};
	
	/**
	 * Initiates a new message by submitting envelope data, starting with
	 * MAIL FROM: command
	 *
	 * @param {Object} envelope Envelope object in the form of
	 *        {from:'...', to:['...']}
	 *        or
	 *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
	 */
	SMTPConnection.prototype._setEnvelope = function (envelope, callback) {
	    var args = [];
	    var useSmtpUtf8 = false;
	
	    this._envelope = envelope || {};
	    this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || '').toString().trim();
	
	    this._envelope.to = [].concat(this._envelope.to || []).map(function (to) {
	        return (to && to.address || to || '').toString().trim();
	    });
	
	    if (!this._envelope.to.length) {
	        return callback(this._formatError('No recipients defined', 'EENVELOPE', false, 'API'));
	    }
	
	    if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
	        return callback(this._formatError('Invalid sender ' + JSON.stringify(this._envelope.from), 'EENVELOPE', false, 'API'));
	    }
	
	    // check if the sender address uses only ASCII characters,
	    // otherwise require usage of SMTPUTF8 extension
	    if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
	        useSmtpUtf8 = true;
	    }
	
	    for (var i = 0, len = this._envelope.to.length; i < len; i++) {
	        if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
	            return callback(this._formatError('Invalid recipient ' + JSON.stringify(this._envelope.to[i]), 'EENVELOPE', false, 'API'));
	        }
	
	        // check if the recipients addresses use only ASCII characters,
	        // otherwise require usage of SMTPUTF8 extension
	        if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
	            useSmtpUtf8 = true;
	        }
	    }
	
	    // clone the recipients array for latter manipulation
	    this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
	    this._envelope.rejected = [];
	    this._envelope.rejectedErrors = [];
	    this._envelope.accepted = [];
	
	    if (this._envelope.dsn) {
	        try {
	            this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
	        } catch (err) {
	            return callback(this._formatError('Invalid dsn ' + err.message, 'EENVELOPE', false, 'API'));
	        }
	    }
	
	    this._responseActions.push(function (str) {
	        this._actionMAIL(str, callback);
	    }.bind(this));
	
	    // If the server supports SMTPUTF8 and the envelope includes an internationalized
	    // email address then append SMTPUTF8 keyword to the MAIL FROM command
	    if (useSmtpUtf8 && this._supportedExtensions.indexOf('SMTPUTF8') >= 0) {
	        args.push('SMTPUTF8');
	        this._usingSmtpUtf8 = true;
	    }
	
	    // If the server supports 8BITMIME and the message might contain non-ascii bytes
	    // then append the 8BITMIME keyword to the MAIL FROM command
	    if (this._envelope.use8BitMime && this._supportedExtensions.indexOf('8BITMIME') >= 0) {
	        args.push('BODY=8BITMIME');
	        this._using8BitMime = true;
	    }
	
	    if (this._envelope.size && this._supportedExtensions.indexOf('SIZE') >= 0) {
	        args.push('SIZE=' + this._envelope.size);
	    }
	
	    // If the server supports DSN and the envelope includes an DSN prop
	    // then append DSN params to the MAIL FROM command
	    if (this._envelope.dsn && this._supportedExtensions.indexOf('DSN') >= 0) {
	        if (this._envelope.dsn.ret) {
	            args.push('RET=' + this._envelope.dsn.ret);
	        }
	        if (this._envelope.dsn.envid) {
	            args.push('ENVID=' + this._envelope.dsn.envid);
	        }
	    }
	
	    this._sendCommand('MAIL FROM:<' + (this._envelope.from) + '>' + (args.length ? ' ' + args.join(' ') : ''));
	};
	
	SMTPConnection.prototype._setDsnEnvelope = function (params) {
	    var ret = params.ret ? params.ret.toString().toUpperCase() : null;
	    if (ret && ['FULL', 'HDRS'].indexOf(ret) < 0) {
	        throw new Error('ret: ' + JSON.stringify(ret));
	    }
	    var envid = params.envid ? params.envid.toString() : null;
	    var notify = params.notify ? params.notify : null;
	    if (notify) {
	        if (typeof notify === 'string') {
	            notify = notify.split(',');
	        }
	        notify = notify.map(function (n) {
	            return n.trim().toUpperCase();
	        });
	        var validNotify = ['NEVER', 'SUCCESS', 'FAILURE', 'DELAY'];
	        var invaliNotify = notify.filter(function (n) {
	            return validNotify.indexOf(n) === -1;
	        });
	        if (invaliNotify.length || (notify.length > 1 && notify.indexOf('NEVER') >= 0)) {
	            throw new Error('notify: ' + JSON.stringify(notify.join(',')));
	        }
	        notify = notify.join(',');
	    }
	    var orcpt = params.orcpt ? params.orcpt.toString() : null;
	    return {
	        ret: ret,
	        envid: envid,
	        notify: notify,
	        orcpt: orcpt
	    };
	};
	
	SMTPConnection.prototype._getDsnRcptToArgs = function () {
	    var args = [];
	    // If the server supports DSN and the envelope includes an DSN prop
	    // then append DSN params to the RCPT TO command
	    if (this._envelope.dsn && this._supportedExtensions.indexOf('DSN') >= 0) {
	        if (this._envelope.dsn.notify) {
	            args.push('NOTIFY=' + this._envelope.dsn.notify);
	        }
	        if (this._envelope.dsn.orcpt) {
	            args.push('ORCPT=' + this._envelope.dsn.orcpt);
	        }
	    }
	    return (args.length ? ' ' + args.join(' ') : '');
	};
	
	SMTPConnection.prototype._createSendStream = function (callback) {
	    var dataStream = new DataStream();
	    var logStream;
	
	    if (this.options.lmtp) {
	        this._envelope.accepted.forEach(function (recipient, i) {
	            var final = i === this._envelope.accepted.length - 1;
	            this._responseActions.push(function (str) {
	                this._actionLMTPStream(recipient, final, str, callback);
	            }.bind(this));
	        }.bind(this));
	    } else {
	        this._responseActions.push(function (str) {
	            this._actionSMTPStream(str, callback);
	        }.bind(this));
	    }
	
	    dataStream.pipe(this._socket, {
	        end: false
	    });
	
	    if (this.options.debug) {
	        logStream = new PassThrough();
	        logStream.on('readable', function () {
	            var chunk;
	            while ((chunk = logStream.read())) {
	                this.logger.debug('[%s] C: %s', this.id, chunk.toString('binary').replace(/\r?\n$/, ''));
	            }
	        }.bind(this));
	        dataStream.pipe(logStream);
	    }
	
	    dataStream.once('end', function () {
	        this.logger.info('[%s] C: <%s bytes encoded mime message (source size %s bytes)>', this.id, dataStream.outByteCount, dataStream.inByteCount);
	    }.bind(this));
	
	    return dataStream;
	};
	
	/** ACTIONS **/
	
	/**
	 * Will be run after the connection is created and the server sends
	 * a greeting. If the incoming message starts with 220 initiate
	 * SMTP session by sending EHLO command
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionGreeting = function (str) {
	    clearTimeout(this._greetingTimeout);
	
	    if (str.substr(0, 3) !== '220') {
	        this._onError(new Error('Invalid greeting from server:\n' + str), 'EPROTOCOL', str, 'CONN');
	        return;
	    }
	
	    if (this.options.lmtp) {
	        this._responseActions.push(this._actionLHLO);
	        this._sendCommand('LHLO ' + this.name);
	    } else {
	        this._responseActions.push(this._actionEHLO);
	        this._sendCommand('EHLO ' + this.name);
	    }
	};
	
	/**
	 * Handles server response for LHLO command. If it yielded in
	 * error, emit 'error', otherwise treat this as an EHLO response
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionLHLO = function (str) {
	    if (str.charAt(0) !== '2') {
	        this._onError(new Error('Invalid response for LHLO:\n' + str), 'EPROTOCOL', str, 'LHLO');
	        return;
	    }
	
	    this._actionEHLO(str);
	};
	
	/**
	 * Handles server response for EHLO command. If it yielded in
	 * error, try HELO instead, otherwise initiate TLS negotiation
	 * if STARTTLS is supported by the server or move into the
	 * authentication phase.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionEHLO = function (str) {
	    var match;
	
	    if (str.substr(0, 3) === '421') {
	        this._onError(new Error('Server terminates connection:\n' + str), 'ECONNECTION', str, 'EHLO');
	        return;
	    }
	
	    if (str.charAt(0) !== '2') {
	        if (this.options.requireTLS) {
	            this._onError(new Error('EHLO failed but HELO does not support required STARTTLS:\n' + str), 'ECONNECTION', str, 'EHLO');
	            return;
	        }
	
	        // Try HELO instead
	        this._responseActions.push(this._actionHELO);
	        this._sendCommand('HELO ' + this.name);
	        return;
	    }
	
	    // Detect if the server supports STARTTLS
	    if (!this.secure && !this.options.ignoreTLS && (/[ \-]STARTTLS\b/mi.test(str) || this.options.requireTLS)) {
	        this._sendCommand('STARTTLS');
	        this._responseActions.push(this._actionSTARTTLS);
	        return;
	    }
	
	    // Detect if the server supports SMTPUTF8
	    if (/[ \-]SMTPUTF8\b/mi.test(str)) {
	        this._supportedExtensions.push('SMTPUTF8');
	    }
	
	    // Detect if the server supports DSN
	    if (/[ \-]DSN\b/mi.test(str)) {
	        this._supportedExtensions.push('DSN');
	    }
	
	    // Detect if the server supports 8BITMIME
	    if (/[ \-]8BITMIME\b/mi.test(str)) {
	        this._supportedExtensions.push('8BITMIME');
	    }
	
	    // Detect if the server supports PIPELINING
	    if (/[ \-]PIPELINING\b/mi.test(str)) {
	        this._supportedExtensions.push('PIPELINING');
	    }
	
	    // Detect if the server supports PLAIN auth
	    if (/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
	        this._supportedAuth.push('PLAIN');
	    }
	
	    // Detect if the server supports LOGIN auth
	    if (/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
	        this._supportedAuth.push('LOGIN');
	    }
	
	    // Detect if the server supports CRAM-MD5 auth
	    if (/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
	        this._supportedAuth.push('CRAM-MD5');
	    }
	
	    // Detect if the server supports XOAUTH2 auth
	    if (/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
	        this._supportedAuth.push('XOAUTH2');
	    }
	
	    // Detect if the server supports SIZE extensions (and the max allowed size)
	    if ((match = str.match(/[ \-]SIZE(?:\s+(\d+))?/mi))) {
	        this._supportedExtensions.push('SIZE');
	        this._maxAllowedSize = Number(match[1]) || 0;
	    }
	
	    this.emit('connect');
	};
	
	/**
	 * Handles server response for HELO command. If it yielded in
	 * error, emit 'error', otherwise move into the authentication phase.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionHELO = function (str) {
	    if (str.charAt(0) !== '2') {
	        this._onError(new Error('Invalid response for EHLO/HELO:\n' + str), 'EPROTOCOL', str, 'HELO');
	        return;
	    }
	
	    this.emit('connect');
	};
	
	/**
	 * Handles server response for STARTTLS command. If there's an error
	 * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
	 * succeedes restart the EHLO
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionSTARTTLS = function (str) {
	    if (str.charAt(0) !== '2') {
	        if (this.options.opportunisticTLS) {
	            this.logger.info('[%s] Failed STARTTLS upgrade, continuing unencrypted', this.id);
	            return this.emit('connect');
	        }
	        this._onError(new Error('Error upgrading connection with STARTTLS'), 'ETLS', str, 'STARTTLS');
	        return;
	    }
	
	    this._upgradeConnection(function (err, secured) {
	        if (err) {
	            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'STARTTLS');
	            return;
	        }
	
	        this.logger.info('[%s] Connection upgraded with STARTTLS', this.id);
	
	        if (secured) {
	            // restart session
	            this._responseActions.push(this._actionEHLO);
	            this._sendCommand('EHLO ' + this.name);
	        } else {
	            this.emit('connect');
	        }
	    }.bind(this));
	};
	
	/**
	 * Handle the response for AUTH LOGIN command. We are expecting
	 * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
	 * response needs to be base64 encoded username.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_LOGIN_USER = function (str, callback) {
	    if (str !== '334 VXNlcm5hbWU6') {
	        callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', 'EAUTH', str, 'AUTH LOGIN'));
	        return;
	    }
	
	    this._responseActions.push(function (str) {
	        this._actionAUTH_LOGIN_PASS(str, callback);
	    }.bind(this));
	
	    this._sendCommand(new Buffer(this._auth.user + '', 'utf-8').toString('base64'));
	};
	
	/**
	 * Handle the response for AUTH NTLM, which should be a
	 * '334 <challenge string>'. See http://davenport.sourceforge.net/ntlm.html
	 * We already sent the Type1 message, the challenge is a Type2 message, we
	 * need to respond with a Type3 message.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_NTLM_TYPE1 = function (str, callback) {
	    var challengeMatch = str.match(/^334\s+(.+)$/);
	    var challengeString = '';
	
	    if (!challengeMatch) {
	        return callback(this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str, 'AUTH NTLM'));
	    } else {
	        challengeString = challengeMatch[1];
	    }
	
	    if (!/^NTLM/i.test(challengeString)) {
	        challengeString = 'NTLM ' + challengeString;
	    }
	
	    var type2Message = ntlm.parseType2Message(challengeString, callback);
	    if (!type2Message) {
	        return;
	    }
	
	    var type3Message = ntlm.createType3Message(type2Message, {
	        domain: this._auth.domain || '',
	        workstation: this._auth.workstation || '',
	        username: this._auth.user,
	        password: this._auth.pass
	    });
	
	    type3Message = type3Message.substring(5); // remove the "NTLM " prefix
	
	    this._responseActions.push(function (str) {
	        this._actionAUTH_NTLM_TYPE3(str, callback);
	    }.bind(this));
	
	    this._sendCommand(type3Message);
	};
	
	/**
	 * Handle the response for AUTH CRAM-MD5 command. We are expecting
	 * '334 <challenge string>'. Data to be sent as response needs to be
	 * base64 decoded challenge string, MD5 hashed using the password as
	 * a HMAC key, prefixed by the username and a space, and finally all
	 * base64 encoded again.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_CRAM_MD5 = function (str, callback) {
	    var challengeMatch = str.match(/^334\s+(.+)$/);
	    var challengeString = '';
	
	    if (!challengeMatch) {
	        return callback(this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str, 'AUTH CRAM-MD5'));
	    } else {
	        challengeString = challengeMatch[1];
	    }
	
	    // Decode from base64
	    var base64decoded = new Buffer(challengeString, 'base64').toString('ascii'),
	        hmac_md5 = crypto.createHmac('md5', this._auth.pass);
	
	    hmac_md5.update(base64decoded);
	
	    var hex_hmac = hmac_md5.digest('hex'),
	        prepended = this._auth.user + ' ' + hex_hmac;
	
	    this._responseActions.push(function (str) {
	        this._actionAUTH_CRAM_MD5_PASS(str, callback);
	    }.bind(this));
	
	
	    this._sendCommand(new Buffer(prepended).toString('base64'));
	};
	
	/**
	 * Handles the response to CRAM-MD5 authentication, if there's no error,
	 * the user can be considered logged in. Start waiting for a message to send
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_CRAM_MD5_PASS = function (str, callback) {
	    if (!str.match(/^235\s+/)) {
	        return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str, 'AUTH CRAM-MD5'));
	    }
	
	    this.logger.info('[%s] User %s authenticated', this.id, JSON.stringify(this._user));
	    this.authenticated = true;
	    callback(null, true);
	};
	
	/**
	 * Handles the TYPE3 response for NTLM authentication, if there's no error,
	 * the user can be considered logged in. Start waiting for a message to send
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_NTLM_TYPE3 = function (str, callback) {
	    if (!str.match(/^235\s+/)) {
	        return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str, 'AUTH NTLM'));
	    }
	
	    this.logger.info('[%s] User %s authenticated', this.id, JSON.stringify(this._user));
	    this.authenticated = true;
	    callback(null, true);
	};
	
	/**
	 * Handle the response for AUTH LOGIN command. We are expecting
	 * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
	 * response needs to be base64 encoded password.
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTH_LOGIN_PASS = function (str, callback) {
	    if (str !== '334 UGFzc3dvcmQ6') {
	        return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', 'EAUTH', str, 'AUTH LOGIN'));
	    }
	
	    this._responseActions.push(function (str) {
	        this._actionAUTHComplete(str, callback);
	    }.bind(this));
	
	    this._sendCommand(new Buffer(this._auth.pass + '', 'utf-8').toString('base64'));
	};
	
	/**
	 * Handles the response for authentication, if there's no error,
	 * the user can be considered logged in. Start waiting for a message to send
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionAUTHComplete = function (str, isRetry, callback) {
	    if (!callback && typeof isRetry === 'function') {
	        callback = isRetry;
	        isRetry = undefined;
	    }
	
	    if (str.substr(0, 3) === '334') {
	        this._responseActions.push(function (str) {
	            if (isRetry || !this._auth.xoauth2 || typeof this._auth.xoauth2 !== 'object') {
	                this._actionAUTHComplete(str, true, callback);
	            } else {
	                setTimeout(this._handleXOauth2Token.bind(this, true, callback), Math.random() * 4000 + 1000);
	            }
	        }.bind(this));
	        this._sendCommand('');
	        return;
	    }
	
	    if (str.charAt(0) !== '2') {
	        this.logger.info('[%s] User %s failed to authenticate', this.id, JSON.stringify(this._user));
	        return callback(this._formatError('Invalid login', 'EAUTH', str, 'AUTH ' + this._authMethod));
	    }
	
	    this.logger.info('[%s] User %s authenticated', this.id, JSON.stringify(this._user));
	    this.authenticated = true;
	    callback(null, true);
	};
	
	/**
	 * Handle response for a MAIL FROM: command
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionMAIL = function (str, callback) {
	    var message, curRecipient;
	    if (Number(str.charAt(0)) !== 2) {
	        if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
	            message = 'Internationalized mailbox name not allowed';
	        } else {
	            message = 'Mail command failed';
	        }
	        return callback(this._formatError(message, 'EENVELOPE', str, 'MAIL FROM'));
	    }
	
	    if (!this._envelope.rcptQueue.length) {
	        return callback(this._formatError('Can\'t send mail - no recipients defined', 'EENVELOPE', false, 'API'));
	    } else {
	        this._recipientQueue = [];
	
	        if (this._supportedExtensions.indexOf('PIPELINING') >= 0) {
	            while (this._envelope.rcptQueue.length) {
	                curRecipient = this._envelope.rcptQueue.shift();
	                this._recipientQueue.push(curRecipient);
	                this._responseActions.push(function (str) {
	                    this._actionRCPT(str, callback);
	                }.bind(this));
	                this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	            }
	        } else {
	            curRecipient = this._envelope.rcptQueue.shift();
	            this._recipientQueue.push(curRecipient);
	            this._responseActions.push(function (str) {
	                this._actionRCPT(str, callback);
	            }.bind(this));
	            this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	        }
	    }
	};
	
	/**
	 * Handle response for a RCPT TO: command
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionRCPT = function (str, callback) {
	    var message, err, curRecipient = this._recipientQueue.shift();
	    if (Number(str.charAt(0)) !== 2) {
	        // this is a soft error
	        if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
	            message = 'Internationalized mailbox name not allowed';
	        } else {
	            message = 'Recipient command failed';
	        }
	        this._envelope.rejected.push(curRecipient);
	        // store error for the failed recipient
	        err = this._formatError(message, 'EENVELOPE', str, 'RCPT TO');
	        err.recipient = curRecipient;
	        this._envelope.rejectedErrors.push(err);
	    } else {
	        this._envelope.accepted.push(curRecipient);
	    }
	
	    if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
	        if (this._envelope.rejected.length < this._envelope.to.length) {
	            this._responseActions.push(function (str) {
	                this._actionDATA(str, callback);
	            }.bind(this));
	            this._sendCommand('DATA');
	        } else {
	            err = this._formatError('Can\'t send mail - all recipients were rejected', 'EENVELOPE', str, 'RCPT TO');
	            err.rejected = this._envelope.rejected;
	            err.rejectedErrors = this._envelope.rejectedErrors;
	            return callback(err);
	        }
	    } else if (this._envelope.rcptQueue.length) {
	        curRecipient = this._envelope.rcptQueue.shift();
	        this._recipientQueue.push(curRecipient);
	        this._responseActions.push(function (str) {
	            this._actionRCPT(str, callback);
	        }.bind(this));
	        this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	    }
	};
	
	/**
	 * Handle response for a DATA command
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionDATA = function (str, callback) {
	    // response should be 354 but according to this issue https://github.com/eleith/emailjs/issues/24
	    // some servers might use 250 instead, so lets check for 2 or 3 as the first digit
	    if ([2, 3].indexOf(Number(str.charAt(0))) < 0) {
	        return callback(this._formatError('Data command failed', 'EENVELOPE', str, 'DATA'));
	    }
	
	    var response = {
	        accepted: this._envelope.accepted,
	        rejected: this._envelope.rejected
	    };
	
	    if (this._envelope.rejectedErrors.length) {
	        response.rejectedErrors = this._envelope.rejectedErrors;
	    }
	
	    callback(null, response);
	};
	
	/**
	 * Handle response for a DATA stream when using SMTP
	 * We expect a single response that defines if the sending succeeded or failed
	 *
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionSMTPStream = function (str, callback) {
	    if (Number(str.charAt(0)) !== 2) {
	        // Message failed
	        return callback(this._formatError('Message failed', 'EMESSAGE', str, 'DATA'));
	    } else {
	        // Message sent succesfully
	        return callback(null, str);
	    }
	};
	
	/**
	 * Handle response for a DATA stream
	 * We expect a separate response for every recipient. All recipients can either
	 * succeed or fail separately
	 *
	 * @param {String} recipient The recipient this response applies to
	 * @param {Boolean} final Is this the final recipient?
	 * @param {String} str Message from the server
	 */
	SMTPConnection.prototype._actionLMTPStream = function (recipient, final, str, callback) {
	    var err;
	    if (Number(str.charAt(0)) !== 2) {
	        // Message failed
	        err = this._formatError('Message failed for recipient ' + recipient, 'EMESSAGE', str, 'DATA');
	        err.recipient = recipient;
	        this._envelope.rejected.push(recipient);
	        this._envelope.rejectedErrors.push(err);
	        for (var i = 0, len = this._envelope.accepted.length; i < len; i++) {
	            if (this._envelope.accepted[i] === recipient) {
	                this._envelope.accepted.splice(i, 1);
	            }
	        }
	    }
	    if (final) {
	        return callback(null, str);
	    }
	};
	
	SMTPConnection.prototype._handleXOauth2Token = function (isRetry, callback) {
	    this._responseActions.push(function (str) {
	        this._actionAUTHComplete(str, isRetry, callback);
	    }.bind(this));
	
	    if (this._auth.xoauth2 && typeof this._auth.xoauth2 === 'object') {
	        this._auth.xoauth2[isRetry ? 'generateToken' : 'getToken'](function (err, token) {
	            if (err) {
	                this.logger.info('[%s] User %s failed to authenticate', this.id, JSON.stringify(this._user));
	                return callback(this._formatError(err, 'EAUTH', false, 'AUTH XOAUTH2'));
	            }
	            this._sendCommand('AUTH XOAUTH2 ' + token);
	        }.bind(this));
	    } else {
	        this._sendCommand('AUTH XOAUTH2 ' + this._buildXOAuth2Token(this._auth.user, this._auth.xoauth2));
	    }
	};
	
	/**
	 * Builds a login token for XOAUTH2 authentication command
	 *
	 * @param {String} user E-mail address of the user
	 * @param {String} token Valid access token for the user
	 * @return {String} Base64 formatted login token
	 */
	SMTPConnection.prototype._buildXOAuth2Token = function (user, token) {
	    var authData = [
	        'user=' + (user || ''),
	        'auth=Bearer ' + token,
	        '',
	        ''
	    ];
	    return new Buffer(authData.join('\x01')).toString('base64');
	};
	
	SMTPConnection.prototype._getHostname = function () {
	    // defaul hostname is machine hostname or [IP]
	    var defaultHostname = os.hostname() || '';
	
	    // ignore if not FQDN
	    if (defaultHostname.indexOf('.') < 0) {
	        defaultHostname = '[127.0.0.1]';
	    }
	
	    // IP should be enclosed in []
	    if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
	        defaultHostname = '[' + defaultHostname + ']';
	    }
	
	    return defaultHostname;
	};


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {
		"name": "smtp-connection",
		"version": "2.12.0",
		"description": "Connect to SMTP servers",
		"main": "lib/smtp-connection.js",
		"directories": {
			"test": "test"
		},
		"scripts": {
			"test": "grunt mochaTest"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/andris9/smtp-connection.git"
		},
		"keywords": [
			"SMTP"
		],
		"author": "Andris Reinman",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/andris9/smtp-connection/issues"
		},
		"homepage": "https://github.com/andris9/smtp-connection",
		"devDependencies": {
			"chai": "^3.5.0",
			"grunt": "^1.0.1",
			"grunt-cli": "^1.2.0",
			"grunt-eslint": "^19.0.0",
			"grunt-mocha-test": "^0.12.7",
			"mocha": "^3.0.2",
			"proxy-test-server": "^1.0.0",
			"sinon": "^1.17.5",
			"smtp-server": "^1.14.2",
			"xoauth2": "^1.2.0"
		},
		"dependencies": {
			"httpntlm": "1.6.1",
			"nodemailer-shared": "1.1.0"
		}
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("net");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("tls");

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var stream = __webpack_require__(50);
	var Transform = stream.Transform;
	var util = __webpack_require__(51);
	
	module.exports = DataStream;
	
	/**
	 * Escapes dots in the beginning of lines. Ends the stream with <CR><LF>.<CR><LF>
	 * Also makes sure that only <CR><LF> sequences are used for linebreaks
	 *
	 * @param {Object} options Stream options
	 */
	function DataStream(options) {
	    // init Transform
	    this.options = options || {};
	    this._curLine = '';
	
	    this.inByteCount = 0;
	    this.outByteCount = 0;
	    this.lastByte = false;
	
	    Transform.call(this, this.options);
	}
	util.inherits(DataStream, Transform);
	
	/**
	 * Escapes dots
	 */
	DataStream.prototype._transform = function (chunk, encoding, done) {
	    var chunks = [];
	    var chunklen = 0;
	    var i, len, lastPos = 0;
	    var buf;
	
	    if (!chunk || !chunk.length) {
	        return done();
	    }
	
	    if (typeof chunk === 'string') {
	        chunk = new Buffer(chunk);
	    }
	
	    this.inByteCount += chunk.length;
	
	    for (i = 0, len = chunk.length; i < len; i++) {
	        if (chunk[i] === 0x2E) { // .
	            if (
	                (i && chunk[i - 1] === 0x0A) ||
	                (!i && (!this.lastByte || this.lastByte === 0x0A))
	            ) {
	                buf = chunk.slice(lastPos, i + 1);
	                chunks.push(buf);
	                chunks.push(new Buffer('.'));
	                chunklen += buf.length + 1;
	                lastPos = i + 1;
	            }
	        } else if (chunk[i] === 0x0A) { // .
	            if (
	                (i && chunk[i - 1] !== 0x0D) ||
	                (!i && this.lastByte !== 0x0D)
	            ) {
	                if (i > lastPos) {
	                    buf = chunk.slice(lastPos, i);
	                    chunks.push(buf);
	                    chunklen += buf.length + 2;
	                } else {
	                    chunklen += 2;
	                }
	                chunks.push(new Buffer('\r\n'));
	                lastPos = i + 1;
	            }
	        }
	    }
	
	    if (chunklen) {
	        // add last piece
	        if (lastPos < chunk.length) {
	            buf = chunk.slice(lastPos);
	            chunks.push(buf);
	            chunklen += buf.length;
	        }
	
	        this.outByteCount += chunklen;
	        this.push(Buffer.concat(chunks, chunklen));
	    } else {
	        this.outByteCount += chunk.length;
	        this.push(chunk);
	    }
	
	    this.lastByte = chunk[chunk.length - 1];
	    done();
	};
	
	/**
	 * Finalizes the stream with a dot on a single line
	 */
	DataStream.prototype._flush = function (done) {
	    var buf;
	    if (this.lastByte === 0x0A) {
	        buf = new Buffer('.\r\n');
	    } else if (this.lastByte === 0x0D) {
	        buf = new Buffer('\n.\r\n');
	    } else {
	        buf = new Buffer('\r\n.\r\n');
	    }
	    this.outByteCount += buf.length;
	    this.push(buf);
	    done();
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var crypto = __webpack_require__(62);
	
	var flags = {
		NTLM_NegotiateUnicode                :  0x00000001,
		NTLM_NegotiateOEM                    :  0x00000002,
		NTLM_RequestTarget                   :  0x00000004,
		NTLM_Unknown9                        :  0x00000008,
		NTLM_NegotiateSign                   :  0x00000010,
		NTLM_NegotiateSeal                   :  0x00000020,
		NTLM_NegotiateDatagram               :  0x00000040,
		NTLM_NegotiateLanManagerKey          :  0x00000080,
		NTLM_Unknown8                        :  0x00000100,
		NTLM_NegotiateNTLM                   :  0x00000200,
		NTLM_NegotiateNTOnly                 :  0x00000400,
		NTLM_Anonymous                       :  0x00000800,
		NTLM_NegotiateOemDomainSupplied      :  0x00001000,
		NTLM_NegotiateOemWorkstationSupplied :  0x00002000,
		NTLM_Unknown6                        :  0x00004000,
		NTLM_NegotiateAlwaysSign             :  0x00008000,
		NTLM_TargetTypeDomain                :  0x00010000,
		NTLM_TargetTypeServer                :  0x00020000,
		NTLM_TargetTypeShare                 :  0x00040000,
		NTLM_NegotiateExtendedSecurity       :  0x00080000,
		NTLM_NegotiateIdentify               :  0x00100000,
		NTLM_Unknown5                        :  0x00200000,
		NTLM_RequestNonNTSessionKey          :  0x00400000,
		NTLM_NegotiateTargetInfo             :  0x00800000,
		NTLM_Unknown4                        :  0x01000000,
		NTLM_NegotiateVersion                :  0x02000000,
		NTLM_Unknown3                        :  0x04000000,
		NTLM_Unknown2                        :  0x08000000,
		NTLM_Unknown1                        :  0x10000000,
		NTLM_Negotiate128                    :  0x20000000,
		NTLM_NegotiateKeyExchange            :  0x40000000,
		NTLM_Negotiate56                     :  0x80000000
	};
	var typeflags = {
		NTLM_TYPE1_FLAGS : 	  flags.NTLM_NegotiateUnicode
							+ flags.NTLM_NegotiateOEM
							+ flags.NTLM_RequestTarget
							+ flags.NTLM_NegotiateNTLM
							+ flags.NTLM_NegotiateOemDomainSupplied
							+ flags.NTLM_NegotiateOemWorkstationSupplied
							+ flags.NTLM_NegotiateAlwaysSign
							+ flags.NTLM_NegotiateExtendedSecurity
							+ flags.NTLM_NegotiateVersion
							+ flags.NTLM_Negotiate128
							+ flags.NTLM_Negotiate56,
	
		NTLM_TYPE2_FLAGS :    flags.NTLM_NegotiateUnicode
							+ flags.NTLM_RequestTarget
							+ flags.NTLM_NegotiateNTLM
							+ flags.NTLM_NegotiateAlwaysSign
							+ flags.NTLM_NegotiateExtendedSecurity
							+ flags.NTLM_NegotiateTargetInfo
							+ flags.NTLM_NegotiateVersion
							+ flags.NTLM_Negotiate128
							+ flags.NTLM_Negotiate56
	};
	
	function createType1Message(options){
		var domain = escape(options.domain.toUpperCase());
		var workstation = escape(options.workstation.toUpperCase());
		var protocol = 'NTLMSSP\0';
	
		var BODY_LENGTH = 40;
	
		var type1flags = typeflags.NTLM_TYPE1_FLAGS;
		if(!domain || domain === '')
			type1flags = type1flags - flags.NTLM_NegotiateOemDomainSupplied;
	
		var pos = 0;
		var buf = new Buffer(BODY_LENGTH + domain.length + workstation.length);
	
	
		buf.write(protocol, pos, protocol.length); pos += protocol.length; // protocol
		buf.writeUInt32LE(1, pos); pos += 4;          // type 1
		buf.writeUInt32LE(type1flags, pos); pos += 4; // TYPE1 flag
	
		buf.writeUInt16LE(domain.length, pos); pos += 2; // domain length
		buf.writeUInt16LE(domain.length, pos); pos += 2; // domain max length
		buf.writeUInt32LE(BODY_LENGTH + workstation.length, pos); pos += 4; // domain buffer offset
	
		buf.writeUInt16LE(workstation.length, pos); pos += 2; // workstation length
		buf.writeUInt16LE(workstation.length, pos); pos += 2; // workstation max length
		buf.writeUInt32LE(BODY_LENGTH, pos); pos += 4; // workstation buffer offset
	
		buf.writeUInt8(5, pos); pos += 1;      //ProductMajorVersion
		buf.writeUInt8(1, pos); pos += 1;      //ProductMinorVersion
		buf.writeUInt16LE(2600, pos); pos += 2; //ProductBuild
	
		buf.writeUInt8(0 , pos); pos += 1; //VersionReserved1
		buf.writeUInt8(0 , pos); pos += 1; //VersionReserved2
		buf.writeUInt8(0 , pos); pos += 1; //VersionReserved3
		buf.writeUInt8(15, pos); pos += 1; //NTLMRevisionCurrent
	
		buf.write(workstation, pos, workstation.length, 'ascii'); pos += workstation.length; // workstation string
		buf.write(domain     , pos, domain.length     , 'ascii'); pos += domain.length;
	
		return 'NTLM ' + buf.toString('base64');
	}
	
	function parseType2Message(rawmsg, callback){
		var match = rawmsg.match(/NTLM (.+)?/);
		if(!match || !match[1])
			return callback(new Error("Couldn't find NTLM in the message type2 comming from the server"));
	
		var buf = new Buffer(match[1], 'base64');
	
		var msg = {};
	
		msg.signature = buf.slice(0, 8);
		msg.type = buf.readInt16LE(8);
	
		if(msg.type != 2)
			return callback(new Error("Server didn't return a type 2 message"));
	
		msg.targetNameLen = buf.readInt16LE(12);
		msg.targetNameMaxLen = buf.readInt16LE(14);
		msg.targetNameOffset = buf.readInt32LE(16);
		msg.targetName  = buf.slice(msg.targetNameOffset, msg.targetNameOffset + msg.targetNameMaxLen);
	
	    msg.negotiateFlags = buf.readInt32LE(20);
	    msg.serverChallenge = buf.slice(24, 32);
	    msg.reserved = buf.slice(32, 40);
	
	    if(msg.negotiateFlags & flags.NTLM_NegotiateTargetInfo){
	    	msg.targetInfoLen = buf.readInt16LE(40);
	    	msg.targetInfoMaxLen = buf.readInt16LE(42);
	    	msg.targetInfoOffset = buf.readInt32LE(44);
	    	msg.targetInfo = buf.slice(msg.targetInfoOffset, msg.targetInfoOffset + msg.targetInfoLen);
	    }
		return msg;
	}
	
	function createType3Message(msg2, options){
		var nonce = msg2.serverChallenge;
		var username = options.username;
		var password = options.password;
		var negotiateFlags = msg2.negotiateFlags;
	
		var isUnicode = negotiateFlags & flags.NTLM_NegotiateUnicode;
		var isNegotiateExtendedSecurity = negotiateFlags & flags.NTLM_NegotiateExtendedSecurity;
	
		var BODY_LENGTH = 72;
	
		var domainName = escape(options.domain.toUpperCase());
		var workstation = escape(options.workstation.toUpperCase());
	
		var workstationBytes, domainNameBytes, usernameBytes, encryptedRandomSessionKeyBytes;
	
		var encryptedRandomSessionKey = "";
		if(isUnicode){
			workstationBytes = new Buffer(workstation, 'utf16le');
			domainNameBytes = new Buffer(domainName, 'utf16le');
			usernameBytes = new Buffer(username, 'utf16le');
			encryptedRandomSessionKeyBytes = new Buffer(encryptedRandomSessionKey, 'utf16le');
		}else{
			workstationBytes = new Buffer(workstation, 'ascii');
			domainNameBytes = new Buffer(domainName, 'ascii');
			usernameBytes = new Buffer(username, 'ascii');
			encryptedRandomSessionKeyBytes = new Buffer(encryptedRandomSessionKey, 'ascii');
		}
	
		var lmChallengeResponse = calc_resp(create_LM_hashed_password_v1(password), nonce);
		var ntChallengeResponse = calc_resp(create_NT_hashed_password_v1(password), nonce);
	
		if(isNegotiateExtendedSecurity){
			var pwhash = create_NT_hashed_password_v1(password);
		 	var clientChallenge = "";
		 	for(var i=0; i < 8; i++){
		 		clientChallenge += String.fromCharCode( Math.floor(Math.random()*256) );
		   	}
		   	var clientChallengeBytes = new Buffer(clientChallenge, 'ascii');
		    var challenges = ntlm2sr_calc_resp(pwhash, nonce, clientChallengeBytes);
		    lmChallengeResponse = challenges.lmChallengeResponse;
		    ntChallengeResponse = challenges.ntChallengeResponse;
		}
	
		var signature = 'NTLMSSP\0';
	
		var pos = 0;
		var buf = new Buffer(BODY_LENGTH + domainNameBytes.length + usernameBytes.length + workstationBytes.length + lmChallengeResponse.length + ntChallengeResponse.length + encryptedRandomSessionKeyBytes.length);
	
		buf.write(signature, pos, signature.length); pos += signature.length;
		buf.writeUInt32LE(3, pos); pos += 4;          // type 1
	
		buf.writeUInt16LE(lmChallengeResponse.length, pos); pos += 2; // LmChallengeResponseLen
		buf.writeUInt16LE(lmChallengeResponse.length, pos); pos += 2; // LmChallengeResponseMaxLen
		buf.writeUInt32LE(BODY_LENGTH + domainNameBytes.length + usernameBytes.length + workstationBytes.length, pos); pos += 4; // LmChallengeResponseOffset
	
		buf.writeUInt16LE(ntChallengeResponse.length, pos); pos += 2; // NtChallengeResponseLen
		buf.writeUInt16LE(ntChallengeResponse.length, pos); pos += 2; // NtChallengeResponseMaxLen
		buf.writeUInt32LE(BODY_LENGTH + domainNameBytes.length + usernameBytes.length + workstationBytes.length + lmChallengeResponse.length, pos); pos += 4; // NtChallengeResponseOffset
	
		buf.writeUInt16LE(domainNameBytes.length, pos); pos += 2; // DomainNameLen
		buf.writeUInt16LE(domainNameBytes.length, pos); pos += 2; // DomainNameMaxLen
		buf.writeUInt32LE(BODY_LENGTH, pos); pos += 4; 			  // DomainNameOffset
	
		buf.writeUInt16LE(usernameBytes.length, pos); pos += 2; // UserNameLen
		buf.writeUInt16LE(usernameBytes.length, pos); pos += 2; // UserNameMaxLen
		buf.writeUInt32LE(BODY_LENGTH + domainNameBytes.length, pos); pos += 4; // UserNameOffset
	
		buf.writeUInt16LE(workstationBytes.length, pos); pos += 2; // WorkstationLen
		buf.writeUInt16LE(workstationBytes.length, pos); pos += 2; // WorkstationMaxLen
		buf.writeUInt32LE(BODY_LENGTH + domainNameBytes.length + usernameBytes.length, pos); pos += 4; // WorkstationOffset
	
		buf.writeUInt16LE(encryptedRandomSessionKeyBytes.length, pos); pos += 2; // EncryptedRandomSessionKeyLen
		buf.writeUInt16LE(encryptedRandomSessionKeyBytes.length, pos); pos += 2; // EncryptedRandomSessionKeyMaxLen
		buf.writeUInt32LE(BODY_LENGTH + domainNameBytes.length + usernameBytes.length + workstationBytes.length + lmChallengeResponse.length + ntChallengeResponse.length, pos); pos += 4; // EncryptedRandomSessionKeyOffset
	
		buf.writeUInt32LE(typeflags.NTLM_TYPE2_FLAGS, pos); pos += 4; // NegotiateFlags
	
		buf.writeUInt8(5, pos); pos++; // ProductMajorVersion
		buf.writeUInt8(1, pos); pos++; // ProductMinorVersion
		buf.writeUInt16LE(2600, pos); pos += 2; // ProductBuild
		buf.writeUInt8(0, pos); pos++; // VersionReserved1
		buf.writeUInt8(0, pos); pos++; // VersionReserved2
		buf.writeUInt8(0, pos); pos++; // VersionReserved3
		buf.writeUInt8(15, pos); pos++; // NTLMRevisionCurrent
	
		domainNameBytes.copy(buf, pos); pos += domainNameBytes.length;
		usernameBytes.copy(buf, pos); pos += usernameBytes.length;
		workstationBytes.copy(buf, pos); pos += workstationBytes.length;
		lmChallengeResponse.copy(buf, pos); pos += lmChallengeResponse.length;
		ntChallengeResponse.copy(buf, pos); pos += ntChallengeResponse.length;
		encryptedRandomSessionKeyBytes.copy(buf, pos); pos += encryptedRandomSessionKeyBytes.length;
	
		return 'NTLM ' + buf.toString('base64');
	}
	
	function create_LM_hashed_password_v1(password){
		// fix the password length to 14 bytes
		password = password.toUpperCase();
		var passwordBytes = new Buffer(password, 'ascii');
	
		var passwordBytesPadded = new Buffer(14);
		passwordBytesPadded.fill("\0");
		var sourceEnd = 14;
		if(passwordBytes.length < 14) sourceEnd = passwordBytes.length;
		passwordBytes.copy(passwordBytesPadded, 0, 0, sourceEnd);
	
		// split into 2 parts of 7 bytes:
		var firstPart = passwordBytesPadded.slice(0,7);
		var secondPart = passwordBytesPadded.slice(7);
	
		function encrypt(buf){
			var key = insertZerosEvery7Bits(buf);
			var des = crypto.createCipheriv('DES-ECB', key, '');
			return des.update("KGS!@#$%"); // page 57 in [MS-NLMP]);
		}
	
		var firstPartEncrypted = encrypt(firstPart);
		var secondPartEncrypted = encrypt(secondPart);
	
		return Buffer.concat([firstPartEncrypted, secondPartEncrypted]);
	}
	
	function insertZerosEvery7Bits(buf){
		var binaryArray = bytes2binaryArray(buf);
		var newBinaryArray = [];
		for(var i=0; i<binaryArray.length; i++){
			newBinaryArray.push(binaryArray[i]);
	
			if((i+1)%7 === 0){
				newBinaryArray.push(0);
			}
		}
		return binaryArray2bytes(newBinaryArray);
	}
	
	function bytes2binaryArray(buf){
		var hex2binary = {
			0: [0,0,0,0],
			1: [0,0,0,1],
			2: [0,0,1,0],
			3: [0,0,1,1],
			4: [0,1,0,0],
			5: [0,1,0,1],
			6: [0,1,1,0],
			7: [0,1,1,1],
			8: [1,0,0,0],
			9: [1,0,0,1],
			A: [1,0,1,0],
			B: [1,0,1,1],
			C: [1,1,0,0],
			D: [1,1,0,1],
			E: [1,1,1,0],
			F: [1,1,1,1]
		};
	
		var hexString = buf.toString('hex').toUpperCase();
		var array = [];
		for(var i=0; i<hexString.length; i++){
	   		var hexchar = hexString.charAt(i);
	   		array = array.concat(hex2binary[hexchar]);
	   	}
	   	return array;
	}
	
	function binaryArray2bytes(array){
		var binary2hex = {
			'0000': 0,
			'0001': 1,
			'0010': 2,
			'0011': 3,
			'0100': 4,
			'0101': 5,
			'0110': 6,
			'0111': 7,
			'1000': 8,
			'1001': 9,
			'1010': 'A',
			'1011': 'B',
			'1100': 'C',
			'1101': 'D',
			'1110': 'E',
			'1111': 'F'
		};
	
	 	var bufArray = [];
	
		for(var i=0; i<array.length; i +=8 ){
			if((i+7) > array.length)
				break;
	
			var binString1 = '' + array[i] + '' + array[i+1] + '' + array[i+2] + '' + array[i+3];
			var binString2 = '' + array[i+4] + '' + array[i+5] + '' + array[i+6] + '' + array[i+7];
	   		var hexchar1 = binary2hex[binString1];
	   		var hexchar2 = binary2hex[binString2];
	
	   		var buf = new Buffer(hexchar1 + '' + hexchar2, 'hex');
	   		bufArray.push(buf);
	   	}
	
	   	return Buffer.concat(bufArray);
	}
	
	function create_NT_hashed_password_v1(password){
		var buf = new Buffer(password, 'utf16le');
		var md4 = crypto.createHash('md4');
		md4.update(buf);
		return new Buffer(md4.digest());
	}
	
	function calc_resp(password_hash, server_challenge){
	    // padding with zeros to make the hash 21 bytes long
	    var passHashPadded = new Buffer(21);
	    passHashPadded.fill("\0");
	    password_hash.copy(passHashPadded, 0, 0, password_hash.length);
	
	    var resArray = [];
	
	    var des = crypto.createCipheriv('DES-ECB', insertZerosEvery7Bits(passHashPadded.slice(0,7)), '');
	    resArray.push( des.update(server_challenge.slice(0,8)) );
	
	    des = crypto.createCipheriv('DES-ECB', insertZerosEvery7Bits(passHashPadded.slice(7,14)), '');
	    resArray.push( des.update(server_challenge.slice(0,8)) );
	
	    des = crypto.createCipheriv('DES-ECB', insertZerosEvery7Bits(passHashPadded.slice(14,21)), '');
	    resArray.push( des.update(server_challenge.slice(0,8)) );
	
	   	return Buffer.concat(resArray);
	}
	
	function ntlm2sr_calc_resp(responseKeyNT, serverChallenge, clientChallenge){
		// padding with zeros to make the hash 16 bytes longer
	    var lmChallengeResponse = new Buffer(clientChallenge.length + 16);
	    lmChallengeResponse.fill("\0");
	    clientChallenge.copy(lmChallengeResponse, 0, 0, clientChallenge.length);
	
	    var buf = Buffer.concat([serverChallenge, clientChallenge]);
	    var md5 = crypto.createHash('md5');
	    md5.update(buf);
	    var sess = md5.digest();
	    var ntChallengeResponse = calc_resp(responseKeyNT, sess.slice(0,8));
	
	    return {
	    	lmChallengeResponse: lmChallengeResponse,
	    	ntChallengeResponse: ntChallengeResponse
	    };
	}
	
	exports.createType1Message = createType1Message;
	exports.parseType2Message = parseType2Message;
	exports.createType3Message = createType3Message;
	
	
	
	


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("dns");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = {
		"name": "nodemailer-direct-transport",
		"version": "3.3.2",
		"description": "Direct transport for Nodemailer",
		"main": "lib/direct-transport.js",
		"scripts": {
			"test": "grunt mochaTest"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/andris9/nodemailer-direct-transport.git"
		},
		"keywords": [
			"SMTP",
			"Nodemailer"
		],
		"author": "Andris Reinman",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/andris9/nodemailer-direct-transport/issues"
		},
		"homepage": "http://github.com/andris9/nodemailer-direct-transport",
		"dependencies": {
			"nodemailer-shared": "1.1.0",
			"smtp-connection": "2.12.0"
		},
		"devDependencies": {
			"chai": "^3.5.0",
			"grunt": "^1.0.1",
			"grunt-eslint": "^19.0.0",
			"grunt-mocha-test": "^0.12.7",
			"mocha": "^3.0.2",
			"smtp-server": "^1.14.2"
		}
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SMTPConnection = __webpack_require__(68);
	var packageData = __webpack_require__(77);
	var wellknown = __webpack_require__(78);
	var shared = __webpack_require__(65);
	
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var util = __webpack_require__(51);
	
	// expose to the world
	module.exports = function (options) {
	    return new SMTPTransport(options);
	};
	
	/**
	 * Creates a SMTP transport object for Nodemailer
	 *
	 * @constructor
	 * @param {Object} options Connection options
	 */
	function SMTPTransport(options) {
	    EventEmitter.call(this);
	
	    options = options || {};
	    if (typeof options === 'string') {
	        options = {
	            url: options
	        };
	    }
	
	    var urlData;
	    var service = options.service;
	
	    if (typeof options.getSocket === 'function') {
	        this.getSocket = options.getSocket;
	    }
	
	    if (options.url) {
	        urlData = shared.parseConnectionUrl(options.url);
	        service = service || urlData.service;
	    }
	
	    this.options = assign(
	        false, // create new object
	        options, // regular options
	        urlData, // url options
	        service && wellknown(service) // wellknown options
	    );
	
	    this.logger = shared.getLogger(this.options);
	
	    // temporary object
	    var connection = new SMTPConnection(this.options);
	
	    this.name = 'SMTP';
	    this.version = packageData.version + '[client:' + connection.version + ']';
	}
	util.inherits(SMTPTransport, EventEmitter);
	
	/**
	 * Placeholder function for creating proxy sockets. This method immediatelly returns
	 * without a socket
	 *
	 * @param {Object} options Connection options
	 * @param {Function} callback Callback function to run with the socket keys
	 */
	SMTPTransport.prototype.getSocket = function (options, callback) {
	    // return immediatelly
	    return callback(null, false);
	};
	
	/**
	 * Sends an e-mail using the selected settings
	 *
	 * @param {Object} mail Mail object
	 * @param {Function} callback Callback function
	 */
	SMTPTransport.prototype.send = function (mail, callback) {
	
	    this.getSocket(this.options, function (err, socketOptions) {
	        if (err) {
	            return callback(err);
	        }
	
	        var options = this.options;
	        if (socketOptions && socketOptions.connection) {
	            this.logger.info('Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
	            // only copy options if we need to modify it
	            options = assign(false, options);
	            Object.keys(socketOptions).forEach(function (key) {
	                options[key] = socketOptions[key];
	            });
	        }
	
	        var connection = new SMTPConnection(options);
	        var returned = false;
	
	        connection.once('error', function (err) {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            connection.close();
	            return callback(err);
	        });
	
	        connection.once('end', function () {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(new Error('Connection closed'));
	        });
	
	        var sendMessage = function () {
	            var envelope = mail.message.getEnvelope();
	            var messageId = (mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
	            var recipients = [].concat(envelope.to || []);
	            if (recipients.length > 3) {
	                recipients.push('...and ' + recipients.splice(2).length + ' more');
	            }
	
	            this.logger.info('Sending message <%s> to <%s>', messageId, recipients.join(', '));
	
	            connection.send(envelope, mail.message.createReadStream(), function (err, info) {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	
	                connection.close();
	                if (err) {
	                    return callback(err);
	                }
	                info.envelope = {
	                    from: envelope.from,
	                    to: envelope.to
	                };
	                info.messageId = messageId;
	                return callback(null, info);
	            });
	        }.bind(this);
	
	        connection.connect(function () {
	            if (returned) {
	                return;
	            }
	
	            if (this.options.auth) {
	                connection.login(this.options.auth, function (err) {
	                    if (returned) {
	                        return;
	                    }
	
	                    if (err) {
	                        returned = true;
	                        connection.close();
	                        return callback(err);
	                    }
	
	                    sendMessage();
	                });
	            } else {
	                sendMessage();
	            }
	        }.bind(this));
	    }.bind(this));
	};
	
	/**
	 * Verifies SMTP configuration
	 *
	 * @param {Function} callback Callback function
	 */
	SMTPTransport.prototype.verify = function (callback) {
	    var promise;
	
	    if (!callback && typeof Promise === 'function') {
	        promise = new Promise(function (resolve, reject) {
	            callback = shared.callbackPromise(resolve, reject);
	        });
	    }
	
	    this.getSocket(this.options, function (err, socketOptions) {
	        if (err) {
	            return callback(err);
	        }
	
	        var options = this.options;
	        if (socketOptions && socketOptions.connection) {
	            this.logger.info('Using proxied socket from %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort);
	            options = assign(false, options);
	            Object.keys(socketOptions).forEach(function (key) {
	                options[key] = socketOptions[key];
	            });
	        }
	
	        var connection = new SMTPConnection(options);
	        var returned = false;
	
	        connection.once('error', function (err) {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            connection.close();
	            return callback(err);
	        });
	
	        connection.once('end', function () {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(new Error('Connection closed'));
	        });
	
	        var finalize = function () {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            connection.quit();
	            return callback(null, true);
	        };
	
	        connection.connect(function () {
	            if (returned) {
	                return;
	            }
	
	            if (this.options.auth) {
	                connection.login(this.options.auth, function (err) {
	                    if (returned) {
	                        return;
	                    }
	
	                    if (err) {
	                        returned = true;
	                        connection.close();
	                        return callback(err);
	                    }
	
	                    finalize();
	                });
	            } else {
	                finalize();
	            }
	        }.bind(this));
	    }.bind(this));
	
	    return promise;
	};
	
	/**
	 * Copies properties from source objects to target objects
	 */
	function assign( /* target, ... sources */ ) {
	    var args = Array.prototype.slice.call(arguments);
	    var target = args.shift() || {};
	
	    args.forEach(function (source) {
	        Object.keys(source || {}).forEach(function (key) {
	            if (['tls', 'auth'].indexOf(key) >= 0 && source[key] && typeof source[key] === 'object') {
	                // tls and auth are special keys that need to be enumerated separately
	                // other objects are passed as is
	                if (!target[key]) {
	                    // esnure that target has this key
	                    target[key] = {};
	                }
	                Object.keys(source[key]).forEach(function (subKey) {
	                    target[key][subKey] = source[key][subKey];
	                });
	            } else {
	                target[key] = source[key];
	            }
	        });
	    });
	    return target;
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = {
		"name": "nodemailer-smtp-transport",
		"version": "2.7.2",
		"description": "SMTP transport for Nodemailer",
		"main": "lib/smtp-transport.js",
		"scripts": {
			"test": "grunt mochaTest"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/andris9/nodemailer-smtp-transport.git"
		},
		"keywords": [
			"SMTP",
			"Nodemailer"
		],
		"author": "Andris Reinman",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/andris9/nodemailer-smtp-transport/issues"
		},
		"homepage": "http://github.com/andris9/nodemailer-smtp-transport",
		"dependencies": {
			"nodemailer-shared": "1.1.0",
			"nodemailer-wellknown": "0.1.10",
			"smtp-connection": "2.12.0"
		},
		"devDependencies": {
			"chai": "^3.5.0",
			"grunt": "^1.0.1",
			"grunt-cli": "^1.2.0",
			"grunt-eslint": "^19.0.0",
			"grunt-mocha-test": "^0.12.7",
			"mocha": "^3.0.2",
			"smtp-server": "^1.14.2"
		}
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var services = __webpack_require__(79);
	var normalized = {};
	
	Object.keys(services).forEach(function(key) {
	    var service = services[key];
	
	    normalized[normalizeKey(key)] = normalizeService(service);
	
	    [].concat(service.aliases || []).forEach(function(alias) {
	        normalized[normalizeKey(alias)] = normalizeService(service);
	    });
	
	    [].concat(service.domains || []).forEach(function(domain) {
	        normalized[normalizeKey(domain)] = normalizeService(service);
	    });
	});
	
	function normalizeKey(key) {
	    return key.replace(/[^a-zA-Z0-9.\-]/g, '').toLowerCase();
	}
	
	function normalizeService(service) {
	    var filter = ['domains', 'aliases'];
	    var response = {};
	
	    Object.keys(service).forEach(function(key) {
	        if (filter.indexOf(key) < 0) {
	            response[key] = service[key];
	        }
	    });
	
	    return response;
	}
	
	/**
	 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
	 * an email address (like 'test@googlemail.com').
	 *
	 * @param {String} key [description]
	 * @returns {Object} SMTP config or false if not found
	 */
	module.exports = function(key) {
	    key = normalizeKey(key.split('@').pop());
	    return normalized[key] || false;
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = {
		"126": {
			"host": "smtp.126.com",
			"port": 465,
			"secure": true
		},
		"163": {
			"host": "smtp.163.com",
			"port": 465,
			"secure": true
		},
		"1und1": {
			"host": "smtp.1und1.de",
			"port": 465,
			"secure": true,
			"authMethod": "LOGIN"
		},
		"AOL": {
			"domains": [
				"aol.com"
			],
			"host": "smtp.aol.com",
			"port": 587
		},
		"DebugMail": {
			"host": "debugmail.io",
			"port": 25
		},
		"DynectEmail": {
			"aliases": [
				"Dynect"
			],
			"host": "smtp.dynect.net",
			"port": 25
		},
		"FastMail": {
			"domains": [
				"fastmail.fm"
			],
			"host": "mail.messagingengine.com",
			"port": 465,
			"secure": true
		},
		"GandiMail": {
			"aliases": [
				"Gandi",
				"Gandi Mail"
			],
			"host": "mail.gandi.net",
			"port": 587
		},
		"Gmail": {
			"aliases": [
				"Google Mail"
			],
			"domains": [
				"gmail.com",
				"googlemail.com"
			],
			"host": "smtp.gmail.com",
			"port": 465,
			"secure": true
		},
		"Godaddy": {
			"host": "smtpout.secureserver.net",
			"port": 25
		},
		"GodaddyAsia": {
			"host": "smtp.asia.secureserver.net",
			"port": 25
		},
		"GodaddyEurope": {
			"host": "smtp.europe.secureserver.net",
			"port": 25
		},
		"hot.ee": {
			"host": "mail.hot.ee"
		},
		"Hotmail": {
			"aliases": [
				"Outlook",
				"Outlook.com",
				"Hotmail.com"
			],
			"domains": [
				"hotmail.com",
				"outlook.com"
			],
			"host": "smtp.live.com",
			"port": 587,
			"tls": {
				"ciphers": "SSLv3"
			}
		},
		"iCloud": {
			"aliases": [
				"Me",
				"Mac"
			],
			"domains": [
				"me.com",
				"mac.com"
			],
			"host": "smtp.mail.me.com",
			"port": 587
		},
		"mail.ee": {
			"host": "smtp.mail.ee"
		},
		"Mail.ru": {
			"host": "smtp.mail.ru",
			"port": 465,
			"secure": true
		},
		"Maildev": {
			"port": 1025,
			"ignoreTLS": true
		},
		"Mailgun": {
			"host": "smtp.mailgun.org",
			"port": 587
		},
		"Mailjet": {
			"host": "in.mailjet.com",
			"port": 587
		},
		"Mandrill": {
			"host": "smtp.mandrillapp.com",
			"port": 587
		},
		"Naver": {
			"host": "smtp.naver.com",
			"port": 587
		},
		"OpenMailBox": {
			"aliases": [
				"OMB",
				"openmailbox.org"
			],
			"host": "smtp.openmailbox.org",
			"port": 465,
			"secure": true
		},
		"Postmark": {
			"aliases": [
				"PostmarkApp"
			],
			"host": "smtp.postmarkapp.com",
			"port": 2525
		},
		"QQ": {
			"domains": [
				"qq.com"
			],
			"host": "smtp.qq.com",
			"port": 465,
			"secure": true
		},
		"QQex": {
			"aliases": [
				"QQ Enterprise"
			],
			"domains": [
				"exmail.qq.com"
			],
			"host": "smtp.exmail.qq.com",
			"port": 465,
			"secure": true
		},
		"SendCloud": {
			"host": "smtpcloud.sohu.com",
			"port": 25
		},
		"SendGrid": {
			"host": "smtp.sendgrid.net",
			"port": 587
		},
		"SES": {
			"host": "email-smtp.us-east-1.amazonaws.com",
			"port": 465,
			"secure": true
		},
		"SES-US-EAST-1": {
			"host": "email-smtp.us-east-1.amazonaws.com",
			"port": 465,
			"secure": true
		},
		"SES-US-WEST-2": {
			"host": "email-smtp.us-west-2.amazonaws.com",
			"port": 465,
			"secure": true
		},
		"SES-EU-WEST-1": {
			"host": "email-smtp.eu-west-1.amazonaws.com",
			"port": 465,
			"secure": true
		},
		"Sparkpost": {
			"aliases": [
				"SparkPost",
				"SparkPost Mail"
			],
			"domains": [
				"sparkpost.com"
			],
			"host": "smtp.sparkpostmail.com",
			"port": 587,
			"secure": false
		},
		"Yahoo": {
			"domains": [
				"yahoo.com"
			],
			"host": "smtp.mail.yahoo.com",
			"port": 465,
			"secure": true
		},
		"Yandex": {
			"domains": [
				"yandex.ru"
			],
			"host": "smtp.yandex.ru",
			"port": 465,
			"secure": true
		},
		"Zoho": {
			"host": "smtp.zoho.com",
			"port": 465,
			"secure": true,
			"authMethod": "LOGIN"
		}
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SMTPConnection = __webpack_require__(68);
	var packageData = __webpack_require__(81);
	var wellknown = __webpack_require__(78);
	var assign = __webpack_require__(82);
	var PoolResource = __webpack_require__(83);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var util = __webpack_require__(51);
	var shared = __webpack_require__(65);
	
	// expose to the world
	module.exports = function (options) {
	    return new SMTPPool(options);
	};
	
	/**
	 * Creates a SMTP pool transport object for Nodemailer
	 *
	 * @constructor
	 * @param {Object} options SMTP Connection options
	 */
	function SMTPPool(options) {
	    EventEmitter.call(this);
	
	    options = options || {};
	    if (typeof options === 'string') {
	        options = {
	            url: options
	        };
	    }
	
	    var urlData;
	    var service = options.service;
	
	    if (typeof options.getSocket === 'function') {
	        this.getSocket = options.getSocket;
	    }
	
	    if (options.url) {
	        urlData = shared.parseConnectionUrl(options.url);
	        service = service || urlData.service;
	    }
	
	    this.options = assign(
	        false, // create new object
	        options, // regular options
	        urlData, // url options
	        service && wellknown(service) // wellknown options
	    );
	
	    this.options.maxConnections = this.options.maxConnections || 5;
	    this.options.maxMessages = this.options.maxMessages || 100;
	
	    this.logger = this.options.logger = shared.getLogger(this.options);
	
	    // temporary object
	    var connection = new SMTPConnection(this.options);
	
	    this.name = 'SMTP (pool)';
	    this.version = packageData.version + '[client:' + connection.version + ']';
	
	    this._rateLimit = {
	        counter: 0,
	        timeout: null,
	        waiting: [],
	        checkpoint: false
	    };
	    this._closed = false;
	    this._queue = [];
	    this._connections = [];
	    this._connectionCounter = 0;
	
	    this.idling = true;
	
	    setImmediate(function () {
	        if (this.idling) {
	            this.emit('idle');
	        }
	    }.bind(this));
	}
	util.inherits(SMTPPool, EventEmitter);
	
	/**
	 * Placeholder function for creating proxy sockets. This method immediatelly returns
	 * without a socket
	 *
	 * @param {Object} options Connection options
	 * @param {Function} callback Callback function to run with the socket keys
	 */
	SMTPPool.prototype.getSocket = function (options, callback) {
	    // return immediatelly
	    return callback(null, false);
	};
	
	/**
	 * Queues an e-mail to be sent using the selected settings
	 *
	 * @param {Object} mail Mail object
	 * @param {Function} callback Callback function
	 */
	SMTPPool.prototype.send = function (mail, callback) {
	    if (this._closed) {
	        return false;
	    }
	
	    this._queue.push({
	        mail: mail,
	        callback: callback
	    });
	
	    if (this.idling && this._queue.length >= this.options.maxConnections) {
	        this.idling = false;
	    }
	
	    setImmediate(this._processMessages.bind(this));
	
	    return true;
	};
	
	/**
	 * Closes all connections in the pool. If there is a message being sent, the connection
	 * is closed later
	 */
	SMTPPool.prototype.close = function () {
	    var connection;
	    var len = this._connections.length;
	    this._closed = true;
	
	    // clear rate limit timer if it exists
	    clearTimeout(this._rateLimit.timeout);
	
	    // remove all available connections
	    for (var i = len - 1; i >= 0; i--) {
	        if (this._connections[i] && this._connections[i].available) {
	            connection = this._connections[i];
	            connection.close();
	            this.logger.info('Connection #%s removed', connection.id);
	        }
	    }
	
	    if (len && !this._connections.length) {
	        this.logger.debug('All connections removed');
	    }
	
	    // make sure that entire queue would be cleaned
	    var invokeCallbacks = function () {
	        if (!this._queue.length) {
	            this.logger.debug('Pending queue elements cleared');
	            return;
	        }
	        var element = this._queue.shift();
	        if (element && typeof element.callback === 'function') {
	            try {
	                element.callback(new Error('Connection pool was closed'));
	            } catch (E) {
	                this.logger.error('Callback error for #%s: %s', connection.id, E.message);
	            }
	        }
	        setImmediate(invokeCallbacks);
	    }.bind(this);
	    setImmediate(invokeCallbacks);
	};
	
	/**
	 * Check the queue and available connections. If there is a message to be sent and there is
	 * an available connection, then use this connection to send the mail
	 */
	SMTPPool.prototype._processMessages = function () {
	    var connection;
	    var i, len;
	
	    // do nothing if already closed
	    if (this._closed) {
	        return;
	    }
	
	    // do nothing if queue is empty
	    if (!this._queue.length) {
	        if (!this.idling) {
	            // no pending jobs
	            this.idling = true;
	            this.emit('idle');
	        }
	        return;
	    }
	
	    // find first available connection
	    for (i = 0, len = this._connections.length; i < len; i++) {
	        if (this._connections[i].available) {
	            connection = this._connections[i];
	            break;
	        }
	    }
	
	    if (!connection && this._connections.length < this.options.maxConnections) {
	        connection = this._createConnection();
	    }
	
	    if (!connection) {
	        // no more free connection slots available
	        this.idling = false;
	        return;
	    }
	
	    // check if there is free space in the processing queue
	    if (!this.idling && this._queue.length < this.options.maxConnections) {
	        this.idling = true;
	        this.emit('idle');
	    }
	
	    var element = connection.queueElement = this._queue.shift();
	    element.messageId = (connection.queueElement.mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
	
	    connection.available = false;
	
	    this.logger.debug('Assigned message <%s> to #%s (%s)', element.messageId, connection.id, connection.messages + 1);
	
	    if (this.options.rateLimit) {
	        this._rateLimit.counter++;
	        if (!this._rateLimit.checkpoint) {
	            this._rateLimit.checkpoint = Date.now();
	        }
	    }
	
	    connection.send(element.mail, function (err, info) {
	        // only process callback if current handler is not changed
	        if (element === connection.queueElement) {
	            try {
	                element.callback(err, info);
	            } catch (E) {
	                this.logger.error('Callback error for #%s: %s', connection.id, E.message);
	            }
	            connection.queueElement = false;
	        }
	    }.bind(this));
	};
	
	/**
	 * Creates a new pool resource
	 */
	SMTPPool.prototype._createConnection = function () {
	    var connection = new PoolResource(this);
	
	    connection.id = ++this._connectionCounter;
	
	    this.logger.info('Created new pool resource #%s', connection.id);
	
	    // resource comes available
	    connection.on('available', function () {
	        this.logger.debug('Connection #%s became available', connection.id);
	
	        if (this._closed) {
	            // if already closed run close() that will remove this connections from connections list
	            this.close();
	        } else {
	            // check if there's anything else to send
	            this._processMessages();
	        }
	    }.bind(this));
	
	    // resource is terminated with an error
	    connection.once('error', function (err) {
	        if (err.code !== 'EMAXLIMIT') {
	            this.logger.error('Pool Error for #%s: %s', connection.id, err.message);
	        } else {
	            this.logger.debug('Max messages limit exchausted for #%s', connection.id);
	        }
	
	        if (connection.queueElement) {
	            try {
	                connection.queueElement.callback(err);
	            } catch (E) {
	                this.logger.error('Callback error for #%s: %s', connection.id, E.message);
	            }
	            connection.queueElement = false;
	        }
	
	        // remove the erroneus connection from connections list
	        this._removeConnection(connection);
	
	        this._continueProcessing();
	    }.bind(this));
	
	    connection.once('close', function () {
	        this.logger.info('Connection #%s was closed', connection.id);
	
	        this._removeConnection(connection);
	
	        if (connection.queueElement) {
	            // If the connection closed when sending, add the message to the queue again
	            // Note that we must wait a bit.. because the callback of the 'error' handler might be called
	            // in the next event loop
	            setTimeout(function () {
	                if (connection.queueElement) {
	                    this.logger.debug('Re-queued message <%s> for #%s', connection.queueElement.messageId, connection.id);
	                    this._queue.unshift(connection.queueElement);
	                    connection.queueElement = false;
	                }
	                this._continueProcessing();
	            }.bind(this), 50);
	        } else {
	            this._continueProcessing();
	        }
	    }.bind(this));
	
	    this._connections.push(connection);
	
	    return connection;
	};
	
	/**
	 * Continue to process message if the pool hasn't closed
	 */
	SMTPPool.prototype._continueProcessing = function () {
	    if (this._closed) {
	        this.close();
	    } else {
	        setTimeout(this._processMessages.bind(this), 100);
	    }
	};
	
	/**
	 * Remove resource from pool
	 *
	 * @param {Object} connection The PoolResource to remove
	 */
	SMTPPool.prototype._removeConnection = function (connection) {
	    var index = this._connections.indexOf(connection);
	
	    if (index !== -1) {
	        this._connections.splice(index, 1);
	    }
	};
	
	/**
	 * Checks if connections have hit current rate limit and if so, queues the availability callback
	 *
	 * @param {Function} callback Callback function to run once rate limiter has been cleared
	 */
	SMTPPool.prototype._checkRateLimit = function (callback) {
	    if (!this.options.rateLimit) {
	        return callback();
	    }
	
	    var now = Date.now();
	
	    if (this._rateLimit.counter < this.options.rateLimit) {
	        return callback();
	    }
	
	    this._rateLimit.waiting.push(callback);
	
	    if (this._rateLimit.checkpoint <= now - 1000) {
	        return this._clearRateLimit();
	    } else if (!this._rateLimit.timeout) {
	        this._rateLimit.timeout = setTimeout(this._clearRateLimit.bind(this), 1000 - (now - this._rateLimit.checkpoint));
	        this._rateLimit.checkpoint = now;
	    }
	};
	
	/**
	 * Clears current rate limit limitation and runs paused callback
	 */
	SMTPPool.prototype._clearRateLimit = function () {
	    clearTimeout(this._rateLimit.timeout);
	    this._rateLimit.timeout = null;
	    this._rateLimit.counter = 0;
	    this._rateLimit.checkpoint = false;
	
	    // resume all paused connections
	    while (this._rateLimit.waiting.length) {
	        var cb = this._rateLimit.waiting.shift();
	        setImmediate(cb);
	    }
	};
	
	/**
	 * Returns true if there are free slots in the queue
	 */
	SMTPPool.prototype.isIdle = function () {
	    return this.idling;
	};
	
	/**
	 * Verifies SMTP configuration
	 *
	 * @param {Function} callback Callback function
	 */
	SMTPPool.prototype.verify = function (callback) {
	    var promise;
	
	    if (!callback && typeof Promise === 'function') {
	        promise = new Promise(function (resolve, reject) {
	            callback = shared.callbackPromise(resolve, reject);
	        });
	    }
	
	    this.getSocket(this.options, function (err, socketOptions) {
	        if (err) {
	            return callback(err);
	        }
	
	        var options = this.options;
	        if (socketOptions && socketOptions.connection) {
	            this.logger.info('Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
	            options = assign(false, options);
	            Object.keys(socketOptions).forEach(function (key) {
	                options[key] = socketOptions[key];
	            });
	        }
	
	        var connection = new SMTPConnection(options);
	        var returned = false;
	
	        connection.once('error', function (err) {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            connection.close();
	            return callback(err);
	        });
	
	        connection.once('end', function () {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(new Error('Connection closed'));
	        });
	
	        var finalize = function () {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            connection.quit();
	            return callback(null, true);
	        };
	
	        connection.connect(function () {
	            if (returned) {
	                return;
	            }
	
	            if (this.options.auth) {
	                connection.login(this.options.auth, function (err) {
	                    if (returned) {
	                        return;
	                    }
	
	                    if (err) {
	                        returned = true;
	                        connection.close();
	                        return callback(err);
	                    }
	
	                    finalize();
	                });
	            } else {
	                finalize();
	            }
	        }.bind(this));
	    }.bind(this));
	
	    return promise;
	};


/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = {
		"name": "nodemailer-smtp-pool",
		"version": "2.8.2",
		"description": "SMTP transport for Nodemailer",
		"main": "lib/smtp-pool.js",
		"scripts": {
			"test": "grunt mochaTest"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/andris9/nodemailer-smtp-pool.git"
		},
		"keywords": [
			"SMTP",
			"Nodemailer"
		],
		"author": "Andris Reinman",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/andris9/nodemailer-smtp-pool/issues"
		},
		"homepage": "http://github.com/andris9/nodemailer-smtp-pool",
		"dependencies": {
			"nodemailer-shared": "1.1.0",
			"nodemailer-wellknown": "0.1.10",
			"smtp-connection": "2.12.0"
		},
		"devDependencies": {
			"chai": "^3.5.0",
			"grunt": "^1.0.1",
			"grunt-cli": "^1.2.0",
			"grunt-eslint": "^19.0.0",
			"grunt-mocha-test": "^0.12.7",
			"mocha": "^3.0.2",
			"smtp-server": "^1.14.2"
		}
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = assign;
	
	/**
	 * Copies properties from source objects to target objects
	 */
	function assign( /* target, ... sources */ ) {
	    var args = Array.prototype.slice.call(arguments);
	    var target = args.shift() || {};
	
	    args.forEach(function (source) {
	        Object.keys(source || {}).forEach(function (key) {
	            if (['tls', 'auth'].indexOf(key) >= 0 && source[key] && typeof source[key] === 'object') {
	                // tls and auth are special keys that need to be enumerated separately
	                // other objects are passed as is
	                if (!target[key]) {
	                    // esnure that target has this key
	                    target[key] = {};
	                }
	                Object.keys(source[key]).forEach(function (subKey) {
	                    target[key][subKey] = source[key][subKey];
	                });
	            } else {
	                target[key] = source[key];
	            }
	        });
	    });
	    return target;
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SMTPConnection = __webpack_require__(68);
	var assign = __webpack_require__(82);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var util = __webpack_require__(51);
	
	module.exports = PoolResource;
	
	/**
	 * Creates an element for the pool
	 *
	 * @constructor
	 * @param {Object} options SMTPPool instance
	 */
	function PoolResource(pool) {
	    EventEmitter.call(this);
	    this.pool = pool;
	    this.options = pool.options;
	
	    this.logger = this.options.logger;
	
	    this._connection = false;
	    this._connected = false;
	
	    this.messages = 0;
	    this.available = true;
	}
	util.inherits(PoolResource, EventEmitter);
	
	/**
	 * Initiates a connection to the SMTP server
	 *
	 * @param {Function} callback Callback function to run once the connection is established or failed
	 */
	PoolResource.prototype.connect = function (callback) {
	    this.pool.getSocket(this.options, function (err, socketOptions) {
	        if (err) {
	            return callback(err);
	        }
	
	        var returned = false;
	        var options = this.options;
	        if (socketOptions && socketOptions.connection) {
	            this.logger.info('Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
	            options = assign(false, options);
	            Object.keys(socketOptions).forEach(function (key) {
	                options[key] = socketOptions[key];
	            });
	        }
	
	        this.connection = new SMTPConnection(options);
	
	        this.connection.once('error', function (err) {
	            this.emit('error', err);
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(err);
	        }.bind(this));
	
	        this.connection.once('end', function () {
	            this.close();
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback();
	        }.bind(this));
	
	        this.connection.connect(function () {
	            if (returned) {
	                return;
	            }
	
	            if (this.options.auth) {
	                this.connection.login(this.options.auth, function (err) {
	                    if (returned) {
	                        return;
	                    }
	                    returned = true;
	
	                    if (err) {
	                        this.connection.close();
	                        this.emit('error', err);
	                        return callback(err);
	                    }
	
	                    this._connected = true;
	                    callback(null, true);
	                }.bind(this));
	            } else {
	                returned = true;
	                this._connected = true;
	                return callback(null, true);
	            }
	        }.bind(this));
	    }.bind(this));
	};
	
	/**
	 * Sends an e-mail to be sent using the selected settings
	 *
	 * @param {Object} mail Mail object
	 * @param {Function} callback Callback function
	 */
	PoolResource.prototype.send = function (mail, callback) {
	    if (!this._connected) {
	        this.connect(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            this.send(mail, callback);
	        }.bind(this));
	        return;
	    }
	
	    var envelope = mail.message.getEnvelope();
	    var messageId = (mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
	    var recipients = [].concat(envelope.to || []);
	    if (recipients.length > 3) {
	        recipients.push('...and ' + recipients.splice(2).length + ' more');
	    }
	
	    this.logger.info('Sending message <%s> using #%s to <%s>', messageId, this.id, recipients.join(', '));
	
	    this.connection.send(envelope, mail.message.createReadStream(), function (err, info) {
	        this.messages++;
	
	        if (err) {
	            this.connection.close();
	            this.emit('error', err);
	            return callback(err);
	        }
	
	        info.envelope = {
	            from: envelope.from,
	            to: envelope.to
	        };
	        info.messageId = messageId;
	
	        setImmediate(function () {
	            var err;
	            if (this.messages >= this.options.maxMessages) {
	                err = new Error('Resource exhausted');
	                err.code = 'EMAXLIMIT';
	                this.connection.close();
	                this.emit('error', err);
	            } else {
	                this.pool._checkRateLimit(function () {
	                    this.available = true;
	                    this.emit('available');
	                }.bind(this));
	            }
	        }.bind(this));
	
	        callback(null, info);
	    }.bind(this));
	};
	
	/**
	 * Closes the connection
	 */
	PoolResource.prototype.close = function () {
	    this._connected = false;
	    if (this.connection) {
	        this.connection.close();
	    }
	    this.emit('close');
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(65);
	
	module.exports = templateSender;
	
	// expose for testing
	module.exports.render = render;
	
	/**
	 * Create template based e-mail sender
	 *
	 * @param {Object} transport Nodemailer transport object to use for actual sending
	 * @param {Object} templates Either an object with template strings or an external renderer
	 * @param {Object} [defaults] Default fields set for every mail sent using this sender
	 * @return {Function} Template based sender
	 */
	function templateSender(transport, templates, defaults) {
	    templates = templates || {};
	    defaults = defaults || {};
	
	    // built in renderer
	    var defaultRenderer = function (context, callback) {
	        var rendered = {};
	        Object.keys(templates).forEach(function (key) {
	            rendered[key] = render(templates[key], {
	                escapeHtml: key === 'html'
	            }, context);
	        });
	        callback(null, rendered);
	    };
	
	    // actual renderer
	    var renderer = (typeof templates.render === 'function' ? templates.render.bind(templates) : defaultRenderer);
	
	    return function (fields, context, callback) {
	
	        var promise;
	
	        if (!callback && typeof Promise === 'function') {
	            promise = new Promise(function (resolve, reject) {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }
	
	        // render data
	        renderer(context, function (err, rendered) {
	            if (err) {
	                return callback(err);
	            }
	            var mailData = mix(defaults, fields, rendered);
	            setImmediate(function () {
	                transport.sendMail(mailData, callback);
	            });
	        });
	
	        return promise;
	    };
	}
	
	/**
	 * Merges multiple objects into one. Assumes single level, except 'headers'
	 */
	function mix( /* obj1, obj2, ..., objN */ ) {
	    var args = Array.prototype.slice.call(arguments);
	    var result = {};
	
	    args.forEach(function (arg) {
	        Object.keys(arg || {}).forEach(function (key) {
	            if (key === 'headers') {
	                if (!result.headers) {
	                    result.headers = {};
	                }
	                Object.keys(arg[key]).forEach(function (hKey) {
	                    if (!(hKey in result.headers)) {
	                        result.headers[hKey] = arg[key][hKey];
	                    }
	                });
	            } else if (!(key in result)) {
	                result[key] = arg[key];
	            }
	        });
	    });
	
	    return result;
	}
	
	/**
	 * Renders a template string using provided context. Values are marked as {{key}} in the template.
	 *
	 * @param {String} str Template string
	 * @param {Object} options Render options. options.escapeHtml=true escapes html specific characters
	 * @param {Object} context Key-value pairs for the template, eg {name: 'User Name'}
	 * @return {String} Rendered template
	 */
	function render(str, options, context) {
	    str = (str || '').toString();
	    context = context || {};
	    options = options || {};
	
	    var re = /\{\{[ ]*([^{}\s]+)[ ]*\}\}/g;
	
	    return str.replace(re, function (match, key) {
	        var value;
	        if (context.hasOwnProperty(key)) {
	            value = context[key].toString();
	            if (options.escapeHtml) {
	                value = value.replace(/["'&<>]/g, function (char) {
	                    switch (char) {
	                        case '&':
	                            return '&amp;';
	                        case '<':
	                            return '&lt;';
	                        case '>':
	                            return '&gt;';
	                        case '"':
	                            return '&quot;';
	                        case '\'':
	                            return '&#039;';
	                        default:
	                            return char;
	                    }
	                });
	            }
	            return value;
	        }
	        return match;
	    });
	}


/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = {
		"name": "nodemailer",
		"version": "2.7.0",
		"description": "Easy as cake e-mail sending from your Node.js applications",
		"main": "lib/nodemailer.js",
		"homepage": "https://nodemailer.com/",
		"scripts": {
			"test": "grunt mochaTest"
		},
		"repository": {
			"type": "git",
			"url": "https://nodemailer.com/"
		},
		"keywords": [
			"e-mail",
			"mime",
			"email",
			"mail",
			"sendmail",
			"ses",
			"smtp"
		],
		"author": "Andris Reinman",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/nodemailer/nodemailer/issues"
		},
		"dependencies": {
			"libmime": "3.0.0",
			"mailcomposer": "4.0.0",
			"nodemailer-direct-transport": "3.3.2",
			"nodemailer-shared": "1.1.0",
			"nodemailer-smtp-pool": "2.8.2",
			"nodemailer-smtp-transport": "2.7.2",
			"socks": "1.1.9"
		},
		"devDependencies": {
			"amqp": "^0.2.6",
			"chai": "^3.5.0",
			"email-templates": "^2.5.4",
			"grunt": "^1.0.1",
			"grunt-cli": "^1.2.0",
			"grunt-eslint": "^19.0.0",
			"grunt-mocha-test": "^0.13.2",
			"handlebars": "^4.0.6",
			"mocha": "^3.2.0",
			"nodemailer-dkim": "^1.0.4",
			"nodemailer-markdown": "^1.0.1",
			"nodemailer-stub-transport": "^1.1.0",
			"proxy-test-server": "^1.0.0",
			"sinon": "^1.17.6",
			"smtp-server": "^1.16.1",
			"swig-email-templates": "^4.0.0"
		},
		"engines": {
			"node": ">=0.10.0"
		}
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Minimal HTTP/S proxy client
	 */
	
	var net = __webpack_require__(70);
	var tls = __webpack_require__(71);
	var urllib = __webpack_require__(59);
	
	module.exports = proxyConnect;
	
	/**
	 * Establishes proxied connection to destinationPort
	 *
	 * proxyConnect("http://localhost:3128/", 80, "google.com", function(err, socket){
	 *     socket.write("GET / HTTP/1.0\r\n\r\n");
	 * });
	 *
	 * @param {String} proxyUrl proxy configuration, etg "http://proxy.host:3128/"
	 * @param {Number} destinationPort Port to open in destination host
	 * @param {String} destinationHost Destination hostname
	 * @param {Function} callback Callback to run with the rocket object once connection is established
	 */
	function proxyConnect(proxyUrl, destinationPort, destinationHost, callback) {
	    var proxy = urllib.parse(proxyUrl);
	
	    // create a socket connection to the proxy server
	    var options;
	    var connect;
	    var socket;
	
	    options = {
	        host: proxy.hostname,
	        port: Number(proxy.port) ? Number(proxy.port) : (proxy.protocol === 'https:' ? 443 : 80)
	    };
	
	    if (proxy.protocol === 'https:') {
	        // we can use untrusted proxies as long as we verify actual SMTP certificates
	        options.rejectUnauthorized = false;
	        connect = tls.connect.bind(tls);
	    } else {
	        connect = net.connect.bind(net);
	    }
	
	    // Error harness for initial connection. Once connection is established, the responsibility
	    // to handle errors is passed to whoever uses this socket
	    var finished = false;
	    var tempSocketErr = function (err) {
	        if (finished) {
	            return;
	        }
	        finished = true;
	        try {
	            socket.destroy();
	        } catch (E) {
	            // ignore
	        }
	        callback(err);
	    };
	
	    socket = connect(options, function () {
	        if (finished) {
	            return;
	        }
	
	        var reqHeaders = {
	            Host: destinationHost + ':' + destinationPort,
	            Connection: 'close'
	        };
	        if (proxy.auth) {
	            reqHeaders['Proxy-Authorization'] = 'Basic ' + new Buffer(proxy.auth).toString('base64');
	        }
	
	        socket.write(
	            // HTTP method
	            'CONNECT ' + destinationHost + ':' + destinationPort + ' HTTP/1.1\r\n' +
	
	            // HTTP request headers
	            Object.keys(reqHeaders).map(function (key) {
	                return key + ': ' + reqHeaders[key];
	            }).join('\r\n') +
	
	            // End request
	            '\r\n\r\n');
	
	
	        var headers = '';
	        var onSocketData = function (chunk) {
	            var match;
	            var remainder;
	
	            if (finished) {
	                return;
	            }
	
	            headers += chunk.toString('binary');
	            if ((match = headers.match(/\r\n\r\n/))) {
	                socket.removeListener('data', onSocketData);
	                remainder = headers.substr(match.index + match[0].length);
	                headers = headers.substr(0, match.index);
	                if (remainder) {
	                    socket.unshift(new Buffer(remainder, 'binary'));
	                }
	                // proxy connection is now established
	                finished = true;
	
	                socket.removeListener('error', tempSocketErr);
	
	                // check response code
	                match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
	                if (!match || (match[1] || '').charAt(0) !== '2') {
	                    try {
	                        socket.destroy();
	                    } catch (E) {
	                        // ignore
	                    }
	                    return callback(new Error('Invalid response from proxy' + (match && ': ' + match[1] || '')));
	                }
	
	                return callback(null, socket);
	            }
	        };
	        socket.on('data', onSocketData);
	    });
	
	    socket.once('error', tempSocketErr);
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var SocksClient = __webpack_require__(88);
	var SocksAgent = __webpack_require__(92);
	
	exports.createConnection = SocksClient.createConnection;
	exports.createUDPFrame = SocksClient.createUDPFrame;
	exports.Agent = SocksAgent.Agent;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var net = __webpack_require__(70);
	var ip = __webpack_require__(89);
	var SmartBuffer = __webpack_require__(91);
	
	(function () {
	
	    var COMMAND = {
	        Connect: 0x01,
	        Bind: 0x02,
	        Associate: 0x03
	    };
	
	    var SOCKS4_RESPONSE = {
	        Granted: 0x5A,
	        Failed: 0x5B,
	        Rejected: 0x5C,
	        RejectedIdent: 0x5D
	    };
	
	    var SOCKS5_AUTH = {
	        NoAuth: 0x00,
	        GSSApi: 0x01,
	        UserPass: 0x02
	    };
	
	    var SOCKS5_RESPONSE = {
	        Granted: 0x00,
	        Failure: 0x01,
	        NotAllowed: 0x02,
	        NetworkUnreachable: 0x03,
	        HostUnreachable: 0x04,
	        ConnectionRefused: 0x05,
	        TTLExpired: 0x06,
	        CommandNotSupported: 0x07,
	        AddressNotSupported: 0x08
	    };
	
	
	    exports.createConnection = function (options, callback) {
	        var socket = new net.Socket(), finished = false, buff = new SmartBuffer();
	
	        // Defaults
	        options.timeout = options.timeout || 10000;
	        options.proxy.command = commandFromString(options.proxy.command);
	        options.proxy.userid = options.proxy.userid || "";
	
	        var auth = options.proxy.authentication || {};
	        auth.username = auth.username || "";
	        auth.password = auth.password || "";
	
	        options.proxy.authentication = auth;
	
	        // Connect & negotiation timeout
	        function onTimeout() {
	            finish(new Error("Connection Timed Out"), socket, null, callback);
	        }
	        socket.setTimeout(options.timeout, onTimeout);
	
	        // Socket events
	        socket.once('close', function () {
	            finish(new Error("Socket Closed"), socket, null, callback);
	        });
	
	        socket.once('error', function (err) {
	        });
	
	        socket.once('connect', function () {
	            if (options.proxy.type === 4) {
	                negotiateSocks4(options, socket, callback);
	            } else if (options.proxy.type === 5) {
	                negotiateSocks5(options, socket, callback);
	            } else {
	                throw new Error("Please specify a proxy type in options.proxy.type");
	            }
	        });
	
	        socket.connect(options.proxy.port, options.proxy.ipaddress);
	
	
	        // 4/4a  (connect, bind) - Supports domains & ipaddress
	        function negotiateSocks4(options, socket, callback) {
	            buff.writeUInt8(0x04);
	            buff.writeUInt8(options.proxy.command);
	            buff.writeUInt16BE(options.target.port);
	
	            // ipv4 or domain?
	            if (net.isIPv4(options.target.host)) {
	                buff.writeBuffer(ip.toBuffer(options.target.host));
	                buff.writeStringNT(options.proxy.userid);
	            } else {
	                buff.writeUInt8(0x00);
	                buff.writeUInt8(0x00);
	                buff.writeUInt8(0x00);
	                buff.writeUInt8(0x01);
	                buff.writeStringNT(options.proxy.userid);
	                buff.writeStringNT(options.target.host);
	            }
	
	            socket.once('data', receivedResponse);
	            socket.write(buff.toBuffer());
	
	            function receivedResponse(data) {
	                socket.pause();
	                if (data.length === 8 && data[1] === SOCKS4_RESPONSE.Granted) {
	
	                    if (options.proxy.command === COMMAND.Bind) {
	                        buff.clear();
	                        buff.writeBuffer(data);
	                        buff.skip(2);
	
	                        var info = {
	                            port: buff.readUInt16BE(),
	                            host: buff.readUInt32BE()
	                        };
	
	                        if (info.host === 0) {
	                            info.host = options.proxy.ipaddress;
	                        } else {
	                            info.host = ip.fromLong(info.host);
	                        }
	
	                        finish(null, socket, info, callback);
	                    } else {
	                        finish(null, socket, null, callback);
	                    }
	
	                } else {
	                    finish(new Error("Rejected (" + data[1] + ")"), socket, null, callback);
	                }
	            }
	        }
	
	        // Socks 5 (connect, bind, associate) - Supports domains and ipv4, ipv6.
	        function negotiateSocks5(options, socket, callback) {
	            buff.writeUInt8(0x05);
	            buff.writeUInt8(2);
	            buff.writeUInt8(SOCKS5_AUTH.NoAuth);
	            buff.writeUInt8(SOCKS5_AUTH.UserPass);
	
	            socket.once('data', handshake);
	            socket.write(buff.toBuffer());
	
	            function handshake(data) {
	                if (data.length !== 2) {
	                    finish(new Error("Negotiation Error"), socket, null, callback);
	                } else if (data[0] !== 0x05) {
	                    finish(new Error("Negotiation Error (invalid version)"), socket, null, callback);
	                } else if (data[1] === 0xFF) {
	                    finish(new Error("Negotiation Error (unacceptable authentication)"), socket, null, callback);
	                } else {
	                    if (data[1] === SOCKS5_AUTH.NoAuth) {
	                        sendRequest();
	                    } else if (data[1] === SOCKS5_AUTH.UserPass) {
	                        sendAuthentication(options.proxy.authentication);
	                    } else {
	                        finish(new Error("Negotiation Error (unknown authentication type)"), socket, null, callback);
	                    }
	                }
	            }
	
	            function sendAuthentication(authinfo) {
	                buff.clear();
	                buff.writeUInt8(0x01);
	                buff.writeUInt8(Buffer.byteLength(authinfo.username));
	                buff.writeString(authinfo.username);
	                buff.writeUInt8(Buffer.byteLength(authinfo.password));
	                buff.writeString(authinfo.password);
	
	                socket.once('data', authenticationResponse);
	                socket.write(buff.toBuffer());
	
	                function authenticationResponse(data) {
	                    if (data.length === 2 && data[1] === 0x00) {
	                        sendRequest();
	                    } else {
	                        finish(new Error("Negotiation Error (authentication failed)"), socket, null, callback);
	                    }
	                }
	            }
	
	            function sendRequest() {
	                buff.clear();
	                buff.writeUInt8(0x05);
	                buff.writeUInt8(options.proxy.command);
	                buff.writeUInt8(0x00);
	
	                // ipv4, ipv6, domain?
	                if (net.isIPv4(options.target.host)) {
	                    buff.writeUInt8(0x01);
	                    buff.writeBuffer(ip.toBuffer(options.target.host));
	                } else if (net.isIPv6(options.target.host)) {
	                    buff.writeUInt8(0x04);
	                    buff.writeBuffer(ip.toBuffer(options.target.host));
	                } else {
	                    buff.writeUInt8(0x03);
	                    buff.writeUInt8(options.target.host.length);
	                    buff.writeString(options.target.host);
	                }
	                buff.writeUInt16BE(options.target.port);
	
	                socket.once('data', receivedResponse);
	                socket.write(buff.toBuffer());
	            }
	
	            function receivedResponse(data) {
	                socket.pause();
	                if (data.length < 4) {
	                    finish(new Error("Negotiation Error"), socket, null, callback);
	                } else if (data[0] === 0x05 && data[1] === SOCKS5_RESPONSE.Granted) {
	                    if (options.proxy.command === COMMAND.Connect) {
	                        finish(null, socket, null, callback);
	                    } else if (options.proxy.command === COMMAND.Bind || options.proxy.command === COMMAND.Associate) {
	                        buff.clear();
	                        buff.writeBuffer(data);
	                        buff.skip(3);
	
	                        var info = {};
	                        var addrtype = buff.readUInt8();
	
	                        try {
	
	                            if (addrtype === 0x01) {
	                                info.host = buff.readUInt32BE();
	                                if (info.host === 0)
	                                    info.host = options.proxy.ipaddress;
	                                else
	                                    info.host = ip.fromLong(info.host);
	                            } else if (addrtype === 0x03) {
	                                var len = buff.readUInt8();
	                                info.host = buff.readString(len);
	                            } else if (addrtype === 0x04) {
	                                info.host = buff.readBuffer(16);
	                            } else {
	                                finish(new Error("Negotiation Error (invalid host address)"), socket, null, callback);
	                            }
	                            info.port = buff.readUInt16BE();
	
	                            finish(null, socket, info, callback);
	                        } catch (ex) {
	                            finish(new Error("Negotiation Error (missing data)"), socket, null, callback);
	                        }
	                    }
	                } else {
	                    finish(new Error("Negotiation Error (" + data[1] + ")"), socket, null, callback);
	                }
	            }
	        }
	
	        function finish(err, socket, info, callback) {
	            socket.setTimeout(0, onTimeout);
	            if (!finished) {
	                finished = true;
	
	                if (buff instanceof SmartBuffer)
	                    buff.destroy();
	
	                if (err && socket instanceof net.Socket) {
	                    socket.removeAllListeners('close');
	                    socket.removeAllListeners('timeout');
	                    socket.removeAllListeners('data');
	                    socket.destroy();
	                    socket = null;
	                }
	
	                callback(err, socket, info);
	            }
	        }
	
	        function commandFromString(str) {
	            var result = COMMAND.Connect;
	
	            if (str === "connect") {
	                result = COMMAND.Connect;
	            } else if (str === 'associate') {
	                result = COMMAND.Associate;
	            } else if (str === 'bind') {
	                result = COMMAND.Bind;
	            }
	
	            return result;
	        }
	    };
	
	
	    exports.createUDPFrame = function (target, data, frame) {
	        var buff = new SmartBuffer();
	        buff.writeUInt16BE(0);
	        buff.writeUInt8(frame || 0x00);
	
	        if (net.isIPv4(target.host)) {
	            buff.writeUInt8(0x01);
	            buff.writeUInt32BE(ip.toLong(target.host));
	        } else if (net.isIPv6(target.host)) {
	            buff.writeUInt8(0x04);
	            buff.writeBuffer(ip.toBuffer(target.host));
	        } else {
	            buff.writeUInt8(0x03);
	            buff.writeUInt8(Buffer.byteLength(target.host));
	            buff.writeString(target.host);
	        }
	
	        buff.writeUInt16BE(target.port);
	        buff.writeBuffer(data);
	        return buff.toBuffer();
	    };
	})();


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ip = exports;
	var Buffer = __webpack_require__(90).Buffer;
	var os = __webpack_require__(63);
	
	ip.toBuffer = function(ip, buff, offset) {
	  offset = ~~offset;
	
	  var result;
	
	  if (this.isV4Format(ip)) {
	    result = buff || new Buffer(offset + 4);
	    ip.split(/\./g).map(function(byte) {
	      result[offset++] = parseInt(byte, 10) & 0xff;
	    });
	  } else if (this.isV6Format(ip)) {
	    var sections = ip.split(':', 8);
	
	    var i;
	    for (i = 0; i < sections.length; i++) {
	      var isv4 = this.isV4Format(sections[i]);
	      var v4Buffer;
	
	      if (isv4) {
	        v4Buffer = this.toBuffer(sections[i]);
	        sections[i] = v4Buffer.slice(0, 2).toString('hex');
	      }
	
	      if (v4Buffer && ++i < 8) {
	        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'));
	      }
	    }
	
	    if (sections[0] === '') {
	      while (sections.length < 8) sections.unshift('0');
	    } else if (sections[sections.length - 1] === '') {
	      while (sections.length < 8) sections.push('0');
	    } else if (sections.length < 8) {
	      for (i = 0; i < sections.length && sections[i] !== ''; i++);
	      var argv = [ i, 1 ];
	      for (i = 9 - sections.length; i > 0; i--) {
	        argv.push('0');
	      }
	      sections.splice.apply(sections, argv);
	    }
	
	    result = buff || new Buffer(offset + 16);
	    for (i = 0; i < sections.length; i++) {
	      var word = parseInt(sections[i], 16);
	      result[offset++] = (word >> 8) & 0xff;
	      result[offset++] = word & 0xff;
	    }
	  }
	
	  if (!result) {
	    throw Error('Invalid ip address: ' + ip);
	  }
	
	  return result;
	};
	
	ip.toString = function(buff, offset, length) {
	  offset = ~~offset;
	  length = length || (buff.length - offset);
	
	  var result = [];
	  if (length === 4) {
	    // IPv4
	    for (var i = 0; i < length; i++) {
	      result.push(buff[offset + i]);
	    }
	    result = result.join('.');
	  } else if (length === 16) {
	    // IPv6
	    for (var i = 0; i < length; i += 2) {
	      result.push(buff.readUInt16BE(offset + i).toString(16));
	    }
	    result = result.join(':');
	    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
	    result = result.replace(/:{3,4}/, '::');
	  }
	
	  return result;
	};
	
	var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
	var ipv6Regex =
	    /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
	
	ip.isV4Format = function(ip) {
	  return ipv4Regex.test(ip);
	};
	
	ip.isV6Format = function(ip) {
	  return ipv6Regex.test(ip);
	};
	function _normalizeFamily(family) {
	  return family ? family.toLowerCase() : 'ipv4';
	}
	
	ip.fromPrefixLen = function(prefixlen, family) {
	  if (prefixlen > 32) {
	    family = 'ipv6';
	  } else {
	    family = _normalizeFamily(family);
	  }
	
	  var len = 4;
	  if (family === 'ipv6') {
	    len = 16;
	  }
	  var buff = new Buffer(len);
	
	  for (var i = 0, n = buff.length; i < n; ++i) {
	    var bits = 8;
	    if (prefixlen < 8) {
	      bits = prefixlen;
	    }
	    prefixlen -= bits;
	
	    buff[i] = ~(0xff >> bits) & 0xff;
	  }
	
	  return ip.toString(buff);
	};
	
	ip.mask = function(addr, mask) {
	  addr = ip.toBuffer(addr);
	  mask = ip.toBuffer(mask);
	
	  var result = new Buffer(Math.max(addr.length, mask.length));
	
	  // Same protocol - do bitwise and
	  if (addr.length === mask.length) {
	    for (var i = 0; i < addr.length; i++) {
	      result[i] = addr[i] & mask[i];
	    }
	  } else if (mask.length === 4) {
	    // IPv6 address and IPv4 mask
	    // (Mask low bits)
	    for (var i = 0; i < mask.length; i++) {
	      result[i] = addr[addr.length - 4  + i] & mask[i];
	    }
	  } else {
	    // IPv6 mask and IPv4 addr
	    for (var i = 0; i < result.length - 6; i++) {
	      result[i] = 0;
	    }
	
	    // ::ffff:ipv4
	    result[10] = 0xff;
	    result[11] = 0xff;
	    for (var i = 0; i < addr.length; i++) {
	      result[i + 12] = addr[i] & mask[i + 12];
	    }
	  }
	
	  return ip.toString(result);
	};
	
	ip.cidr = function(cidrString) {
	  var cidrParts = cidrString.split('/');
	
	  var addr = cidrParts[0];
	  if (cidrParts.length !== 2)
	    throw new Error('invalid CIDR subnet: ' + addr);
	
	  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
	
	  return ip.mask(addr, mask);
	};
	
	ip.subnet = function(addr, mask) {
	  var networkAddress = ip.toLong(ip.mask(addr, mask));
	
	  // Calculate the mask's length.
	  var maskBuffer = ip.toBuffer(mask);
	  var maskLength = 0;
	
	  for (var i = 0; i < maskBuffer.length; i++) {
	    if (maskBuffer[i] === 0xff) {
	      maskLength += 8;
	    } else {
	      var octet = maskBuffer[i] & 0xff;
	      while (octet) {
	        octet = (octet << 1) & 0xff;
	        maskLength++;
	      }
	    }
	  }
	
	  var numberOfAddresses = Math.pow(2, 32 - maskLength);
	
	  return {
	    networkAddress: ip.fromLong(networkAddress),
	    firstAddress: numberOfAddresses <= 2 ?
	                    ip.fromLong(networkAddress) :
	                    ip.fromLong(networkAddress + 1),
	    lastAddress: numberOfAddresses <= 2 ?
	                    ip.fromLong(networkAddress + numberOfAddresses - 1) :
	                    ip.fromLong(networkAddress + numberOfAddresses - 2),
	    broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
	    subnetMask: mask,
	    subnetMaskLength: maskLength,
	    numHosts: numberOfAddresses <= 2 ?
	                numberOfAddresses : numberOfAddresses - 2,
	    length: numberOfAddresses,
	    contains: function(other) {
	      return networkAddress === ip.toLong(ip.mask(other, mask));
	    }
	  };
	};
	
	ip.cidrSubnet = function(cidrString) {
	  var cidrParts = cidrString.split('/');
	
	  var addr = cidrParts[0];
	  if (cidrParts.length !== 2)
	    throw new Error('invalid CIDR subnet: ' + addr);
	
	  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
	
	  return ip.subnet(addr, mask);
	};
	
	ip.not = function(addr) {
	  var buff = ip.toBuffer(addr);
	  for (var i = 0; i < buff.length; i++) {
	    buff[i] = 0xff ^ buff[i];
	  }
	  return ip.toString(buff);
	};
	
	ip.or = function(a, b) {
	  a = ip.toBuffer(a);
	  b = ip.toBuffer(b);
	
	  // same protocol
	  if (a.length === b.length) {
	    for (var i = 0; i < a.length; ++i) {
	      a[i] |= b[i];
	    }
	    return ip.toString(a);
	
	  // mixed protocols
	  } else {
	    var buff = a;
	    var other = b;
	    if (b.length > a.length) {
	      buff = b;
	      other = a;
	    }
	
	    var offset = buff.length - other.length;
	    for (var i = offset; i < buff.length; ++i) {
	      buff[i] |= other[i - offset];
	    }
	
	    return ip.toString(buff);
	  }
	};
	
	ip.isEqual = function(a, b) {
	  a = ip.toBuffer(a);
	  b = ip.toBuffer(b);
	
	  // Same protocol
	  if (a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	
	  // Swap
	  if (b.length === 4) {
	    var t = b;
	    b = a;
	    a = t;
	  }
	
	  // a - IPv4, b - IPv6
	  for (var i = 0; i < 10; i++) {
	    if (b[i] !== 0) return false;
	  }
	
	  var word = b.readUInt16BE(10);
	  if (word !== 0 && word !== 0xffff) return false;
	
	  for (var i = 0; i < 4; i++) {
	    if (a[i] !== b[i + 12]) return false;
	  }
	
	  return true;
	};
	
	ip.isPrivate = function(addr) {
	  return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i
	      .test(addr) ||
	    /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
	    /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i
	      .test(addr) ||
	    /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
	    /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
	    /^f[cd][0-9a-f]{2}:/i.test(addr) ||
	    /^fe80:/i.test(addr) ||
	    /^::1$/.test(addr) ||
	    /^::$/.test(addr);
	};
	
	ip.isPublic = function(addr) {
	  return !ip.isPrivate(addr);
	};
	
	ip.isLoopback = function(addr) {
	  return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/
	      .test(addr) ||
	    /^fe80::1$/.test(addr) ||
	    /^::1$/.test(addr) ||
	    /^::$/.test(addr);
	};
	
	ip.loopback = function(family) {
	  //
	  // Default to `ipv4`
	  //
	  family = _normalizeFamily(family);
	
	  if (family !== 'ipv4' && family !== 'ipv6') {
	    throw new Error('family must be ipv4 or ipv6');
	  }
	
	  return family === 'ipv4' ? '127.0.0.1' : 'fe80::1';
	};
	
	//
	// ### function address (name, family)
	// #### @name {string|'public'|'private'} **Optional** Name or security
	//      of the network interface.
	// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
	//      to ipv4).
	//
	// Returns the address for the network interface on the current system with
	// the specified `name`:
	//   * String: First `family` address of the interface.
	//             If not found see `undefined`.
	//   * 'public': the first public ip address of family.
	//   * 'private': the first private ip address of family.
	//   * undefined: First address with `ipv4` or loopback address `127.0.0.1`.
	//
	ip.address = function(name, family) {
	  var interfaces = os.networkInterfaces();
	  var all;
	
	  //
	  // Default to `ipv4`
	  //
	  family = _normalizeFamily(family);
	
	  //
	  // If a specific network interface has been named,
	  // return the address.
	  //
	  if (name && name !== 'private' && name !== 'public') {
	    var res = interfaces[name].filter(function(details) {
	      var itemFamily = details.family.toLowerCase();
	      return itemFamily === family;
	    });
	    if (res.length === 0)
	      return undefined;
	    return res[0].address;
	  }
	
	  var all = Object.keys(interfaces).map(function (nic) {
	    //
	    // Note: name will only be `public` or `private`
	    // when this is called.
	    //
	    var addresses = interfaces[nic].filter(function (details) {
	      details.family = details.family.toLowerCase();
	      if (details.family !== family || ip.isLoopback(details.address)) {
	        return false;
	      } else if (!name) {
	        return true;
	      }
	
	      return name === 'public' ? ip.isPrivate(details.address) :
	          ip.isPublic(details.address);
	    });
	
	    return addresses.length ? addresses[0].address : undefined;
	  }).filter(Boolean);
	
	  return !all.length ? ip.loopback(family) : all[0];
	};
	
	ip.toLong = function(ip) {
	  var ipl = 0;
	  ip.split('.').forEach(function(octet) {
	    ipl <<= 8;
	    ipl += parseInt(octet);
	  });
	  return(ipl >>> 0);
	};
	
	ip.fromLong = function(ipl) {
	  return ((ipl >>> 24) + '.' +
	      (ipl >> 16 & 255) + '.' +
	      (ipl >> 8 & 255) + '.' +
	      (ipl & 255) );
	};


/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 91 */
/***/ function(module, exports) {

	var SmartBuffer = (function () {
	
	    /**
	     * Constructor for SmartBuffer.
	     * @param arg1 {Buffer || Number || String} Buffer to read from, or expected size to write to, or encoding to use.
	     * @param arg2 {String} Encoding to use for writing and reading strings. Defaults to utf8. If encoding is given in arg1, this is ignored.
	     * @constructor
	     *
	     * There are a few ways to construct a SmartBuffer:
	     *
	     * SmartBuffer() - Defaults to utf8, 4096 pre-set internal Buffer length.
	     * SmartBuffer(size) - Defaults to utf8, sets internal Buffer length to the size given.
	     * SmartBuffer(encoding) - Sets the given encoding, defaults to 4096 pre-set internal Buffer length.
	     * SmartBuffer(Buffer) - Defaults to utf8, sets the internal Buffer to the given buffer (same memory).
	     * SmartBuffer(Buffer, encoding) - Sets the given encoding, sets the internal Buffer to the given buffer (same memory).
	     *
	     */
	    function SmartBuffer(arg1, arg2) {
	        var type;
	        switch (type = typeof arg1) {
	            case 'number':
	                if (isFinite(arg1) && arg1 > 0) {
	                    this.buff = new Buffer(Math.ceil(arg1));
	                    this.length = 0;
	                } else {
	                    throw new Error('When specifying a size, it must be a valid number above zero.');
	                }
	                break;
	
	            case 'string':
	                if (Buffer.isEncoding(arg1)) {
	                    this.buff = new Buffer(4096);
	                    this.length = 0;
	                    this.encoding = arg1;
	                } else {
	                    throw new Error('Invalid Encoding');
	                }
	                break;
	
	            case 'object':
	                if (Buffer.isBuffer(arg1)) {
	                    this.buff = arg1;
	                    this.length = arg1.length;
	                } else {
	                    throw new TypeError('First argument must be a Buffer, Number representing the size, or a String representing the encoding.');
	                }
	                break;
	
	            default:
	                this.buff = new Buffer(4096);
	                this.length = 0;
	                break;
	        }
	
	        if (typeof this.encoding === 'undefined') {
	            if (typeof arg2 === 'string') {
	                if (Buffer.isEncoding(arg2)) {
	                    this.encoding = arg2;
	                } else {
	                    throw new Error('Invalid Encoding');
	                }
	            }
	        }
	
	        this._readOffset = 0;
	        this._writeOffset = 0;
	    }
	
	
	    SmartBuffer.prototype._ensureWritable = function (len, offset) {
	        this._ensureCapacity(this.length + len + (typeof offset === 'number' ? offset : 0));
	
	        if (typeof offset === 'number') {
	            this.buff.copy(this.buff, offset + len, offset, this.buff.length);
	        }
	        this.length = Math.max(this.length + len, (typeof offset === 'number' ?  offset : 0) + len);
	    };
	
	    SmartBuffer.prototype._ensureCapacity = function (minlen) {
	        var oldlen = this.buff.length;
	
	        if (minlen > oldlen) {
	            var data = this.buff;
	            var newlen = (oldlen * 3) / 2 + 1;
	            if (newlen < minlen)
	                newlen = minlen;
	            this.buff = new Buffer(newlen);
	            data.copy(this.buff, 0, 0, oldlen);
	        }
	    };
	
	
	    var makeReader = function (func, size) {
	        return function () {
	            var ret = func.call(this.buff, this._readOffset);
	            this._readOffset += size;
	            return ret;
	        }
	    };
	
	    var makeWriter = function (func, size) {
	        return function (value, offset) {
	            this._ensureWritable(size, offset);
	            func.call(this.buff, value, typeof offset === 'number' ? offset : this._writeOffset);
	            this._writeOffset += size;
	            return this;
	        }
	    };
	
	
	    /*
	     Read Operations
	     */
	
	    SmartBuffer.prototype.readInt8 = makeReader(Buffer.prototype.readInt8, 1);
	    SmartBuffer.prototype.readInt16BE = makeReader(Buffer.prototype.readInt16BE, 2);
	    SmartBuffer.prototype.readInt16LE = makeReader(Buffer.prototype.readInt16LE, 2);
	    SmartBuffer.prototype.readInt32BE = makeReader(Buffer.prototype.readInt32BE, 4);
	    SmartBuffer.prototype.readInt32LE = makeReader(Buffer.prototype.readInt32LE, 4);
	
	    SmartBuffer.prototype.readUInt8 = makeReader(Buffer.prototype.readUInt8, 1);
	    SmartBuffer.prototype.readUInt16BE = makeReader(Buffer.prototype.readUInt16BE, 2);
	    SmartBuffer.prototype.readUInt16LE = makeReader(Buffer.prototype.readUInt16LE, 2);
	    SmartBuffer.prototype.readUInt32BE = makeReader(Buffer.prototype.readUInt32BE, 4);
	    SmartBuffer.prototype.readUInt32LE = makeReader(Buffer.prototype.readUInt32LE, 4);
	
	    SmartBuffer.prototype.readFloatBE = makeReader(Buffer.prototype.readFloatBE, 4);
	    SmartBuffer.prototype.readFloatLE = makeReader(Buffer.prototype.readFloatLE, 4);
	
	    SmartBuffer.prototype.readDoubleBE = makeReader(Buffer.prototype.readDoubleBE, 8);
	    SmartBuffer.prototype.readDoubleLE = makeReader(Buffer.prototype.readDoubleLE, 8);
	
	
	    /**
	     * Reads a string of the given length.
	     * @param length {Number} The length of the string to read. (Defaults to the length of the remaining data)
	     * @param encoding {String} The encoding to use. (Defaults to encoding set in constructor, or utf8)
	     * @returns {string} The string.
	     */
	    SmartBuffer.prototype.readString = function (length, encoding) {
	        var len = Math.min(length, this.length - this._readOffset) || (this.length - this._readOffset);
	        var ret = this.buff.slice(this._readOffset, this._readOffset + len).toString(encoding || this.encoding);
	        this._readOffset += len;
	        return ret;
	    };
	
	    /**
	     * Reads a null terminated string from the underlying buffer.
	     * @param encoding {String} Encoding to use. Defaults to encoding set in constructor, or utf8.
	     * @returns {string}
	     */
	    SmartBuffer.prototype.readStringNT = function (encoding) {
	        var nullpos = this.length;
	        for (var i = this._readOffset; i < this.length; i++) {
	            if (this.buff[i] == 0x00) {
	                nullpos = i;
	                break;
	            }
	        }
	
	        var result = this.buff.slice(this._readOffset, nullpos);
	        this._readOffset = nullpos + 1;
	
	        return result.toString(encoding || this.encoding);
	    };
	
	
	    /**
	     * Reads a specified number of bytes.
	     * @param len {Number} Numbers of bytes to read. (Defaults to the remaining data length)
	     * @returns {Buffer} Buffer containing the read bytes.
	     */
	    SmartBuffer.prototype.readBuffer = function (len) {
	        var endpoint = Math.min(this.length, this._readOffset + (typeof len === 'number' ? len : this.length));
	        var ret = this.buff.slice(this._readOffset, endpoint);
	        this._readOffset = endpoint;
	        return ret;
	    };
	
	    /**
	     * Reads a null terminated sequence of bytes from the underlying buffer.
	     * @returns {Buffer} Buffer containing the read bytes.
	     */
	    SmartBuffer.prototype.readBufferNT = function () {
	        var nullpos = this.length;
	        for (var i = this._readOffset; i < this.length; i++) {
	            if (this.buff[i] == 0x00) {
	                nullpos = i;
	                break;
	            }
	        }
	
	        var ret = this.buff.slice(this._readOffset, nullpos);
	        this._readOffset = nullpos + 1;
	
	        return ret;
	    };
	
	
	    /*
	     Write Operations
	     */
	
	
	    SmartBuffer.prototype.writeInt8 = makeWriter(Buffer.prototype.writeInt8, 1);
	    SmartBuffer.prototype.writeInt16BE = makeWriter(Buffer.prototype.writeInt16BE, 2);
	    SmartBuffer.prototype.writeInt16LE = makeWriter(Buffer.prototype.writeInt16LE, 2);
	    SmartBuffer.prototype.writeInt32BE = makeWriter(Buffer.prototype.writeInt32BE, 4);
	    SmartBuffer.prototype.writeInt32LE = makeWriter(Buffer.prototype.writeInt32LE, 4);
	
	    SmartBuffer.prototype.writeUInt8 = makeWriter(Buffer.prototype.writeUInt8, 1);
	    SmartBuffer.prototype.writeUInt16BE = makeWriter(Buffer.prototype.writeUInt16BE, 2);
	    SmartBuffer.prototype.writeUInt16LE = makeWriter(Buffer.prototype.writeUInt16LE, 2);
	    SmartBuffer.prototype.writeUInt32BE = makeWriter(Buffer.prototype.writeUInt32BE, 4);
	    SmartBuffer.prototype.writeUInt32LE = makeWriter(Buffer.prototype.writeUInt32LE, 4);
	
	    SmartBuffer.prototype.writeFloatBE = makeWriter(Buffer.prototype.writeFloatBE, 4);
	    SmartBuffer.prototype.writeFloatLE = makeWriter(Buffer.prototype.writeFloatLE, 4);
	
	    SmartBuffer.prototype.writeDoubleBE = makeWriter(Buffer.prototype.writeDoubleBE, 8);
	    SmartBuffer.prototype.writeDoubleLE = makeWriter(Buffer.prototype.writeDoubleLE, 8);
	
	
	    /**
	     * Writes a string to the underlying buffer.
	     * @param value {String} The string to write.
	     * @param offset {Number} The offset to write the string to. (Encoding can also be set here in place of offset)
	     * @param encoding {String} The encoding to use. (Defaults to encoding set in constructor, or to utf8)
	     * @returns {*}
	     */
	    SmartBuffer.prototype.writeString = function (value, offset, encoding) {
	        var len, _offset, type = typeof offset;
	
	        if (type === 'number') {
	            _offset = offset;
	        } else if (type === 'string') {
	            encoding = offset;
	            offset = this._writeOffset;
	        } else {
	            encoding = undefined;
	            offset = this._writeOffset;
	        }
	
	        len = Buffer.byteLength(value, encoding || this.encoding);
	        this._ensureWritable(len, _offset);
	
	        this.buff.write(value, offset, len, encoding || this.encoding);
	        this._writeOffset += len;
	        return this;
	    };
	
	    /**
	     * Writes a null terminated string to the underlying buffer.
	     * @param value {String} The string to write.
	     * @param offset {Number} The offset to write the string to. (Encoding can also be set here in place of offset)
	     * @param encoding {String} The encoding to use. (Defaults to encoding set in constructor, or to utf8)
	     * @returns {*}
	     */
	    SmartBuffer.prototype.writeStringNT = function (value, offset, encoding) {
	        this.writeString(value, offset, encoding);
	        this.writeUInt8(0x00);
	        return this;
	    };
	
	    /**
	     * Writes a Buffer to the underlying buffer.
	     * @param value {Buffer} The buffer to write.
	     * @param offset {Number} The offset to write the Buffer to.
	     * @returns {*}
	     */
	    SmartBuffer.prototype.writeBuffer = function (value, offset) {
	        var len = value.length;
	        this._ensureWritable(len, offset);
	        value.copy(this.buff, typeof offset === 'number' ? offset : this._writeOffset);
	        this._writeOffset += len;
	        return this;
	    };
	
	    /**
	     * Writes a null terminated Buffer to the underlying buffer.
	     * @param value {Buffer} The buffer to write.
	     * @param offset {Number} The offset to write the Buffer to.
	     * @returns {*}
	     */
	    SmartBuffer.prototype.writeBufferNT = function (value, offset) {
	        var len = value.length;
	        this._ensureWritable(len, offset);
	        value.copy(this.buff, typeof offset === 'number' ? offset : this._writeOffset);
	        this.buff[(typeof offset === 'number' ? offset : this._writeOffset) + len] = 0x00;
	        this._writeOffset += len + 1;
	        return this;
	    };
	
	
	    /**
	     * Resets the Endless Buffer.
	     */
	    SmartBuffer.prototype.clear = function () {
	        this._writeOffset = 0;
	        this._readOffset = 0;
	        this.length = 0;
	    };
	
	    /**
	     * Gets the remaining number of bytes to be read from the existing Buffer.
	     * @returns {number} The number of bytes remaining.
	     */
	    SmartBuffer.prototype.remaining = function () {
	        return this.length - this._readOffset;
	    };
	
	    /**
	     * Skips the read position forward by the amount of given.
	     * @param amount {Number} The amount of bytes to skip forward.
	     */
	    SmartBuffer.prototype.skip = function (amount) {
	        if (this._readOffset + amount > this.length)
	            throw new Error('Target position is beyond the bounds of the data.');
	
	        this._readOffset += amount;
	    };
	
	    /**
	     * Rewinds the read position backward by the amount given.
	     * @param amount {Number} The amount of bytes to reverse backward.
	     */
	    SmartBuffer.prototype.rewind = function (amount) {
	        if (this._readOffset - amount < 0)
	            throw new Error('Target position is beyond the bounds of the data.');
	
	        this._readOffset -= amount;
	    };
	
	    /**
	     * Skips the read position to the given position.
	     * @param position {Number} The position to skip to.
	     */
	    SmartBuffer.prototype.skipTo = function (position) {
	        if (position < 0 || position > this.length)
	            throw new Error('Target position is beyond the bounds of the data.');
	
	        this._readOffset = position;
	    };
	
	    /**
	     * Gets the underlying Buffer.
	     * @returns {*}
	     */
	    SmartBuffer.prototype.toBuffer = function () {
	        return this.buff.slice(0, this.length);
	    };
	
	    /**
	     * Gets a string representation of the underlying Buffer.
	     * @param encoding {String} Encoding to use. (Defaults to encoding set in constructor, or utf8.)
	     * @returns {*}
	     */
	    SmartBuffer.prototype.toString = function (encoding) {
	        return this.buff.toString(encoding || this.encoding, 0, this.length);
	    };
	
	    /**
	     * Destroys the underlying Buffer, and resets the SmartBuffer.
	     */
	    SmartBuffer.prototype.destroy = function () {
	        delete this.buff;
	        this.clear();
	    };
	
	    return SmartBuffer;
	})();
	
	module.exports = SmartBuffer;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var tls = __webpack_require__(71);
	var inherits = __webpack_require__(51).inherits;
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var SocksClient = __webpack_require__(88);
	
	function SocksAgent(options, secure, rejectUnauthorized) {
	    this.options = options;
	    this.secure = secure || false;
	    this.rejectUnauthorized = rejectUnauthorized;
	
	    if (this.rejectUnauthorized === undefined) {
	        this.rejectUnauthorized = true;
	    }
	}
	
	inherits(SocksAgent, EventEmitter);
	
	SocksAgent.prototype.createConnection = function(req, opts, fn) {
	    var handler = fn, host, self = this;
	
	    this.options.target = this.options.target || {};
	
	    if (!this.options.target.host) {
	        this.options.target.host = opts.host;
	    }
	
	    if (!this.options.target.port) {
	        this.options.target.port = opts.port;
	    }
	
	    host = this.options.target.host;
	
	    if (this.secure) {
	        handler = function(err, socket, info) {
	            var options, cleartext;
	
	            if (err) {
	                return fn(err);
	            }
	
	            // save encrypted socket
	            self.encryptedSocket = socket;
	
	            options = {
	                socket: socket,
	                servername: host,
	                rejectUnauthorized: self.rejectUnauthorized
	            };
	
	            cleartext = tls.connect(options, function (err) {
	                return fn(err, this);
	            });
	            cleartext.on('error', fn);
	
	            socket.resume();
	        }
	    }
	
	    SocksClient.createConnection(this.options, handler);
	};
	
	/**
	 * @see https://www.npmjs.com/package/agent-base
	 */
	SocksAgent.prototype.addRequest = function(req, host, port, localAddress) {
	    var opts;
	    if ('object' === typeof host) {
	        // >= v0.11.x API
	        opts = host;
	        if (opts.host && opts.path) {
	            // if both a `host` and `path` are specified then it's most likely the
	            // result of a `url.parse()` call... we need to remove the `path` portion so
	            // that `net.connect()` doesn't attempt to open that as a unix socket file.
	            delete opts.path;
	        }
	    } else {
	        // <= v0.10.x API
	        opts = { host: host, port: port };
	        if (null !== localAddress) {
	            opts.localAddress = localAddress;
	        }
	    }
	
	    var sync = true;
	
	    this.createConnection(req, opts, function (err, socket) {
	        function emitErr () {
	            req.emit('error', err);
	        }
	        if (err) {
	            if (sync) {
	                // need to defer the "error" event, when sync, because by now the `req`
	                // instance hasn't event been passed back to the user yet...
	                process.nextTick(emitErr);
	            } else {
	                emitErr();
	            }
	        } else {
	            req.onSocket(socket);
	            //have to resume this socket when node 12
	            socket.resume();
	        }
	    });
	
	    sync = false;
	};
	
	exports.Agent = SocksAgent;


/***/ },
/* 93 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 93;


/***/ }
/******/ ]);
//# sourceMappingURL=bin.js.map