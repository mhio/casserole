/* global expect */
import Client from '../../src/Client'
import CassTable from '../../src/CassTable'

const debug = require('debug')('mh:test:int:casserole:CassTable')


describe('int::mh::casserole::CassTable', function(){

  let client

  before('connect', function(){
    client = new Client('casserole_int_test')
    return client.keyspaceCreate()
  })

  after('client', function(){
    this.timeout(4000) // docker :/
    return client.keyspaceDrop()
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })

  it('should create a table', function(){
    let query = CassTable.toCqlCreate('casserole_int_test.whatever', {
      one: { name: 'one', type: 'int' },
      two: { name: 'two', type: 'uuid' },
    }, [ 'one' ])
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should drop the table', function(){
    let query = CassTable.toCqlDrop('casserole_int_test.whatever')
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

})