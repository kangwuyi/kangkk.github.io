var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('page/index', {
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/header', function(req, res, next) {
  res.render('page/header', {
    kcFileName: 'title',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/footer', function(req, res, next) {
  res.render('page/footer', {
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
  });
});
//
router.get('/candies', function(req, res, next) {
  res.render('page/candies', {
    content: 'Express',
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
// router.get('/chestnut', function(req, res, next) {
//   res.render('page/chestnut', { title: 'Express' });
// });
// router.get('/longan', function(req, res, next) {
//   res.render('page/longan', { title: 'Express' });
// });
// router.get('/waterChestnut', function(req, res, next) {
//   res.render('page/waterChestnut', { title: 'Express' });
// });

module.exports = router;
