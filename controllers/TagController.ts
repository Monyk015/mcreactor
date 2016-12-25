import {Tag} from '../models/models';
import * as Router from 'koa-router';

const TagController = new Router()

TagController
    
        .get('/tag/:id',
            async (ctx) => {
                let id = ctx.params.id
                let tag = await Tag.findById(id)
                ctx.body = {success: true, tagName: tag.name}
            })
  


export default TagController
