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

    this.noop = noop

    this.template = Util.template
    this.valueToCqlMap = Util.valueToCqlMap

    // Generic CQL vars
    this.create_exists_cql = 'IF NOT EXISTS'
  }

  static debugInit(name){
    this.debug = debugr(name)
    if (!this.debug.enabled) this.debug = noop
  }

  static toCqlDrop(){
    throw new Error('nope')
  }

  static toCqlAlter(){
    throw new Error('nope')
  }

  static toCqlCreate(){
    throw new Error('nope')
  }

  toCqlDrop(){
    throw new Error('nope')
  }

  toCqlAlter(){
    throw new Error('nope')
  }

  toCqlCreate(){
    throw new Error('nope')
  }

}
CassCql.classInit()