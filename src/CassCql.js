import debugr from 'debug'
import noop from 'lodash/noop'
import reduce from 'lodash/reduce'
import Util from './Util'

/**
  * Base class for other CQL implementations to extend
  */
class CassCql {

  static classInit(){

    // Each class covers create/drop/alter for noun
    this.noun = '__NOUN__'

    this.template = Util.template
    this.valueToCqlMap = Util.valueToCqlMap

  }

  static debugInit(name){
    this.debug = debugr(name)
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop 
    this.prototype.debug = this.debug
  }

  /** 
   * Create an options string, 
   * ```
   * whatever = { 'some' : 'cqlvalues' } AND other = 'cqlValue'`
   * ```

   * ID = 'uppercase'
   * CDC = TRUE
   */
  static withOptions(object){
    return reduce(object, (res, val, key) => {
      res.push(` ${key} = ${this.valueToCqlMap(val)}`)
      return res
    }, []).join(' AND')
  }

}
CassCql.classInit()

export default CassCql