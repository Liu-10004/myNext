const express = require('express');
const { checkLogin } = require('../src/utils/auth');
const { Articles } = require('../db.js');
let router = express.Router();

router.post('/saveArticle', (req, res, next) => {
  console.log('req.body', req.body);
  let data = req.body;
  Articles.create(data, function (err, doc) {
    if (err) {
      res.send(404);
    } else {
      res.send({ codeStatus: 200 });
    }
  });
});
router.get('/getAllArticles', (req, res) => {
  Articles.find({}, (err, data) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(data));
    }
  });
});
router.get('/getArticleById/:id', (req, res) => {
  const _id = req.params.id;
  Articles.find({ _id }, (err, data) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(data));
    }
  });
});
module.exports = router;
