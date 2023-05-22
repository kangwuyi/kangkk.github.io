const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const _ = require('underscore');
const crypto = require('crypto');
const { cheackExtnameIsMd } = require('./fs');
//
const ToolPageList = [
  {
    _s: path.join(process.cwd(), 'templates/views/home/index.ejs'),
    _t: path.join(process.cwd(), 'index.html')
  },
  {
    _s: path.join(process.cwd(), 'templates/views/other/map.ejs'),
    _t: path.join(process.cwd(), 'map.html')
  },
  {
    _s: path.join(process.cwd(), 'templates/views/other/readme.ejs'),
    _t: path.join(process.cwd(), 'readme.html')
  },
];
//
const SourceFolder = 'markdown';
const TargetFolder = 'cn';
const Ignore = ['.DS_Store'];
const readFolderPath = (dir, _cup = []) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach($$ => {
    if (Ignore.includes($$)) return;
    var sourcePath = path.join(dir, $$);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      readFolderPath(path.join(dir, $$), _cup);
    } else {
      if (!cheackExtnameIsMd(path.extname(sourcePath))) return;
      _cup.push({
        _s: sourcePath,
        _t: path.join(process.cwd(), TargetFolder, crypto.createHash('md5').update(path.basename($$).replace(/\.[a-zA-Z]+$/, '')).digest('hex') + '.html')
      });
    }
  });
  return _cup;
}
const FolderList = ['candies', 'waterChestnut', 'longan'];
const WordPageList = FolderList.map(__ => {
  const cup = [];
  readFolderPath(path.join(process.cwd(), SourceFolder, __), cup);
  return cup.map($ => {
    $._templ = {
      _t: path.join(process.cwd(), 'templates/views/page', __, '.ejs'),
      _n: __
    };
    return $;
  });
}).flat(Infinity);
//
module.exports = {
  ToolPageList,
  WordPageList
};