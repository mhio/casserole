/* global expect */
import CassKeyspace from '../../src/CassKeyspace'

describe('unit::mh::casserole::CassKeyspace', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassKeyspace.debug ).to.be.a('function')
  })

  it('should dump the create sql', function () {
    expect( CassKeyspace.toCqlCreate('one', {rf:2}, true) ).to.equal(
      'CREATE KEYSPACE IF NOT EXISTS one WITH REPLICATION = {\'rf\':2} AND DURABLE_WRITES = true;'
    )
  })

})