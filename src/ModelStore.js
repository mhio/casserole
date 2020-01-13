import debugr from 'debug'
import noop from 'lodash/noop'
import forEach from 'lodash/forEach'
import Promise from 'bluebird'

import {CassException} from './CassExceptions'


/**
* A Model Storage area to make setup easier
*/
export class ModelStore {

  static _classInit(){
    this.debug = debugr('mhio:casserole:ModelStore')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.prototype.debug = this.debug

    this.default_store = new this('default_store')
  }

  /** 
  * A Module singleton default store
  * @type ModelStore
  */
  static get default_store(){
    return this._default_store
  }
  static set default_store(val){ 
    if ( val instanceof ModelStore === false ) {
      throw new CassException('Store must be an instance of ModelStore')
    }
    return this._default_store = val
  }

  /**
   * @description new ModelStore 
   * @param {String} label required         - Label for the store
   * @param {Object} options                - Metadata for the Model instance
   * @param {Array|Object} options.models   - Collection of models to add
   */
  constructor(label, options){
    this._store = []

    if (!label) throw new CassException('A ModelStore requires a label')
    this.label = label

    if ( options ) {
      /* istanbul ignore else */
      if ( options.models ) forEach(options.models, model => this.add(model))
    }
  }

  /** Add a model to the store */
  add(model){
    this.debug('Adding model to store "%s"', this.label)
    this._store.push(model)
    return this
  }

  /** Get a model by name */
  get(name){ 
    this.debug('Getting model "%s" from store "%s"', name, this.label)
    return this._store.find(model => (model.name === name))
  }

  /** Sync all table definitions to cassandra */
  async sync(client){
    this.debug('Sync all models in store "%s":', this.label, this._store.map(s => s.name))
    // Check why this delay is here, it smells...
    return Promise.mapSeries(this._store, model => model.sync(client).delay(100))
  }

}
ModelStore._classInit()

export default ModelStore