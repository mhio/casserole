/* global expect */
import debugr from 'debug'
import ModelStore from '../../src/ModelStore'
const debug = debugr('mhio:test:unit:casserole:ModelStore')

describe('unit::mh::casserole::ModelStore', function(){

  let plain_schema = {
    field1: { type: 'ascii'},
    field2: { type: 'uuid', primary: true },
  }

  it('should turn a model instance into JSON values', function () {
    let ms = new ModelStore()
    expect( ms ).to.be.an.instanceof(ModelStore)
  })

  it('should add a model instance to the store', function () {
    let ms = new ModelStore()
    expect( ms.add({ name: 'test' }) ).to.be.ok
  })

  it('should get a model instance to the store', function () {
    let ms = new ModelStore()
    let model = { name: 'test' }
    expect( ms.add(model) ).to.be.ok
    expect( ms.get('test') ).to.equal( model )
  })

})