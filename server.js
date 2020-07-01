const Express = require('express');
const next = require('next');
const compression = require('compression');
const dev = process.env.NODE_ENV !== 'production';
const session = require('express-session');
const { SomeModel, User, Articles } = require('./db.js');
const app = next({ dev });
const handle = app.getRequestHandler();
let port = dev ? 3002 : 7005;
console.log('Waiting ready on http://localhost ' + port + ' ……');

app
  .prepare()
  .then(() => {
    const server = new Express();

    if (!dev) {
      server.use(compression()); //gzip
    }
    server.use(
      session({
        resave: true, //每次客户请求到服务器都会保存session
        secret: 'lbq', // 用来加密 cookie
        saveUninitialized: true //保存未初始化的session
      })
    );

    console.log('come on');
    //文章二级页面
    server.get('/home/articleDetails/:id', (req, res) => {
      const actualPage = '/home/articleDetails';
      const queryParams = { id: req.params.id };
      // console.log('catch', queryParams);
      console.log(actualPage);
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost ' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
