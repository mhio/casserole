import debug from 'debug'
import cassandra from 'cassandra-driver'
import noop from 'lodash/noop'

import Util from './Util'
import CassKeyspace from './CassKeyspace'


class Client {

  static classInit(){
    this.debug = debug('mh:casserole')
    if (!this.debug.enabled) this.debug = noop


    this.default_keyspace = 'default'
    this.default_replication_factor = 1
    this.default_replication_stategy = 'SimpleStrategy'
  }

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

  connect(){
    return this.keyspaceCreate()
  }

  keyspaceDrop(){
    let query = CassKeyspace.toCqlDrop(this.keyspace)
    return this.execute(query)
  }

  keyspaceCreate(){
    let query = CassKeyspace.toCqlCreate(this.keyspace, {
      class: this.replication_stategy,
      replication_factor: this.replication_factor
    }, {
      q_if_not_exists: true
    })
    return this.execute(query)
  }

  tableCreate(table){
    const query = table.toCreateCql()
    return  this.execute(query)
  }
  
  test(){
    const query = 'SELECT name, email FROM users WHERE key = ?'
    return this.execute(query, [ 'someone' ])
  }

  async execute( query, params = [], options = {} ){
    this.debug('query', query, params, options)
    const result = await this.client.execute(query, params, options)
    this.debug('result', result)
    return result
  }

}
Client.classInit()

export default Client