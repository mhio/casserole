/* global expect */
import Client from '../../src/Client'

describe('int::mh::casserole::Client', function(){

  it('should query', function(){
    return Client.connect().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should drop the keyspace', function () {
    return Client.keyspaceDrop().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

})