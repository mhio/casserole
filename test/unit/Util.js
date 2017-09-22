/* global expect */
import Util from '../../src/Util'

describe('unit::mh::casserole::Util', function(){

  let now_ts = Date.now()
  let now = new Date()
  let o = {
    a: 1,
    b: 2.1,
    c: now_ts,
    d: 'string',
    e: [ 1, 2, 3 ],
    f: {
      nested: 'test',
    },
    g: now,
  }

  describe('.valueToCqlMap', function () {
    
    it('should turn an bool true into cql', function(){
      expect( Util.valueToCqlMap(true) ).to.equal('\'true\'')
    })

    it('should turn an bool false into cql', function(){
      expect( Util.valueToCqlMap(false) ).to.equal('\'false\'')
    })

    it('should turn an integer into cql', function(){
      expect( Util.valueToCqlMap(o.a) ).to.equal(1)
    })

    it('should turn a number into cql', function(){
      expect( Util.valueToCqlMap(o.b) ).to.equal(2.1)
    })

    it('should turn a ts into cql', function(){
      expect( Util.valueToCqlMap(o.c) ).to.equal(now_ts)
    })

    it('should turn a string into cql', function(){
      expect( Util.valueToCqlMap(o.d) ).to.equal('\'string\'')
    })

    it('should turn a date into cql', function(){
      expect( Util.valueToCqlMap(now) ).to.equal(`'${now}'`)
    })

    it('should turn object into cql', function(){
      expect( Util.valueToCqlMap(o) ).to.equal(
        `{'a':1,'b':2.1,'c':${now_ts},'d':'string','e':[1,2,3],`+
        `'f':{'nested':'test'},'g':'${now}'}`
      )
    })

  })

  describe('.format', function () {

    it('should format a string with one arg', function () {
      expect( Util.format('te%sst', 'a') ).to.equal('teast')
    })

    it('should format a string with two args', function () {
      expect( Util.format('te%sst%s', 'a', 'b') ).to.equal('teastb')
    })

  })

  describe('.format2', function () {

    it('should format2 a empty string', function () {
      expect( Util.format2('') ).to.equal('')
    })

    it('should format2 a string with one arg', function () {
      expect( Util.format2('te%sst', 'a') ).to.equal('teast')
    })

    it('should format2 a string with two args', function () {
      expect( Util.format2('te%sst%s', 'a', 'b') ).to.equal('teastb')
    })

    it('should format2 a string with two args', function () {
      expect( Util.format2('te%sst%s %s', 'a', 'b') ).to.equal('teastb %s')
    })

    it('should format2 a string with two args', function () {
      expect( Util.format2('te%sst%%s %j %s', 'a', 'b') ).to.equal('teast%s %j b')
    })

    it('should fail format2 with not enough arguments', function () {
      let fn = ()=> Util.format2('te%sst%s', 'a', 'b', 'c') 
      expect( fn ).to.throw(/Not enough arguments/)
    })

  })

  describe('.templateArgs', function () {
  
    it('should template a string with one arg', function () {
      expect( Util.templateArgs('te{{s}}st', 'a') ).to.equal('teast')
    })

    it('should template a string with two args', function () {
      expect( Util.templateArgs('te{{s}}st{{s}}', 'a', 'b') ).to.equal('teastb')
    })

    it('should template a string with one args and one missing', function () {
      expect( Util.templateArgs('te{{s}}st{{s}}', 'a') ).to.equal('teast{{s}}')
    })

  })

  describe('.templateArray', function () {

    it('should template a string with an array', function () {
      const a = [ 'a' ]
      expect( Util.templateArray('te{{s}}st', a) ).to.equal('teast')
    })

    it('should template a string with multiple array entries', function () {
      const a = [ 'a', 'b' ]
      expect( Util.templateArray('te{{s}}st{{s}}', a) ).to.equal('teastb')
    })

    it('should template a string with a missing array entries', function () {
      const a = [ 'a' ]
      expect( Util.templateArray('te{{s}}st{{s}}', a) ).to.equal('teast{{s}}')
    })

  })

  describe('.templateObject', function () {
    
    it('should template a string with an object', function () {
      const o = { s: 'a' }
      expect( Util.templateObject('te{{s}}st', o) ).to.equal('teast')
    })

    it('should template a string with multiple object entries', function () {
      const o = { a:'a', b:'b' }
      expect( Util.templateObject('te{{a}}st{{b}}', o) ).to.equal('teastb')
    })

    it('should template a string with missing object entries', function () {
      const o = { b:'b' }
      expect( Util.templateObject('te{{a}}st{{b}}', o) ).to.equal('te{{a}}stb')
    })

  })

  describe('.templateObjectDeep', function () {
    
    it('should template a string with a deep object', function () {
      const o = { a: { s: 'a' } }
      expect( Util.templateObjectDeep('te{{a.s}}st', o) ).to.equal('teast')
    })

    it('should template a string with multiple deep object entries', function () {
      const o =  { a: { s: 'a' }, b: { s: 'b'} }
      expect( Util.templateObjectDeep('te{{a.s}}st{{b.s}}', o) ).to.equal('teastb')
    })

    it('should template a string with a missing deep object entry', function () {
      const o =  { a: { a: 'a' }, b: { s: 'b'} }
      expect( Util.templateObjectDeep('te{{a.s}}st{{b.s}}', o) ).to.equal('te{{a.s}}stb')
    })

  })


  describe('.template', function () {

    it('should format a string with one arg', function () {
      expect( Util.template('te{{s}}st', 'a') ).to.equal('teast')
    })

    it('should format a string with two args', function () {
      expect( Util.template('te{{s}}st{{s}}', 'a', 'b') ).to.equal('teastb')
    })

    it('should format a string with two args', function () {
      expect( Util.template('te{{s}}st{{s}}', [ 'a', 'b' ]) ).to.equal('teastb')
    })

    it('should format a string with two args', function () {
      expect( Util.template('te{{a}}st{{b}}', {a:'a', b:'b'}) ).to.equal('teastb')
    })

  })

})