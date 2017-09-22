import debugr from 'debug'
import noop from 'lodash/noop'
import has from 'lodash/has'

import Util from './Util'
import CassError from './CassErrors'

/*
  Base class for other CQL implementations to extend
*/

export default class CassMap {

  static classInit(){
    this.template = Util.template
    this.toCqlMap = Util.valueToCqlMap
  }

  // Setup a debug instance for the class, noop if needed
  static debugInit(name){
    this.debug = debugr(name)
    if (!this.debug.enabled) this.debug = noop
  }
  
  constructor(data, name){
    this._name = name
    this._data = data
  }

  toObject(){
    return this._data
  }

  toCqlMap(){
    return this.constructor.toCqlMap(this._data)
  }

  toCql(){
    if ( this.name === undefined ) throw new CassError(`Map must have a name to create cql`)
    return `${this.name} = ${this.toCqlMap()}`
  }

  set name(name){
    return this._name = name
  }

  get name(){
    return this._name
  }

  get(field){
    return this._data[field]
  }

  set(field, value){
    return this._data[field] = value
  }

  add(field, value){
    if ( has(this._data, field) ) throw new CassError(`Map field ${field} already set`)
    return this._data[field] = value
  }

  delete(field){
    return delete this._data[field]
  }

  toJSON(){
   return this._data
  }

}
CassMap.classInit()