/* global expect */
import CassType from '../../src/CassType'

describe('unit::mh::casserole::CassType', function(){

  it('should have some stuff', function(){
    expect( CassType.create_exists_cql ).to.be.equal('IF NOT EXISTS')
    expect( CassType.drop_exists_cql ).to.be.equal('IF EXISTS')
  })

  it('should throw on .toCqlDrop', function () {
    expect( CassType.toCqlDrop('mytype') ).to.equal('DROP TYPE "mytype";')
  })

  it('should throw on .toCqlAlter', function () {
    expect( ()=> CassType.toCqlAlter(true) ).to.throw('No TYPE alter available')
  })

  it('should throw on .toCqlCreate', function () {
    expect( ()=> CassType.toCqlCreate('wakka') ).to.throw('Fields required to create type')
  })
    
  it('should dump cql for a type', function () {
    expect( CassType.toCqlCreate('wakka', { field: 'type' }) ).to.equal('CREATE TYPE "wakka" ( field type );')
  })

  describe('#instance', function () {

    let cql

    beforeEach(function () {
      cql = new CassType('a', {atest: 'ascii', other: 'text'})
    })

    it('should create drop cql', function () {
      expect( cql.toCqlDrop() ).to.equal('DROP TYPE "a";')
    })

    it('should throw on .toCqlAlter', function () {
      expect( ()=> cql.toCqlAlter() ).to.throw('No TYPE alter available')
    })

    it('should dump a create cql', function () {
      expect( cql.toCqlCreate() ).to.equal('CREATE TYPE "a" ( atest ascii, other text );')
    })
  

  })
  
})