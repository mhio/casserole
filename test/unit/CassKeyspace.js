/* global expect */
import CassKeyspace from '../../src/CassKeyspace'
import CassError from '../../src/CassErrors'

describe('unit::mh::casserole::CassKeyspace', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassKeyspace.debug ).to.be.a('function')
  })

  it('should dump the create sql', function () {
    expect( CassKeyspace.toCqlCreate('one', {rf:2}) ).to.equal(
      'CREATE KEYSPACE  one WITH REPLICATION = {\'rf\':2} AND DURABLE_WRITES = true;'
    )
  })

  it('should dump the create sql with durable turned off', function () {
    expect( CassKeyspace.toCqlCreate('one', {rf:2}, {q_durable: false}) ).to.equal(
      'CREATE KEYSPACE  one WITH REPLICATION = {\'rf\':2} AND DURABLE_WRITES = false;'
    )
  })

  it('should dump the create sql with ifnotexists', function () {
    expect( CassKeyspace.toCqlCreate('one', {rf:2}, {q_if_not_exists: true}) ).to.equal(
      'CREATE KEYSPACE IF NOT EXISTS one WITH REPLICATION = {\'rf\':2} AND DURABLE_WRITES = true;'
    )
  })

  it('should dump the drop sql without if exists', function () {
    expect( CassKeyspace.toCqlDrop('one', {q_if_exists: false}) ).to.equal(
      'DROP KEYSPACE  one;'
    )
  })

  it('should dump the drop sql without exists_clause', function () {
    expect( CassKeyspace.toCqlDrop('one', {q_exists_clause: false}) ).to.equal(
      'DROP KEYSPACE  one;'
    )
  })

  it('should dump the create sql with ifnotexists', function () {
    expect( CassKeyspace.toCqlDrop('one', {q_if_exists: true}) ).to.equal(
      'DROP KEYSPACE IF EXISTS one;'
    )
  })

  it('should dump the create sql with ifnotexists', function () {
    expect( CassKeyspace.toCqlDrop('one') ).to.equal(
      'DROP KEYSPACE IF EXISTS one;'
    )
  })

  it('should create a keyspace instance', function () {
    expect( new CassKeyspace('whatever') ).to.be.ok    
  })

  it('should fail to create a keyspace instance without name', function () {
    expect( ()=> new CassKeyspace() ).to.throw(CassError)
  })

  it('should create a default keyspace instance', function () {
    expect( new CassKeyspace('whatever').toCqlCreate() ).to.equal('CREATE KEYSPACE  whatever WITH REPLICATION = {\'class\':\'SimpleStrategy\',\'replication_factor\':3} AND DURABLE_WRITES = true;')
  })

  it('should create a keyspace instance with durable set to false', function () {
    let keyspace = new CassKeyspace('whatever', {durable: false})
    expect( keyspace.toCqlCreate() ).to.equal(
      'CREATE KEYSPACE  whatever WITH REPLICATION = {\'class\':\'SimpleStrategy\',\'replication_factor\':3} AND DURABLE_WRITES = false;')
  })

  it('should create a keyspace with replication object', function () {
    let keyspace = new CassKeyspace('whatever', { 
      replication: { class: 'NetworkTopologyStrategy', 'dc1': 2 }
    })
    expect( keyspace.toCqlCreate() ).to.equal('CREATE KEYSPACE  whatever WITH REPLICATION = {\'class\':\'NetworkTopologyStrategy\',\'dc1\':2} AND DURABLE_WRITES = true;')
  })

})