/* global expect */
import CassType from '../../src/CassType'

describe('unit::mh::casserole::CassType', function(){

  it('should have some stuff', function(){
    expect( CassType.create_exists_cql ).to.be.equal('IF NOT EXISTS')
    expect( CassType.drop_exists_cql ).to.be.equal('IF EXISTS')
  })

  describe('static', function(){
    
    it('should throw on .toCqlDrop', function(){
      expect( CassType.toCqlDrop('mytype') ).to.equal('DROP TYPE "mytype";')
    })

    it('should throw on .toCqlDrop', function(){
      expect( CassType.toCqlDrop('mytype', { exists: true }) ).to.equal('DROP TYPE IF EXISTS "mytype";')
    })

    it('should throw on .toCqlDrop', function(){
      expect( CassType.toCqlDrop('mytype', { keyspace: 'wat' }) ).to.equal('DROP TYPE wat."mytype";')
    })


    it('should throw on .toCqlAlter', function(){
      expect( ()=> CassType.toCqlAlter(true) ).to.throw('No TYPE alter available')
    })

    it('should throw on .toCqlCreate', function(){
      expect( ()=> CassType.toCqlCreate() ).to.throw('Name required to create type')
    })

    it('should throw on .toCqlCreate', function(){
      expect( ()=> CassType.toCqlCreate('wakka') ).to.throw('Fields required to create type')
    })
      
    it('should dump create cql for a type short definition', function(){
      expect( CassType.toCqlCreate('wakka', { field: 'type' }) ).to.equal('CREATE TYPE "wakka" ( field type );')
    })

    it('should dump create if no exists cql for a type', function(){
      expect( CassType.toCqlCreate('wakka', { field: 'type' }, { exists: true }) ).to.equal('CREATE TYPE IF NOT EXISTS "wakka" ( field type );')
    })

    it('should dump create if no exists cql for a type', function(){
      let create_cql = CassType.toCqlCreate('wakka', { field: 'type' }, { keyspace: 'wat' })
      expect( create_cql ).to.equal('CREATE TYPE wat."wakka" ( field type );')
    })

    it('should dump cql for a type complete definition', function(){
      expect( CassType.toCqlCreate('wakka', { field: { name: 'afield', type: 'string' } }) ).to.equal('CREATE TYPE "wakka" ( afield string );')
    })

    it('should dump cql for a type midi definition', function(){
      expect( CassType.toCqlCreate('wakka', { afield: { type: 'string' } }) ).to.equal('CREATE TYPE "wakka" ( afield string );')
    })

    it('should dump cql for a type array definition', function(){
      let create_cql = CassType.toCqlCreate('wakka', [{ name: 'afield', type: 'string' }])
      expect( create_cql ).to.equal('CREATE TYPE "wakka" ( afield string );')
    })

  })

  describe('#instance', function(){

    let cql

    beforeEach(function(){
      cql = new CassType('a', {atest: 'ascii', other: 'text'})
    })

    it('should create drop cql', function(){
      expect( cql.toCqlDrop() ).to.equal('DROP TYPE "a";')
    })

    it('should throw on .toCqlAlter', function(){
      expect( ()=> cql.toCqlAlter() ).to.throw('No TYPE alter available')
    })

    it('should dump a create cql', function(){
      expect( cql.toCqlCreate() ).to.equal('CREATE TYPE "a" ( atest ascii, other text );')
    })
  
    it('should add a new field', function(){
      cql.addField('bfield', 'int')
      expect( cql.toCqlCreate() ).to.equal('CREATE TYPE "a" ( atest ascii, other text, bfield int );')
    })

    it('should fail to add an unkown field type', function(){
      let fn = ()=> cql.addField('bfield', 'intasdf')
      expect( fn ).to.throw(/No cassandra datatype "intasdf" available/)
    })

    it('should creat an instance without fields', function(){
      expect( new CassType('a') ).to.be.ok
    })
    
  })
  
})