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

  }

  static debugInit(name){
    this.debug = debugr(name)
    if (!this.debug.enabled) this.debug = noop
  }

}
CassCql.classInit()