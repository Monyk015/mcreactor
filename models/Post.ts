import { UserInstance } from './User';
/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface PostAttribute {
    id?: number
    content?: String
    image?: String
    createdAt?: number
    updatedAt?: number
    Tags?: Array<any>
    UserId?: number
    rating?: number
    getTags?: any
    User?: UserInstance
}

export interface PostInstance extends Sequelize.Instance<PostAttribute>, PostAttribute
{ }

export interface PostModel extends Sequelize.Model<PostInstance, PostAttribute>
{ }

const Post: PostModel = db.define<PostInstance, PostAttribute>("Post", {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rating: {
        type: Sequelize.INTEGER
    }
}, {
        timestamps: true
    })

import Commentary from './Commentary';



export default Post




