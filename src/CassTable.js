import map from 'lodash/map'
import has from 'lodash/has'
import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'

import { dataTypes } from 'cassandra-driver/lib/types'

import CassError from './CassErrors'
import Util from './Util'
import CassCql from './CassCql'

/*
  CREATE TABLE [IF NOT EXISTS] [keyspace_name.]table_name ( 
     column_definition [, ...]
     PRIMARY KEY (column_name [, column_name ...])
  [WITH table_options
     | CLUSTERING ORDER BY (clustering_column_name order])
     | ID = 'table_hash_tag'
     | COMPACT STORAGE]
*/

class CassTable extends CassCql {

  static classInit(){
    this.debugInit('mh:casserole:CassTable')

    // Each class covers create/drop/alter for noun
    this.noun = 'KEYSPACE'

    // Types come from the driver
    this.types = dataTypes

    // Create templates
    this.create_str =
      'CREATE TABLE {{exists_clause}} {{keyspace_prefix}}{{table_name}} ( ' +
      '{{column_definition}}, ' +
      'PRIMARY KEY ({{primary_keys}}) )'+
      '{{options}};'

    this.create_options_cql     = ' WITH {{table_options}}'
    this.create_opt_order_cql   = ' CLUSTERING ORDER BY ({{order_by}} {{order}}])'
    this.create_opt_id_cql      = ' ID = \'{{table_hash_tag}}\''
    this.create_opt_compact_cql = ' COMPACT STORAGE'
        
  }

  static toCqlDrop(name, exists){
    const exists_clause = (exists === true) ? 'IF EXISTS' : ''
    return Util.template('DROP TABLE {{name}}{{exists_clause}};', name, exists_clause)
  }

  static toCqlAlter(name, changes){
    throw new Error('nope')
  }

  static toCqlCreate(name, fields, primary_keys, options = {}){
    if (isEmpty(name)) throw new CassError('CassTable create cql requires "name"')
    if (isEmpty(fields)) throw new CassError('CassTable create cql requires "fields"')
    if (isEmpty(primary_keys)) throw new CassError('CassTable create cql requires "primary_keys"')
    let exists_clause = (options.q_if_not_exists)
      ? this.create_exists_cql
      : ''
    let keyspace_prefix = (options.q_keyspace)
      ? `${options.q_keyspace}.`
      : ''
    let order = ( options.q_order ) 
      ? options.q_order
      : 'ASC'
    let order_by = ( options.q_order_by )
      ? Util.template(this.create_opt_order_cql, options.q_order_by, order)
      : ''
    let id = ( options.q_id )
      ? Util.template(this.create_opt_id_cql, id)
      : ''
    let compact = ( options.q_compact )
      ? this.create_opt_compact_str
      : ''
  
    // See if we have any generic map options
    let query_options = pickBy(options, (val, key) =>{
      if ( key.startsWith('q_') ) return false
      return true
    })
    if (isEmpty(query_options)) query_options = false
    this.debug('query_options', query_options)

    let fields_list = map(fields, field => {
      return `${field.name} ${field.type}`
    })
    let options_cql = ''
    if ( order_by || id || compact || query_options ) {
      if (order_by)       options_cql += order_by
      if (id)             options_cql += id
      if (compact)        options_cql += compact
      if (query_options)  options_cql += this.valueToCqlMap(options_cql)
      options_cql = Util.template(this.create_options_cql, options_cql)
    }
    return Util.template(this.create_str, exists_clause, keyspace_prefix, name, fields_list.join(', '), primary_keys.join(', '), options_cql)
  }

  constructor( name, options = {} ){
    super()
    this.keyspace = name
    this.fields = {}
    this.primary_keys = []
    this.replication = options.replication
    if (has(options.durable)) this.durable = Boolean(options.durable)
  }

  addField(field, type){
    if ( !dataTypes[type] ) throw new CassError(`No cassandra type "${type} available`)
    this.fields[field] = { name: field, type: type }
  }

  toCqlCreate(){
    return this.constructor.toCreateCql(this.keyspace, this.fields, this.primary_keys)
  }

  toCqlAlter(){
    throw new Error('nope')
  }

  toCqlDrop(){
    return this.constructor.toCreateCql(this.keyspace, this.fields, this.primary_keys)
  }

}
CassTable.classInit()

export default CassTable