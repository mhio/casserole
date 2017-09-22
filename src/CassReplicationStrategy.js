import assign from 'lodash/assign'
import isEmpty from 'lodash/isEmpty'
import isInteger from 'lodash/isInteger'
import isPlainObject from 'lodash/isPlainObject'

import CassError from './CassError'
import CassMap from './CassMap'

/*
  https://cassandra.apache.org/doc/latest/architecture/dynamo.html#replication-strategy
  https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsChangeKSStrategy.html
*/

export default class CassReplicationStrategy extends CassMap {

  static classInit(){
    this.debugInit('mh:casserole:CassReplicationStrategy')
    this.replication_strategies = [ 'SimpleStrategy', 'NetworkTopologyStrategy' ]
  }

  static simple(replication_factor = 3){
    if (!isInteger(replication_factor)) {
      throw new CassError('SimpleStrategy needs an integer replication_factor')
    }
    return new this('SimpleStrategy', replication_factor)
  }

  static networkTopology( dcs ){
    if (isEmpty(dcs) || !isPlainObject(dcs)) {
      throw new CassError('NetworkTopologyStrategy needs an object of data center replication factors')
    }
    return new this('NetworkTopologyStrategy', dcs)
  }

  constructor( replication_class, data = {} ){
    super()
    this._data = {}
    if (!this.replication_strategies.includes('replication_class') ) {
      throw new CassError(
        `Replication Strategy class much be one of ${this.replication_strategies}. Got ${replication_class}`
      )
    }
    assign(this._data, data)
  }


}
CassReplicationStrategy.classInit()