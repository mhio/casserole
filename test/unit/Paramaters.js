/* global expect */
import Paramaters from '../../src/Paramaters'

describe('unit::mh::casserole::Paramaters', function(){

  describe('static properties', function(){
    
    it('should have types', function(){
      expect( Paramaters.types ).to.be.an('object')
    })

    it('should have fmt_identifier_str', function(){
      expect( Paramaters.fmt_identifier_str ).to.be.a('string')
    })

    it('should have types', function(){
      expect( Paramaters.fmt_identifier_re.exec('test') ).to.be.ok
    })
    
    it('should have types', function(){
      expect( Paramaters.fmt_identifier_all_re.exec('test') ).to.be.ok
    })

  })


  describe('.checkType', function(){

    it('should be able to check a bad type', function(){
      expect( ()=> Paramaters.checkType('bad') ).to.throw(/No cassandra type/)
    })

    it('should be able to check a bad type', function(){
      expect( ()=> Paramaters.checkType(undefined) ).to.throw(/Cassandra types can on be supplied as strings/)
    })

    it('should be able to check a bad type', function(){
      expect( Paramaters.checkType('int') ).to.equal('int')
    })

  })


})