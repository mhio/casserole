import debugr from 'debug'
import { dataTypes } from 'cassandra-driver/lib/types'
import { CassException } from './CassExceptions'


export class Paramaters {

  static classInit(){
    this.debug = debugr('mhio:casserole:Paramaters')

    this.types = dataTypes
    this.types['string'] = this.types['text']
    this.types['integer'] = this.types['int']
    this.types['datetime'] = this.types['timestamp']

    // JS names that would collide with the Model instance fields
    this.reserved_fields = { 
      'prototype': true,
      'constructor': true,
      toString: true,
      valueOf: true,
      toJSON: true,
      get: true,
      set: true,
      // emit: true,
      // on: true,
      // once: true,
      // listeners: true,
      // removeListener: true,
      execSave: true,
      execRemove: true,
      isValid: true,
      isModified: true,
      getSchema: true,
    }

    this.warning_fields = { 
      save: 'The `.save()` method will be unavailable on this Model. Use `.execSave()`',
      remove: 'The `.remove()` method will be unavailable on this Model. Use `.execRemove()`',
    }

    this.fmt_identifier_str = '[a-zA-Z][a-zA-Z0-9_]*'
    this.fmt_identifier_re = new RegExp(this.fmt_identifier_str)
    this.fmt_identifier_all_re = new RegExp('^'+this.fmt_identifier_re.source+'$')

  }

  /** 
    * Map any of our type aliases into Cassandra types 
    * @param {String} type_name - 
    * @return {String} - The actual type name
    * @throws {CassException} - Unknown type
    */
  static checkType(type_name){
    if ( ! type_name || ! type_name.toLowerCase ) {
      throw new CassException('Cassandra types can on be supplied as strings')
    }
    let lower_type_name = type_name.toLowerCase()
    switch ( lower_type_name ) {
      case 'string': return 'text'
      case 'integer': return 'int'
      case 'datetime': return 'timestamp'
      default:
        if (Paramaters.types[lower_type_name]) return lower_type_name
        throw new CassException(`No cassandra type "${type_name}" found`)
    }
  }
}
Paramaters.classInit()

export default Paramaters