/* global expect, chai */
const debug = require('debug')('mhio:test:int:casserole:Model')
chai.should()

import Client from '../../src/Client'
import Schema from '../../src/Schema'
import Model from '../../src/Model'


describe('int::mh::casserole::Model', function(){

  let client, schema, TestModel, testmodel

  before('connect', async function(){
    client = new Client('casserole_int_test')
    await client.connect()
  })

  before('setup', async function(){
    schema = new Schema({
      field1: { type: 'ascii'},
      field2: { type: 'uuid', primary: true },
    })
    TestModel = Model.generate('TestModel', schema, {client: client})
    await TestModel.sync()
    testmodel = new TestModel({
      field1: 'test', 
      field2: '12341234-1234-1234-1234-123423141234'
    })
    expect( testmodel.field1 ).to.equal('test')
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })

  it('should save a new TestModel', function(){
    return testmodel.execSave()
      .should.eventually.be.ok
  })

  it('should find the saved TestModel', async function(){
    let res = await TestModel.find({ field2: '12341234-1234-1234-1234-123423141234' })
    expect( res ).to.be.an('array')
    expect( res ).to.have.length(1)
    let o = res[0].toJSON()
    expect( o.field1 ).to.equal('test') 
    expect( o.field2.toString() ).to.equal('12341234-1234-1234-1234-123423141234')
  })

})