/* global expect */
import CassEntity from '../../src/CassEntity'

describe('unit::mh::casserole::CassEntity', function(){

  it('should have some stuff', function(){
    expect( CassEntity.create_exists_cql ).to.be.equal('IF NOT EXISTS')
    expect( CassEntity.drop_exists_cql ).to.be.equal('IF EXISTS')
  })

  it('should throw on .toCqlDrop', function () {
    expect( ()=> CassEntity.toCqlDrop(true) ).to.throw('Not implemented in child class')
  })

  it('should throw on .toCqlAlter', function () {
    expect( ()=> CassEntity.toCqlAlter(true) ).to.throw('Not implemented in child class')
  })

  it('should throw on .toCqlCreate', function () {
    expect( ()=> CassEntity.toCqlCreate(true) ).to.throw('Not implemented in child class')
  })
    
  describe('#instance', function () {

    let cql

    beforeEach(function () {
      cql = new CassEntity({test: true, other: 'what'})
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