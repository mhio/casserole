import has from 'lodash/has'

import Util from './Util'
import CassEntity from './CassEntity'
import CassException from './CassExceptions'
import CassReplicationStrategy from './CassReplicationStrategy'

/*
```
CREATE KEYSPACE [ IF NOT EXISTS ] keyspace_name WITH options
options ::=  option ( AND option )*
option  ::=  identifier '=' ( identifier | constant | map_literal )

CREATE  KEYSPACE [IF NOT EXISTS] keyspace_name 
   WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 'replication_factor' : N } 
     | 'class' : 'NetworkTopologyStrategy', 
       'dc1_name' : N [, ...] 
   }
   [AND DURABLE_WRITES =  true|false] ;

ALTER  KEYSPACE keyspace_name 
 WITH REPLICATION = { 
    'class' : 'SimpleStrategy', 'replication_factor' : N  
   | 'class' : 'NetworkTopologyStrategy', 'dc1_name' : N [, ...] 
 }
 [AND DURABLE_WRITES =  true|false] ;

DROP KEYSPACE [IF EXISTS] keyspace_name
```
*/

/**
  * Manage a Cassandra Keyspace
  * @extends CassEntity
  */
class CassKeyspace extends CassEntity {

  static classInit(){
    this.debugInit('mhio:casserole:CassKeyspace')

    // Each class covers create/drop/alter for noun
    this.noun = 'KEYSPACE'

    this.create_cql = 
      'CREATE KEYSPACE {{exists_clause}}"{{keyspace_name}}" '+
      'WITH REPLICATION = {{replication_stategy}}'+
      '{{options}};'
    this.durable_cql =
      ' AND DURABLE_WRITES = {{durable}}'

    this.drop_cql = 'DROP KEYSPACE {{exists_clause}}"{{keyspace_name}}";'
  }

  static toCqlCreate( keyspace_name, replication_stategy, options = {} ){
    let exists_clause = (options.if_not_exists || options.exists)
      ? this.create_exists_cql+' '
      : ''

    let durable = (has(options,'durable'))
      ? Util.template(this.durable_cql, `${Boolean(options.durable)}`)
      : Util.template(this.durable_cql, 'true')
    let options_cql = durable

    if( !replication_stategy ) throw new CassException('No replication strategy')
    let replication_stategy_cql = (replication_stategy.toCqlMap)
      ? replication_stategy.toCqlMap()
      : Util.valueToCqlMap(replication_stategy)

    return Util.template(
      this.create_cql,
      exists_clause,
      keyspace_name,
      replication_stategy_cql,
      options_cql
    )
  }

  static toCqlDrop( keyspace_name, options = {} ){
    let exists_clause = this.drop_exists_cql + ' '
    if (options.if_exists === false || options.exists === false ) exists_clause = ''
    return Util.template(this.drop_cql, exists_clause, keyspace_name)
  }

  constructor( name, options = {} ){
    super()
    this.debug = this.constructor.debug
    this.keyspace = name
    this.replication = options.replication || CassReplicationStrategy.simple()
    this.durable = (has(options,'durable')) ? options.durable : true
  }

  get keyspace(){ return this._keyspace }
  set keyspace( value ){
    CassException.if( !value, 'No keyspace name')
    this._keyspace = value
  }

  get replication(){ return this._replication }
  set replication( value ){
    if ( value instanceof CassReplicationStrategy ) return this._replication = value
    this._replication = new CassReplicationStrategy(value)
  }

  get durable(){ return this._durable }
  set durable( value ){
    this._durable = Boolean(value)
  }

  toCqlCreate(){
    let o = { exists_clause: true, durable: this.durable }
    this.debug(o)
    return this.constructor.toCqlCreate(this.keyspace, this.replication, o)
  }

  toCqlDrop(){
    return this.constructor.toCqlDrop(this.keyspace)
  }

}
CassKeyspace.classInit()

export default CassKeyspace
