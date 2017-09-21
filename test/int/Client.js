/* global expect */
import Client from '../../src/Client'

describe('int::mh::casserole::Client', function(){

  let client

  before(function () {
    client = new Client('casserole_int_test')
  })

  it('should query', function(){
    return client.connect().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should drop the keyspace', function () {
    this.timeout(5000) // docker :/
    return client.keyspaceDrop().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

})