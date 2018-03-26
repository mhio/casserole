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
    let options = { keyspace: 'casserole_int_test' }
    let query = CassTable.toCqlCreate('opt_keyspace', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should fail to create a table with only `order` as an option', function(){
    let options = { order: 'DESC' }
    let fn = ()=> CassTable.toCqlCreate('opt_order', standard_fields, standard_keys, options)
    return expect( fn ).to.throw(/CLUSTER ORDER requires an ORDER BY field/)
  })

  xit('should create a table with `CLUSTER ORDER BY` as an option', function(){
    let options = { order: 'DESC', order_by: 'two' }
    let query = CassTable.toCqlCreate('opt_order', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `ID` as an option', function(){
    let options = { id: '5a5a5a5a-b41f-11e5-9f22-ba0be0483c18' }
    let query = CassTable.toCqlCreate('opt_id', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with `ID` as an option', function(){
    let options = { compact: true }
    let query = CassTable.toCqlCreate('opt_compact', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should create a table with generic options', function(){
    let options = { compaction: { 
      'class' : 'SizeTieredCompactionStrategy',
      'bucket_low' : 0.4,
    }}
    let query = CassTable.toCqlCreate('opt_generic', standard_fields, standard_keys, options)
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should fail to alter for the moment', function(){
    let fn = ()=> CassTable.toCqlAlter('casserole_int_test.whatever')
    expect( fn ).to.throw(/nope/)
  })

  it('should drop the table', function(){
    let query = CassTable.toCqlDrop('casserole_int_test.whatever')
    return client.execute(query).then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

})