'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('underscore');
const ejs = require('ejs');
const markdown = require('marked');
const highlight = require('highlight.js');
const transliteration = require('transliteration');
const matter = require('gray-matter');
const { TargetFolder } = require('./config');

/**
 * 
 * @param {object} _list -
 * eq: [{_s:'/', _t:'/'}]
 */
const writePageAction = _list => {
  _.each(_list, $ => {
    if (fs.existsSync($._t)) fs.unlinkSync($._t);
    fs.writeFileSync(
      $._t,
      ejs.render(
        $._c || fs.readFileSync($._s, 'utf8'),
        {
          filename: $._s,
        }
      ),
      'utf8'
    );
  })
};
//
const writeIndexPageAction = params => {
  const rela = path.join(process.cwd(), 'templates/views/menu/index.ejs');
  const targetPath = path.join(process.cwd(), TargetFolder, params.folder + '.html')
  if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
  fs.writeFileSync(
    targetPath,
    ejs.render(
      fs.readFileSync(rela, 'utf8'),
      {
        filename: rela,
        ...params
      }
    ),
    'utf8'
  );
};
// 提取日期等信息
const readMdHideInfoAction = _md => {
  const mtimeStrip = /<!-- kk-mtime ([\s\S]+) kk-mtime stop -->/;
  const mtime = _md.match(mtimeStrip);
  const showStrip = /<!-- kk-show ([\s\S]+) kk-show stop -->/;
  const show = _md.match(showStrip);
  return {
    mtime: mtime ? mtime[1] : void 0,
    show: show ? show[1] : void 0
  }
}
//
const replacMdAction = $ => {
  const renderer = new markdown.Renderer();
  renderer.heading = function (text, level) {
    // var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return '<h' + level + '><span class="header-link" id="' +
      text.toLowerCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-') + '">' +
      text + '</span></h' + level + '>';
  };
  renderer.image = function (href, title, text) {
    const xhtml = false;
    let out = '<img src="../' + href.replace(/^\.\.\/\.\.\/\.\.\//g, '') + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += xhtml ? '/>' : '>';
    return out;
  };
  //
  markdown.setOptions({
    renderer: renderer,
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
  });
  //
  const content = fs.readFileSync($._s, 'utf8');
  const fileNameMd5 = path.basename($._t, '.html')
  const fileName = path.basename($._s).replace(/\.[a-zA-Z]+$/, '');
  const description = fileName;
  const fileNameEn = transliteration.slugify(fileName, {
    lowercase: false,
    separator: ' '
  });
  // const template = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n';
  // const tocMd = toc(content, {
  //   template: template,
  //   bullet: "1. ",
  //   maxDepth: 5
  // });
  // birthtime = moment(fileFsTimeObject.birthtime).format("YYYY-MM-DD"),
  // mtimeGetTime = moment(fileFsTimeObject.mtime).unix(),
  const mdToHtml = markdown(renderMd2Md(content)._c);
  const keyWorlds = fileNameEn.split(' ').join(',') + ',' + fileNameEn + ',' + fileName;
  //
  const otherInfo = readMdHideInfoAction(mdToHtml);
  if (!otherInfo.show) return;
  //
  if (fs.existsSync($._t)) fs.unlinkSync($._t);
  //
  fs.writeFileSync(
    $._t,
    ejs.render(
      fs.readFileSync($._templ._s, 'utf8'),
      {
        filename: $._templ._s,
        folder: $._templ._n,
        kcFileId: fileNameMd5,
        kcFileName: fileName,
        kcFileAddr: 'http://kangkk.com/' + path.relative(process.cwd(), $._t),
        keyWorlds: keyWorlds,
        description: description,
        content: mdToHtml,
        relativePath: path.relative(process.cwd(), $._t),
        birthtime: 'birthtime',
        mtime: 'mtime'
      }
    ),
    'utf8'
  );
  // console.log('creat [' + htmlFileName + ']');
  //
  return {
    path: path.relative(path.join(process.cwd(), TargetFolder), $._t),
    fileName: fileName,
    folder: $._templ._n,
    ...otherInfo
  }
};
//
function renderMd2Md (_c) {
  let content = matter(_c).content;
  // const front = matter.extend(_c);
  content = mdReplaceFootnote(content);
  return {
    _c: content
  }
}
function mdReplaceFootnote (_c) {
  let content = _c;
  const footnoteStart = new RegExp("\\[\\^\\^+[a-zA-Z0-9_\u4e00-\u9fa5]+\\](?!:)", "igm");
  const footnoteEnd = new RegExp("\\[\\^\\^+[a-zA-Z0-9_\u4e00-\u9fa5]+\\]:.+", "ig");
  const footnoteLink = {};
  const footnoteMap = _.map(content.match(footnoteEnd), function (item, index) {
    const itemNoBrackets = item.match(/\[\^\^(.+?)\]:/g)[0].replace(/\[\^\^(.+?)\]:/g, '$1');
    footnoteLink[itemNoBrackets] = (index + 1);
    return '<li id="footnoteDo_' + (index + 1) + '" class="footnoteUp">' +
      '<span class="backlink" data-desc="' + itemNoBrackets + '">' +
      '<b><a  href="#footnoteUp_' + (index + 1) + '">^</a></b>' +
      '</span>' +
      '<span class="reference-text">' + item.replace(/\[\^\^(.+?)\]:/g, "") + '</span>' +
      '</li>';
  });
  content = content.replace(footnoteStart, function (item) {
    item = item.replace(/\[\^\^(.+?)\]/g, '$1');
    return '<sup id="footnoteUp_' + footnoteLink[item] + '" data-desc="' + item + '" class="reference"><a class="footnoteUp" href="#footnoteDo_' + footnoteLink[item] + '">[' + footnoteLink[item] + ']</a></sup>';
  });
  content = content.replace(footnoteEnd, '');
  content = content.replace(footnoteEnd, '');
  const footnoteBox = '\n\n## References\n\n<section class="footnote-box"><ul>' + footnoteMap.join('') + '</ul></section>\n\n';

  return content + ((footnoteMap.length > 0) ? footnoteBox : '\n\n');
}
//
module.exports = {
  writePageAction,
  readMdHideInfoAction,
  replacMdAction,
  writeIndexPageAction
};