import debugr from 'debug'
import noop from 'lodash/noop'
import Util from './Util'

/*
  Base class for other CQL implementations to extend
*/

export default class CassCql {

  static classInit(){

    // Each class covers create/drop/alter for noun
    this.noun = '__NOUN__'

    this.template = Util.template
    this.valueToCqlMap = Util.valueToCqlMap

    // Generic CQL vars
    this.create_exists_cql = 'IF NOT EXISTS'
    this.drop_exists_cql = 'IF EXISTS'
  }

  static debugInit(name){
    this.debug = debugr(name)
    if (!this.debug.enabled) this.debug = noop
  }

  static toCqlDrop(){
    throw new Error('Not implemented in child class')
  }

  static toCqlAlter(){
    throw new Error('Not implemented in child class')
  }

  static toCqlCreate(){
    throw new Error('Not implemented in child class')
  }

  toCqlDrop(){
    throw new Error('Not implemented in child class')
  }

  toCqlAlter(){
    throw new Error('Not implemented in child class')
  }

  toCqlCreate(){
    throw new Error('Not implemented in child class')
  }

}
CassCql.classInit()