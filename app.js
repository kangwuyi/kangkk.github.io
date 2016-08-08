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

var folderMenu = ['note', 'mood'];


_.each(folderMenu, function (item) {

    var fileObjContainer = [];

    if (verificationPath(mdToHtmlOutPath(item)).status) deteleOutputGlobalPath(mdToHtmlOutPath(item));

    queryMdFile(
        {
            sourcePath: mdToHtmlSourcePath(item),
            outPath   : mdToHtmlOutPath(item)
        },
        item,
        function (fileTitleObject) {
            fileObjContainer.push(fileTitleObject);
        }
    );
    creatHtmlIndexFile(item, fileObjContainer);
    fileObjContainer = null;


});
function creatMdToHtml(op, folder) {

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
        fileName         = path.basename(outPath, '.md'),
        FileNameBuffer   = new Buffer(englishToPinYin).toString('base64'),
        htmlFileName     = path.join(englishToPinYin + '.html'),
        relativePath     = path.relative(outPath, path.join(__dirname, folder)),
        template         = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n',
        tocMd            = toc.insert(fileFs, {template: template}),
        mdToHtml         = markdown(tocMd),
        creatFilePath    = path.join(path.dirname(outPath), htmlFileName);

    fs.writeFileSync(
        creatFilePath,
        swig.render(
            getTemplates(folder).pages,
            {
                locals  : {
                    fileName    : fileName,
                    fileId      : FileNameBuffer,
                    httpAddr    : 'http://kangcafe.com/'+path.relative(__dirname,creatFilePath),
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
    return {
        path        : path.join(path.relative(path.join(__dirname, 'note'), path.dirname(outPath)), htmlFileName),
        fileName    : fileName,
        birthtime   : birthtime,
        mtime       : mtime,
        mtimeGetTime: mtimeGetTime
    };
}
function queryMdFile(op, folder, cb) {

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

                cb(creatMdToHtml(param, folder));
            }
        }
    }
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
function verificationPath(path) {
    // 判断路径是否存在
    if (!fs.existsSync(path)) {
        return {status: false};
    } else {
        return {status: true};
    }
}
/**
 * 生成主页索引
 */
function creatHtmlIndexFile(folder, fileTitleList) {
    var generatePathFile = path.join(__dirname, folder + '/index.html');

    fs.writeFileSync(
        generatePathFile,
        swig.render(
            getTemplates(folder).index,
            {
                locals  : {
                    content: {
                        linkList: _.sortBy(fileTitleList, 'mtimeGetTime')
                    }
                },
                filename: folder + '/index.html'
            }
        ),
        'utf8');
    console.log('creat index home`s page [' + generatePathFile + '] done');
}

function getTemplates(folder) {
    return {
        'pages': fs.readFileSync(path.join(__dirname, './' + folder + '/templates/pages.html'), 'utf8'),
        'index': fs.readFileSync(path.join(__dirname, './' + folder + '/templates/index.html'), 'utf8')
    }
}
function mdToHtmlOutPath(folder) {
    return path.join(__dirname, folder + '/file');
}
function mdToHtmlSourcePath(folder) {
    return path.join(__dirname, folder + '/filemd');
}

process.exit(0);