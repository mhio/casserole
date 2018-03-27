import debugr from 'debug'
import { dataTypes } from 'cassandra-driver/lib/types'

export default class Paramaters {

  static classInit(){
    this.debug = debugr('mhio:casserole:Paramaters')

    this.types = dataTypes
    this.types['string'] = this.types['text']
    this.types['integer'] = this.types['int']
    
    // JS name that would collide with the Paramaters instance fields
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
    this.fmt_identifier_re = /[a-zA-Z][a-zA-Z0-9_]*/
    this.fmt_identifier_all_re = new RegExp('^'+this.fmt_identifier_re.source+'$')

  }

}
Paramaters.classInit()