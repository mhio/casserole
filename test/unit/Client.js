/* global expect */
import Client from '../../src/Client'

describe('unit::mh::casserole::Client', function(){

  it('should have a debug', function(){
    expect(Client.debug).to.be.a('function')
  })

  it('shuld have a keyspace', function () {
    expect(Client.keyspace).to.be.a('string')
  })

  it('should have an execute function', function () { 
    expect(Client.execute).to.be.a('function')
  })
  
})