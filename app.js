'use strict';

var fs = require('fs'),
    path = require('path'),
    swig = require('swig'),
    _ = require('underscore'),
    mkdirp = require('mkdirp'),
    markdown = require('marked'),
    highlight = require('highlight.js'),
    transliteration = require('transliteration'),
    moment = require('moment'),
    matter = require('gray-matter'),
    uuid = require('uuid'),
    toc = require('marked-toc');

var folderMenu = ['note', 'mood'];


_.each(folderMenu, function(item) {

    var fileObjContainer = [];

    if (verificationPath(mdToHtmlOutPath(item)).status) deteleOutputGlobalPath(mdToHtmlOutPath(item));

    queryMdFile({
            sourcePath: mdToHtmlSourcePath(item),
            outPath: mdToHtmlOutPath(item)
        },
        item,
        function(fileTitleObject) {
            fileObjContainer.push(fileTitleObject);
        }
    );
    creatHtmlIndexFile(item, fileObjContainer);
    fileObjContainer = null;


});

function creatMdToHtml(op, folder) {

    var renderer = new markdown.Renderer();

    renderer.heading = function(text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return '<h' + level + '><span class="header-link" id="' +
            text.toLowerCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-') + '">' +
            text + '</span></h' + level + '>';
    };
    markdown.setOptions({
        renderer: renderer,
        highlight: function(code) {
            return highlight.highlightAuto(code).value;
        }
    });
    var sourcePath = op.sourcePath,
        outPath = op.outPath,
        fileFs = fs.readFileSync(sourcePath, 'utf8'),
        fileFsTimeObject = fs.statSync(sourcePath),
        birthtime = moment(fileFsTimeObject.birthtime).format("YYYY-MM-DD"),
        mtime = moment(fileFsTimeObject.mtime).format("YYYY-MM-DD"),
        mtimeGetTime = moment(fileFsTimeObject.mtime).unix(),
        fileNameContent = path.basename(outPath, path.extname(outPath)),
        fileNameArray = fileNameContent.split(/\./g),
        fileName = fileNameArray[0],
        englishToPinYin = transliteration.slugify(fileName, {
            lowercase: false,
            separator: '_'
        }),
        relativePath = path.relative(outPath, path.join(__dirname, folder)),
        template = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n',
        tocMd = toc(fileFs, {
            template: template
        }),
        mdToHtml = markdown(tocReplace(fileFs, tocMd)),
        fileNameUuid = '';

    if (fileNameArray.length > 1) {
        fileNameUuid = fileNameArray[1];
    } else {
        fileNameUuid = uuid.v4();
        fs.renameSync(sourcePath, path.join(path.dirname(sourcePath), fileNameArray[0] + '.' + uuid.v4() + '.md'));
    }

    var htmlFileName = path.join(fileNameUuid + '.html'),
        creatFilePath = path.join(path.dirname(outPath), htmlFileName);

    fs.writeFileSync(
        creatFilePath,
        swig.render(
            getTemplates(folder).pages, {
                locals: {
                    fileName: fileName,
                    englishToPinYin:englishToPinYin,
                    fileId: fileNameUuid,
                    httpAddr: 'http://kangcafe.com/' + path.relative(__dirname, creatFilePath),
                    content: mdToHtml,
                    relativePath: relativePath,
                    birthtime: birthtime,
                    mtime: mtime
                },
                filename: htmlFileName
            }
        ),
        'utf8'
    );
    console.log('creat [' + htmlFileName + ']');
    return {
        path: path.join(path.relative(path.join(__dirname, 'note'), path.dirname(outPath)), htmlFileName),
        fileName: fileName,
        birthtime: birthtime,
        mtime: mtime,
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
            outPath = param.outPath,
            fsStat = fs.statSync(sourcePath);

        if (fsStat.isDirectory()) {

            if (!verificationPath(outPath).status) mkdirp(outPath);
            _.each(fs.readdirSync(sourcePath), function(item) {

                iterator({
                    sourcePath: path.join(sourcePath, item),
                    outPath: path.join(outPath, item)
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

            _.each(fs.readdirSync(param), function(item) {
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
        return {
            status: false
        };
    } else {
        return {
            status: true
        };
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
            getTemplates(folder).index, {
                locals: {
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

function tocReplace(mdFile, mdFileToc) {
    var footnoteStart = new RegExp("\\[\\^\\^+[a-zA-Z0-9_\u4e00-\u9fa5]+\\](?!:)", "igm");
    var footnoteEnd = new RegExp("\\[\\^\\^+[a-zA-Z0-9_\u4e00-\u9fa5]+\\]:.+", "ig");

    var start = '<!-- toc -->';
    var stop = '<!-- toc stop -->';
    var strip = /<!-- toc -->[\s\S]+<!-- toc stop -->/;

    var content = matter(mdFile).content;

    var footnoteLink = {};

    //var front = matter.extend(mdFile);

    // Remove the existing TOC
    content = content.replace(strip, start);

    // Generate the new TOC
    var table = '\n\n' + start + '\n\n<section><div class="mdToc">' + markdown(mdFileToc) + '</div></section>\n\n' + stop + '\n\n';

    var footnoteMap = _.map(content.match(footnoteEnd), function(item, index) {
        var itemNoBrackets = item.match(/\[\^\^(.+?)\]:/g)[0].replace(/\[\^\^(.+?)\]:/g, '$1');
        footnoteLink[itemNoBrackets] = (index + 1);
        return '<li id="footnoteDo_' + (index + 1) + '" class="footnoteUp">' +
            '<span class="backlink" data-desc="' + itemNoBrackets + '">' +
            '<b><a  href="#footnoteUp_' + (index + 1) + '">^</a></b>' +
            '</span>' +
            '<span class="reference-text">' + item.replace(/\[\^\^(.+?)\]:/g, "") + '</span>' +
            '</li>';
    });
    content = content.replace(footnoteStart, function(item) {
        item = item.replace(/\[\^\^(.+?)\]/g, '$1');

        return '<sup id="footnoteUp_' + footnoteLink[item] + '" data-desc="' + item + '" class="reference"><a class="footnoteUp" href="#footnoteDo_' + footnoteLink[item] + '">[' + footnoteLink[item] + ']</a></sup>';
    });

    content = content.replace(footnoteEnd, '');
    content = content.replace(start, table);

    return content + '\n\n## References\n\n<section class="footnote-box"><ul>' + footnoteMap.join('') + '</ul></section>\n\n';
};
process.exit(0);
