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
  
  it('should create a client with a default host', function () { 
    expect(new Client().hosts).to.eql([ '127.0.0.1' ])
  })

  it('should create a client with different host', function () { 
    expect(new Client('akeyspace', {hosts: ['10.1.1.1']}).hosts).to.eql([ '10.1.1.1' ])
  })

  it('should fail to run a non query', function () {
    let client = new Client()
    return client.query({}).should.be.rejectedWith(/Client query requires a Query object/)
  })

})