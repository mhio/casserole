import debugr from 'debug'
import pluralize from 'pluralize'
import cloneDeep from 'lodash/cloneDeep'
import snakeCase from 'lodash/snakeCase'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'
import map from 'lodash/map'
import has from 'lodash/has'
import omit from 'lodash/omit'

import {CassException} from './CassExceptions'
import Paramaters from './Paramaters'
import Query from './CassQuery_3_3'
import CassTable from './CassTable'
import Client from './Client'
import Schema from './Schema'
import ModelStore from './ModelStore'


/**
  * Model for apps to work with
  */
class Model {

  static classInit(){
    this.debug = debugr('mhio:casserole:Model')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop

    this.model_store = ModelStore.default_store

    /** The main schema for the Model */
    this.schema = {}

    /** Fields to hide from JSON outpu */
    this.hidden_fields = []

    /** JS name that would collide with the Model instance fields */
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields
  }

  /** Name for the table */
  static get table_name(){ return this._table_name }
  static set table_name(value){ this._table_name = value }

  /** CassTable */
  static get table(){ return this._table }
  static set table(value){ this._table = value }

  /** Store a cassandera client */
  static get client(){ return this._client || super.client || Client.default_client }
  static set client(value){ this._client = value }

  /** 
  * @summary The default store for all generated Models 
  * @description A custom store can be created and added when generating a new model.
  * @type {ModelStore}
  */
  static get model_store(){ return this._model_store || super.model_store }
  static set model_store(value){
    if ( value instanceof ModelStore === false ) {
      throw new CassException('Store must be an instance of ModelStore')
    }
    this._model_store = value
  }

  /** Store the schema */
  static get schema(){ return this._schema }
  static set schema(value){ this._schema = value }

  /** Hidden fields in the schema (should this be in Schema?) */
  static get hidden_fields(){ return this._hidden_fields }
  static set hidden_fields(value){ this._hidden_fields = value }

  /** Hidden fields in the schema (should this be in Schema?) */
  static get primary_keys(){ return this.schema.primary_keys }
  //static set primary_keys(value){ this._primary_keys = value }

  /** Generate a new extended version of Model for a Schema */
  static generate( name, schema, options = {} ){
    this.debug('Generating model "%s" with', name, schema)
    // Name the class via an object property
    const o = { [name]: class extends this {} }
    let NewModel = o[name]

    // Create a shema if we got a simple object
    if ( schema instanceof Schema === false) {
      schema = new Schema(schema)
    }
    NewModel.applySchema(schema)  
    
    // Setup table
    NewModel.table_name = snakeCase(pluralize(name))
    NewModel.table = new CassTable(NewModel.table_name, {
      fields: schema.config,
      primary_keys: schema.primary_keys
    })

    // Setup debug
    NewModel.debug = debugr(`mhio:casserole:Model[${name}]`)
    /* istanbul ignore else */
    if ( !NewModel.debug.enabled ) NewModel.debug = noop
    
    if ( options.client && options.client instanceof Client === false ) {
      throw new CassException('A Client instance must be attached')
    }
    if (options.client) NewModel.client = options.client

    if (options.hidden_fields) NewModel.hidden_fields = options.hidden_fields
    if (options.model_store) NewModel.model_store = options.model_store

    NewModel.store(name, NewModel)
    return NewModel
  }

  /** Apply a Schema setup to this Model */
  static applySchema(schema){
    this.schema = schema
    const debugl = this.debug
    schema.forEach((column, name) =>{
      Object.defineProperty(this.prototype, name, {
        enumerable: true,
        get: function() { 
          debugl('get %s', name)
          return this._row_data[name]
        },
        set: function(value) {
          debugl('set %s', name, value)
          this._row_data[name] = value
        }
      })
    })
  }

  /** Store this model instance in the configured model store */
  static store(){
    this.debug('Adding model to store')
    return this._model_store.add(this)
  }

  /** Sync a table definition to the cassandra server */
  static async sync(){
    let cql = this.table.toCqlCreate({ if_not_exists: true })
    return this.client.execute(cql)
  }

  /** Select from this Model */
  static select( ...args ){ return this.find(...args) }
  static async find( where, options = {} ){
    const select = Query.select(this.table_name, this.columns, where, options)
    const result = await this.client.query(select, options)
    return map(result.rows, row => new this(row, {new: false}))
  }

  /** Select one from this Model */
  static async findOne( where, options = {} ){
    options.limit = 1
    const results = await this.find(where, options)
    if (results.length !== 1) return null
    return results[0]
  }

  /** Insert a new Model instance into the database */
  static insert( ...args ){ return this.create(...args) }
  static async create( data, options = {} ){
    return new this(data).execSave(options)
  }

  /** Update an instance of this model */
  static async update( values, where, options = {} ){
    const update = Query.update(this.table_name, values, where)
    return this.client.query(update, options)
  }

  /** Delete an instance of this model */
  static async delete( where, options = {} ){
    const del = Query.delete(this.table_name, where)
    return this.client.query(del, options)
  }

  /** 
   * @description new Model 
   * @param {Object} data - Data to populate the Model with
   * @param {Object} options - Metadata for the Model instance
   * @param {Object} options.new - Is this new or existing data
   */
  constructor(data, options){
    this._row_data = {}
    this._new = true
    if (options){
      /* istanbul ignore else */
      if ( has(options, 'new') ) this._new = Boolean(options.new)
    }
    forEach(data, (value, name)=> this._row_data[name] = value)
  }

  /** Build a where clause based on primary key */
  buildPrimaryKeyWhere(){
    return this.constructor.primary_keys.reduce((res, key) => {
      res[key] = this._row_data[key]
      return res
    }, {})
  }

  buildDataWithoutKeys(){
    return omit(this._row_data, this.constructor.primary_keys)
  }

  /** Save this instance to the database */
  async execSave( options = {} ){
    // prepares is used for type inference, could `hint` on models as well
    options.prepare = true 
    this.constructor.debug('this',this)
    let query = (this._new)
      ? Query.insert(this.constructor.table_name, this._row_data)
      : Query.update(this.constructor.table_name, this.buildDataWithoutKeys(), this.buildPrimaryKeyWhere())
    const res = await this.constructor.client.execute(query.toString(), query.paramaters, options)
    this._new = false
    return res
  }

  /** Remove this instance from the database */
  async execRemove(options){
    let selector = this.buildPrimaryKeyWhere()
    let query = Query.delete(this.constructor.table_name, selector)
    return this.constructor.client.execute(query.toString(), query.paramaters, options)
  }

  // isModified(){
  //   return true
  // }

  // getSchema(){
  //   return this._schema
  // }

  /** Convert data to JSON, taking account of hidden fields */
  toJSON(){
    const o = cloneDeep(this._row_data)
    let hidden_fields = this.constructor.hidden_fields
    for (let i = 0, len = hidden_fields.length; i < len; i++) {
     delete o[hidden_fields[i]]
    }
    return o
  }

}
Model.classInit()

export default Model