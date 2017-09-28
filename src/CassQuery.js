import debugr from 'debug'
import map from 'lodash/map'
import noop from 'lodash/noop'
import forEach from 'lodash/forEach'

import Paramaters from './Paramaters'
import CassCql from './CassCql'
import {QueryError} from './CassErrors'

// # Query

//export default class Query extends Cql {
export default class CassQuery_3_3 extends CassCql {

  static classInit(){
    this.debug = debugr('mh:casserole:Query_3_3')
    if (!this.debug.enabled) this.debug = noop

    // Cassandra driver Types
    this.types = Paramaters.types

    // Static aliases
    this.create = this.insert
    this.read = this.select

    // Instance aliases
    this.prototype.toCql = this.prototype.toString
    this.prototype.find = this.prototype.select
  }

  // Generate a new extended version of Model for a Schema
  static generate(query){
  }

  // static equals(o){
  //   return toPairs(o).map(pair => pair.join(' = "')+'"').join(' AND ')
  // }

  //static read( table, query, options = {} ){
  static select( table, columns, where, options = {} ){
    this.debug('select', table, columns, where)
    options.table = table
    options.columns = columns
    options.where = where
    options.cassandra_options = options
    return new this('select', options)
  }

  //static create( table, values, options = {} ){
  static insert( table, values, options = {} ){
    this.debug('insert', table, values, options)
    options.table = table
    options.values = values
    options.cassandra_options = options
    return new this('insert', options)
  }

  static update( table, where, setvalues, options = {} ){
    this.debug('select', table, where, setvalues, options)
    options.table = table
    options.where = where
    options.set = setvalues
    options.cassandra_options = options
    return new this('update', options)
  }

  static delete( table, where, options = {} ){
    this.debug('select', table, where, options)
    options.table = table
    options.where = where
    options.cassandra_options = options
    return new this('delete', options)
  }


  constructor( type, options = {} ){
    super()
    this.debug = this.constructor.debug
    this._paramaters = []
    switch(type){
      case 'select': this.select(options.table, options.columns); break
      case 'insert': this.insert(options.table); break
      case 'update': this.update(options.table); break
      case 'delete': this.delete(options.table); break
      default: throw new QueryError('Nope')
    }
    //this._values = options.values || null
    if ( options.values ) this.values(options.values)
    if ( options.set ) this.set(options.set)
    if ( options.where ) this.whereObject(options.where)
  }


  // ### Helpers
  expectConstraint(){
    if ( this._expecting_constraint ) throw new QueryError('Expected constraint')
    this._expecting_constraint = true
  }

  gotConstraint(){
    this._expecting_constraint = false
  }



  // ### Types

  select( table, columns, where ){
    this._table = table
    this._columns = columns || '*'
    this.query = `SELECT ${this._columns} FROM ${table}`
    if (where) return this.where(where)
    return this
  }

  insert( table, values ){
    this._table = table
    this.query = `INSERT INTO ${table}`
    if (values) return this.values(values)
    return this
  }

  update( table, set, where ){
    this._table = table
    this.query = `UPDATE ${table}`
    if (set) this.set(set)
    if (where) this.whereObject(where)
    return this
  }

  delete( table, where ){
    this._table = table
    this.query = `DELETE FROM ${table}`
    if (where) return this.whereObject(where)
    return this
  }


  get paramaters(){
    return this._paramaters
  }

  // Insert values
  values(values){
    this._values = values
    const cols = []
    const vals = []
    forEach(values, (value, name) => {
      cols.push(name)
      vals.push('?')
      this.debug('value', name, value)
      this._paramaters.push(value)
    })
    this.query += ' ( ' + cols.join(', ') + ' ) VALUES ( ' + vals.join(', ') + ' )'
    return this
  }

  // Update set
  set(values){
    this._values = values
    this.query += ' SET '
    this.query += map(values, (value, name) => {
      this._paramaters.push(value)
      this.debug('set', name, value)
      return `${name} = ?`
    }).join(', ')
    return this
  }

  from(table){
    this._table = table
    this.query = ` FROM ${table}`
    return this
  }

  // ### Clauses

  // `.find()` === `.select()`

  whereObject(clause){
    this.query += ' WHERE '
    this.query += map(clause, (value, name) => {
      this.debug('where %s:%s', name, value, this._paramaters)
      this._paramaters.push(value)
      return `${name} = ?`
    }).join(' AND ')
    return this
  }
  whereString(field){
    let prefix = (this._where_started) ? ' AND ' : ' WHERE '
    this.query += ` ${prefix} ${field}`
    this.expectConstraint()
    return this
  }
  where(param){
    if ( typeof param === 'string' ) return this.whereString(param)
    return this.whereObject(param)
  }

  or(field){
    QueryError.if( !this._where_started , 'No WHERE clause started' )
    QueryError.if( !this._expecting_constraint , 'Expecting constraint' )
    this.query += ` OR ${field}`
    this.expectConstraint()
    return this
  }

  and(field){
    QueryError.if( !this._where_started , 'No WHERE clause started' )
    QueryError.if( !this._expecting_constraint , 'Expecting constraint' )
    this.query += ` AND ${field}`
    this.expectConstraint()
    return this
  }

  equals(val){
    this.gotConstraint()
    this.query += ' = ?'
    this.paramaters.push(val)
    return this
  }

  gt(val){
    this.gotConstraint()
    this.query += ' > ?'
    this.paramaters.push(val)
    return this
  }

  gte(val){
    this.gotConstraint()
    this.query += ' >= ?'
    this.paramaters.push(val)
    return this
  }

  lt(val){
    this.gotConstraint()
    this.query += ' < ?'
    this.paramaters.push(val)
    return this
  }

  lte(val){
    this.gotConstraint()
    this.query += ' <= ?'
    this.paramaters.push(val)
    return this
  }

  in(val){
    this.gotConstraint()
    this.query += ' IN ?'
    this.paramaters.push(val)
    return this
  }

  like(val){
    this.gotConstraint()
    this.query += ' LIKE ?'
    this.paramaters.push(val)
    return this
  }

  token(val){
    this.gotConstraint()
    this.query += ' token ?'
    this.paramaters.push(val)
    return this
  }

  contains(val){
    this.gotConstraint()
    this.query += ' CONTAINS ?'
    this.paramaters.push(val)
    return this
  }

  containsKey(val){
    this.gotConstraint()
    this.query += ' CONTAINS KEY ?'
    this.paramaters.push(val)
    return this
  }

  // `.toCql()` === `toString()`
  toString(){
    return this.query
  }


}
CassQuery_3_3.classInit()