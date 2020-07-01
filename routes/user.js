const express = require('express');
const { checkLogin } = require('../src/utils/auth');
const { SomeModel, User, Articles } = require('../db.js');
let router = express.Router();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

router.post('/login', (req, res) => {
  console.log('-----login', req.body);
  let data = req.body;
  User.findOne(data, (err, doc) => {
    if (err) {
      res.redirect('/');
    } else {
      if (doc) {
        //回话对象中写入属性 user=doc
        req.session.user = doc;
        req.session.cookie.httpOnly = false;
        // console.log(req.session);
        res.end(JSON.stringify({ code: 200 }));
      } else {
        res.redirect('/home/2');
      }
    }
  });
});

router.get('/checkLogin', (req, res, next) => {
  if (req.session.user) {
    res.end(JSON.stringify({ login: true }));
  } else {
    res.end(JSON.stringify({ login: false }));
  }
});
router.get('/singout', (req, res, next) => {
  req.session.user = null;
  res.end(JSON.stringify('删除成功'));
});

module.exports = router;
