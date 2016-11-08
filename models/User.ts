/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface UserAttribute
{
    id?:string
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
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'is_banned'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'is_admin'
        
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

import users from '../mocks/users'

User.sync().then(() => {
    // users.forEach((user) => {
        // User.create(<UserAttribute> user)
    // })
})

export default User




