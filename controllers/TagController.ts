import * as sequelize from 'sequelize';
import authMiddleware from '../middlewares/AuthMiddleware';
import {Commentary, Tag, User, Post} from '../models/models';
import { Context } from '~koa/lib/context';
import * as Router from 'koa-router';

const TagController = new Router()

TagController
  


export default TagController
