import debugr from 'debug'
import pluralize from 'pluralize'
import cloneDeep from 'lodash/cloneDeep'
import snakeCase from 'lodash/snakeCase'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'
import map from 'lodash/map'

import {CassError} from './CassErrors'
import Paramaters from './Paramaters'
import CassQuery from './CassQuery_3_3'
import CassTable from './CassTable'
import Client from './Client'


export default class Model {

  static classInit(){
    this.debug = debugr('mhio:casserole:Model')
    // The main schema for the Model
    this.schema = {}

    // Fields to hide from JSON outpu
    this.hidden_fields = []

    // JS name that would collide with the Model instance fields
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields
  }

  // Name for the table
  static get table_name(){ return this._table_name }
  static set table_name(value){ this._table_name = value }

  // CassTable
  static get table(){ return this._table }
  static set table(value){ this._table = value }

  // Store a cassandera client
  static get client(){ return this._client }
  static set client(value){ this._client = value }

  // Store the schema
  static get schema(){ return this._schema }
  static set schema(value){ this._schema = value }

  // Hidden fields in the schema (should this be in Schema?)
  static get hidden_fields(){ return this._hidden_fields }
  static set hidden_fields(value){ this._hidden_fields = value }

  // Generate a new extended version of Model for a Schema
  static generate( name, schema, options = {} ){
    // Name the class via an object property
    const o = { [name]: class extends this {} }
    let NewModel = o[name]
    NewModel.applySchema(schema)
    NewModel.debug = debugr(`mh:casserole:Model[${name}]`)
    NewModel.table_name = snakeCase(pluralize(name))
    NewModel.table = new CassTable(NewModel.table_name, {
      fields: schema._config,
      primary_keys: schema.primary_keys
    })
    if (!NewModel.debug.enabled) NewModel.debug = noop
    if (!typeof options.client === Client) throw new CassError('A Client instance must be attached')
    NewModel.client = options.client
    return NewModel
  }

  // Apply a Schema setup to this Model
  static applySchema(schema){
    this.schema = schema
    const debug = this.debug
    schema.forEach((column, name) =>{
      Object.defineProperty(this.prototype, name, {
        enumerable: true,
        get: function() { 
          debug('get %s', name)
          return this._row_data[name]
        },
        set: function(value) {
          debug('set %s', name, value)
          this._row_data[name] = value
        }
      })
    })
  }

  static async sync( options ){
    let cql = this.table.toCqlCreate({ q_exists_clause: true })
    return this.client.execute(cql)
  }

  static async find( query, options = {} ){
    const select = CassQuery.select(this.table_name, this.columns, query, options)
    const result = await this.client.execute(select.toString(), select.paramaters, options)
    return map(result.rows, row => new this(row, {new: false}))
  }

  static async findOne( query, options = {} ){
    options.limit = 1
    const results = await this.find(query, options)
    if (results.length !== 1) return null
    return results[0]
  }

  static async create( data, options = {} ){
    return new this(data).execSave(options)
  }

  static async update( query, values, options = {} ){
    const update = CassQuery.update(this.table_name, values, query)
    return this.client.execute(update.toCql(), update.paramaters(), options)
  }

  static async delete( query, options = {} ){
    const del = CassQuery.delete(this.table_name, query)
    return this.client.execute(del.toCql(), del.paramaters, options)
  }

  constructor(data, options){
    this._row_data = {}
    this._new = true
    if (options){
      this._new = Boolean(options.new)
    }
    forEach(data, (value, name)=> this._row_data[name] = value)
  }

  async execSave(options){
    let primary_key = this.constructor.primary_key
    this.constructor.debug('this',this)
    let query = (this._new)
      ? CassQuery.insert(this.constructor.table_name, this._row_data)
      : CassQuery.update(this.constructor.table_name, { [primary_key]: this[primary_key] }, this._row_data)
    const res = await this.constructor.client.execute(query.toString(), query.paramaters, options)
    this._new = false
    return res
  }

  async execRemove(options){
    let primary_key = this.constructor.primary_key
    let query = CassQuery.delete(this.constructor.table_name, { [primary_key]: this[primary_key] })
    return this.constructor.client.execute(query.toString(), query.paramaters, options)
  }

  isModified(){
    return true
  }

  getSchema(){
    return this._schema
  }

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