var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    list: [
      // 'home/header',
      // 'home/footer',
      'home/left',
      'home/right',
      'home/index',
      //
      'menu/left',
      'menu/right',
      'menu/index',
      //
      'other/map',
      'other/readme',
      //
      'page/header',
      'page/footer',
      'page/index',
      'page/candies',
      'page/chestnut',
      'page/longan',
      'page/candies',
      'page/waterChestnut',
    ]
  });
});

module.exports = router;
