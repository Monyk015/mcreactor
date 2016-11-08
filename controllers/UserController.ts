/**
 * Created by Monyk on 05.11.2016.
 */

import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, Res, Middleware, UseBefore } from 'routing-controllers';
import User from '../models/User';
import {ServerResponse} from "http";
import { UserAttribute } from '../models/User';
import * as _ from 'lodash'
import { JwtMiddleware } from '../middlewares/JwtMiddleware';

@JsonController()
export class UserController
{

    @UseBefore(JwtMiddleware)
    @Get("/users")
    async getAll()
    {
        return await User.findAll({raw: true, order:'id'})
    }

    @Get("/users/:id")
    async getOne(@Param("id") id: number)
    {
        return await User.findById(id, {raw : true})//todo: validation
    }

    @Post("/users")
    async post(@Body() user: UserAttribute)
    {
        return await User.create(user, {raw: true})
    }

    @Put("/users/:id")
    async put(@Param("id") id:number, @Body() user: UserAttribute) : Promise<any>
    {
        const foundUser = await User.findById(id)//todo: restring access
        if(foundUser)
        {
            return (await foundUser.update(user)).get()
        }
        return {success: false, message: 'User not found'}
    }

}