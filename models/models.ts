import CommentaryRate from './CommentaryRate';
import PostRate from './PostRate';
import Post from './Post';
import Commentary from './Commentary';
import Tag from './Tag';
import User from './User';
import * as Sequelize from 'sequelize';
import db from '../config/db';
import Subscription from "./Subscription";
import Ban from "./Ban";
import users from "../mocks/users";
import * as fs from 'fs';

Post.belongsTo(User)

User.hasMany(Post)

User.hasMany(Commentary)

Commentary.belongsTo(User)

Post.hasMany(Commentary, {
    onDelete: 'CASCADE'
})

Commentary.belongsTo(Post)

const PostTag = db.define('PostTag', {}, {tableName: 'PostTag'})

Tag.belongsToMany(Post, {through: 'PostTag'})

Post.belongsToMany(Tag, {through: 'PostTag'})

PostRate.belongsTo(Post)

PostRate.belongsTo(User)

Post.hasMany(PostRate, {
    onDelete: 'CASCADE'
})

CommentaryRate.belongsTo(Commentary)

CommentaryRate.belongsTo(User)

Commentary.hasMany(CommentaryRate, {
    onDelete: 'CASCADE'
})

Subscription.belongsTo(User)

Subscription.belongsTo(Tag)

User.hasMany(Subscription, {
    onDelete: 'CASCADE'
})

Tag.hasMany(Subscription, {
    onDelete: 'CASCADE'
})

Ban.belongsTo(User)

Ban.belongsTo(Tag)

User.hasMany(Ban, {
    onDelete: 'CASCADE'
})

Tag.hasMany(Ban)

;(async() => {
    await User.sync({force: true})

    await Post.sync({force: true})
    await Tag.sync({force: true})
    await PostTag.sync({force: true})
    await Commentary.sync({force: true})
    await PostRate.sync({force: true})
    await CommentaryRate.sync({force: true})
    await Ban.sync({force: true})
    await Subscription.sync({force: true})

    ;(async() => {
        await User.bulkCreate(users.map(user => {
            user.password = require('sha256')(user.password)
            return user
        }))
        let query = fs.readFileSync('./mocks/posts.sql', 'utf-8')
        await db.query(query)
    })()
})()


export {Tag, Commentary, Post, User, CommentaryRate, PostRate, Ban, Subscription}
