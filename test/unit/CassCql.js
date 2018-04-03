/* global expect */
import CassCql from '../../src/CassCql'

describe('unit::mh::casserole::CassCql', function(){

  it('should have some stuff', function(){
    expect( CassCql.template ).to.be.a('function')
    expect( CassCql.valueToCqlMap ).to.be.a('function')
  })

  it('should have a debug instance', function(){
    CassCql._debugInit('something')
    expect( CassCql.debug ).to.be.a('function')
  })

  it('should have a debug instance', function(){
    CassCql._debugInit('mhtest:someother')
    expect( CassCql.debugDisable() ).to.be.ok
  })

  it('should have a debug instance', function(){
    CassCql._debugInit('mhtest:someenable')
    expect( CassCql.debugEnable() ).to.be.ok
  })


  describe('#instance', function () {

    let cql

    beforeEach(function () {
      cql = new CassCql({test: true, other: 'what'})
    })

    it('should create a CassCql', function(){
      expect( cql ).to.be.ok
    })

    it('should create a CassCql', function(){
      expect( cql.debug ).to.be.ok
    })

  })
  
})