'use strict';

var fs              = require('fs'),
    path            = require('path'),
    swig            = require('swig'),
    _               = require('underscore'),
    mkdirp          = require('mkdirp'),
    markdown        = require('marked'),
    highlight       = require('highlight.js'),
    transliteration = require('transliteration'),
    moment          = require('moment'),
    toc             = require('marked-toc');

var getTemplates = {
    'markdown' : fs.readFileSync(path.join(__dirname, './templates/markdown.html'), 'utf8'),
    'indexZero': fs.readFileSync(path.join(__dirname, './templates/indexZero.html'), 'utf8')
};

var mdToHtmlOutPath    = path.join(__dirname, 'note/file'),
    mdToHtmlSourcePath = path.join(__dirname, 'note/filemd'),
    fileObjContainer   = [];


if (verificationPath(mdToHtmlOutPath).status) deteleOutputGlobalPath(mdToHtmlOutPath);

queryMdFile({
    sourcePath: mdToHtmlSourcePath,
    outPath   : mdToHtmlOutPath
});
creatHtmlIndexFile()
function queryMdFile(op) {

    try {
        iterator(op);
        return true;
    } catch (error) {
        if (error.code === "ENOENT") throw error;
        return false;
    }
    function iterator(param) {
        var sourcePath = param.sourcePath,
            outPath    = param.outPath,
            fsStat     = fs.statSync(sourcePath);

        if (fsStat.isDirectory()) {

            if (!verificationPath(outPath).status) mkdirp(outPath);
            _.each(fs.readdirSync(sourcePath), function (item) {

                iterator({
                    sourcePath: path.join(sourcePath, item),
                    outPath   : path.join(outPath, item)
                });
            });

        } else if (fsStat.isFile()) {

            if (_.indexOf(['.md', '.markdown', '.MARKDOWN', '.MD'], path.extname(sourcePath)) !== -1) {

                creatMdToHtml(param);
            }
        }
    }
}
function verificationPath(path) {
    // 判断路径是否存在
    if (!fs.existsSync(path)) {
        return {status: false};
    } else {
        return {status: true};
    }
}
function creatMdToHtml(op) {

    var renderer = new markdown.Renderer();

    renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return '<h' + level + '><span class="header-link" id="' +
            text + '">' +
            text + '</span></h' + level + '>';
    };
    markdown.setOptions({
        renderer : renderer,
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
    });

    var sourcePath       = op.sourcePath,
        outPath          = op.outPath,
        fileFs           = fs.readFileSync(sourcePath, 'utf8'),
        fileFsTimeObject = fs.statSync(sourcePath),
        birthtime        = moment(fileFsTimeObject.birthtime).format("YYYY-MM-DD"),
        mtime            = moment(fileFsTimeObject.mtime).format("YYYY-MM-DD"),
        mtimeGetTime     = moment(fileFsTimeObject.mtime).unix(),
        englishToPinYin  = transliteration.slugify(path.basename(outPath, path.extname(outPath)), {
            lowercase: false,
            separator: '_'
        }),
        htmlFileName     = path.join(englishToPinYin + '.html'),
        relativePath     = path.relative(outPath, path.join(__dirname, 'note')),
        template         = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n',
        tocMd            = toc.insert(fileFs, {template: template}),
        mdToHtml         = markdown(tocMd),
        creatFilePath    = path.join(path.dirname(outPath), htmlFileName);

    fs.writeFileSync(
        creatFilePath,
        swig.render(
            getTemplates.markdown,
            {
                locals  : {
                    content     : mdToHtml,
                    relativePath: relativePath,
                    birthtime   : birthtime,
                    mtime       : mtime
                },
                filename: htmlFileName
            }
        ),
        'utf8'
    );
    console.log('creat [' + creatFilePath + ']');
    fileObjContainer.push({
        path        : path.join(path.relative(path.join(__dirname, 'note'), path.dirname(outPath)), htmlFileName),
        fileName    : path.basename(outPath, '.md'),
        birthtime   : birthtime,
        mtime       : mtime,
        mtimeGetTime: mtimeGetTime
    });
}

function deteleOutputGlobalPath(outputGlobalPath) {

    try {
        iterator(outputGlobalPath);
        console.log('detele [' + outputGlobalPath + '] folder');
        return true;
    } catch (error) {
        if (error.code === "ENOENT") throw error;
        return false;
    }
    function iterator(param) {

        var fsStat = fs.statSync(param);

        if (fsStat.isDirectory()) {

            _.each(fs.readdirSync(param), function (item) {
                iterator(path.join(param, item));
            });
            fs.rmdirSync(param);
        } else if (fsStat.isFile()) {
            fs.unlinkSync(param); //直接删除文件
        }
    }
}
/**
 * 生成主页索引，待修改
 */
function creatHtmlIndexFile() {
    var generatePathFile = path.join(__dirname, 'note/index.html');

    fs.writeFileSync(
        generatePathFile,
        swig.render(
            getTemplates.indexZero,
            {
                locals  : {
                    content: {
                        linkList: _.sortBy(fileObjContainer, 'mtimeGetTime')
                    }
                },
                filename: path.join('index.html') // 这里的 ‘/’ 不做 win 处理
            }
        ),
        'utf8');
    console.log('start creat index home`s page [' + generatePathFile + '] done');
}
process.exit(1);