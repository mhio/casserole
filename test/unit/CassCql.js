/* global expect */
import CassCql from '../../src/CassCql'

describe('unit::mh::casserole::CassCql', function(){

  it('should have some stuff', function(){
    expect( CassCql.template ).to.be.a('function')
    expect( CassCql.valueToCqlMap ).to.be.a('function')
  })

  describe('#instance', function () {

    let cql

    beforeEach(function () {
      cql = new CassCql({test: true, other: 'what'})
    })

  })
  
})