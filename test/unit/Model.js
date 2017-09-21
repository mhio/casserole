/* global expect */
import Model from '../../src/Model'

describe('unit::mh::casserole::Model', function(){

  it('should wat', function(){
    return Model.wat().then(res => expect( res ).to.be.true)
  })

  it('should delay wat', function(){
    return Model.wat().delay(50).then(res => expect( res ).to.be.true)
  })

  it('should turn a model instance into JSON values', function () {
    let a = new Model({test: 'one'})
    expect( a.toJSON() ).to.eql({test: 'one'})
  })

})