/* global expect */
import CassTable from '../../src/CassTable'

describe('unit::mh::casserole::CassTable', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassTable.types ).to.be.an('object')
    expect( CassTable.types.time ).to.equal(0x0012)
    expect( CassTable.types.text ).to.equal(0x000a)
  })

  let field = { name: 'a', type: 'int'}
  let fields = { a: field }

  it('should dump CREATE cql from the class', function () {
    expect( CassTable.toCqlCreate('one', fields, [ 'a' ] ) ).to.equal(
      'CREATE TABLE one ( a int, PRIMARY KEY (a) );'
    )
  })

  it('should dump CREATE cql from the class', function () {
    expect( CassTable.toCqlCreate('one', fields, [ 'a','b' ] ) ).to.equal(
      'CREATE TABLE one ( a int, PRIMARY KEY (a, b) );'
    )
  })

  it('should dump DROP cql from the class', function () {
    expect( CassTable.toCqlDrop('one', fields, 'a' ) ).to.equal(
      'DROP TABLE one;'
    )
  })

})