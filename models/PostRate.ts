import { PostInstance } from './Post';
import { UserInstance } from './User';
/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface PostRateAttribute {
    id?: number
    rate?: number
    User?:UserInstance
    Post?:PostInstance
}

export interface PostRateInstance extends Sequelize.Instance<PostRateAttribute>, PostRateAttribute
{ }

export interface PostRateModel extends Sequelize.Model<PostRateInstance, PostRateAttribute>
{ }

const PostRate: PostRateModel = db.define<PostRateInstance, PostRateAttribute>("PostRate", {
    rate: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    }
}, {
        timestamps: true
})


export default PostRate




