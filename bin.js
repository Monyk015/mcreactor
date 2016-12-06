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
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(/*! es6-shim */ 1);
	__webpack_require__(/*! reflect-metadata */ 2);
	const Koa = __webpack_require__(/*! koa */ 3);
	const Router = __webpack_require__(/*! koa-router */ 4);
	const AuthController_1 = __webpack_require__(/*! ./controllers/AuthController */ 5);
	const FeedController_1 = __webpack_require__(/*! ./controllers/FeedController */ 16);
	const UserController_1 = __webpack_require__(/*! ./controllers/UserController */ 18);
	const path = __webpack_require__(/*! path */ 20);
	const convert = __webpack_require__(/*! koa-convert */ 21);
	const serve = __webpack_require__(/*! koa-static-folder */ 22);
	const app = new Koa();
	app.use(__webpack_require__(/*! koa-bodyparser */ 23)());
	app.use(convert(serve('./public')));
	app.use(convert(serve('./public/images')));
	let cors = __webpack_require__(/*! koa-cors */ 24);
	app.use(convert(cors()));
	const pug_1 = __webpack_require__(/*! ./config/pug */ 25);
	pug_1.default.use(app);
	app.use(convert(__webpack_require__(/*! koa-json */ 27)()));
	const CookieMiddleware_1 = __webpack_require__(/*! ./middlewares/CookieMiddleware */ 28);
	app.use(CookieMiddleware_1.default);
	const router = new Router();
	router
	    .use('', UserController_1.default.routes())
	    .use('', AuthController_1.default.routes())
	    .use('', FeedController_1.default.routes());
	app
	    .use(router.routes())
	    .use(router.allowedMethods());
	app.listen(3000);


/***/ },
/* 1 */
/*!***************************!*\
  !*** external "es6-shim" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("es6-shim");

/***/ },
/* 2 */
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("reflect-metadata");

/***/ },
/* 3 */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 4 */
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 5 */
/*!***************************************!*\
  !*** ./controllers/AuthController.ts ***!
  \***************************************/
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
	const models_1 = __webpack_require__(/*! ../models/models */ 6);
	const jwt_1 = __webpack_require__(/*! ../config/jwt */ 13);
	const Router = __webpack_require__(/*! koa-router */ 4);
	const hash = __webpack_require__(/*! sha256 */ 15);
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
	        }
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
/*!**************************!*\
  !*** ./models/models.ts ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Post_1 = __webpack_require__(/*! ./Post */ 7);
	exports.Post = Post_1.default;
	const Commentary_1 = __webpack_require__(/*! ./Commentary */ 10);
	exports.Commentary = Commentary_1.default;
	const Tag_1 = __webpack_require__(/*! ./Tag */ 11);
	exports.Tag = Tag_1.default;
	const User_1 = __webpack_require__(/*! ./User */ 12);
	exports.User = User_1.default;
	const db_1 = __webpack_require__(/*! ../config/db */ 8);
	Post_1.default.belongsTo(User_1.default);
	User_1.default.hasMany(Post_1.default);
	User_1.default.hasMany(Commentary_1.default);
	Commentary_1.default.belongsTo(User_1.default);
	Post_1.default.hasMany(Commentary_1.default);
	Commentary_1.default.belongsTo(Post_1.default);
	const PostTag = db_1.default.define('PostTag', {}, { tableName: 'PostTag' });
	Tag_1.default.belongsToMany(Post_1.default, { through: 'PostTag' });
	Post_1.default.belongsToMany(Tag_1.default, { through: 'PostTag' });
	User_1.default.sync();
	Post_1.default.sync();
	Tag_1.default.sync();
	Commentary_1.default.sync();
	PostTag.sync();


/***/ },
/* 7 */
/*!************************!*\
  !*** ./models/Post.ts ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(/*! ../config/db */ 8);
	const Sequelize = __webpack_require__(/*! sequelize */ 9);
	const Post = db_1.default.define("Post", {
	    content: {
	        type: Sequelize.STRING,
	        allowNull: false,
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Post;


/***/ },
/* 8 */
/*!**********************!*\
  !*** ./config/db.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 05.11.2016.
	 */
	const Sequelize = __webpack_require__(/*! sequelize */ 9);
	const db = new Sequelize('mysql://root:root@localhost:3306/mcreactor');
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = db;


/***/ },
/* 9 */
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 10 */
/*!******************************!*\
  !*** ./models/Commentary.ts ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(/*! ../config/db */ 8);
	const Sequelize = __webpack_require__(/*! sequelize */ 9);
	const Commentary = db_1.default.define("Commentary", {
	    content: {
	        type: Sequelize.STRING,
	        allowNull: false,
	    }
	}, {
	    timestamps: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Commentary;


/***/ },
/* 11 */
/*!***********************!*\
  !*** ./models/Tag.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(/*! ../config/db */ 8);
	const Sequelize = __webpack_require__(/*! sequelize */ 9);
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
/* 12 */
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(/*! ../config/db */ 8);
	const Sequelize = __webpack_require__(/*! sequelize */ 9);
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
	        type: Sequelize.INTEGER,
	        allowNull: true
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
/* 13 */
/*!***********************!*\
  !*** ./config/jwt.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt = __webpack_require__(/*! jsonwebtoken */ 14);
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
/* 14 */
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 15 */
/*!*************************!*\
  !*** external "sha256" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("sha256");

/***/ },
/* 16 */
/*!***************************************!*\
  !*** ./controllers/FeedController.ts ***!
  \***************************************/
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
	const models_1 = __webpack_require__(/*! ../models/models */ 6);
	const Router = __webpack_require__(/*! koa-router */ 4);
	const multer = __webpack_require__(/*! koa-multer */ 17);
	const upload = multer({ dest: './public/images' });
	const FeedController = new Router();
	FeedController
	    .get('/', (ctx) => {
	    ctx.render('index');
	})
	    .post('/', upload.single('image'), (ctx) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        let htmlCode = (ctx.req.body.content ? `<p>${ctx.req.body.content}</p>` : '') + `<img src="public/images/${ctx.req.file.filename}"></img>`;
	        let tags = ctx.req.body.tags
	            .split(',')
	            .map(tag => {
	            return { 'name': tag.trim() };
	        });
	        yield models_1.Tag.bulkCreate(tags, {
	            updateOnDuplicate: ['name']
	        });
	        let post = yield models_1.Post.create({
	            content: htmlCode
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
	    .get('/post/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    const id = ctx.params.id;
	    const post = models_1.Post.findById();
	}))
	    .get('/post', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    const posts = yield models_1.Post.findAll({
	        include: [models_1.Tag]
	    });
	    ctx.body = posts.map(post => post.get());
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = FeedController;


/***/ },
/* 17 */
/*!*****************************!*\
  !*** external "koa-multer" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("koa-multer");

/***/ },
/* 18 */
/*!***************************************!*\
  !*** ./controllers/UserController.ts ***!
  \***************************************/
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
	const Router = __webpack_require__(/*! koa-router */ 4);
	const models_1 = __webpack_require__(/*! ../models/models */ 6);
	const AuthMiddleware_1 = __webpack_require__(/*! ../middlewares/AuthMiddleware */ 19);
	const UserController = new Router();
	// UserController.use(authMiddleware)
	UserController
	    .get('/users', AuthMiddleware_1.default, (ctx) => __awaiter(this, void 0, void 0, function* () {
	    ctx.body = yield models_1.User.findAll({ raw: true, order: 'id' });
	}))
	    .get('/users/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    ctx.body = yield models_1.User.findById(id, { raw: true });
	}))
	    .put('/users/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
	    let id = ctx.params.id;
	    let user = ctx.request.body;
	    const foundUser = yield models_1.User.findById(id); //todo: restring access
	    if (foundUser) {
	        ctx.body = (yield foundUser.update(user)).get();
	    }
	    ctx.body = { success: false, message: 'User not found' };
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UserController;


/***/ },
/* 19 */
/*!***************************************!*\
  !*** ./middlewares/AuthMiddleware.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt_1 = __webpack_require__(/*! ../config/jwt */ 13);
	const authMiddleware = (context, next) => {
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
	    context.response.status = 403;
	    context.response.body = '403 Forbidden';
	    return;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = authMiddleware;


/***/ },
/* 20 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 21 */
/*!******************************!*\
  !*** external "koa-convert" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 22 */
/*!************************************!*\
  !*** external "koa-static-folder" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("koa-static-folder");

/***/ },
/* 23 */
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 24 */
/*!***************************!*\
  !*** external "koa-cors" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 25 */
/*!***********************!*\
  !*** ./config/pug.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Pug = __webpack_require__(/*! koa-pug */ 26);
	const pug = new Pug({
	    viewPath: './views',
	    noCache: true
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = pug;


/***/ },
/* 26 */
/*!**************************!*\
  !*** external "koa-pug" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("koa-pug");

/***/ },
/* 27 */
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("koa-json");

/***/ },
/* 28 */
/*!*****************************************!*\
  !*** ./middlewares/CookieMiddleware.ts ***!
  \*****************************************/
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