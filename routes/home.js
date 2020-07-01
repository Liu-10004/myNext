const express = require('express');
const { checkLogin } = require('../src/utils/auth');
let router = express.Router();

// router.get('/1', (req, res, next) => {
//   res.end('1');
// });
router.get('/2', checkLogin, (req, res, next) => {
  res.end(JSON.stringify('欢迎来到home页面'));
});
router.get('/3', checkLogin, (req, res, next) => {
  res.end(JSON.stringify('login'));
});
module.exports = router;
