var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('menu/index', { folder: 'candies', content: {linkList: [{fileName: 'abc', mtime: '2023-05-01'}]} });
});

module.exports = router;
