/* global expect */
import Util from '../../src/Util'

describe('unit::mh::casserole::Util', function(){

  //let now_ts = Date.now()
  let now_ts = 1508915692132
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
    h: true,
  }

  describe('.valueToCqlMap', function(){
    
    it('should turn an bool true into cql', function(){
      expect( Util.valueToCqlMap(true) ).to.equal('\'true\'')
    })

    it('should turn an bool false into cql', function(){
      expect( Util.valueToCqlMap(false) ).to.equal('\'false\'')
    })

    it('should turn an integer into cql', function(){
      expect( Util.valueToCqlMap(o.a) ).to.equal('1')
    })

    it('should turn a number into cql', function(){
      expect( Util.valueToCqlMap(o.b) ).to.equal('2.1')
    })

    it('should turn a ts into cql', function(){
      expect( Util.valueToCqlMap(o.c) ).to.equal('1508915692132')
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
        `'f':{'nested':'test'},'g':'${now}','h':'true'}`
      )
    })

  })

  describe('.format', function(){

    it('should format a string with one arg', function(){
      expect( Util.format('te%sst', 'a') ).to.equal('teast')
    })

    it('should format a string with two args', function(){
      expect( Util.format('te%sst%s', 'a', 'b') ).to.equal('teastb')
    })

  })

  describe('.templateArgs', function(){
  
    it('should template a string with one arg', function(){
      expect( Util.templateArgs('te{{s}}st', 'a') ).to.equal('teast')
    })

    it('should template a string with two args', function(){
      expect( Util.templateArgs('te{{s}}st{{s}}', 'a', 'b') ).to.equal('teastb')
    })

    it('should template a string with one args and one missing', function(){
      expect( Util.templateArgs('te{{s}}st{{s}}', 'a') ).to.equal('teast{{s}}')
    })

  })

  describe('.compileArgsTemplate', function(){
    
    it('should template a string with an object', function(){
      let template = Util.compileArgsTemplate('te{{s}}st')
      expect( template('a') ).to.equal('teast')
    })

    it('should template a string with multiple object entries', function(){
      let template = Util.compileArgsTemplate('te{{a}}st{{b}}')
      expect( template('a','b') ).to.equal('teastb')
    })

    it('should template a string with param at start/end', function(){
      let template = Util.compileArgsTemplate('{{a}}st{{b}}')
      expect( template('a','b') ).to.equal('astb')
    })

    it('should template a string with param at start', function(){
      let template = Util.compileArgsTemplate('{{a}}st{{b}}st')
      expect( template('a','b') ).to.equal('astbst')
    })

    it('should template a string with missing first object entries', function(){
      let template = Util.compileArgsTemplate('te{{a}}st{{b}}')
      expect( template('b') ).to.equal('tebst{{b}}')
      //expect( template(o) ).to.equal('testb')
    })

    it('should template a string with missing last object entries', function(){
      let template = Util.compileArgsTemplate('te{{a}}st{{b}}srt{{c}}')
      expect( template('a','b') ).to.equal('teastbsrt{{c}}')
      //expect( template(o) ).to.equal('teastbsrt')
    })

    it('should template a string with missing middle object entries', function(){
      let template = Util.compileArgsTemplate('te{{a}}st{{b}}srt{{c}}')
      expect( template('a','c') ).to.equal('teastcsrt{{c}}')
      //expect( template(o) ).to.equal('teastsrtc')
    })


  })

  describe('.templateArray', function(){

    it('should template a string with an array', function(){
      const a = [ 'a' ]
      expect( Util.templateArray('te{{s}}st', a) ).to.equal('teast')
    })

    it('should template a string with multiple array entries', function(){
      const a = [ 'a', 'b' ]
      expect( Util.templateArray('te{{s}}st{{s}}', a) ).to.equal('teastb')
    })

    it('should template a string with a missing array entries', function(){
      const a = [ 'a' ]
      expect( Util.templateArray('te{{s}}st{{s}}', a) ).to.equal('teast{{s}}')
    })

    it('should replace null with blank string', function(){
      const a = [ null ]
      expect( Util.templateArray('te{{s}}st', a) ).to.equal('test')
    })

    it('should leave template for undefined', function(){
      const a = [ undefined ]
      expect( Util.templateArray('te{{s}}st', a) ).to.equal('te{{s}}st')
    })

  })

  describe('.compileArrayTemplate', function(){
    
    it('should template a string with an object', function(){
      const o = [ 'a' ]
      let template = Util.compileArrayTemplate('te{{s}}st')
      expect( template(o) ).to.equal('teast')
    })

    it('should template a string with multiple object entries', function(){
      const o = [ 'a', 'b' ]
      let template = Util.compileArrayTemplate('te{{a}}st{{b}}')
      expect( template(o) ).to.equal('teastb')
    })

    it('should template a string with param at start/end', function(){
      const o = [ 'a', 'b' ]
      let template = Util.compileArrayTemplate('{{a}}st{{b}}')
      expect( template(o) ).to.equal('astb')
    })

    it('should template a string with param at start', function(){
      const o = [ 'a', 'b' ]
      let template = Util.compileArrayTemplate('{{a}}st{{b}}st')
      expect( template(o) ).to.equal('astbst')
    })

    it('should template a string with missing first object entries', function(){
      const o = [ 'b' ]
      let template = Util.compileArrayTemplate('te{{a}}st{{b}}')
      expect( template(o) ).to.equal('tebst{{b}}')
      //expect( template(o) ).to.equal('testb')
    })

    it('should template a string with missing last object entries', function(){
      const o = [ 'a', 'b' ]
      let template = Util.compileArrayTemplate('te{{a}}st{{b}}srt{{c}}')
      expect( template(o) ).to.equal('teastbsrt{{c}}')
      //expect( template(o) ).to.equal('teastbsrt')
    })

    it('should template a string with missing middle object entries', function(){
      const o = [ 'a', 'c' ]
      let template = Util.compileArrayTemplate('te{{1}}st{{2}}srt{{3}}')
      expect( template(o) ).to.equal('teastcsrt{{3}}')
      //expect( template(o) ).to.equal('teastsrtc')
    })


  })

  describe('.templateObject', function(){
    
    it('should template a string with an object', function(){
      const o = { s: 'a' }
      expect( Util.templateObject('te{{s}}st', o) ).to.equal('teast')
    })

    it('should template a string with multiple object entries', function(){
      const o = { a:'a', b:'b' }
      expect( Util.templateObject('te{{a}}st{{b}}', o) ).to.equal('teastb')
    })

    it('should template a string with missing object entries', function(){
      const o = { b:'b' }
      expect( Util.templateObject('te{{a}}st{{b}}', o) ).to.equal('te{{a}}stb')
    })

    it('should replace null with blank string', function(){
      const o = { s: null }
      expect( Util.templateObject('te{{s}}st', o) ).to.equal('test')
    })

    it('should leave template for undefined', function(){
      const o = { s: undefined }
      expect( Util.templateObject('te{{s}}st', o) ).to.equal('te{{s}}st')
    })


  })

  describe('.compileObjectTemplate', function(){
    
    it('should template a string with an object', function(){
      const o = { s: 'a' }
      let template = Util.compileObjectTemplate('te{{s}}st')
      expect( template(o) ).to.equal('teast')
    })

    it('should template a string with multiple object entries', function(){
      const o = { a:'a', b:'b' }
      let template = Util.compileObjectTemplate('te{{a}}st{{b}}')
      expect( template(o) ).to.equal('teastb')
    })

    it('should template a string with param at start/end', function(){
      const o = { a:'a', b:'b' }
      let template = Util.compileObjectTemplate('{{a}}st{{b}}')
      expect( template(o) ).to.equal('astb')
    })

    it('should template a string with param at start', function(){
      const o = { a:'a', b:'b' }
      let template = Util.compileObjectTemplate('{{a}}st{{b}}st')
      expect( template(o) ).to.equal('astbst')
    })

    it('should template a string with missing first object entries', function(){
      const o = { b:'b' }
      let template = Util.compileObjectTemplate('te{{a}}st{{b}}')
      expect( template(o) ).to.equal('te{{a}}stb')
      //expect( template(o) ).to.equal('testb')
    })

    it('should template a string with missing last object entries', function(){
      const o = { a:'a', b:'b' }
      let template = Util.compileObjectTemplate('te{{a}}st{{b}}srt{{c}}')
      expect( template(o) ).to.equal('teastbsrt{{c}}')
      //expect( template(o) ).to.equal('teastbsrt')
    })

    it('should template a string with missing middle object entries', function(){
      const o = { a:'a', c:'c' }
      let template = Util.compileObjectTemplate('te{{a}}st{{b}}srt{{c}}')
      expect( template(o) ).to.equal('teast{{b}}srtc')
      //expect( template(o) ).to.equal('teastsrtc')
    })


  })

  describe('.templateObjectDeep', function(){
    
    it('should template a string with a deep object', function(){
      const o = { a: { s: 'a' } }
      expect( Util.templateObjectDeep('te{{a.s}}st', o) ).to.equal('teast')
    })

    it('should template a string with multiple deep object entries', function(){
      const o =  { a: { s: 'a' }, b: { s: 'b'} }
      expect( Util.templateObjectDeep('te{{a.s}}st{{b.s}}', o) ).to.equal('teastb')
    })

    it('should template a string with a missing deep object entry', function(){
      const o =  { a: { a: 'a' }, b: { s: 'b'} }
      expect( Util.templateObjectDeep('te{{a.s}}st{{b.s}}', o) ).to.equal('te{{a.s}}stb')
    })

  })


  describe('.template', function(){

    it('should format a string with one arg', function(){
      expect( Util.template('te{{s}}st', 'a') ).to.equal('teast')
    })

    it('should format a string with two args', function(){
      expect( Util.template('te{{s}}st{{s}}', 'a', 'b') ).to.equal('teastb')
    })

    it('should format a string with array', function(){
      expect( Util.template('te{{s}}st{{s}}', [ 'a', 'b' ]) ).to.equal('teastb')
    })

    it('should format a string with object', function(){
      expect( Util.template('te{{a}}st{{b}}', {a:'a', b:'b'}) ).to.equal('teastb')
    })

  })

})