import map from 'lodash/map'

import { CassException } from './CassExceptions'
import { Paramaters } from './Paramaters'
import Util from './Util'
import CassEntity from './CassEntity'

/**
  ```
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
  ```
*/

/**
* Create, Drop and Alter custom Cassandra types.
* @classdesc Manage Custom Cassandra Types 
*/
export class CassType extends CassEntity {

  /**
  * @property {string} noun        - Set a generic prefix var, so users can subclass in the 
                                  their app (see {@link ClassDebug.extend})
  * @property {string} drop_cql    - CQL to DROP a TYPE
  * @property {string} create_cql  - CQL to CREATE a TYPE
  * @property {string} create_fields_cql - CQL setup a field in CREATE
  */
  static _classInit(){
    this.debugInit('mhio:casserole:CassType')

    // Each class covers create/drop/alter for noun
    this.noun = 'TYPE'

    this.drop_cql = 'DROP TYPE {{exists_clause}}{{keyspace_prefix}}"{{name}}";'

    this.create_cql = 
      'CREATE TYPE {{exists_clause}}{{keyspace_prefix}}"{{name}}" ('+
      '{{fields}}'+
      ');'

    this.create_fields_cql = '{{field_name}} {{cql_datatype}}'
  }

  /**
  * Create a CQL `DROP TYPE` string
  * @params {String} name - Name of the TYPE to drop
  */
  static toCqlDrop( name, options = {} ){
    let exists_clause = (options.q_if_not_exists)
      ? this.create_exists_str
      : ''
    return Util.template('DROP TYPE {{exists_clause}} {{name}};', name, exists_clause)
  }

  /**
  * Create a CQL `ALTER TYPE` string
  * @params {String} name - Name of the TYPE to drop
  */
  static toCqlAlter( name, changes, options = {} ){ // eslint-disable-line no-unused-vars
    throw new Error('nope')
  }

  /**
  * Create a CQL `CREATE TYPE` string
  * @params {String} name             - Name of the TYPE to create
  * @params {Object} fields           - Field definitions to add to the TYPE
  * @params {Object} options          - Options to pass to CQL
  * @params {Boolean} options.exists  - Add exists clause
  * @params {String} options.keyspace - Set the keyspace to use
  */
  static toCqlCreate( name, fields, options = {} ){
    let exists_clause = (options.if_not_exists || options.exists) 
      ? this.create_exists_str
      : ''
    let keyspace_prefix = (options.keyspace)
      ? `${options.keyspace}.`
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

  /**
  * @param {String} name    - Name of Type
  * @param {Object} fields  - Field definitions for Type
  */
  constructor( name, fields ){
    super()
    this.type_name = name
    this.fields = fields || {} 
  }

  /**
  * Add a field to the Type
  * @params {String} field       - Name of the field to add 
  * @params {Object} fields      - Definitions of the field to add
  * @returns this
  */
  addField(field, datatype){
    if ( datatype.startsWith('<') && !Paramaters.types[datatype] ) {
      throw new CassException(`No cassandra datatype "${datatype} available`)
    }
    this.fields[field] = { name: field, datatype: datatype }
    return this
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
CassType._classInit()

export default CassType
