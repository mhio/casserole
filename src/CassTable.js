import map from 'lodash/map'
import has from 'lodash/has'
import clone from 'lodash/clone'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'

import Paramaters from './Paramaters'
import {CassException} from './CassExceptions'
import Util from './Util'
import CassEntity from './CassEntity'

const template = Util.template

/*
  ```
  CREATE TABLE [IF NOT EXISTS] [keyspace_name.]table_name ( 
     column_definition [, ...]
     PRIMARY KEY (column_name [, column_name ...])
  [WITH table_options
     | CLUSTERING ORDER BY (clustering_column_name order])
     | ID = 'table_hash_tag'
     | COMPACT STORAGE]
  ```
*/

/**
 * Covers all operations to a table, like CREATE and ALTER
 */
class CassTable extends CassEntity {

  static classInit(){
    this.debugInit('mhio:casserole:CassTable')

    // Each class covers create/drop/alter for noun
    this.noun = 'TABLE'

    // Types come from the driver
    this.data_types = Paramaters.types
    this.prototype.data_types = Paramaters.types

    // Create templates
    this.create_str =
      'CREATE TABLE {{exists_clause}}{{keyspace_prefix}}"{{table_name}}" ( ' +
      '{{column_definition}}, ' +
      'PRIMARY KEY ({{primary_keys}}) )'+
      '{{options}};'

    this.create_options_cql     = ' WITH{{table_options}}'
    this.create_opt_order_cql   = ' CLUSTERING ORDER BY ( "{{order_by}}" {{order}} )'
    this.create_opt_compact_cql = ' COMPACT STORAGE'
        
  }

  static toCqlDrop( name, options = {} ){
    const exists_clause = ( options.exists === true )
      ? ' IF EXISTS'
      : ''
    const keyspace_prefix = ( options.keyspace )
      ? `"${options.keyspace}".`
      : ''

    return template(
      'DROP TABLE {{keyspace_prefix}}"{{name}}"{{exists_clause}};',
      keyspace_prefix, name, exists_clause
    )
  }

  static toCqlAlter( name, changes ){ // eslint-disable-line no-unused-vars
    throw new Error('nope')
  }

  static toCqlCreate( name, fields, primary_keys, options = {} ){
    if (isEmpty(name)) throw new CassException('CassTable Create cql requires a table "name"')
    if (isEmpty(fields)) throw new CassException('CassTable Create cql requires "fields"')
    if (isEmpty(primary_keys)) throw new CassException('CassTable Create cql requires "primary_keys"')
    
    let exists_clause = ''
    if ( options.if_not_exists || options.exists ) {
      exists_clause = this.create_exists_cql
      delete options.if_not_exists
      delete options.exists
    }
    
    let keyspace_prefix = ''
    if ( options.keyspace ){
      keyspace_prefix = `"${options.keyspace}".`
      delete options.keyspace
    }

    let id = ''
    if ( options.id ){
      id = ` ID = '${options.id}'`
      delete options.id
    }
    
    let order = 'ASC'
    if ( options.order ) {
      if ( ! options.order_by ) throw new CassException('CLUSTER ORDER requires an ORDER BY field')
      order = options.order
      delete options.order
    }
    
    let order_by = ''
    if ( options.order_by ){
      order_by = template(this.create_opt_order_cql, options.order_by, order)
      delete options.order_by
    }

    let compact = ''
    if ( options.compact ){
      compact = ' COMPACT STORAGE'
      delete options.compact
    }
  
    // See if we have any generic map options to append
    let query_options = clone(options)
    if ( isEmpty(query_options) ) query_options = false
    this.debug('toCqlCreate query_options', query_options)

    let fields_list = map(fields, field => {
      return `"${field.name}" ${field.type}`
    })

    let options_cql = ''
    if ( id )             options_cql += id
    if ( order_by )       options_cql += order_by
    if ( compact )        options_cql += compact
    if ( query_options )  options_cql += this.withOptions(query_options)
    if ( options_cql !== '' ) options_cql = template(this.create_options_cql, options_cql)

    return template(
      this.create_str,
      exists_clause,
      keyspace_prefix,
      name,
      fields_list.join(', '),
      primary_keys.join(', '),
      options_cql
    )
  }

  /**
   * Create a table instance with a name, fields and primary keys.  
   * @param {String}  name - The table name all the operations within the {@link CassTable} instance.
   * @param {Object}  options
   * @param {Object}  options.fields        - Field name, type defintion `{ name: { type: '' }}`
   * @param {String}  options.keyspace      - Keyspace for table
   * @param {Array}   options.primary_keys  - Primary Keys
   * @param {object}  options.replication   - Replication options for the table
   * @param {Boolean} options.durable       - Turn Durable on/off
   */
  constructor( name, options = {} ){
    super()
    this.debug('new', name, options)
    this.table_name = name
    this.fields = {}
    if (options.fields) forEach(options.fields, (field, name) => this.addField(name, field.type))
    this.primary_keys = options.primary_keys || []
    this.replication = options.replication
    this.keyspace = options.keyspace || ''
    if (has(options,'durable')) this.durable = Boolean(options.durable)
  }

  addField( field, type ){
    if ( !this.data_types[type] ) throw new CassException(`No cassandra type "${type}" available`)
    this.debug('adding field "%s" of type "%s" to table "%s"', field, type, this.table_name)
    this.fields[field] = { name: field, type: type }
    return this
  }

  toCqlCreate(options){
    return this.constructor.toCqlCreate(this.table_name, this.fields, this.primary_keys, options)
  }

  toCqlAlter(){
    throw new Error('nope')
  }

  toCqlDrop( options = {} ){
    if ( !options.keyspace ) options.keyspace = this.keyspace
    return this.constructor.toCqlDrop(this.table_name, options)
  }

}
CassTable.classInit()

export default CassTable