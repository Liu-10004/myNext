const Express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors');
const { SomeModel, User, Articles } = require('./db');
const compression = require('compression');
const dev = process.env.NODE_ENV !== 'production';
const session = require('express-session');
let home = require('./routes/home');
let user = require('./routes/user');
let article = require('./routes/article');
let person = require('./routes/person');
const { json } = require('express');
let myBodyParser = require('./src/utils/myBodyParser');

let port = dev ? 3003 : 7005;
console.log('Waiting ready on http://localhost ' + port + ' ……');
const app = new Express();
let router = Express.Router();
if (!dev) {
  app.use(compression()); //gzip
}

app.use(
  cors({
    origin: ['http://localhost:3002'],
    credentials: false,
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(myBodyParser());

// 使用了此回话中间件后，会在请求对象上增加 req.session 属性
app.use(
  session({
    resave: true, //每次客户请求到服务器都会保存session
    secret: 'lbq', // 用来加密 cookie
    saveUninitialized: true //保存未初始化的session
  })
);

app.use('/user', user);
app.use('/home', home);
app.use('/article/saveArticle', (req, res, next) => {
  console.log('/article/saveArticle', req.body);
  next();
});
app.use('/article', article);
app.use('/person', person);
// app.get('*', (req, res) => {
//   console.log(req.methods);
//   return handle(req, res);
// });

app.listen(port, err => {
  if (err) throw err;
  console.log('> Ready on http://localhost ' + port);
});
