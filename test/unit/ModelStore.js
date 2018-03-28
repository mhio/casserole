/* global expect */
import debugr from 'debug'
import ModelStore from '../../src/ModelStore'
const debug = debugr('mhio:test:unit:casserole:ModelStore')

describe('unit::mh::casserole::ModelStore', function(){

  it('should create an instance of ModelStore', function () {
    let ms = new ModelStore('ms')
    expect( ms ).to.be.an.instanceof(ModelStore)
  })

  it('should add a model instance to the store', function () {
    debug('yep')
    let ms = new ModelStore('ms')
    expect( ms.add({ name: 'test' }) ).to.be.ok
  })

  it('should not create a ModelStore without a label', function () {
    expect( ()=> new ModelStore() ).to.throw(/requires a label/)
  })

  it('should not set a bad default store', function () {
    expect( ()=> ModelStore.default_store = {} ).to.throw(/must be an instance of ModelStore/)
  })

  it('should get a model instance to the store', function () {
    let ms = new ModelStore('get')
    let model = { name: 'test' }
    expect( ms.add(model) ).to.be.ok
    expect( ms.get('test') ).to.equal( model )
  })

  it('should add models on instance creation', function () {
    let models = [ { name: 'test1' }, { name: 'test2' }]
    let ms = new ModelStore('many', { models: models })
    expect( ms.get('test1') ).to.equal( models[0] )
    expect( ms.get('test2') ).to.equal( models[1] )
  })

})