import debugr from 'debug'
import map from 'lodash/map'
import noop from 'lodash/noop'
import forEach from 'lodash/forEach'

import CassQuery from './CassQuery'
import {QueryException} from './CassExceptions'

/**
 * Creates CQL 3.3 compatible queries
 */
class CassQuery_3_3 extends CassQuery {

  static classInit(){
    this.debug = debugr('mhio:casserole:CassQuery_3_3')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.prototype.debug = this.debug

    // Static aliases
    this.create = this.insert
    this.read = this.select

    // Instance aliases
    this.prototype.toCql = this.prototype.toString
    this.prototype.create = this.prototype.insert
    this.prototype.read = this.prototype.select
    this.prototype.find = this.prototype.select

  }

  //static read( table, query, options = {} ){
  static select( table, columns, where, options = {} ){
    this.debug('select from %s', table, columns, where)
    options.table = table
    options.columns = columns
    options.where = where
    options.cassandra_options = options
    return new this('select', options)
  }

  //static create( table, values, options = {} ){
  static insert( table, values, options = {} ){
    this.debug('insert %s values', table, values, options)
    options.table = table
    options.values = values
    options.cassandra_options = options
    return new this('insert', options)
  }

  static update( table, setvalues, where, options = {} ){
    this.debug('update %s where ', table, setvalues, where, options)
    options.table = table
    options.where = where
    options.set = setvalues
    options.cassandra_options = options
    return new this('update', options)
  }

  static delete( table, where, options = {} ){
    this.debug('delete: from %s where', table, where, options)
    options.table = table
    options.where = where
    options.cassandra_options = options
    return new this('delete', options)
  }

  /**
   * @param {String} type - select, insert, update, delete
   * @param {Object} options
   * @param {Object} options.table    - Table to act upon
   * @param {Object} options.columns  - Columns to return, for select
   * @param {Object} options.values   - Values to update, insert
   * @param {Object} options.set      - See values
   * @param {Object} options.where    - Limit operation to these values
   */
  constructor( type, options = {} ){
    super()
    this._paramaters = []
    switch(type){
      case 'select':
        this.select(options.table, options.columns, options.where)
        break

      case 'insert':
        this.insert(options.table, options.values)
        break

      case 'update':
        this.update(options.table, options.set||options.values, options.where)
        break

      case 'delete':
        this.delete(options.table, options.where)
        break
      
      default: throw new QueryException('A Query instance requires a type: select, insert, update or delete')
    }
  }

  get paramaters(){
    return this._paramaters
  }
  get table(){
    return this._table
  }

  // ### Helpers
  expectConstraint(){
    if ( this._expecting_constraint ) throw new QueryException('Expected constraint')
    this._expecting_constraint = true
  }

  gotConstraint(){
    this._expecting_constraint = false
  }



  // ### Types
  /**
   * Select query
   * @description Build a select query 
   * ```
   * select(table_name, columns_array, where_fields)
   * ```
   * @params {string} table - Table to select from 
   * @params {string|array} columns - Column(s) to return
   * @params {string|object} where - Where clause
   * @returns {CassQuery}
   */
  select( table, columns, where ){
    this._table = table
    this._columns = columns || '*'
    this.query = `SELECT ${this.generateColumns()} FROM "${table}"`
    if (where) return this.where(where)
    return this
  }

  /**
   * Insert query
   * @description Build an insert query 
   * ```
   * insert(table_name, fields_values)
   * ```
   * @params {string} table - Table to select from 
   * @params {object} values - Column/Value pairs to insert
   * @returns {CassQuery}
   */
  insert( table, values ){
    this._table = table
    this.query = `INSERT INTO "${table}"`
    if (values) return this.values(values)
    return this
  }

  /**
   * Update query
   * @description Build an update query 
   * ```
   * update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })
   * ```
   * @params {string} table - Table to select from 
   * @params {object} set - Column/Value pairs to set
   * @params {string|object} where - Where clause
   * @returns {CassQuery}
   */
  update( table, set, where ){
    this._table = table
    this.query = `UPDATE "${table}"`
    if (set) this.set(set)
    if (where) this.whereObject(where)
    return this
  }

  /**
   * Delete query
   * @description Build a delete query 
   * ```
   * delete(table_name, { id: 'equals_some_id' })
   * ```
   * @params {string} table - Table to select from 
   * @params {string|object} where - Where clause
   * @returns {CassQuery}
   */
  delete( table, where ){
    this._table = table
    this.query = `DELETE FROM "${table}"`
    if (where) return this.whereObject(where)
    return this
  }


  generateColumns(){
    if ( this._columns === '*' ) return '*'
    if ( this._columns.join ) return `"${this._columns.join('", "')}"`
    return this._columns
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
    this.query += ` ( "${cols.join('", "')}" ) VALUES ( ${vals.join(', ')} )`
    return this
  }

  // Update set
  set(values){
    this._values = values
    this.query += ' SET '
    this.query += map(values, (value, name) => {
      this._paramaters.push(value)
      this.debug('set', name, value)
      return `"${name}" = ?`
    }).join(', ')
    return this
  }

  // from(table){
  //   this._table = table
  //   this.query = ` FROM "${table}"`
  //   return this
  // }

  // ### Clauses

  // `.find()` === `.select()`

  whereObject(clause){
    this.query += ' WHERE '
    this.query += map(clause, (value, name) => {
      this.debug('where %s:%s', name, value, this._paramaters)
      this._paramaters.push(value)
      return `"${name}" = ?`
    }).join(' AND ')
    return this
  }
  whereString(field){
    let prefix = (this._where_started) ? 'AND' : 'WHERE'
    this.query += ` ${prefix} "${field}"`
    this._where_started = true
    this.expectConstraint()
    return this
  }
  where(param){
    QueryException.if( this._where_started , 'WHERE clause already started' )
    if ( typeof param === 'string' ) return this.whereString(param)
    return this.whereObject(param)
  }

  or(field){
    QueryException.if( !this._where_started , 'No WHERE clause started' )
    QueryException.if( this._expecting_constraint , 'Expecting constraint' )
    this.query += ` OR "${field}"`
    this.expectConstraint()
    return this
  }

  and(field){
    QueryException.if( !this._where_started , 'No WHERE clause started' )
    QueryException.if( this._expecting_constraint , 'Expecting constraint' )
    this.query += ` AND "${field}"`
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
    this.query += ' TOKEN(?)'
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

export default CassQuery_3_3