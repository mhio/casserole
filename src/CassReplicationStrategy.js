import assign from 'lodash/assign'
import isEmpty from 'lodash/isEmpty'
import isInteger from 'lodash/isInteger'
import isPlainObject from 'lodash/isPlainObject'

import {CassException} from './CassExceptions'
import CassMap from './CassMap'


/**
 *  @summary Setup replication strategies
 *  @description 
 *    - [Architecture](https://cassandra.apache.org/doc/latest/architecture/dynamo.html#replication-strategy)
 *    - [Alerting replication strategy](https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsChangeKSStrategy.html)
  * @extends CassMap
 */
class CassReplicationStrategy extends CassMap {

  static classInit(){
    this.debugInit('mhio:casserole:CassReplicationStrategy')
    this.replication_strategies = [ 'SimpleStrategy', 'NetworkTopologyStrategy' ]
  }

  // Create a Simple strategy
  static simple( replication_factor = 3 ){
    if ( !isInteger(replication_factor) ){
      throw new CassException('SimpleStrategy needs an integer replication_factor')
    }
    return new this('SimpleStrategy', { replication_factor: replication_factor })
  }

  // Create a NetworkTopologyStrategy strategy
  static networkTopology( dcs ){
    if( isEmpty(dcs) || !isPlainObject(dcs) ){
      throw new CassException(
        'NetworkTopologyStrategy needs an object containing data center replication factors',
        { label: 'ReplicationStrategy', details: dcs }
      )
    }

    return new this('NetworkTopologyStrategy', dcs)
  }

  /** 
  * new CassReplicationStrategy
  * @param {String} replication_class - The replication class name to create
  * @param {Object} data              - The configuration data for the class
  */
  constructor( replication_class, data = {} ){
    super()
    this._data = {}
    if ( isPlainObject(replication_class) ){
      this._data = replication_class
      this.class = replication_class.class
    } else {
      this.class = replication_class  
      assign(this._data, data)
    }
  }

  // This is annoying as the user might expect `strat.dc = 1` to work the same way :/
  set class( value ){
    if ( !this.constructor.replication_strategies.includes(value) ){
      throw new CassException(
        `Replication Strategy class must be one of [${this.constructor.replication_strategies}]". Got ${value}`,
        { detail: {value: value} }
      )
    }
    return this._data.class = value
  }

  get class(){
    return this._data.class
  }


}
CassReplicationStrategy.classInit()

export default CassReplicationStrategy
