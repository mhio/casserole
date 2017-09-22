import debugr from 'debug'
import noop from 'lodash/noop'
import has from 'lodash/has'

import Util from './Util'
import Paramaters from './Paramaters'
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
  
  constructor( data, options = {} ){
    this._data = data
    this.name = options.name
  }

  toObject(){
    return this._data
  }

  toCqlMap(){
    return this.constructor.toCqlMap(this._data)
  }

  toCql(){
    CassError.if( ( this.name === undefined ), 'Map must have a name to create cql')
    return `${this.name} = ${this.toCqlMap()}`
  }

  set name(name){
    CassError.if( !Paramaters.fmt_identifier_all_re.test(name),
      `Map name must be [${Paramaters.fmt_identifier_str}]`)
    return this._name = name
  }

  get name(){
    return this._name
  }

  get data(){
    return this._data
  }

  get(field){
    return this._data[field]
  }

  set(field, value){
    return this._data[field] = value
  }

  add(field, value){
    CassError.if( has(this._data, field), `Map field "${field}" already set`)
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