import util from 'util'
import debugr from 'debug'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import noop from 'lodash/noop'

const _debug = debugr('mhio:casserole:Util')
let debug = (_debug.enabled) ? _debug : noop

/**
 * Utility class, templating and CQL maps
 */
class Util {

  static _initClass(){
    this.debug = _debug
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.format = util.format
  }

  static enableDebug(){
    debug.enabled = true
    debug = _debug
  }

  static disableDebug(){
    debug.enabled = false
    debug = noop
  }



  /** Generic entry function to each type of template function 
    * @param {String} str       - Template string
    * @param {*} ...args        - Array or Object or arguments
    * @returns {String}         - String with template params replaced
    */
  static template(str, ...args){
    debug('template ', args)
    if (Array.isArray(args[0])) return Util.templateArray(str, args[0])
    if (typeof args[0] === 'object') return Util.templateObject(str, args[0])
    return Util.templateArgs(str, ...args)
  }

  /** Template a string with function arguments, in order
    * @param {String} str        - Template string
    * @param {...String} params  - Strings to replace in template
    * @returns {String}          - String with template params replaced
    */
  static templateArgs(str, ...params){
    let current = 0
    return str.replace(/{{([\w.]+)}}/g, found => {
      const str = params[current]
      current++
      if ( str === undefined ) return found
      return str
    })
  }

  /** 
  * If you have a common template string that is replaced a
  * lot, compile it first to remove some of the repeated string
  * processing.
  * @param {string} str - Template string to compile `a {{param}} replacer`
  * @param {object} options - Options
  * @param {RegExp} options.re - Regular Expression for the param tags to be replaced
  * @returns {function} Templating function
  */
  static compileArgsTemplate( str, options = {} ){
    let re = options.re || /({{(\w+?)}})/  //Note the two capture groups.
    let arr = str.split(re)
    debug(arr)
    let end = arr.length
    let return_arr = new Array(arr.length)
    let templateCompiledArgs = function templateCompiledArgs( ...params ){
      //debug('templateCompiledArgs string "%s"', templateCompiledArgs.string, params)
      let j = 0
      for ( let i = 0; i < end; i+=3 ){
        return_arr[i] = arr[i]
        let p = params[j]
        //debug('templateCompiledArgs p', arr[i+1], arr[i+2], p)
        if ( p === undefined ) p = arr[i+1] // Leave {{param}} in there
        return_arr[i+1] = p // 1600k
        j++
      }
      //debug('templateCompiledArgs return_arr', return_arr)
      return return_arr.join('')
    }
    templateCompiledArgs.string = str
    return templateCompiledArgs
  }

  /** Template a string with an array of params
    * @param {String} str    - Template string
    * @param {Array} params  - Array of params for template string
    * @returns {String}      - String with template params replaced
    */
  static templateArray(str, params){
    let current = 0
    return str.replace(/{{([\w.]+)}}/g, found => {
      const str = params[current]
      current++
      if ( str === null ) return ''
      if ( str === undefined ) return found
      return str
    })
  }

  /** 
  * If you have a common template string that is replaced a
  * lot, compile it first to remove some of the repeated string
  * processing.
  * @param {string} str - Template string to compile `a {{param}} replacer`
  * @param {object} options - Options
  * @param {RegExp} options.re - Regular Expression for the param tags to be replaced
  * @returns {function} Templating function
  */
  static compileArrayTemplate( str, options = {} ){
    let re = options.re || /({{(\w+?)}})/  //Note the two capture groups.
    let arr = str.split(re)
    debug(arr)
    let end = arr.length
    let return_arr = new Array(arr.length)
    let templateCompiledArray = function templateCompiledArray( params ){
      //debug('templateCompiledArray string "%s"', templateCompiledArray.string, params)
      let j = 0
      for ( let i = 0; i < end; i+=3 ){
        return_arr[i] = arr[i]
        let p = params[j]
        //debug('templateCompiledArray p', arr[i+1], arr[i+2], p)
        if ( p === undefined ) p = arr[i+1] // Leave {{param}} in there
        return_arr[i+1] = p // 1600k
        j++
      }
      //debug('templateCompiledArray return_arr', return_arr)
      return return_arr.join('')
    }
    templateCompiledArray.string = str
    return templateCompiledArray
  }

  /** Template a string with an object of named args
    * @description Plain string param names  only `{{whatever}}` or `{{what_ever}}`
    * @param {String} str     - Template string
    * @param {Object} params  - Key/Value pairs matching template param names
    * @returns {String}       - String with template params replaced
    */
  static templateObject(str, params){
    return str.replace(/{{(\w+)}}/g, (found, name)=> {
      let str = params[name]
      if ( str === null ) return ''
      if ( str === undefined ) return found
      return str
    })
  }

  /** 
  * If you have a common template string that is replaced a
  * lot, compile it first to remove some of the repeated string
  * processing.
  * When supplying your own template paramater regular expression, `{ re: /({{(\w+?)}})/ }`
  * there must be two capture groups. The first for the entire tag, the second for the "word"
  * to be looked up in the eventual template paramaters object.
  * @param {string} str - Template string to compile `a {{param}} replacer`
  * @param {object} options - Options
  * @param {RegExp} options.re - Regular Expression for the param tags to be replaced
  * @returns {function} Templating function
  */
  static compileObjectTemplate( str, options = {} ){
    let re = options.re || /({{(\w+?)}})/  //Note the two capture groups.
    let arr = str.split(re)
    debug(arr)
    let end = arr.length
    let return_arr = new Array(end)
    let templateCompiledObject = function templateCompiledObject( params ){
      //debug('string "%s"', templateObject.string, params)
      for ( let i = 0; i < end; i+=3 ){
        return_arr[i] = arr[i]
        let p = params[arr[i+2]]
        //debug('p', arr[i+1], arr[i+2], p)
        if ( p === undefined ) p = arr[i+1] // Leave {{param}} in there
        return_arr[i+1] = p // 1600k
      }
      //debug('return_arr', return_arr)
      return return_arr.join('')
    }
    templateCompiledObject.string = str
    return templateCompiledObject
  }

  /** Template string withe deep objects. 
    * @description Support `one.two` and `one[1]` lodash `get` syntax to fetch nested properties. 
    * @param {String} str         - Template string
    * @param {Object} params_deep - Object matching template params
    * @returns {String}            - Templated string 
    */
  static templateObjectDeep(str, params_deep){
    return str.replace(/{{([\w.[\]]+)}}/g, (found, name)=> {
      let str = get(params_deep, name)
      if ( str === undefined ) return found
      return str
    })
  }

  /** Turn a JS object into a CQL map string.
    * @param {Object} obj - Object to convert to a CQL Map
    * @returns {String}
    */
  static objectToCqlMap(obj){
    let strs = []
    forEach(obj, function(val, key){
      strs.push(`'${key}':${Util.valueToCqlMap(val)}`)
    })
    return `{${strs.join(',')}}`
  }

  /** Turn a JS array into a CQL map string.
    * @param {Array} arr - Object to convert to a CQL Map
    * @returns {String}
    */
  static arrayToCqlMap(arr){
    let strs = []
    for (let i = 0, len = arr.length; i < len; i++) {
      strs.push(Util.valueToCqlMap(arr[i]))
    }
    // forEach(arr, function(val){
    //   str.push(Util.valueToCql(val))
    // })
    return `[${strs.join(',')}]`
  }

  /** Turn any JS value into a CQL map string
    * @description CQL is all not quite JSON :/
    * @param {*} value - Value to convert to CQL Map
    * @returns {String}
    */
  static valueToCqlMap(value){
    switch ( typeof value ){
      case 'boolean':
      case 'string': return `'${value}'`

      case 'number': return `${value}`
      
      case 'object':
        if (value instanceof Date) return `'${value}'`
        if (Array.isArray(value)) return Util.arrayToCqlMap(value)
        return Util.objectToCqlMap(value)
    }
  }


  /*
  format2 based on node format, kind of pointless, only quicker on really short strings.
  Regex based template replacing is generally the better solution.

  https://github.com/nodejs/node/blob/bc23681aa2fc49df6e7cd134dfa0a782d8a471a0/lib/util.js#L179

  Copyright Node.js contributors. All rights reserved.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to
  deal in the Software without restriction, including without limitation the
  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  sell copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  IN THE SOFTWARE.
  */
  static format2(f){
    var i, tempStr
    //if (typeof f !== 'string') return ''
    //if (arguments.length === 1) return f

    var str = ''
    var a = 1
    var arglen = arguments.length
    var lastPos = 0
    for (i = 0; i < f.length - 1; i++) {
      if (f.charCodeAt(i) === 37) { // '%'
        const nextChar = f.charCodeAt(++i)
        if (a !== arglen) {
          switch (nextChar) {
            case 115: // 's'
              tempStr = String(arguments[a++])
              break
            case 37: // '%'
              str += f.slice(lastPos, i)
              lastPos = i + 1
              continue
            default: // any other character is not a correct placeholder
              continue
          }
          if (lastPos !== i - 1)
            str += f.slice(lastPos, i - 1)
          str += tempStr
          lastPos = i + 1
        } else if (nextChar === 37) {
          str += f.slice(lastPos, i)
          lastPos = i + 1
        }
      }
    }
    if (lastPos === 0)
      str = f
    else if (lastPos < f.length)
      str += f.slice(lastPos)

    if (a < arguments.length) throw new Error('Not enough arguments applied')
    return str
  }

}
Util._initClass()

export default Util