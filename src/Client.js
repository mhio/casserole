import debug from 'debug'
import cassandra from 'cassandra-driver'
import noop from 'lodash/noop'

import Util from './Util'

class Client {

  static classInit(){
    this.debug = debug('mh:casserole')
    if (!this.debug.enabled) this.debug = noop
    this.client = new cassandra.Client({
      //contactPoints: [ '10.8.12.1', '10.8.12.2' ],
      contactPoints: [ '127.0.0.1' ],
      //keyspace: 'Excelsior'
    })
    this.keyspace = 'Excelsior'
    this.replication_factor = 1
    this.replication_stategy = 'SimpleStrategy'
  }

  static connect(){
    return this.keyspaceCreate()
  }

  static keyspaceDrop(){
    const query = `DROP KEYSPACE IF EXISTS ${this.keyspace}`
    return this.execute(query)
  }

  static keyspaceCreate(){
    let replic = { 
      class: this.replication_stategy, 
      replication_factor: this.replication_factor
    }
    const query = `CREATE KEYSPACE IF NOT EXISTS ${this.keyspace}`+
                ` WITH REPLICATION = ${Util.valueToCqlMap(replic)}`+
                ' AND DURABLE_WRITES = true'
    return this.execute(query)
  }

  static tableCreate(table){
    const query = table.toCreateCql()
    return  this.execute(query)
  }
  
  static async test(){
    const query = 'SELECT name, email FROM users WHERE key = ?'
    return this.execute(query, [ 'someone' ])
  }

  static async execute(query, params, options){
    this.debug('query', query, params, options)
    const result = await this.client.execute(query, params, options)
    this.debug('result', result)
    return result
  }

}
Client.classInit()

export default Client