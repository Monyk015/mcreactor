/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface PostAttribute
{
    id?:number
    content?:any
    createdAt?:number
    updatedAt?:number
    tags?: Array<any>
}

export interface PostInstance extends Sequelize.Instance<PostAttribute>, PostAttribute
{}

export interface PostModel extends Sequelize.Model<PostInstance, PostAttribute>
{}

const Post : PostModel = db.define<PostInstance, PostAttribute>("Post", {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
})

import Commentary from './Commentary';



export default Post




