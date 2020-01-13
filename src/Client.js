import debugr from 'debug'
import cassandra from 'cassandra-driver'
import noop from 'lodash/noop'
import has from 'lodash/has'

import CassKeyspace from './CassKeyspace'
import CassTable from './CassTable'
import Query from './CassQuery_3_3'
import {CassException} from './CassExceptions'
import {ModelStore} from './ModelStore'

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

    this.default_client = undefined
  }

  /**
   * Client options
   * @typedef {Object} ClientOptions
   * @property {String} keyspace The keyspace for all the operations within the {@link Client} instance.
   */
  constructor( keyspace, options = {} ){
    this._keyspace = keyspace

    // We need an array of hosts to connect to, defualt to localhost
    this.hosts = options.hosts
    if (!this.hosts) this.hosts = [ '127.0.0.1' ]
    
    this.replication_stategy = 
      options.replication_stategy || this.constructor.default_replication_stategy

    this.replication_factor = 
      options.replication_factor || this.constructor.default_replication_factor
    
    this.model_store = 
      options.model_store || ModelStore.default_store
    this.debug('client using model store', this.model_store.label)

    this.localDataCenter = 
      options.localDataCenter || 'datacenter1'

    this.sync_models = ( has(options, 'sync') )
      ? Boolean(options.sync)
      : true

    this.setupClient()

    if ( ! this.constructor.default_client ) this.constructor.default_client = this
  }

  /** The Cassandra driver client
  * @type {CassandraDriver.Client}
  */
  get client(){ return this._client }

  /** The default keyspace
  * @type {String}
  */
  get keyspace(){ return this._keyspace }

  /** 
  * The model store for this client to lookup models with
  * Defaults to `Model.model_store`
  * @type {ModelStore}
  */
  get model_store(){ return this._model_store }
  set model_store(store){ 
    if ( store instanceof ModelStore === false ) {
      throw new CassException('Client requires an instance of ModelStore for `model_store`')
    }
    return this._model_store = store
  }

  /** The model store for this client to lookup models */
  get sync_models(){ return this._sync_models }
  set sync_models(val){ return this._sync_models = Boolean(val) }

  setupClient(){
    this._client = new cassandra.Client({
      contactPoints: this.hosts, //array of hosts to connect to 
      // keyspace: this.keyspace || this.constructor.default_keyspace,
      localDataCenter: this.localDataCenter,
    })
    /* istanbul ignore next */
    this._client.on('hostUp', host => {
      this.debug('hostUp', host) 
    })
    /* istanbul ignore next */
    this._client.on('hostDown', host => {
      this.debug('hostDown', host)
    })
    /* istanbul ignore next */
    this._client.on('hostAdd', host => {
      this.debug('hostAdd', host)
    })
    /* istanbul ignore next */
    this._client.on('hostRemove', host => {
      this.debug('hostRemove', host)
    })
  }

  /**
  * Connect to the cassandra db
  * @async
  * @returns {Array} Connect, Create and optional Sync elements
  */
  async connect(){
    await this.client.connect()
    await this.keyspaceCreate()
    if ( this._sync_models ) {
      let sync = await this.sync()
      this.debug('connect sync rows undef: ', sync.rows)
    }
    return this
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
  * Synchronise all models to the default keyspace
  * @async
  * @returns {ResultSet}          Result of query
  */
  async sync(){
    return this.model_store.sync()
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
  * @returns {ResultSet}      Cassandra ResultSet
  */
  async insert( table, values, options ){
    let query = Query.insert(table, values, options)
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
  * @returns {ResultSet}           Cassandra ResultSet
  */
  async select( table, columns, where, options){
    let query = Query.select(table, columns, where, options)
    return this.query(query, options)
  }

  /**
  * @summary Run an update query
  * @description Execute a...
  * @async
  * @param {String} table         - Name of the table to insert to
  * @param {Object} values        - `field: value` pairs to update
  * @param {Object} where         - Where clause to use
  * @param {Object} options       - Cassandra query options
  * @returns {ResultSet}          Cassandra ResultSet
  */
  async update( table, values, where, options ){
    let query = Query.update(table, values, where, options)
    return this.query(query, options)
  }

  /**
  * @summary Run an delete query
  * @description Execute a...
  * @async
  * @param {String} table         - Name of the table to insert to
  * @param {Object} where         - Where clause to use
  * @param {Object} options       - Cassandra query options
  * @returns {ResultSet}          Cassandra ResultSet
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