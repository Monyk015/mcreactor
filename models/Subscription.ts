import db from '../config/db'
import * as Sequelize from "sequelize";
import {TagInstance} from "./Tag";
import {UserInstance} from './User';


export interface SubscriptionAttribute
{
    id?: number
    User?:UserInstance
    Tag?:TagInstance
    createdAt?:number
    updatedAt?:number
    UserId?:number
    TagId?:number
}

export interface SubscriptionInstance extends Sequelize.Instance<SubscriptionAttribute>, SubscriptionAttribute
{}

export interface SubscriptionModel extends Sequelize.Model<SubscriptionInstance, SubscriptionAttribute>
{}

const Subscription : SubscriptionModel = db.define<SubscriptionInstance, SubscriptionAttribute>("Subscription", {
    
}, {
    timestamps: true
})


export default Subscription
