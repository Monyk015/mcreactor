import {User, Subscription, Tag, Post} from "../models/models";
import db from "../config/db";
import sendEmail from "../config/mailer";

export default async function notifyAboutNewBestPost(postId:number){
    let users = await Post.findAll({
        attributes:['Tags.Subscriptions.User.email'],
        include:[{
            model: Tag,
            include: [{
                    model: Subscription,
                    include: [User]
            }]
        }],
        where:{
            id: postId
        },
        raw: true
    })
    users.forEach(user => {
        if((<any>user).email)
            sendEmail((<any>user).email, postId)
    })
}