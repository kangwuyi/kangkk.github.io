const _ = require('underscore');

function cheackExtnameIsMd(extname) {
  return _.indexOf(['.md', '.markdown', '.MARKDOWN', '.MD'], extname) !== -1
}
module.exports = {
  cheackExtnameIsMd
}