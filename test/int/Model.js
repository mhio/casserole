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
    expect( testmodel.field2 ).to.equal('12341234-1234-1234-1234-123423141234')
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

  it('should remove the saved TestModel', async function(){
    let res = await testmodel.execRemove()
    expect(res.rows).to.eql(undefined)
  })


  it('should create on the Model', async function(){
    let res = await TestModel.create({ field1: 'mytest1', field2: '22223333-1234-1234-1234-123423141234' })
    expect(res.rows).to.eql(undefined)
  })

  it('should insert on the Model', async function(){
    let res = await TestModel.insert({ field1: 'mytest2', field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.rows).to.eql(undefined)
  })

  it('should select on the Model', async function(){
    let res = await TestModel.select({ field2: '22223333-1234-1234-1234-123423141234' })
    expect(res[0].field1).to.eql('mytest1')
    expect(res[0].field2.toString()).to.eql('22223333-1234-1234-1234-123423141234')
  })

  it('should find on the Model', async function(){
    let res = await TestModel.find({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res[0].field1).to.eql('mytest2')
    expect(res[0].field2.toString()).to.eql('33334444-1234-1234-1234-123423141234')
  })

  it('should update on the Model', async function(){
    let res = await TestModel.update({ field2: '33334444-1234-1234-1234-123423141234' }, { field1: 'updated!' })
    expect(res).to.be.ok
    res = await TestModel.find({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res[0].field1).to.eql('updated!')
  })

  it('should delete on the Model', async function(){
    let res = await TestModel.delete({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.rows).to.eql(undefined)
    res = await TestModel.find({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.rows).to.equal(undefined)
  })

})