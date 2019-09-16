const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
// const cors = require('@koa/cors')(/* Add your cors option */);
const logger = require('koa-logger')();
const serve = require('koa-static');

require('./config/database');

const errorHandler = require('./middleware/error.middleware');
const candidate = require('./api/candidate/candidate.routes');

const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 500;

server.use(logger);

server
  .use(errorHandler)
  .use(serve(__dirname + '/uploads'))
  .use(
    koaBody({
      multipart: true,
      urlencoded: true
    })
  )
  .use(candidate.routes())
  .use(router.allowedMethods());

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
