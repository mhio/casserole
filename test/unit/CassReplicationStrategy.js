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

  })

  describe('#NetworkTopology', function () {

    it('should create a NetworkTopology strategy', function () {
      expect( CassReplicationStrategy.networkTopology({what: 1, other: 2}) ).to.be.ok
    })

    it('should create a NetworkTopology strategy', function () {
      expect( ()=> CassReplicationStrategy.networkTopology() ).to.throw(/needs/)
    })

  })

})