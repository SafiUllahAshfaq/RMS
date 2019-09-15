const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
// const cors = require('@koa/cors')(/* Add your cors option */);
require('./config/database');
const logger = require('koa-logger')();

const errorHandler = require('./middleware/error.middleware');
const candidate = require('./api/candidate/candidate.routes');

const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 500;

server.use(logger);

server
  .use(errorHandler)
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
