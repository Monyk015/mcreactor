import db from '../config/db'
import * as Sequelize from "sequelize";
import {TagInstance} from "./Tag";
import {UserInstance} from './User';


export interface BanAttribute
{
    id?: number
    User?:UserInstance
    Tag?:TagInstance
    createdAt?:number
    updatedAt?:number
    UserId?:number
    TagId?:number
}

export interface BanInstance extends Sequelize.Instance<BanAttribute>, BanAttribute
{}

export interface BanModel extends Sequelize.Model<BanInstance, BanAttribute>
{}

const Ban : BanModel = db.define<BanInstance, BanAttribute>("Ban", {

}, {
    timestamps: true
})


export default Ban
