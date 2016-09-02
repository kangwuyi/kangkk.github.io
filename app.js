'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    mkdirp = require('mkdirp'),
    markdown = require('marked'),
    highlight = require('highlight.js'),
    transliteration = require('transliteration'),
    ejs = require('ejs'),
    async = require('async'),
    moment = require('moment'),
    matter = require('gray-matter'),
    uuid = require('uuid'),
    toc = require('marked-toc');

/**
 * 测试环境： test
 * 发布环境： publish
 * 清空环境： clean
 **/
var setEvnParam = 'publish';
var folderMenu = ['note', 'mood', 'source'];

var mdToHtmlOutPath = path.join(__dirname, 'cn');
var mdIndexCont = [];
switch (setEvnParam) {
    case 'test':
        startTest(setEvnParam);
        break;
    case 'publish':
        startPublish(setEvnParam);
        break;
    case 'clean':
        startClean(setEvnParam);
        break;
    default:
        startTest('test');
}

function startTest(evnParam) {
    loopMdFolder(evnParam);
}

function startPublish(evnParam) {
    loopMdFolder(evnParam);
}

function startClean(evnParam) {
    if (verificationPath(mdToHtmlOutPath).status) deteleOutputGlobalPath(mdToHtmlOutPath);
    loopMdFolder(evnParam);
}

function loopMdFolder(evnParam) {
    _.each(folderMenu, function(item) {

        async.waterfall([
            function(callback) {
                queryMdFile({
                        sourcePath: mdToHtmlSourcePath(item),
                        outPath: mdToHtmlOutPath
                    },
                    item,
                    evnParam
                );
                callback(null, 'one', 'two');
            },
            function(arg1, arg2, callback) {
                creatHtmlIndexFile(item, mdIndexCont);
                callback(null, 'three');
            }
        ], function(err, result) {
            // result now equals 'done'
            console.log(result);
        });


        mdIndexCont = [];
    });
}

function cheackExtnameIsMd(extname) {
    return _.indexOf(['.md', '.markdown', '.MARKDOWN', '.MD'], extname) !== -1
}

function creatMdToHtml(op, folder, evnParam) {

    var sourcePath = op.sourcePath,
        outPath = op.outPath,
        fileNameContent = path.basename(sourcePath, path.extname(sourcePath)),
        fileNameArray = fileNameContent.split(/\./g),
        sourcePathDirPath = path.dirname(sourcePath),
        fileNameUuid = ''

    function cheackFileNameIsNRoY(nameArray) {
        var nameIndexStatus = 0;

        _.each(nameArray, function(item, index) {
            if ((item === 'n' || item === 'y') && (index === 0 || index === 1)) {
                nameIndexStatus++;
            }
        })

        switch (nameIndexStatus) {
            case 0:
                nameArray.unshift('error');
                break;
            case 1:

                if (nameArray.length === 4) {
                    nameArray.unshift('error');
                } else {
                    nameArray.unshift('n');
                }
                break;
        }
        return nameArray;
    }

    switch (fileNameArray.length) {
        case 1:
            fileNameUuid = uuid.v4();
            fs.rename(sourcePath, path.join(path.dirname(sourcePath), 'n.n.' + fileNameArray[0] + '.' + fileNameUuid + '.md'), function(err) {
                if (err) {
                    throw err;
                }
                fileNameArray = ['n', 'n', fileNameArray[0], fileNameUuid];
                startRenderProp(fileNameArray);
            })
            break;
        case 2:
            fileNameUuid = fileNameArray[1];
            fs.rename(sourcePath, path.join(path.dirname(sourcePath), 'n.n.' + fileNameArray[0] + '.' + fileNameUuid + '.md'), function(err) {
                if (err) {
                    throw err;
                }
                fileNameArray = ['n', 'n', fileNameArray[0], fileNameUuid];
                startRenderProp(fileNameArray);
            })
            break;
        case 3:
            fileNameArray = cheackFileNameIsNRoY(fileNameArray)
            fileNameUuid = fileNameArray[3];
            if(!fileNameUuid){
              fileNameUuid = uuid.v4();
            }
            fs.rename(sourcePath, path.join(sourcePathDirPath, fileNameArray[0] + '.' + fileNameArray[1] + '.' + fileNameArray[2] + '.' + fileNameUuid + '.md'), function(err) {
                if (err) {
                    throw err;
                }
                startRenderProp(fileNameArray);
            })
            break;
        case 4:
            fileNameArray = cheackFileNameIsNRoY(fileNameArray)
            fileNameUuid = fileNameArray[3];
            startRenderProp(fileNameArray);
            break;
    }

    function startRenderProp(fileNameArray) {
        if (fileNameArray[0] === 'error') {
            throw fileNameArray;
            process.exit(0);
        }

        var renderer = new markdown.Renderer();

        renderer.heading = function(text, level) {
            var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

            return '<h' + level + '><span class="header-link" id="' +
                text.toLowerCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-') + '">' +
                text + '</span></h' + level + '>';
        };

        renderer.image = function(href, title, text) {
            var xhtml = false;
            var hrefReplace = href.replace(/^\.\.\/\.\.\/\.\.\//g, '');
            var out = '<img src="../' + hrefReplace + '" alt="' + text + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += xhtml ? '/>' : '>';
            return out;
        };
        markdown.setOptions({
            renderer: renderer,
            highlight: function(code) {
                return highlight.highlightAuto(code).value;
            }
        });


        var newSourceNameFile = path.join(sourcePathDirPath, fileNameArray.join('.') + '.md'),
            fileFs = fs.readFileSync(newSourceNameFile, 'utf8'),
            fileFsTimeObject = fs.statSync(newSourceNameFile),
            birthtime = moment(fileFsTimeObject.birthtime).format("YYYY-MM-DD"),
            mtime = moment(fileFsTimeObject.mtime).format("MM-DD"),
            mtimeGetTime = moment(fileFsTimeObject.mtime).unix(),
            fileName = fileNameArray[2],
            englishToPinYin = transliteration.slugify(fileName, {
                lowercase: false,
                separator: ' '
            }),
            relativePath = path.relative(outPath, __dirname),
            template = '<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n',
            tocMd = toc(fileFs, {
                template: template,
                bullet: "1. ",
                maxDepth: 5
            }),
            mdToHtml = markdown(tocReplace(fileFs, tocMd));

        var htmlFileName = path.join(fileNameUuid + '.html'),
            creatFilePath = path.join(outPath, htmlFileName);

        var englishToPinYin_keyWolds = englishToPinYin.split(' ').join(','),

            keyWorlds = englishToPinYin_keyWolds + ',' + englishToPinYin + ',' + fileName,
            description = fileName;

        switch (evnParam) {
            case 'test':
                if (verificationPath(creatFilePath).status) fs.unlinkSync(creatFilePath);
                break;
            case 'publish':
                if (verificationPath(creatFilePath).status) fs.unlinkSync(creatFilePath);
                break;
        }
        if (fileNameArray[0] === 'y' || evnParam === 'clean'||(fileNameArray[1] === 'y' || evnParam === 'publish')) {
            fs.writeFileSync(
                creatFilePath,
                ejs.render(
                    getTemplates(folder).pages, {
                        filename: path.join(__dirname, 'static/templates/' + folder + '.html'),
                        folder: folder,
                        kcFileId: fileNameUuid,
                        kcFileName: fileName,
                        kcFileAddr: 'http://kangcafe.com/' + path.relative(__dirname, creatFilePath),
                        keyWorlds: keyWorlds,
                        description: description,
                        content: mdToHtml,
                        relativePath: relativePath,
                        birthtime: birthtime,
                        mtime: mtime
                    }
                ),
                'utf8'
            );
            console.log('creat [' + htmlFileName + ']');

        }

        if (fileNameArray[1] === 'y' || evnParam === 'test' || evnParam === 'clean') {
            mdIndexCont.push({
                path: path.join(path.relative(path.join(__dirname), path.dirname(outPath)), htmlFileName),
                fileName: fileName,
                birthtime: birthtime,
                mtime: mtime,
                mtimeGetTime: mtimeGetTime
            });

        }

    }
}

function queryMdFile(op, folder, evnParam) {

    try {
        iterator(op, evnParam);
        return true;
    } catch (error) {
        if (error.code === "ENOENT") throw error;
        return false;
    }

    function iterator(param, evnParams) {
        var sourcePath = param.sourcePath,
            outPath = param.outPath,
            fsStat = fs.statSync(sourcePath);

        if (fsStat.isDirectory()) {

            if (!verificationPath(outPath).status) mkdirp(outPath);
            _.each(fs.readdirSync(sourcePath), function(item) {

                iterator({
                    sourcePath: path.join(sourcePath, item),
                    outPath: path.join(outPath)
                }, evnParams);
            });

        } else if (fsStat.isFile()) {

            if (cheackExtnameIsMd(path.extname(sourcePath))) {

                creatMdToHtml(param, folder, evnParam);
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
    var generatePathFile = path.join(__dirname, 'cn/' + folder + '.html');

    fs.writeFileSync(
        generatePathFile,
        ejs.render(
            getTemplates(folder).index, {
                content: {
                    linkList: _.sortBy(fileTitleList, 'mtimeGetTime').reverse()
                },
                folder: folder
            }
        ),
        'utf8');
    console.log('creat index home`s page [' + generatePathFile + '] done');
}

function getTemplates(folder) {
    return {
        'pages': fs.readFileSync(path.join(__dirname, 'static/templates/' + folder + '.html'), 'utf8'),
        'index': fs.readFileSync(path.join(__dirname, 'static/templates/folder.html'), 'utf8')
    }
}

function mdToHtmlSourcePath(folder) {
    return path.join(__dirname, 'markdown/' + folder);
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
    var table = '\n\n' + start + '\n\n<section class="content__section"><div class="content-box__markdown--toc">' + markdown(mdFileToc) + '</div></section>\n\n' + stop + '\n\n';

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

    var footnoteBox = '\n\n## References\n\n<section class="footnote-box"><ul>' + footnoteMap.join('') + '</ul></section>\n\n';

    return content + ((footnoteMap.length > 0) ? footnoteBox : '\n\n');
};
//process.exit(0);
