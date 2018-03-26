/* global expect */
import debugr from 'debug'
import Schema from '../../src/Schema'
import Model from '../../src/Model'
const debug = debugr('mhio:test:unit:casserole:Model')

describe('unit::mh::casserole::Model', function(){

  let plain_schema = {
    field1: { type: 'ascii'},
    field2: { type: 'uuid', primary: true },
  }

  it('should turn a model instance into JSON values', function () {
    let a = new Model({test: 'one'})
    expect( a.toJSON() ).to.eql({test: 'one'})
  })

  it('should create a new Model', function(){
    let schema = new Schema(plain_schema)
    let TestModel = Model.generate('TestModel', schema)
    expect( TestModel ).to.be.ok
    debug(TestModel)
    let testmodel = new TestModel({
      field1: 'test', 
      field2: '12341234-1234-1234-1234-123423141234'
    })
    expect( testmodel ).to.be.ok
    debug(testmodel)
    expect( testmodel.field1 ).to.equal('test')
    expect( testmodel.field2 ).to.equal('12341234-1234-1234-1234-123423141234')
    testmodel.field1 = 'new value'
    expect( testmodel.field1 ).to.equal('new value')
  })

  it('should create a Model from object schema', function(){
    expect( Model.generate('TestModel', plain_schema) ).to.be.ok
  })

  it('should fail with a dodgy client', function(){
    let fn = ()=> Model.generate('TestModel', plain_schema, { client: {} })
    expect( fn ).to.throw(/A Client instance must be attached/)
  })

})