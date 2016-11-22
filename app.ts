import 'es6-shim'
import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import "./controllers/UserController.ts"
import "./controllers/AuthController.ts"

const convert = require('koa-convert')



const app = createKoaServer()


app.use(require('koa-bodyparser')())

app.use(function (ctx, next) {
    
})

let cors = require('koa-cors')
app.use(convert(cors()))



app.listen(3000)