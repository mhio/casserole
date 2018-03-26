import util from 'util'
import debugr from 'debug'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import noop from 'lodash/noop'

const debug = debugr('mhio:casserole:util')


export default class Util {

  static initClass(){
    this.debug = debug
    if (!this.debug.enabled) this.debug = noop
    this.format = util.format
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

  // Generic entry function to each type of template function
  static template(str, ...args){
    debug('template ', args)
    if (Array.isArray(args[0])) return Util.templateArray(str, args[0])
    if (typeof args[0] === 'object') return Util.templateObject(str, args[0])
    return Util.templateArgs(str, ...args)
  }

  /**
   * Template a string with function arguments, in order
   * @params {string} str - Template string
   * @params {string}
   * @returns {string} - Templated string 
   */
  static templateArgs(str /*, arguments... */){
    let current = 1
    return str.replace(/{{([\w.]+)}}/g, found => {
      const str = arguments[current]
      current++
      if ( str === undefined ) return found
      return str
    })
  }

  /**
   * Template a string with an array of params
   * @params {string} str - Template string
   * @params {array} params - 
   * @returns {string} - Templated string 
   */
  static templateArray(str, vars){
    let current = 0
    return str.replace(/{{([\w.]+)}}/g, found => {
      const str = vars[current]
      current++
      if ( str === undefined ) return found
      return str
    })
  }

  /**
   * Template a string with an object of named args
   * Plain string param names  only `{{whatever}}` or `{{what_ever}}`
   * @params {string} str - Template string
   * @params {object} params - Key/Value paris matching template params
   * @returns {string} - Templated string 
   */
  static templateObject(str, params){
    return str.replace(/{{(\w+)}}/g, (found, name)=> {
      let str = params[name]
      if ( str === undefined ) return found
      return str
    })
  }

  /**
   * Template string withe deep objects. 
   * @description Support `one.two` and `one[1]` lodash `get` syntax to fetch nested properties. 
   * @params {string} str - Template string
   * @params {object} params_deep - Object matching template params
   * @returns {string} - Templated string 
   */
  static templateObjectDeep(str, params_deep){
    return str.replace(/{{([\w.[\]]+)}}/g, (found, name)=> {
      let str = get(params_deep, name)
      if ( str === undefined ) return found
      return str
    })
  }

  // Turn a JS object into a CQL map string. 
  static objectToCqlMap(obj){
    let str = []
    forEach(obj, function(val, key){
      str.push(`'${key}':${Util.valueToCqlMap(val)}`)
    })
    return `{${str.join(',')}}`
  }

  // Turn a JS array into a CQL map string. 
  static arrayToCqlMap(obj){
    let str = []
    for (let i = 0, len = obj.length; i < len; i++) {
      str.push(Util.valueToCqlMap(obj[i]))
    }
    // forEach(obj, function(val){
    //   str.push(Util.valueToCql(val))
    // })
    return `[${str.join(',')}]`
  }

  // Turn a JS value into a CQL map string. 
  // Everything is not quite JSON :/
  static valueToCqlMap(val){
    switch ( typeof val ){
      case 'boolean':
      case 'string': return `'${val}'`

      case 'number': return `${val}`
      
      case 'object':
        if (val instanceof Date) return `'${val}'`
        if (Array.isArray(val)) return Util.arrayToCqlMap(val)
        return Util.objectToCqlMap(val)
    }
  }

}
Util.initClass()
