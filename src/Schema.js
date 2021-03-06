import debugr from 'debug'
import transform from 'lodash/transform'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'
import has from 'lodash/has'

import { Paramaters } from './Paramaters'
import { CassException } from './CassExceptions'

/**
 * Schema for apps to build into Models
 */
export class Schema {

  static _classInit(){

    /** 
    * A `debug` instance for the class
    * @memberof Schema
    * @name debug
    * @type Function
    */
    this.debug = debugr('mhio:casserole:Schema')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop

    /** 
    * A `debug` instance for the class instance
    * @memberof Schema.prototype
    * @name debug
    * @type Function
    */
    this.prototype.debug = this.debug

    /** 
    * Model field names that are not allowed
    * @memberof Schema
    * @name reserved_fields
    * @type Array
    */
    this.reserved_fields = Paramaters.reserved_fields

    /** 
    * Model field names that generate a warning
    * @memberof Schema
    * @name warning_fields
    * @type Array
    */
    this.warning_fields = Paramaters.warning_fields

    /** 
    * Cassandra data types from datastax driver
    * @memberof Schema.prototype
    * @name data_types
    * @type Array
    */
    this.prototype.data_types = Paramaters.types

    /** 
    * Cassandra data types from datastax driver
    * @memberof Schema
    * @name data_types
    * @type Array
    */
    this.data_types = Paramaters.types

  }

  /**
  * @param {Object} config - The Schema config object `{ field: { type: 'x' }`
  */
  constructor( config, options ){
    this.debug('new Schema with ', config)
    this.config = config
    this.dates = true
    if ( options ){
      if ( has(options,'dates') ) this.dates = Boolean(options.dates)
      if ( has(options,'soft_delete') ) this.soft_delete = Boolean(options.soft_delete)
    }
  }

  /** Schema adds created/modified data handlers
  * @type Boolean
  */
  get dates(){ return this._dates }
  set dates(value){ return this._dates = Boolean(value) }

  /** Schema track deletes rathe than deleting data
  * @type Boolean
  */
  get soft_delete(){ return this._soft_delete }
  set soft_delete(value){ return this._soft_delete = Boolean(value) }

  /**
  * The schemas config object
  * @type Object
  */
  get config(){
    return this._config
  }

  set config(config){
    if (!config || typeof config !== 'object') {
      throw new CassException('Schema config must be an object')
    }
    if (Object.keys(config).length === 0) {
      throw new CassException('Schema config must have field definitions')
    }

    // Validate
    forEach(config, ( field_def, field_name )=>{
      if (typeof field_def === 'string'){
        field_def = { name: field_name, type: field_def }
      }
      if (!field_def.type) {
        throw new CassException(`Schema "type" must be defined for field "${field_name}"`)
      }
      let subtype_match = /^([a-z]+)?<([a-z]+)>$/.exec(field_def.type)
      if ( subtype_match ) {
        let [ _, type, subtype ] = subtype_match
        if ( ! [ 'map', 'set', 'list', undefined ].includes(type) ) {
          throw new CassException(`Schema type "${type}" can not be used to house other types`)
        }
        if ( type !== undefined ) {
          Paramaters.checkType(type)
          Paramaters.checkType(subtype)
        } else {
          // user defined, need definition in schema?
          throw new CassException('User defined types are not supported')
        }
      } else {
        field_def.type = Paramaters.checkType(field_def.type)  
      }
      config[field_name] = field_def
    })

    // Fix options
    if ( this.dates === true ) {
      config.created_at   = { type: 'timestamp' }
      config.modified_at  = { type: 'timestamp' }
    }
    if ( this.soft_delete === true ){
      config.deleted_at   = { type: 'timestamp' }
    }

    this._config = config
  }

  /**
  * All primary keys for the schema
  * @type Array
  */
  get primary_keys(){
    return transform(this._config, (result, field, key)=>{
      if (field.primary) result.push(key)
    }, [])
  }

  /**
  * All columns in an array
  * @type Array
  */
  get column_types(){
    return transform(this._config, (result, field, key)=>{
      result[key] = field.type
    }, {})
  }

  /**
  * All columns types, keyed by name
  * @type Object
  */
  get columns(){
    return Object.keys(this._config)
  }

  /**
  * Run a function for each schema config item
  * @param {Function} fn - The function to run
  */
  forEach(fn){
    forEach(this._config, fn)
  }

}
Schema._classInit()

export default Schema