import debugr from 'debug'
import noop from 'lodash/noop'
import forEach from 'lodash/forEach'
import Promise from 'bluebird'

import {CassException} from './CassExceptions'


/**
* A Model Storage area to make setup easier
*/
class ModelStore {

  static _classInit(){
    this.debug = debugr('mhio:casserole:ModelStore')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.prototype.debug = this.debug
  }

  /**
   * @description new ModelStore 
   * @param {Object} options                - Metadata for the Model instance
   * @param {Array|Object} options.models   - Collection of models to add
   */
  constructor(options){
    this._store = []
    if ( options ) {
      if ( options.models ) forEach(options.models, model => this.add(model))
    }
  }

  /** Add a model to the store */
  add(model){ 
    this._store.push(model)
    return this
  }

  /** Get a model by name */
  get(name){ 
    return this._store.find(model => (model.name === name))
  }

  /** Sync all table definitions to cassandra */
  async sync(client){
    return Promise.mapSeries(this._store, model => model.sync(client).delay(100))
  }

}
ModelStore._classInit()

export default ModelStore