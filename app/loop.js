'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const mkdirp = require('mkdirp');
const markdown = require('marked');
const highlight = require('highlight.js');
const transliteration = require('transliteration');
const ejs = require('ejs');
const async = require('async');
const moment = require('moment');
const matter = require('gray-matter');
const uuid = require('uuid');
const toc = require('marked-toc');

const  = () => {
  const pageList = [
    ['index', path.join(__dirname, 'templates/views/home/index.ejs')],
    ['map', path.join(__dirname, 'templates/views/other/map.ejs')],
    ['readme', path.join(__dirname, 'templates/views/other/readme.ejs')]
  ];
  _.each(pageList, $ => {
    fs.writeFileSync(
      path.join(__dirname, $[0] + '.html'),
      ejs.render(
        fs.readFileSync($[1], 'utf8'), {
        filename: $[1],
      }
      ),
      'utf8');
  })
};