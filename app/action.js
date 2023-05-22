'use strict';

const fs = require('fs');
const _ = require('underscore');
const ejs = require('ejs');
const markdown = require('marked');
const highlight = require('highlight.js');
const transliteration = require('transliteration');
const matter = require('gray-matter');

/**
 * 
 * @param {object} _list -
 * eq: [{_s:'/', _t:'/'}]
 */
const writePageAction = _list => {
  _.each(_list, $ => {
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
// 提取日期等信息
const readMdHideInfoAction = _md => {
  const mtimeStrip = /<!-- kk-mtime -->([\s\S]+)<!-- kk-mtime stop -->/;
  const mtime = _md.match(mtimeStrip);
  return {
    mtime: mtime && mtime[1]
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
    const out = '<img src="../' + href.replace(/^\.\.\/\.\.\/\.\.\//g, '') + '" alt="' + text + '"';
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
  const fileName = description = path.basename($._s).replace(/\.[a-zA-Z]+$/, '');
  const fileNameEn = transliteration.slugify(fileName, {
    lowercase: false,
    separator: ' '
  });
  const template = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n';
  const tocMd = toc(content, {
    template: template,
    bullet: "1. ",
    maxDepth: 5
  });
  // birthtime = moment(fileFsTimeObject.birthtime).format("YYYY-MM-DD"),
  // mtimeGetTime = moment(fileFsTimeObject.mtime).unix(),
  const mdToHtml = markdown(renderMd2Md(content));
  const keyWorlds = fileNameEn.split(' ').join(',') + ',' + fileNameEn + ',' + fileName;
  //
  if (fs.existsSync($._t)) fs.unlinkSync($._t);
  //
  fs.writeFileSync(
    $._s,
    ejs.render(
      $._templ._t,
      {
        filename: $._templ._t,
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
    path: path.relative(process.cwd(), $._t),
    fileName: fileName,
    // birthtime: birthtime,
    //   mtime: mtime,
    //   mtimeGetTime: mtimeGetTime
  }
};
//
function renderMd2Md (_c) {
  let content = matter(_c).content;
  const front = matter.extend(_c);
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
  replacMdAction
};