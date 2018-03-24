import debugr from 'debug'
import cassandra from 'cassandra-driver'
import noop from 'lodash/noop'

import CassKeyspace from './CassKeyspace'
import CassQuery_3_3 from './CassQuery_3_3'
import CassTable from './CassTable'


class Client {

  static classInit(){
    this.debug = debugr('mhio:casserole:Client')
    if (!this.debug.enabled) this.debug = noop


    this.default_keyspace = 'default'
    this.default_replication_factor = 1
    this.default_replication_stategy = 'SimpleStrategy'

    // Match cassdrivers function name
    this.prototype.shutdown = this.prototype.disconnect
  }

  /**
  * Client options
  * @typedef {Object} ClientOptions
  * @property {String} keyspace The keyspace for all the operations within the {@link Client} instance.
  **/
  constructor( keyspace, options = {} ){
    this.debug = this.constructor.debug
    
    this.keyspace = keyspace

    // We need an array of hosts to connect to, defualt to localhost
    this.hosts = options.hosts
    if (!this.hosts) this.hosts = [ '127.0.0.1' ]
    
    this.replication_stategy = 
      options.replication_stategy || this.constructor.default_replication_stategy

    this.replication_factor = 
      options.replication_factor || this.constructor.default_replication_factor
    
    this.setupClient()
  }

  setupClient(){
    this.client = new cassandra.Client({
      contactPoints: this.hosts, //array of hosts to connect to 
      //keyspace: this.keyspace || this.constructor.default_keyspace
    })
    this.client.on('hostUp', host => {
      this.debug('host', host)
    })
    this.client.on('hostDown', host => {
      this.debug('host', host)
    })
    this.client.on('hostAdd', host => {
      this.debug('host', host)
    })
    this.client.on('hostRemove', host => {
      this.debug('host', host)
    })
  }

  async connect(){
    await this.client.connect()
    return this.keyspaceCreate()
  }

  keyspaceDrop(){
    let query = CassKeyspace.toCqlDrop(this.keyspace)
    return this.execute(query)
  }

  async keyspaceCreate(){
    let query = CassKeyspace.toCqlCreate(this.keyspace, {
      class: this.replication_stategy,
      replication_factor: this.replication_factor
    }, {
      q_if_not_exists: true
    })
    let res = await this.execute(query)
    await this.execute('USE '+this.keyspace)
    return res
  }

  createTable(name, fields, primary_keys, options = {}){
    const query = CassTable.toCqlCreate(name, fields, primary_keys, options)
    return this.execute(query)
  }

  async execute( query, params = [], options = {} ){
    this.debug('query', query, params, options)
    const result = await this.client.execute(query, params, options)
    this.debug('result rows:%s cols:"%s"', result.rowLength, result.columns, result.info.queriedHost)
    return result
  }

  async insert( table, values, options ){
    let query = CassQuery_3_3.insert(table, values)
    return this.client.execute(query.toString(), query.paramaters, options)
  }

  async select( table, columns, where, options ){
    let query = CassQuery_3_3.select(table, columns, where)
    return this.client.execute(query.toString(), query.paramaters, options)
  }

  async update( table, values, where, options ){
    let query = CassQuery_3_3.update(table, values, where)
    return this.client.execute(query.toString(), query.paramaters, options)
  }

  async delete( table, where, options ){
    let query = CassQuery_3_3.delete(table, where)
    return this.client.execute(query.toString(), query.paramaters, options)
  }

  // async
  disconnect(){
    return this.client.shutdown()
  }

  getState(){
    return this.client.getState()
  }

}
Client.classInit()

export default Client