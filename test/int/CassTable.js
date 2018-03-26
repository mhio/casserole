/* global expect */
import Client from '../../src/Client'
import CassTable from '../../src/CassTable'

const debug = require('debug')('mhio:test:int:casserole:CassTable')


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


  let standard_fields = {
    one: { name: 'one', type: 'int' },
    two: { name: 'two', type: 'uuid' },
  }
  let standard_keys = [ 'one' ]

  it('should create a table', function(){
    let query = CassTable.toCqlCreate('casserole_int_test.whatever', standard_fields, standard_keys)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `keyspace` as an option', function(){
    let options = { q_keyspace: 'casserole_int_test' }
    let query = CassTable.toCqlCreate('opt_keyspace', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `order` as an option', function(){
    let options = { q_order: 'DESC' }
    let query = CassTable.toCqlCreate('opt_order', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  xit('should create a table with `CLUSTER ORDER BY` as an option', function(){
    let options = { q_order: 'DESC', q_order_by: 'two' }
    let query = CassTable.toCqlCreate('opt_order', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `ID` as an option', function(){
    let options = { q_id: '5a5a5a5a-b41f-11e5-9f22-ba0be0483c18' }
    let query = CassTable.toCqlCreate('opt_id', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `ID` as an option', function(){
    let options = { q_compact: true }
    let query = CassTable.toCqlCreate('opt_compact', standard_fields, standard_keys, options)
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