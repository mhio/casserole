import debugr from 'debug'
import noop from 'lodash/noop'
import has from 'lodash/has'

import Util from './Util'
import CassError from './CassError'

/*
  Base class for other CQL implementations to extend
*/

export default class CassMap {

  static classInit(){
    this.template = Util.template
    this.valueToCqlMap = Util.valueToCqlMap
  }

  static debugInit(name){
    this.debug = debugr(name)
    if (!this.debug.enabled) this.debug = noop
  }

  static toCqlMap(o){
    return this.valueToCqlMap(o)
  }

  toCqlMap(){
    return this.constructor.valueToCqlMap(this._data)
  }

  addData(field, value){
    if ( has(this._data, field) ) throw new CassError(`Map field ${field} already set`)
    return this._data[field] = value
  }

  setData(field, value){
    return this._data[field] = value
  }

}
CassMap.classInit()