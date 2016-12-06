/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";


export interface CommentaryAttribute
{
    id?:number
    content?:any
    createdAt?:number
    updatedAt?:number
}

export interface CommentaryInstance extends Sequelize.Instance<CommentaryAttribute>, CommentaryAttribute
{}

export interface CommentaryModel extends Sequelize.Model<CommentaryInstance, CommentaryAttribute>
{}

const Commentary : CommentaryModel = db.define<CommentaryInstance, CommentaryAttribute>("Commentary", {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
})


export default Commentary
