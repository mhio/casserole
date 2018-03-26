import debugr from 'debug'
import transform from 'lodash/transform'
import forEach from 'lodash/forEach'
import { types } from 'cassandra-driver'
const { dataTypes } = types

import Paramaters from './Paramaters'
import CassError from './CassErrors'


export default class Schema {

  static classInit(){
    this.debug = debugr('mhio:casserole:Schema')
    this.prototype.debug = this.debug

    // JS name that would collide with the Schema instance fields
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields

  }

  constructor(config){
    CassError.if( !config, 'Schema needs a config option')
    this.config = config
  }

  get config(){
    return this._config
  }

  set config(config){
    // Validate
    forEach(config, ( field, name )=>{
      let field_type = null 
      if (typeof field === 'string') {
        field_type = field.toLowerCase()
      } else {
        if (!field.type) throw new CassError(`Schema type must be defined for field "${name}"`)
        field_type = field.type.toLowerCase()
      }
      if ( field_type === 'string' ) field_type = 'text'
      if ( field_type === 'datetime' ) field_type = 'timestamp'
      if ( field_type === 'integer' ) field_type = 'int'
      if ( !dataTypes[field_type] ) throw new CassError(`No cassandra field type "${field_type}" for ${name}`)
    })
    this._config = config
  }

  get primary_keys(){
    return transform(this._config, (result, field, key)=>{
      if (field.primary) result.push(key)
    }, [])
  }

  get column_types(){
    return transform(this._config, (result, field, key)=>{
      result[key] = field.type
    }, {})
  }

  get columns(){
    return Object.keys(this._config)
  }

  forEach(fn){
    forEach(this._config, fn)
  }

}
Schema.classInit()