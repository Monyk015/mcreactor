import 'es6-shim'
import "reflect-metadata";
import * as Koa from "koa"
import * as Router from 'koa-router'
import AuthController from './controllers/AuthController'
import FeedController from './controllers/FeedController'
import UserController from './controllers/UserController'
import { Context } from 'koa';

const path = require('path')

const convert = require('koa-convert')

const serve = require('koa-static-folder')

const app = new Koa()

app.use(require('koa-bodyparser')())

app.use(convert(serve('./public')))
app.use(convert(serve('./public/images')))

let cors = require('koa-cors')

app.use(convert(cors()))

import pug from './config/pug'

pug.use(app)

app.use(convert(require('koa-json')()))

import cookieMiddleware from './middlewares/CookieMiddleware';

app.use(cookieMiddleware)

const router = new Router()


router
    .use('',UserController.routes())
    .use('',AuthController.routes())
    .use('',FeedController.routes())

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)
