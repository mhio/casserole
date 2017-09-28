import debugr from 'debug'
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'

import Paramaters from './Paramaters'
import Client from './Client'
import CassQuery from './CassQuery'


export default class Model {

  static classInit(){
    this.debug = debugr('mh:casserole:Model')
    // The main schema for the Model
    this.schema = {}

    // Fields to hide from JSON outpu
    this.hidden_fields = []

    // JS name that would collide with the Model instance fields
    this.reserved_fields = Paramaters.reserved_fields
    this.warning_fields = Paramaters.warning_fields
  }

  // Generate a new extended version of Model for a Schema
  static generate(name, schema, options = {}){
    // Name the class via an object property
    const o = { [name]: class extends this {} }
    let NewModel = o[name]
    NewModel.applySchema(schema)
    NewModel.debug = debugr(`mh:casserole:Model[${name}]`)
    if (!NewModel.debug.enabled) NewModel.debug = noop
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

  static async find( query, options = {} ){
    return CassQuery.select(this.constructor.table, this.constructor.columns, query, options)
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

  static async update( values, query, options = {} ){
    const query_cql = CassQuery.update(this.table, values, query)
    return Client.execute(query_cql, options)
  }

  static async delete( query, options = {} ){
    const query_cql = CassQuery.delete(this.table, query)
    return Client.execute(query_cql, options)
  }

  constructor(data){
    this._row_data = {}
    forEach(data, (value, name)=> this._row_data[name] = value)
  }

  async execSave(options){
    let primary_key = this.constructor.primary_key
    let query = CassQuery.update(this.constructor.table, { [primary_key]: this[primary_key] }, this._row_data)
    return Client.execute(query, options)
  }

  async execRemove(options){
    let primary_key = this.constructor.primary_key
    let query = CassQuery.delete(this.constructor.table, { [primary_key]: this[primary_key] })
    return Client.execute(query, options)
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