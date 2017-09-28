import util from 'util'
import debugr from 'debug'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import noop from 'lodash/noop'

export default class Util {

  static initClass(){
    this.debug = debugr('mh:casserole:util')
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

  static template(str, a){
    this.debug('template ', arguments)
    if (Array.isArray(a)) return Util.templateArray(str, a)
    if (typeof a === 'object') return Util.templateObject(str, a)
    return Util.templateArgs.apply(Util, arguments)
  }

  static templateArgs(str){
    let current = 1
    return str.replace(/{{([\w.]+)}}/g, (found)=> {
      const str = arguments[current]
      current++
      if ( str === undefined ) return found
      return str
    })
  }

  static templateArray(str, vars){
    let current = 0
    return str.replace(/{{([\w.]+)}}/g, (found)=> {
      const str = vars[current]
      current++
      if ( str === undefined ) return found
      return str
    })
  }

  static templateObject(str, params){
    return str.replace(/{{(\w+)}}/g, (found, name)=> {
      let str = params[name]
      if ( str === undefined ) return found
      return str
    })
  }

  static templateObjectDeep(str, params_deep){
    return str.replace(/{{([\w.]+)}}/g, (found, name)=> {
      let str = get(params_deep, name)
      if ( str === undefined ) return found
      return str
    })
  }

  static objectToCqlMap(obj){
    let str = []
    forEach(obj, function(val, key){
      str.push(`'${key}':${Util.valueToCqlMap(val)}`)
    })
    return `{${str.join(',')}}`
  }

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

  static valueToCqlMap(val){
    if (typeof val === 'boolean') return `'${val}'`
    if (typeof val === 'number') return val
    if (typeof val === 'string' || val instanceof Date) return `'${val}'`
    if (typeof val === 'object') {
      if (Array.isArray(val)) return Util.arrayToCqlMap(val)
      return Util.objectToCqlMap(val)
    }
  }

}
Util.initClass()