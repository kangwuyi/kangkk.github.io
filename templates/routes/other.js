var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/map', function(req, res, next) {
  res.render('other/map', { title: 'Express' });
});

module.exports = router;
