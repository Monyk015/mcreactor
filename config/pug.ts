const Pug = require('koa-pug')

const pug = new Pug({
  viewPath: './views',
  noCache: true
})

export default pug
