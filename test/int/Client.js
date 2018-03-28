/* global expect */
import Client from '../../src/Client'
import some from 'lodash/some'

const debug = require('debug')('mhio:test:int:casserole:Client')


describe('int::mh::casserole::Client', function(){

  let client

  before('connect', function(){
    client = new Client('casserole_int_test', { sync: false })
  })

  after('client', function(){
    this.timeout(5000) // docker :/
    return client.keyspaceDrop().then(res => {
      expect( res ).to.be.ok
      expect( res.columns ).to.be.null
    })
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })


  it('should connect and init keyspace', function(){
    return client.connect().then(res => {
      expect( res ).to.equal(client)
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

  describe('crud', function(){
    
    it('should create a table: atable', function(){
      let columns = {
        one: {
          name: 'one',
          type: 'text'
        },
        two: {
          name: 'two',
          type: 'text',
        },
      }
      return client.createTable('atable', columns, ['one']).then(res => expect( res ).to.be.ok)
    })

    it('should insert data into atable', function(){
      return client.insert('atable', {one: 'first'}).then(res => expect( res ).to.be.ok)
    })

    it('should insert data into atable', function(){
      return client.insert('atable', {one: 'second', two: 'true'}).then(res => expect( res ).to.be.ok)
    })

    it('should select inserted data from atable', function(){
      return client.select('atable', ['one'], {one: 'first'}).then(res => {
        debug('rows', res.rows)
        expect( res.rows ).to.be.ok
        expect( res.rows[0] ).to.have.property( 'one' ).and.equal( 'first' )
      })
    })

    it('should select inserted data from atable', function(){
      return client.select('atable', ['one'], {one: 'second'}).then(res => {
        debug('rows', res.rows)
        expect( res.rows ).to.be.ok
        expect( res.rows[0] ).to.have.property( 'one' ).and.equal( 'second' )
      })
    })

    it('should update inserted data in atable', async function(){
      let res = await client.update('atable', { two: 'number two' }, {one: 'first'})
      expect( res.rows ).to.be.undefined
      expect( res.rowLength ).to.be.undefined
      let sel = await client.select('atable', ['two'], {one: 'first'})
      expect( sel.rows ).to.have.length(1)
      expect( sel.rows[0] ).to.have.property( 'two' ).and.equal( 'number two' )
    })

    it('should delete inserted data from atable', async function(){
      let res = await client.delete('atable', {one: 'first'})
      expect( res.rows ).to.be.undefined
      expect( res.rowLength ).to.be.undefined
    })

    it('should not select the deleted data from atable', async function(){
      let res = await client.select('atable', ['one'], {one: 'first'})
      expect( res.rows ).to.have.length(0)
    })

    it('should not select deleted atable after deletions', function(){
      return client.select('atable', ['one']).then(res => {
        expect( res.rows ).to.have.length(1)
      })
    })

  })

})