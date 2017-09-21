import has from 'lodash/has'

import Util from './Util'
import CassCql from './CassCql'

/*
  CREATE  KEYSPACE [IF NOT EXISTS] keyspace_name 
     WITH REPLICATION = { 
        'class' : 'SimpleStrategy', 'replication_factor' : N } 
       | 'class' : 'NetworkTopologyStrategy', 
         'dc1_name' : N [, ...] 
     }
     [AND DURABLE_WRITES =  true|false] ;
*/

class CassKeyspace extends CassCql {

  static classInit(){
    this.debugInit('mh:casserole:CassKeyspace')

    // Each class covers create/drop/alter for noun
    this.noun = 'KEYSPACE'

    this.create_cql = 
      'CREATE KEYSPACE {{exists_clause}} {{name}} '+
      'WITH REPLICATION = {{replication_stategy}}'+
      '{{options}};'
    this.durable_cql = ' AND DURABLE_WRITES = {{durable}}'
  }

  static toCqlCreate( name, replication_stategy, options = {} ){
    let exists_clause = (options.q_if_not_exists)
      ? this.create_exists_cql
      : ''
    let durable = (has(options,'q_durable'))
      ? Util.template(this.durable_cql, `${Boolean(options.q_durable)}`)
      : Util.template(this.durable_cql, 'true')
    this.debug('durable', options.q_durable, durable)
    let options_cql = durable
    let replication_stategy_cql = Util.valueToCqlMap(replication_stategy)

    return Util.template(
      this.create_cql,
      exists_clause,
      name,
      replication_stategy_cql,
      options_cql
    )
  }

  constructor( name, options = {} ){
    super()
    this.keyspace = name
    this.fields = {}
    this.replication = options.replication
    this.durable = (has(options.durable)) ? Boolean(options.durable) : true
  }

  addField(field, type){
    this.fields[field] = { name: field, type: type }
  }

  toCqlCreate(){
    return this.constructor.toCreateCql(this.keyspace, this.replication, this.durable)
  }

}
CassKeyspace.classInit()

export default CassKeyspace