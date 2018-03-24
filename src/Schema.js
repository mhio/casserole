import debugr from 'debug'
import transform from 'lodash/transform'
import forEach from 'lodash/forEach'
import { types } from 'cassandra-driver'

import Paramaters from './Paramaters'
import CassError from './CassErrors'


export default class Schema {

  static classInit(){
    this.debug = debugr('mhio:casserole:Schema')

    // JS name that would collide with the Schema instance fields
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields

  }

  constructor(config){
    CassError.if( !config, 'Schema needs a config option')
    this._config = config
  }

  get config(){
    return this._config
  }

  set config(config){
    // Validate
    forEach(config, ( field, name )=>{
      if ( !types[field.type] ) throw new CassError(`No cassandra field type "${field.type}"`)
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