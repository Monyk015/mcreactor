import {Commentary, Post, PostRate, Tag, User,CommentaryRate} from "../models/models";

async function getPosts(userId = null, where = null) {
    return await Post.findAll({
        where,
        include: [
            {
                model: PostRate,
                where: userId ? {
                        UserId: userId
                    } : null,
                required: false
            },
            Tag,
            User,
            {
                model: Commentary,
                include: [User, {
                    model: CommentaryRate,
                    where: userId ? {
                            UserId: userId
                        } : null,
                    required: false
                }]
            }
        ],
        order: [
            ['createdAt', 'DESC'],
            [Commentary, 'createdAt']
        ]
    })
}

export default getPosts

