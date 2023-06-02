
module.exports = function test(require, exports, module) {
  "use strict";

  // The index of the current character
  let at = void 0;
  // The current character
  let ch = void 0;
  let text = void 0;
  const escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  };

  const error = function (m) {
    throw {
      name: 'SyntaxError',
      message: m,
      at: at,
      text: text
    };
  }

  const next = function (c) {
    console.log('next:c', c)
    // If a c parameter is provided, verify that it matches the current character.

    if (c && c !== ch) {
      error("Expected '" + c + "' instead of '" + ch + "'");
    }

    // Get the next character. When there are no more characters,
    // return the empty string.

    ch = text.charAt(at);
    at += 1;
    return ch;
  }
  
  const number = function () {
    console.log('number:ch', ch)

    // Parse a number value.

    var number,
      string = '';

    if (ch === '-') {
      string = '-';
      next('-');
    }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }
    if (ch === '.') {
      string += '.';
      while (next() && ch >= '0' && ch <= '9') {
        string += ch;
      }
    }
    if (ch === 'e' || ch === 'E') {
      string += ch;
      next();
      if (ch === '-' || ch === '+') {
        string += ch;
        next();
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
    }
    number = +string;
    if (isNaN(number)) {
      error("Bad number");
    } else {
      return number;
    }
  }
    
  const string = function () {
    console.log('string:ch', ch)
    // Parse a string value.

    var hex,
      i,
      string = '',
      uffff;

    // When parsing for string values, we must look for " and \ characters.

    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next();
          return string;
        } else if (ch === '\\') {
          next();
          if (ch === 'u') {
            uffff = 0;
            for (i = 0; i < 4; i += 1) {
              hex = parseInt(next(), 16);
              if (!isFinite(hex)) {
                break;
              }
              uffff = uffff * 16 + hex;
            }
            string += String.fromCharCode(uffff);
          } else if (typeof escapee[ch] === 'string') {
            string += escapee[ch];
          } else {
            break;
          }
        } else if (ch == "\n" || ch == "\r") {
          break;
        } else {
          string += ch;
        }
      }
    }
    error("Bad string");
  }
    
  const white = function () {

    // Skip whitespace.

    while (ch && ch <= ' ') {
      next();
    }
  }
  
  const word = function () {
    console.log('word:ch', ch)

    // true, false, or null.

    switch (ch) {
      case 't':
        next('t');
        next('r');
        next('u');
        next('e');
        return true;
      case 'f':
        next('f');
        next('a');
        next('l');
        next('s');
        next('e');
        return false;
      case 'n':
        next('n');
        next('u');
        next('l');
        next('l');
        return null;
    }
    error("Unexpected '" + ch + "'");
  }
    
  let value = void 0;  // Place holder for the value function.

  const array = function () {
    console.log('array:ch', ch)

    // Parse an array value.

    var array = [];

    if (ch === '[') {
      next('[');
      white();
      if (ch === ']') {
        next(']');
        return array;   // empty array
      }
      while (ch) {
        array.push(value());
        white();
        if (ch === ']') {
          next(']');
          return array;
        }
        next(',');
        white();
      }
    }
    error("Bad array");
  }
  
  const object = function () {
    console.log('object:ch', ch)

    // Parse an object value.

    var key,
      object = {};

    if (ch === '{') {
      next('{');
      white();
      if (ch === '}') {
        next('}');
        return object;   // empty object
      }
      while (ch) {
        key = string();
        console.log('key', key)
        white();
        next(':');
        if (Object.hasOwnProperty.call(object, key)) {
          error('Duplicate key "' + key + '"');
        }
        object[key] = value();
        console.log('object[key]', object[key])
        white();
        if (ch === '}') {
          next('}');
          return object;
        }
        next(',');
        white();
      }
    }
    error("Bad object");
  };
  value = function () {

    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.
    console.log('value->white pre:ch', ch, ch.length)
    white();
    console.log('value->white after:ch', ch, ch.length)
    switch (ch) {
      case '{':
        return object();
      case '[':
        return array();
      case '"':
        return string();
      case '-':
        return number();
      case ':':
        return function(){
          next(':')
          return ':' + function(){
            let str = ''
            while (ch) {
              white();
              if (ch === ',' || ch === '}') {
                return str;
              } else if (ch === ':') {
                error('error \":\"')
              } else {
                str+=ch;
                next(ch);
              }
              white();
            }
            return str
          }();
        }();
      default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
  };

  // Return the json_parse function. It will have access to all of the above
  // functions and variables.

  return function (source, reviver) {
    var result;

    text = source;
    at = 0;
    ch = ' ';
    result = value();

    console.log('=>result', result)
    white();
    if (ch) {
      error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? function walk(holder, key) {
      var k, v, value = holder[key];
      if (value && typeof value === 'object') {
        for (k in value) {
          if (Object.hasOwnProperty.call(value, k)) {
            v = walk(value, k);
            if (v !== undefined) {
              value[k] = v;
            } else {
              delete value[k];
            }
          }
        }
      }
      return reviver.call(holder, key, value);
    }({ '': result }, '') : result;
  };
};