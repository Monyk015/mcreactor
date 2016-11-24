import 'es6-shim'
import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import "./controllers/UserController.ts"
import "./controllers/AuthController.ts"
import "./controllers/FeedController.ts"

const convert = require('koa-convert')

const serve = require('koa-static-folder')


const app = createKoaServer()


app.use(require('koa-bodyparser')())

app.use(convert(serve('./public')))

let cors = require('koa-cors')
app.use(convert(cors()))



app.listen(3000)