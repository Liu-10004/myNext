const express = require('express');
const { checkLogin } = require('../src/utils/auth');
const { SomeModel, User, Articles } = require('../db.js');
let router = express.Router();

router.get('/fetchPersons', (req, res, next) => {
  SomeModel.find({}, function (err, data) {
    res.end(JSON.stringify(data));
  });
});
router.post('/delPerson', (req, res, next) => {
  let data = req.body;
  SomeModel.findByIdAndRemove(data, function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
