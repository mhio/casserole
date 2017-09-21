/* global expect */
import Client from '../../src/Client'

describe('unit::mh::casserole::Client', function(){

  it('should have a debug', function(){
    expect(Client.debug).to.be.a('function')
  })

  it('shuld have a default keyspace', function () {
    expect(Client.default_keyspace).to.be.a('string')
  })

  it('shuld have a default replication stategy', function () {
    expect(Client.default_replication_stategy).to.equal('SimpleStrategy')
  })

  it('shuld have a default replication factor', function () {
    expect(Client.default_replication_factor).to.equal(1)
  })

  it('should have an execute function', function () { 
    expect(Client.prototype.execute).to.be.a('function')
  })
  
})