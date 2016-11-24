import { Controller, UseBefore, Get, Res, JsonController } from 'routing-controllers';
import { PugMiddleware } from '../middlewares/PugMiddleware';
import { Response } from '~koa/lib/response';

@UseBefore(PugMiddleware)
@JsonController()
export class FeedController {
    @Get('/')
    async home( @Res() res: Response) {
        res.render('index')
    }
}
