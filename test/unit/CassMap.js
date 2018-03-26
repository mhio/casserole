/* global expect */
import CassMap from '../../src/CassMap'

describe('unit::mh::casserole::CassMap', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassMap.template ).to.be.a('function')
    expect( CassMap.toCqlMap ).to.be.a('function')
  })


  let cassmap

  beforeEach(function () {
    cassmap = new CassMap({test: true, other: 'what'})
  })

  it('should have test set in the CassMap', function () {
    expect( cassmap.get('test') ).to.equal(true)
  })

  it('should set "test" to false', function () {
    cassmap.set('test', false)
    expect( cassmap.get('test') ).to.equal(false)
  })

  it('should create a new CassMap without data', function () {
    expect( new CassMap() ).to.be.ok
  })

  it('should create a new CassMap without data', function () {
    expect( new CassMap({a:1},{name:'what'}) ).to.be.ok
  })

  it('should create a new CassMap without data', function () {
    expect( ()=> cassmap.name = '0' ).to.throw(/must/)
  })

  it('should return the data as object', function () {
    expect( cassmap.toObject() ).to.eql({ test: true, other: 'what' })
  })

  it('should return the data as json', function () {
    expect( cassmap.toJSON() ).to.eql({ test: true, other: 'what' })
  })

  it('should return the data as json', function () {
    expect( JSON.stringify(cassmap) ).to.eql('{"test":true,"other":"what"}')
  })

  it('should return the data as cql map', function () {
    expect( cassmap.toCqlMap() ).to.eql("{'test':'true','other':'what'}") // eslint-disable-line quotes
  })

  it('should return the data as cql map', function () {
    cassmap.name = 'whatever'
    expect( cassmap.toCql() ).to.eql("whatever = {'test':'true','other':'what'}") // eslint-disable-line quotes
  })

  it('should add cql map data', function () {
    expect( cassmap.add('b', 2) ).to.equal(2)
    expect( cassmap.get('b') ).to.equal(2)
  })

  it('should fail to add existing cql map data', function () {
    let fn = ()=> cassmap.add('test', 2)
    expect( fn ).to.throw(/Map field "test" already set/)
  })

  it('should delete cql map data', function () {
    expect( cassmap.delete('a') ).to.be.true
  })

})