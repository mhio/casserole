import debug from 'debug'
import has from 'lodash/has'

import Util from './Util'

/*
  CREATE  KEYSPACE [IF NOT EXISTS] keyspace_name 
     WITH REPLICATION = { 
        'class' : 'SimpleStrategy', 'replication_factor' : N } 
       | 'class' : 'NetworkTopologyStrategy', 
         'dc1_name' : N [, ...] 
     }
     [AND DURABLE_WRITES =  true|false] ;
*/

class CassKeyspace {

  static classInit(){
    this.debug = debug('mh:casserole:CassKeyspace')
  }

  static toCqlCreate(name, replication_stategy, durable){
    return `CREATE KEYSPACE IF NOT EXISTS ${name}`+
            ` WITH REPLICATION = ${Util.valueToCqlMap(replication_stategy)}`+
            ` AND DURABLE_WRITES = ${durable};`
  }

  constructor( name, options = {} ){
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