/* global expect */
import CassCql from '../../src/CassCql'

describe('unit::mh::casserole::CassCql', function(){

  it('should have some stuff', function(){
    expect( CassCql.template ).to.be.a('function')
    expect( CassCql.valueToCqlMap ).to.be.a('function')
    expect( CassCql.create_exists_cql ).to.be.equal('IF NOT EXISTS')
    expect( CassCql.drop_exists_cql ).to.be.equal('IF EXISTS')
  })

  it('should throw on .toCqlDrop', function () {
    expect( ()=> CassCql.toCqlDrop(true) ).to.throw('Not implemented in child class')
  })

  it('should throw on .toCqlAlter', function () {
    expect( ()=> CassCql.toCqlAlter(true) ).to.throw('Not implemented in child class')
  })

  it('should throw on .toCqlCreate', function () {
    expect( ()=> CassCql.toCqlCreate(true) ).to.throw('Not implemented in child class')
  })
    
  describe('#instance', function () {

    let cql

    beforeEach(function () {
      cql = new CassCql({test: true, other: 'what'})
    })

    it('should throw on .toCqlDrop', function () {
      expect( ()=> cql.toCqlDrop(true) ).to.throw('Not implemented in child class')
    })

    it('should throw on .toCqlAlter', function () {
      expect( ()=> cql.toCqlAlter(true) ).to.throw('Not implemented in child class')
    })

    it('should throw on .toCqlCreate', function () {
      expect( ()=> cql.toCqlCreate(true) ).to.throw('Not implemented in child class')
    })
  
  })
  
})