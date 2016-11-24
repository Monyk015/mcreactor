import 'es6-shim'
import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import "./controllers/UserController.ts"
import "./controllers/AuthController.ts"
import "./controllers/FeedController.ts"
import "./middlewares/PugMiddleware.ts"
import "./middlewares/CookieMiddleware.ts"

const path = require('path')

const convert = require('koa-convert')

const serve = require('koa-static-folder')


const app = createKoaServer()


app.use(require('koa-bodyparser')())

app.use(convert(serve('./public')))

let cors = require('koa-cors')

app.use(convert(cors()))

//cookie middleware
app.use(async (context, next) => {

})
//

app.listen(3000)
