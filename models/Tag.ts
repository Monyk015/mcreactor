/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface TagAttribute
{
    id?:number
    name: string
    createdAt?:number
    updatedAt?:number
}

export interface TagInstance extends Sequelize.Instance<TagAttribute>, TagAttribute
{}

export interface TagModel extends Sequelize.Model<TagInstance, TagAttribute>
{}

const Tag : TagModel = db.define<TagInstance, TagAttribute>("Tag", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    indexes:[
        {
            fields: ['name'],
            unique: true
        }
    ],
    timestamps: true,
})


export default Tag




