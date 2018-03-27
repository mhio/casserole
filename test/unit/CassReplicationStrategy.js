/* global expect */
import CassReplicationStrategy from '../../src/CassReplicationStrategy'

describe('unit::mh::casserole::CassReplicationStrategy', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassReplicationStrategy.debug ).to.be.a('function')
  })

  it('should fail to create an empty strategy', function () {
    expect( ()=> new CassReplicationStrategy() ).to.throw
  })

  describe('#Simple', function () {
    
    it('should create a Simple strategy', function () {
      expect( CassReplicationStrategy.simple(3) ).to.be.ok
    })

    it('should create a Simple strategy with default of 3', function () {
      expect( CassReplicationStrategy.simple()._data.replication_factor ).to.equal(3)
    })

    it('should create a Simple strategy with default of 3', function () {
      expect( CassReplicationStrategy.simple().toCqlMap() )
      .to.equal("{'class':'SimpleStrategy','replication_factor':3}")
    })

    it('should not create a Simple strategy with a bad replication factor', function () {
      expect( ()=> CassReplicationStrategy.simple('wat') ).to.throw(/integer/)
    })

    it('should get the class for a simple strategy', function () {
      expect( CassReplicationStrategy.simple(1).class ).to.equal('SimpleStrategy')
    })

    it('should fail to se a bad class', function () {
      let cr = CassReplicationStrategy.simple(1)
      let fn = ()=> cr.class = 'wahtever'
      expect( fn ).to.throw(/Replication Strategy class must be/)
    })

  })

  describe('#NetworkTopology', function () {

    it('should create a NetworkTopology strategy', function () {
      expect( CassReplicationStrategy.networkTopology({what: 1, other: 2}) ).to.be.ok
    })

    it('should not create a NetworkTopology strategy with bad values', function () {
      expect( ()=> CassReplicationStrategy.networkTopology() ).to.throw(/needs/)
    })

    it('should get the class for a simple strategy', function () {
      let cls = CassReplicationStrategy.networkTopology({what: 1, other: 2}).class
      expect( cls ).to.equal('NetworkTopologyStrategy')
    })

  })

})