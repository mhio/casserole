import debugr from 'debug'
import noop from 'lodash/noop'
import has from 'lodash/has'

import Util from './Util'
import Paramaters from './Paramaters'
import CassError from './CassErrors'

/**
 * Base class for other CQL Map implementations to extend
 */
class CassMap {

  static classInit(){
    this.template = Util.template
    this.toCqlMap = Util.valueToCqlMap
  }

  // Setup a debug instance for the class, noop if needed
  static debugInit(name){
    this.debug = debugr(name)
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
  }
  
  /**
   * new CassMap 
   * @param {Object}  data - JS Data to build the map from
   * @param {Object}  options
   * @param {String}  options.name - Name for the map
   */
  constructor( data, options = {} ){
    this._data = data
    this.name = options.name
  }

  toObject(){
    return this._data
  }

  toJSON(){
   return this._data
  }

  // Convert data to a CQL Map
  toCqlMap(){
    return this.constructor.toCqlMap(this._data)
  }

  // Convert to CQL with `name = {}`
  toCql(){
    CassError.if( ( this.name === undefined ), 'Map must have a name to create cql')
    return `${this.name} = ${this.toCqlMap()}`
  }

  // Name is for the CQL paramater name outside the Map
  get name(){
    return this._name
  }
  set name(name){
    CassError.if( !Paramaters.fmt_identifier_all_re.test(name),
      `Map name must be [${Paramaters.fmt_identifier_str}]`)
    return this._name = name
  }

  // Data is where the map is stored
  get data(){
    return this._data
  }

  // Get map data
  get(field){
    return this._data[field]
  }

  // Set map data
  set(field, value){
    return this._data[field] = value
  }

  // Add new data
  add(field, value){
    CassError.if( has(this._data, field), `Map field "${field}" already set`)
    return this._data[field] = value
  }

  // Delete map data
  delete(field){
    return delete this._data[field]
  }

}
CassMap.classInit()

export default CassMap