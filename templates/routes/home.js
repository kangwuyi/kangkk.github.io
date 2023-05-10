var express = require('express');
var router = express.Router();

router.get('/index', function(_req, res, _next) {
  res.render('home/index');
});
router.get('/left', function(_req, res, _next) {
  res.render('home/left');
});
router.get('/right', function(_req, res, _next) {
  res.render('home/right');
});

module.exports = router;
