/* global expect */
import CassException from '../../src/CassExceptions'

describe('unit::mh::casserole::CassExceptions', function(){

  it('should create an exception', function () {
    expect( new CassException() ).to.be.an.instanceOf(Error)
  })

  it('should create an exception', function () {
    expect( new CassException('a') ).to.be.an.instanceOf(Error)
  })

  it('should create an exception with label', function () {
    expect( new CassException('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should create an exception with simple', function () {
    expect( new CassException('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should create an exception with details', function () {
    expect( new CassException('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should create an exception with all', function () {
    let err = new CassException('a', { 
      label: 'label',
      simple: 'simple',
      details: { detail: 1 }
    })
    expect( err ).to.be.an.instanceOf(Error)
    expect( err.label ).to.equal('label')
    expect( err.simple ).to.equal('simple')
    expect( err.details ).to.eql({detail:1})
  })

  it('should throw an error if condition is true', function () {
    expect( ()=> CassException.if(true,'no') ).to.throw(CassException, 'no')
  })

  it('should throw an error if condition is true', function () {
    expect( CassException.if(false,'yes') ).to.be.ok
  })

})
