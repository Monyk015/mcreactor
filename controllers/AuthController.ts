import { JsonController, Post, Body, Req, Res, Get, Controller, UseBefore } from 'routing-controllers';
import { UserAttribute, UserModel } from '../models/User';
import User from '../models/User';
import { generateToken } from '../config/jwt';
import { Request } from '~koa/lib/request';
import { Response } from '~koa/lib/response';
import { PugMiddleware } from '../middlewares/PugMiddleware';


@UseBefore(PugMiddleware)
@JsonController()
export class AuthController {
    @Get('/login')
    login( @Res() res: Response) {
        res.render('auth/login')
    }

    @Post('/login')
    async postLogin( @Body() user: UserAttribute): Promise<any> {
        const found = await User.findOne({
            where: {
                email: user.email
            }
        })
        if (found && found.password == user.password)
            return { success: true, token: generateToken(found.dataValues) }
        else
            return { success: false, message: 'Incorrect password or username' }

    }


    @Post("/register")
    async register( @Body() user: UserAttribute) {
        return await User.create(user, { raw: true })
    }
}
