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


User.sync()
Post.sync()
Tag.sync()
Commentary.sync()
PostTag.sync()

export { Tag, Commentary, Post, User }
