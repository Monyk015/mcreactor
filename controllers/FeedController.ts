import authMiddleware from '../middlewares/AuthMiddleware';

import { Response } from '~koa/lib/response';
import { User, Commentary, Tag, Post } from '../models/models';
import * as Router from 'koa-router';
import { Context } from 'koa';
import db from '../config/db';


const multer = require('koa-multer')
const upload = multer({ dest: './public/images' })

const FeedController = new Router()

FeedController

    .get('/',
    (ctx: Context) => {
        ctx.render('index')
    })



export default FeedController
