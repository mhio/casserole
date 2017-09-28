/* global expect */
import Schema from '../../src/Schema'

describe('unit::mh::casserole::Schema', function(){

  it('should create a new Schema', function(){
    expect( new Schema({}) ).to.be.ok
  })

  it('should fail to create an empty Schema', function(){
    expect( ()=> new Schema() ).to.throw(/needs/)
  })

  it('should create a new Model', function(){
    let schema = new Schema({
      field1: { type: 'string'},
      field2: { type: 'uuid'},
      field3: { type: 'int'},
      field4: { type: 'decimal'},
      field5: { type: 'datetime'},
    })
    expect( schema ).to.be.ok
  })

})