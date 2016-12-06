
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

    .post('/',
    upload.single('image'),
    async (ctx: Context) => {
        try{
            let htmlCode = (ctx.req.body.content ? `<p>${ctx.req.body.content}</p>` : '') + `<img src="public/images/${ctx.req.file.filename}"></img>`
            let tags = ctx.req.body.tags
                .split(',')
                .map(tag => { 
                    return { 'name': tag.trim() } 
                })

            await Tag.bulkCreate(tags, {
                updateOnDuplicate: ['name']
            })

            let post = await Post.create({
                content: htmlCode
            }) as any

            await post.setTags(await Tag.findAll({
                where:{
                    name: {
                        in: ctx.req.body.tags.split(',').map(tag => tag.trim())
                    }
                }
            }))
            ctx.body = {success: true, message:''}
        }
        catch(e)
        {
            ctx.body = {success: false, message: `Something went wrong: ${e}`}
        }
    })

    .get('/post/:id',
    async (ctx) => {
        const id = ctx.params.id
        const post = Post.findById() 
    })

    .get('/post',
    async (ctx) => {
        const posts = await Post.findAll({
            include: [Tag]
        })
        ctx.body = posts.map(post => post.get())
    })


export default FeedController
