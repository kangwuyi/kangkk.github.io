var express = require('express');
var router = express.Router();

router.get('/map', function(req, res, next) {
  res.render('other/map');
});
router.get('/readme', function(req, res, next) {
  res.render('other/readme');
});

module.exports = router;
