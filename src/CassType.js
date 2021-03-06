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
    this._debugInit('mhio:casserole:CassType')

    // Each class covers create/drop/alter for noun
    this.noun = 'TYPE'

    this.drop_cql = 'DROP TYPE {{exists_clause}}{{keyspace_prefix}}"{{name}}";'

    this.create_cql = 
      'CREATE TYPE {{exists_clause}}{{keyspace_prefix}}"{{name}}" ( '+
      '{{fields}}'+
      ' );'

    this.create_fields_cql = '{{field_name}} {{cql_datatype}}'
  }

  /**
  * Create a CQL `DROP TYPE` string
  * @params {String} name - Name of the TYPE to drop
  */
  static toCqlDrop( name, options = {} ){
    let exists_clause = (options.if_not_exists || options.exists)
      ? `${this.drop_exists_cql} `
      : ''
    let keyspace_prefix = (options.keyspace)
      ? `${options.keyspace}.`
      : ''
    return `DROP TYPE ${exists_clause}${keyspace_prefix}"${name}";`
    //return Util.template('DROP TYPE {{exists_clause}} {{name}};', name, exists_clause)
  }

  /**
  * Create a CQL `ALTER TYPE` string
  * @params {String} name - Name of the TYPE to drop
  */
  static toCqlAlter( name, changes, options = {} ){ // eslint-disable-line no-unused-vars
    throw new Error('No TYPE alter available')
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
    if (!name) throw new CassException('Name required to create type')
    if (!fields) throw new CassException('Fields required to create type')
    let exists_clause = (options.if_not_exists || options.exists) 
      ? `${this.create_exists_cql} `
      : ''
    let keyspace_prefix = (options.keyspace)
      ? `${options.keyspace}.`
      : ''
    let fields_list = map(fields, (field, field_name) => {
      if ( typeof field === 'string') return `${field_name} ${field}`
      if (field.name) field_name = field.name
      return `${field_name} ${field.type}`
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
    if ( !datatype.startsWith('<') && !Paramaters.types[datatype] ) {
      throw new CassException(`No cassandra datatype "${datatype}" available`)
    }
    this.fields[field] = { name: field, type: datatype }
    return this
  }

  toCqlCreate(){
    return this.constructor.toCqlCreate(this.type_name, this.fields)
  }

  toCqlAlter(fields){
    return this.constructor.toCqlAlter(this.type_name, fields)
  }

  toCqlDrop(){
    return this.constructor.toCqlDrop(this.type_name)
  }

}
CassType._classInit()

export default CassType
