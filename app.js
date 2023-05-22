'use strict';
const { writePageAction, replacMdAction, writeIndexPageAction } = require('./app/action');
const { ToolPageList, WordPageList } = require('./app/config');
//
try {
  const menu = {};
  //
  writePageAction(ToolPageList);
  WordPageList.map($ => {
    const $$ = replacMdAction($);
    if (!$$) return;
    const params = {
      fileName: $$.fileName,
      mtime: $$.mtime,
      folder: $$.folder,
      path: $$.path,
    };
    if (menu[$$.folder]) menu[$$.folder].push(params);
    else menu[$$.folder] = [params];
  });
  //
  Object.keys(menu).map($ => {
    writeIndexPageAction({
      folder: $,
      list: menu[$]
    });
  });
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