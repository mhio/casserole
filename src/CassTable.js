import debug from 'debug'
import map from 'lodash/map'
import has from 'lodash/has'
import { dataTypes } from 'cassandra-driver/lib/types'

import Util from './Util'
import { CassError } from './CassErrors'

/*
    CREATE TABLE users (
    user_name varchar,
    password varchar,
    gender varchar,
    session_token varchar,
    state varchar,
    birth_year bigint,
    PRIMARY KEY (user_name));
*/

class CassTable {

  static classInit(){
    this.debug = debug('mh:casserole:CassTable')
    this.types = dataTypes
  }

  static toCqlDrop(name, exists){
    const exists_clause = (exists === true) ? ' IF EXISTS' : ''
    return Util.template('DROP TABLE {{name}}{{exists_clause}};', name, exists_clause)
  }

  static toCqlAlter(name, changes){
    throw new Error('nope')
  }

  static toCqlCreate(name, fields, primary_keys){
    let fields_list = map(fields, field => {
      return `${field.name} ${field.type}`
    })
    return Util.template('CREATE TABLE {{name}} ( {{fields}}, PRIMARY KEY ({{primary_keys}}) );', name, fields_list.join(', '), primary_keys.join(', '))
  }

  constructor( name, options = {} ){
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