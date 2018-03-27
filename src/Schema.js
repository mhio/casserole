import debugr from 'debug'
import transform from 'lodash/transform'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'

import Paramaters from './Paramaters'
import CassException from './CassExceptions'

/**
 * Schema for apps to build into Models
 */
export class Schema {

  static classInit(){
    this.debug = debugr('mhio:casserole:Schema')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.prototype.debug = this.debug

    // JS name that would collide with the Schema instance fields
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields

    this.data_types = Paramaters.types
    this.prototype.data_types = Paramaters.types

  }

  constructor(config){
    this.debug('new Schema with ', config)
    if (!config) throw new CassException('Schema needs to be created with a config')
    this.config = config
  }

  get config(){
    return this._config
  }

  set config(config){
    if (!config) throw new CassException('Schema config must be an object')
    if (Object.keys(config).length === 0) throw new CassException('Schema config must have field definitions')

    // Validate
    forEach(config, ( field_def, field_name )=>{
      if (typeof field_def === 'string'){
        field_def = { name: field_name, type: field_def }
      }
      if (!field_def.type) {
        throw new CassException(`Schema "type" must be defined for field "${field_name}"`)
      }
      field_def.type = Paramaters.checkType(field_def.type)
      config[field_name] = field_def
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

export default Schema