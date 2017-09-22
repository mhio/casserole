/* global expect */
import Client from '../../src/Client'
import some from 'lodash/some'


describe('int::mh::casserole::Client', function(){

  let client

  before(function () {
    client = new Client('casserole_int_test')
  })

  it('should connect and init keyspace', function(){
    return client.connect().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  it('should have a keyspace "casserole_int_test"', function(){
    return client.execute('SELECT * FROM system_schema.keyspaces;').then(res => {
      expect( res.rows ).to.be.an('array')
      expect( some(res.rows, { keyspace_name: 'casserole_int_test' } ) ).to.be.true
    })
  })

  it('should have a keyspace "casserole_int_test"', function(){
    return client.execute('SELECT * FROM system_schema.keyspaces WHERE keyspace_name = ?;', ['casserole_int_test']).then(res => {
      expect( res.rows ).to.be.an('array')
      expect( res.rows ).to.have.length(1)
      expect( res.rows[0].keyspace_name ).to.equal( 'casserole_int_test')
    })
  })

  it('should have a keyspace "casserole_int_test"', function(){
    return client.execute('SELECT * FROM system_schema.keyspaces WHERE keyspace_name = ?;', ['casserole_int_test']).then(res => {
      const row = res.first()
      expect( row ).to.have.property('durable_writes').and.to.be.true
      expect( row ).to.have.property('keyspace_name').and.to.equal('casserole_int_test')
      expect( row ).to.have.property('replication')
      expect( row.replication.class ).to.match(/SimpleStrategy/)
      expect( row.replication.replication_factor ).to.equal('1')
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