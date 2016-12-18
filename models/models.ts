import CommentaryRate from './CommentaryRate';
import PostRate from './PostRate';
import Post from './Post';
import Commentary from './Commentary';
import Tag from './Tag';
import User from './User';
import * as Sequelize from 'sequelize';
import db from '../config/db';

Post.belongsTo(User)

User.hasMany(Post)

User.hasMany(Commentary)

Commentary.belongsTo(User)

Post.hasMany(Commentary)

Commentary.belongsTo(Post)

const PostTag = db.define('PostTag',{},{tableName:'PostTag'})

Tag.belongsToMany(Post, { through: 'PostTag' })

Post.belongsToMany(Tag, { through: 'PostTag' })

PostRate.belongsTo(Post)

PostRate.belongsTo(User)

Post.hasMany(PostRate)

CommentaryRate.belongsTo(Commentary)

CommentaryRate.belongsTo(User)

Commentary.hasMany(CommentaryRate)


// User.sync({force: true})
// Post.sync({force: true})
// Tag.sync({force: true})
// Commentary.sync({force: true})
// PostTag.sync({force: true})
// PostRate.sync({force:true})
// CommentaryRate.sync({force:true})

export { Tag, Commentary, Post, User, CommentaryRate, PostRate}
