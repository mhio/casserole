/* global expect */
import CassError from '../../src/CassErrors'

describe('unit::mh::casserole::CassErrors', function(){

  it('should creat an error', function () {
    expect( new CassError() ).to.be.an.instanceOf(Error)
  })

  it('should creat an error', function () {
    expect( new CassError('a') ).to.be.an.instanceOf(Error)
  })

  it('should creat an error with label', function () {
    expect( new CassError('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should creat an error with simple', function () {
    expect( new CassError('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should creat an error with details', function () {
    expect( new CassError('a', { label: 'label', simple: 'simple', details: { detail: 1 }}) ).to.be.an.instanceOf(Error)
  })

  it('should creat an error with all', function () {
    let err = new CassError('a', { 
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
    expect( ()=> CassError.if(true,'no') ).to.throw(CassError, 'no')
  })

  it('should throw an error if condition is true', function () {
    expect( CassError.if(false,'yes') ).to.be.ok
  })

})
