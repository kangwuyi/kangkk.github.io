'use strict';

//
try {
  const { writePageAction, replacMdAction } = require('./app/action');
  const { ToolPageList, WordPageList } = require('./app/config');
  //
  writePageAction(ToolPageList);
  WordPageList.map($ => {
    replacMdAction($);
  });
  console.log('WordPageList', WordPageList)
} catch (e) {
  console.log('e=>', e)
}






// =======
// 开始执行
// =======
/**
 * 测试环境： test
 * 发布环境： publish
 * 清空环境： clean
 **/
// var setEvnParam = 'publish';
// const startBuild = _evn => {
//   if (_evn === 'clean') if (verificationPath(mdToHtmlOutPath).status) deteleOutputGlobalPath(mdToHtmlOutPath);
//   loopMdFolder(_evn);
// };
// startBuild(setEvnParam)