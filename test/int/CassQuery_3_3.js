/* global chai expect */
import Client from '../../src/Client'
import Query from '../../src/CassQuery_3_3'
chai.should()

const debug = require('debug')('mhio:test:int:casserole:CassQuery_3_3')


describe('int::mh::casserole::CassQuery_3_3', function(){

  let client

  before('connect', function(){
    client = new Client('casserole_int_test')
    return client.keyspaceCreate()
  })

  before('setup', function(){
    return client.execute(
      'CREATE TABLE IF NOT EXISTS test_models ( field1 ascii, field2 uuid, PRIMARY KEY (field2) )'
    )
  })

  after('cleanup', function(){
    this.timeout(4000) // docker :/
    return client.keyspaceDrop()
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })


  it('should run a simple select for nothing', function(){
    let q = Query.select('test_models', ['field1'])
    return client.query(q).then(res =>{
      expect( res.rowLength ).to.eql(0)
      expect( res.rows ).to.eql([])
    })
  })

  it('should run a simple insert for nothing', function(){
    let q = Query.insert('test_models', { field1: '2', field2: '12341234-1234-1234-1234-123412341234' })
    return client.query(q).then(res =>{
      expect( res.rowLength ).to.be.undefined
      expect( res.rows ).to.be.undefined
    })
  })

  it('should run a simple select for new insert', function(){
    let q = Query.select('test_models', [ 'field1', 'field2' ])
    return client.query(q).then(res =>{
      expect( res.rowLength ).to.equal(1)
      expect( res.rows[0].field1 ).to.eql('2')
      expect( res.rows[0].field2.toString() ).to.eql('12341234-1234-1234-1234-123412341234')
    })
  })

  xit('should run a simple insert for and convert Numbers to text', async function(){
    let qi = Query.insert('test_models', { field1: 2, field2: '23452345-2345-2345-2345-234523452345' })
    let insert = await client.query(qi)
    expect( insert.rowLength ).to.be.undefined
    expect( insert.rows ).to.be.undefined

    let where = { field2: '23452345-2345-2345-2345-234523452345' }
    let qs = Query.select('test_models', [ 'field1', 'field2' ], where)
    let res = await client.query(qs)
    expect( res.rowLength ).to.equal(1)
    expect( res.rows[0].field1 ).to.eql('2')
    expect( res.rows[0].field2.toString() ).to.eql('12341234-1234-1234-1234-123412341234')
  })

})