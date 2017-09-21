import debug from 'debug'
import map from 'lodash/map'
import has from 'lodash/has'
import { dataTypes } from 'cassandra-driver/lib/types'

import { CassError } from './CassErrors'
import Util from './Util'
import CassCql from './CassCql'

/*
  CREATE TYPE [IF NOT EXISTS] 
  keyspace_name.type_name(
  field_name cql_datatype[,] 
  [field_name cql_datatype] [,...]
  )

  DROP TYPE [IF EXISTS] keyspace_name.type_name

  ALTER TYPE field_name 
  [ALTER field_name TYPE new_cql_datatype
  | ADD (field_name cql_datatype[,...])
  | RENAME field_name TO new_field_name[AND ...]]
*/

class CassType extends CassCql {

  static classInit(){
    this.debug = debug('mh:casserole:CassType')
    this.types = dataTypes

    this.drop_cql = 'DROP TYPE {{exists_clause}} {{keyspace_prefix}}{{name}};'

    this.create_cql = 
      'CREATE TYPE {{exists_clause}} {{keyspace_prefix}}{{name}} ('+
      '{{fields}}'+
      ');'

    this.create_fields_cql = '{{field_name}} {{cql_datatype}}'
  }

  static toCqlDrop( name, options = {} ){
    let exists_clause = (options.q_if_not_exists)
      ? this.create_exists_str
      : ''
    return Util.template('DROP TYPE {{exists_clause}} {{name}};', name, exists_clause)
  }

  static toCqlAlter( name, changes, options = {} ){
    throw new Error('nope')
  }

  static toCqlCreate( name, fields, options = {} ){
    let exists_clause = (options.q_if_not_exists)
      ? this.create_exists_str
      : ''
    let keyspace_prefix = (options.q_keyspace)
      ? `${options.q_keyspace}.`
      : ''
    let fields_list = map(fields, field => {
      return `${field.name} ${field.datatype}`
    })
    return Util.template(this.create_cql,
      exists_clause,
      keyspace_prefix,
      name,
      fields_list.join(', ')
    )
  }

  constructor( name, fields ){
    super()
    this.type_name = name
    this.fields = fields || {} 
  }

  addField(field, datatype){
    if ( datatype.startsWith('<') && !dataTypes[datatype] ) {
      throw new CassError(`No cassandra datatype "${datatype} available`)
    }
    this.fields[field] = { name: field, datatype: datatype }
  }

  toCqlCreate(){
    return this.constructor.toCreateCql(this.type_name, this.fields)
  }

  toCqlAlter(){
    throw new Error('nope')
  }

  toCqlDrop(){
    return this.constructor.toCreateCql(this.type_name, this.fields)
  }

}
CassType.classInit()

export default CassType