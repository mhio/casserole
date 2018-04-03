import debugr from 'debug'
import noop from 'lodash/noop'
import reduce from 'lodash/reduce'
import Util from './Util'

/**
  * Base class for other CQL implementations to extend
  */
class CassCql {

  static _classInit(){

    // Each class covers create/drop/alter for noun
    this.noun = '__NOUN__'

    this.template = Util.template
    this.valueToCqlMap = Util.valueToCqlMap

  }

  static _debugInit(name){
    this._debug = debugr(name)
    /* istanbul ignore next */
    this.debug = (this._debug.enabled) ? this._debug : noop 
    this.prototype.debug = this.debug
  }
  static debugEnable(){
    this._debug.enabled = true
    this.debug = this._debug
    return true
  }
  static debugDisable(){
    this._debug.enabled = false
    this.debug = noop
    return true
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
CassCql._classInit()

export default CassCql