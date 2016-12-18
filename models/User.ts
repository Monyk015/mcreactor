/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface UserAttribute
{
    id?:number
    nickname?:string
    email?:string
    password?:string
    rating?:number
    isBanned?:boolean
    isAdmin?:boolean
    createdAt?:number
    updatedAt?:number
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute
{}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute>
{}

const User : UserModel = db.define<UserInstance, UserAttribute>("User", {
    nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER
    },
    isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
        
    },
}, {
    timestamps: true
})



export default User
