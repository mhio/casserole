/* global expect, chai */
const debug = require('debug')('mhio:test:int:casserole:Model')
chai.should()

import Client from '../../src/Client'
import Schema from '../../src/Schema'
import Model from '../../src/Model'
import ModelStore from '../../src/ModelStore'


describe('int::mh::casserole::Model', function(){

  let client, schema, TestModel, testmodel

  let simple_schema = { id: { type:'int', primary: true }}

  before('connect', async function(){
    client = new Client('casserole_int_test', { sync: false })
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

  after('cleanup', function(){
    this.timeout(4000) // docker :/
    return client.keyspaceDrop()
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })


  /** Tests */

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

  it('should findOne on the Model', async function(){
    let res = await TestModel.findOne({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.field1).to.eql('mytest2')
    expect(res.field2.toString()).to.eql('33334444-1234-1234-1234-123423141234')
  })

  it('should update on the Model', async function(){
    let res = await TestModel.update(
      { field1: 'updated!' },
      { field2: '33334444-1234-1234-1234-123423141234'
    })
    expect(res).to.be.ok
    res = await TestModel.find({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res[0].field1).to.eql('updated!')
  })

  it('should update on execSave', async function(){
    let res = await TestModel.findOne(
      { field2: '33334444-1234-1234-1234-123423141234'
    })
    expect(res).to.be.ok
    expect(res.field1).to.equal('updated!')
    res.field1 = 'updated on execSave'
    let save = await res.execSave()
    expect(save).to.be.ok
    expect(save.rows).to.be.undefined
    
    let check = await TestModel.findOne(
      { field2: '33334444-1234-1234-1234-123423141234'
    })
    expect(check.field1).to.eql('updated on execSave')
  })

  it('should delete on the Model', async function(){
    let res = await TestModel.delete({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.rows).to.eql(undefined)
    res = await TestModel.find({ field2: '33334444-1234-1234-1234-123423141234' })
    expect(res.rows).to.equal(undefined)
  })

  describe('client model store', function(){
    
    let store, cli

    before(function(){
      store = new ModelStore('things')
      cli = new Client('casserole_int_test', { model_store: store })
    })

    after(function(){
      cli.disconnect()
    })

    it('should get the default store', function(){
      let Person = Model.generate('Person', simple_schema)
      expect( Person.model_store ).to.equal( ModelStore.default_store )
    })

    it('should not add a dodgy model store', function(){
      let fn = ()=> Model.generate('BadThing', simple_schema, { model_store: {} })
      expect( fn ).to.throw(/must be an instance of ModelStore/)
    })

    it('should retrive a model store from the new Model', function(){
      let store = new ModelStore('retrieve')
      let BadThing = Model.generate('BadThing', simple_schema, { model_store: store })
      expect( BadThing.model_store ).to.equal(store)
    })

    it('should sync a new model on a new client in a new store', async function(){
      let StoreThing = Model.generate(
        'StoreThing',
        { id: { type: 'int', primary: true }, name: 'string' },
        { model_store: store, client: cli }
      )
      let res = await cli.connect()
      debug('cli connect res', res.hosts, res._keyspace)
      expect(res).to.be.ok
      let tables = await cli.execute(
        'SELECT * FROM system_schema.tables WHERE keyspace_name = ?;', 
        ['casserole_int_test']
      )
      expect(tables.rows).to.have.length(2)
      expect(tables.rows[0].table_name).to.eql('store_things')
    })

  })
})