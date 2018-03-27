import debugr from 'debug'
import cassandra from 'cassandra-driver'
import noop from 'lodash/noop'

import CassKeyspace from './CassKeyspace'
import CassTable from './CassTable'
import Query from './CassQuery_3_3'

/**
 * Client for apps to interact with Cassandra
 */
class Client {

  static classInit(){
    this.debug = debugr('mhio:casserole:Client')
    /* istanbul ignore else */
    if (!this.debug.enabled) this.debug = noop
    this.prototype.debug = this.debug

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
   */
  constructor( keyspace, options = {} ){
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
    /* istanbul ignore next */
    this.client.on('hostUp', host => {
      this.debug('hostUp', host) 
    })
    /* istanbul ignore next */
    this.client.on('hostDown', host => {
      this.debug('hostDown', host)
    })
    /* istanbul ignore next */
    this.client.on('hostAdd', host => {
      this.debug('hostAdd', host)
    })
    /* istanbul ignore next */
    this.client.on('hostRemove', host => {
      this.debug('hostRemove', host)
    })
  }

  /**
  * Connect to the cassandra db
  * @async
  */
  async connect(){
    await this.client.connect()
    return this.keyspaceCreate()
  }

  /**
  * Drop the default keyspace
  * @async
  * @returns {ResultSet} Result of query
  */
  async keyspaceDrop(){
    let query = CassKeyspace.toCqlDrop(this.keyspace)
    return this.execute(query)
  }

  /**
  * Create the default keyspace
  * @async
  * @returns {ResultSet} Result of query
  */
  async keyspaceCreate(){
    let query = CassKeyspace.toCqlCreate(this.keyspace, {
      class: this.replication_stategy,
      replication_factor: this.replication_factor
    }, {
      if_not_exists: true
    })
    let res = await this.execute(query)
    await this.execute('USE '+this.keyspace)
    return res
  }

  /**
  * Create a table in the default keyspace
  * @async
  * @param {String} name        - The tables name
  * @param {Object} fields      - The field/column definition to create
  * @param {Array} primary_keys - The field/columns to use as primary keys
  * @param {Object} fields      - The field/column definition to create
  * @returns {ResultSet}          Result of query
  */
  async createTable(name, fields, primary_keys, options = {}){
    const query = CassTable.toCqlCreate(name, fields, primary_keys, options)
    return this.execute(query)
  }

  /**
  * Run a Query
  * @async
  * @param {Query} query      - Query object
  * @param {object} options   - Cassandra Driver query options
  * @returns {ResultSet}        Cassandra ResultSet
  */
  async query( query, options = {} ){
    if ( query instanceof Query === false ) {
      throw new Error('Client query requires a Query object')
    }
    return this.execute(query.query, query.paramaters, options)
  }

  /**
  * @summary Execute a query string 
  * @description Execute a string query, and possible paramaters and Cassandra driver options.
  * @async
  * @param {string} query     - Query string
  * @param {array} params     - Paramaters for the `?` in plain string query
  * @param {object} options   - Cassandra Driver query options
  * @returns {ResultSet}      Cassandra ResultSet
  */
  async execute( query, params = [], options = {} ){
    this.debug('execute query [%s] with', query, params, options)
    const result = await this.client.execute(query, params, options)
    this.debug('result rows:%s cols:"%s"', result.rowLength, result.columns, result.info.queriedHost)
    return result
  }

  /**
  * @summary Run an insert query
  * @description Execute a...
  * @async
  * @param {String} table     - Name of the table to insert to
  * @param {Object} values    - field: value pairs to insert
  * @param {object} options   - Cassandra Driver query options
  * @returns {ResultSet} - Cassandra ResultSet
  */
  async insert( table, values, options ){
    let query = Query.insert(table, values)
    return this.query(query, options)
  }

  /**
  * @summary Run an select query
  * @description Execute a...
  * @async
  * @param {String} table          - Name of the table to insert to
  * @param {Array|String} columns  - The columns to return in the ResultSet
  * @param {Object} where          - Where clause to use
  * @param {Object} options        - Cassandra query options
  * @returns {ResultSet} - Cassandra ResultSet
  */
  async select( table, columns, where, options ){
    let query = Query.select(table, columns, where)
    return this.query(query, options)
  }

  /**
  * @summary Run an update query
  * @description Execute a...
  * @async
  * @param {String} table          - Name of the table to insert to
  * @param {Object} values         - `field: value` pairs to update
  * @param {Object} where          - Where clause to use
  * @param {Object} options        - Cassandra query options
  * @returns {ResultSet} - Cassandra ResultSet
  */
  async update( table, values, where, options ){
    let query = Query.update(table, values, where)
    return this.query(query, options)
  }

  /**
  * @summary Run an delete query
  * @description Execute a...
  * @async
  * @param {String} table          - Name of the table to insert to
  * @param {Object} where          - Where clause to use
  * @param {Object} options        - Cassandra query options
  * @returns {ResultSet} - Cassandra ResultSet
  */
  async delete( table, where, options ){
    let query = Query.delete(table, where)
    return this.query(query, options)
  }

  /**
  * @summary Disconnect
  * @async
  * @returns ???
  */
  disconnect(){
    return this.client.shutdown()
  }

  /**
  * @summary Get the state of the Cassandra client connection
  * @async
  * @returns ???
  */
  getState(){
    return this.client.getState()
  }

}
Client.classInit()

export default Client