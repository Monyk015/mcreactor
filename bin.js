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
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	__webpack_require__(/*! es6-shim */ 1);
	__webpack_require__(/*! reflect-metadata */ 2);
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	__webpack_require__(/*! ./controllers/UserController.ts */ 4);
	__webpack_require__(/*! ./controllers/AuthController.ts */ 16);
	__webpack_require__(/*! ./controllers/FeedController.ts */ 17);
	__webpack_require__(/*! ./middlewares/PugMiddleware.ts */ 12);
	__webpack_require__(/*! ./middlewares/CookieMiddleware.ts */ 23);
	const path = __webpack_require__(/*! path */ 14);
	const convert = __webpack_require__(/*! koa-convert */ 18);
	const serve = __webpack_require__(/*! koa-static-folder */ 19);
	const app = routing_controllers_1.createKoaServer();
	app.use(__webpack_require__(/*! koa-bodyparser */ 20)());
	app.use(convert(serve('./public')));
	let cors = __webpack_require__(/*! koa-cors */ 21);
	app.use(convert(cors()));
	//cookie middleware
	app.use((context, next) => __awaiter(this, void 0, void 0, function* () {
	}));
	//
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
/*!**************************************!*\
  !*** external "routing-controllers" ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = require("routing-controllers");

/***/ },
/* 4 */
/*!***************************************!*\
  !*** ./controllers/UserController.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Monyk on 05.11.2016.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	const User_1 = __webpack_require__(/*! ../models/User */ 5);
	const AuthMiddleware_1 = __webpack_require__(/*! ../middlewares/AuthMiddleware */ 8);
	const AdminMiddleware_1 = __webpack_require__(/*! ../middlewares/AdminMiddleware */ 11);
	let UserController = class UserController {
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield User_1.default.findAll({ raw: true, order: 'id' });
	        });
	    }
	    getOne(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield User_1.default.findById(id, { raw: true }); //todo: validation
	        });
	    }
	    put(id, user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const foundUser = yield User_1.default.findById(id); //todo: restring access
	            if (foundUser) {
	                return (yield foundUser.update(user)).get();
	            }
	            return { success: false, message: 'User not found' };
	        });
	    }
	};
	__decorate([
	    routing_controllers_1.UseBefore(AuthMiddleware_1.AuthMiddleware),
	    routing_controllers_1.Get("/users"), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', []), 
	    __metadata('design:returntype', Promise)
	], UserController.prototype, "getAll", null);
	__decorate([
	    routing_controllers_1.Get("/users/:id"),
	    __param(0, routing_controllers_1.Param("id")), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Number]), 
	    __metadata('design:returntype', Promise)
	], UserController.prototype, "getOne", null);
	__decorate([
	    routing_controllers_1.UseBefore(AuthMiddleware_1.AuthMiddleware, AdminMiddleware_1.AdminMiddleware),
	    routing_controllers_1.Put("/users/:id"),
	    __param(0, routing_controllers_1.Param("id")),
	    __param(1, routing_controllers_1.Body()), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Number, Object]), 
	    __metadata('design:returntype', Promise)
	], UserController.prototype, "put", null);
	UserController = __decorate([
	    routing_controllers_1.JsonController(), 
	    __metadata('design:paramtypes', [])
	], UserController);
	exports.UserController = UserController;


/***/ },
/* 5 */
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 06.11.2016.
	 */
	const db_1 = __webpack_require__(/*! ../config/db */ 6);
	const Sequelize = __webpack_require__(/*! sequelize */ 7);
	const User = db_1.default.define("User", {
	    nickname: {
	        type: Sequelize.STRING,
	        allowNull: false,
	    },
	    email: {
	        type: Sequelize.STRING,
	        allowNull: false,
	        unique: true
	    },
	    password: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    rating: {
	        type: Sequelize.INTEGER,
	        allowNull: true
	    },
	    isBanned: {
	        type: Sequelize.BOOLEAN,
	        allowNull: true,
	        field: 'is_banned'
	    },
	    isAdmin: {
	        type: Sequelize.BOOLEAN,
	        allowNull: true,
	        field: 'is_admin'
	    },
	}, {
	    tableName: 'users',
	    timestamps: true,
	    createdAt: "created_at",
	    updatedAt: "updated_at"
	});
	User.sync().then(() => {
	    // users.forEach((user) => {
	    // User.create(<UserAttribute> user)
	    // })
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = User;


/***/ },
/* 6 */
/*!**********************!*\
  !*** ./config/db.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Monyk on 05.11.2016.
	 */
	const Sequelize = __webpack_require__(/*! sequelize */ 7);
	const db = new Sequelize('postgres://monyk:root@localhost:5432/mcreactor');
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = db;


/***/ },
/* 7 */
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 8 */
/*!***************************************!*\
  !*** ./middlewares/AuthMiddleware.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	const jwt_1 = __webpack_require__(/*! ../config/jwt */ 9);
	let AuthMiddleware = class AuthMiddleware {
	    use(context, next) {
	        const token = context.cookie.token;
	        if (token) {
	            const user = jwt_1.verifyToken(token.toString());
	            if (user) {
	                context.request.user = user;
	                return next();
	            }
	        }
	        context.response.status = 403;
	        context.response.body = '403 Forbidden';
	        return;
	    }
	};
	AuthMiddleware = __decorate([
	    routing_controllers_1.Middleware(), 
	    __metadata('design:paramtypes', [])
	], AuthMiddleware);
	exports.AuthMiddleware = AuthMiddleware;


/***/ },
/* 9 */
/*!***********************!*\
  !*** ./config/jwt.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const jwt = __webpack_require__(/*! jsonwebtoken */ 10);
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
/* 10 */
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 11 */
/*!****************************************!*\
  !*** ./middlewares/AdminMiddleware.ts ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	let AdminMiddleware = class AdminMiddleware {
	    use(context, next) {
	        if (context.request.user && context.request.user.isAdmin) {
	            return next();
	        }
	        context.response.status = 403;
	        context.response.body = '403 Forbidden';
	        return;
	    }
	};
	AdminMiddleware = __decorate([
	    routing_controllers_1.Middleware(), 
	    __metadata('design:paramtypes', [])
	], AdminMiddleware);
	exports.AdminMiddleware = AdminMiddleware;


/***/ },
/* 12 */
/*!**************************************!*\
  !*** ./middlewares/PugMiddleware.ts ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	const pug = __webpack_require__(/*! pug */ 13);
	const path = __webpack_require__(/*! path */ 14);
	const defaults = __webpack_require__(/*! lodash.defaults */ 15);
	let PugMiddleware = class PugMiddleware {
	    use(ctx, next) {
	        ctx.response.render = function (file) {
	            ctx.body = pug.renderFile(path.resolve('./views', file + '.pug'), defaults({}));
	        };
	        return next();
	    }
	};
	PugMiddleware = __decorate([
	    routing_controllers_1.MiddlewareGlobalBefore(), 
	    __metadata('design:paramtypes', [])
	], PugMiddleware);
	exports.PugMiddleware = PugMiddleware;


/***/ },
/* 13 */
/*!**********************!*\
  !*** external "pug" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("pug");

/***/ },
/* 14 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 15 */
/*!**********************************!*\
  !*** external "lodash.defaults" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("lodash.defaults");

/***/ },
/* 16 */
/*!***************************************!*\
  !*** ./controllers/AuthController.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	const User_1 = __webpack_require__(/*! ../models/User */ 5);
	const jwt_1 = __webpack_require__(/*! ../config/jwt */ 9);
	let AuthController = class AuthController {
	    login(res) {
	        res.render('auth/login');
	    }
	    postLogin(user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const found = yield User_1.default.findOne({
	                where: {
	                    email: user.email
	                }
	            });
	            if (found && found.password == user.password)
	                return { success: true, token: jwt_1.generateToken(found.dataValues) };
	            else
	                return { success: false, message: 'Incorrect password or username' };
	        });
	    }
	    register(user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield User_1.default.create(user, { raw: true });
	        });
	    }
	};
	__decorate([
	    routing_controllers_1.Get('/login'),
	    __param(0, routing_controllers_1.Res()), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', void 0)
	], AuthController.prototype, "login", null);
	__decorate([
	    routing_controllers_1.Post('/login'),
	    __param(0, routing_controllers_1.Body()), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', Promise)
	], AuthController.prototype, "postLogin", null);
	__decorate([
	    routing_controllers_1.Post("/register"),
	    __param(0, routing_controllers_1.Body()), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', Promise)
	], AuthController.prototype, "register", null);
	AuthController = __decorate([
	    routing_controllers_1.JsonController(), 
	    __metadata('design:paramtypes', [])
	], AuthController);
	exports.AuthController = AuthController;


/***/ },
/* 17 */
/*!***************************************!*\
  !*** ./controllers/FeedController.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	let FeedController = class FeedController {
	    home(res) {
	        return __awaiter(this, void 0, void 0, function* () {
	            res.render('index');
	        });
	    }
	};
	__decorate([
	    routing_controllers_1.Get('/'),
	    __param(0, routing_controllers_1.Res()), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', Promise)
	], FeedController.prototype, "home", null);
	FeedController = __decorate([
	    routing_controllers_1.JsonController(), 
	    __metadata('design:paramtypes', [])
	], FeedController);
	exports.FeedController = FeedController;


/***/ },
/* 18 */
/*!******************************!*\
  !*** external "koa-convert" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 19 */
/*!************************************!*\
  !*** external "koa-static-folder" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("koa-static-folder");

/***/ },
/* 20 */
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 21 */
/*!***************************!*\
  !*** external "koa-cors" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 22 */,
/* 23 */
/*!*****************************************!*\
  !*** ./middlewares/CookieMiddleware.ts ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const routing_controllers_1 = __webpack_require__(/*! routing-controllers */ 3);
	let CookieMiddleware = class CookieMiddleware {
	    use(context, next) {
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
	    }
	};
	CookieMiddleware = __decorate([
	    routing_controllers_1.MiddlewareGlobalBefore(), 
	    __metadata('design:paramtypes', [])
	], CookieMiddleware);
	exports.CookieMiddleware = CookieMiddleware;


/***/ }
/******/ ]);
//# sourceMappingURL=bin.js.map