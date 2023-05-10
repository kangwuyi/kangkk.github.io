var express = require('express');
var router = express.Router();

router.get('/map', function(req, res, next) {
  res.render('other/map', { title: 'Express' });
});
router.get('/readme', function(req, res, next) {
  res.render('other/readme', { title: 'Express' });
});

module.exports = router;
