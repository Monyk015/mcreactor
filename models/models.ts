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

const PostTag = db.define('PostTag', {}, {tableName: 'PostTag'})

Tag.belongsToMany(Post, {through: 'PostTag'})

Post.belongsToMany(Tag, {through: 'PostTag'})

PostRate.belongsTo(Post)

PostRate.belongsTo(User)

Post.hasMany(PostRate)

CommentaryRate.belongsTo(Commentary)

CommentaryRate.belongsTo(User)

Commentary.hasMany(CommentaryRate)

          
// ;(async () =>
// {
//     await User.sync({force:true})
//     await Post.sync({force:true})
//     await Tag.sync({force:true})
//     await PostTag.sync({force:true})
//     await Commentary.sync({force:true})
//     await PostRate.sync({force:true})
//     await CommentaryRate.sync({force:true})
// })()
export {Tag, Commentary, Post, User, CommentaryRate, PostRate}
