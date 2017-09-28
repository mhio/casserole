/* global expect, chai */
import debugr from 'debug'
const debug = debugr('mh:test:int:casserole:Model')
chai.should()

import Client from '../../src/Client'
import Schema from '../../src/Schema'
import Model from '../../src/Model'


describe('int::mh::casserole::Model', function(){

  let client, schema, TestModel, testmodel

  before(async function () {
    client = new Client('casserole_int_test')
    await client.connect()
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

  it('should create a new Model', function(){
    return testmodel.execSave().should.eventually.eql({})
  })

})