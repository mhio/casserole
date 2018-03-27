import debugr from 'debug'
import noop from 'lodash/noop'
import has from 'lodash/has'

import Util from './Util'
import Paramaters from './Paramaters'
import CassException from './CassExceptions'

/**
 * Base class for other CQL Map implementations to extend
 */
export class CassMap {

  static _classInit(){

    /** 
    * Template string parsing and replacing
    * @memberof CassMap
    * @name template
    * @type Function
    */
    this.template = Util.template

    /** 
    * Map values to a CQL Map
    * @memberof CassMap
    * @name toCqlMap
    * @type Function
    */
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
   * @param {String}  options.name - Name of the map data
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

  /** Convert data to a CQL Map 
  * @returns {String} Data as a CQL Map
  */
  toCqlMap(){
    return this.constructor.toCqlMap(this._data)
  }

  toCql(){
    return this.constructor.toCqlMap(this._data)
  }

  /** Convert to CQL with `name = {}` 
  * @returns {String} Name = data as a CQL Map
  */
  toCqlWith(){
    if ( this.name === undefined ) { 
      throw new CassException('Map must have a name to create cql')
    }
    return `${this.name} = ${this.toCqlMap()}`
  }

  /** The name of the CQL Map, usually a paramater name before the Map data 
  * @type String
  */
  get name(){
    return this._name
  }
  set name(name){
    if( !Paramaters.fmt_identifier_all_re.test(name) ) {
      throw new CassException(`Map name must be [${Paramaters.fmt_identifier_str}]`)
    }
    return this._name = name
  }

  /** Data is where the map is stored
  * @type Object
  */
  get data(){
    return this._data
  }

  /** 
  * Get map data for a field
  * @param {String} Name of field to retrieve
  * @returns Field definition
  */
  get(field){
    return this._data[field]
  }

  /** Set map data */
  set(field, value){
    return this._data[field] = value
  }

  /** Add new data */
  add(field, value){
    if ( has(this._data, field) ) throw new CassException(`Map field "${field}" already set`)
    return this._data[field] = value
  }

  /** Delete map data */
  delete(field){
    return delete this._data[field]
  }

}
CassMap._classInit()

export default CassMap