/* global expect */
import Client from '../../src/Client'
import CassQuery from '../../src/CassQuery_3_3'

const debug = require('debug')('mhio:test:int:casserole:CassQuery_3_3')


describe('int::mh::casserole::CassQuery_3_3', function(){

  let client

  before('connect', function(){
    client = new Client('casserole_int_test')
    return client.keyspaceCreate()
  })

  before(function(){
    return client.execute(
      'CREATE TABLE IF NOT EXISTS test_models ( field1 ascii, field2 uuid, PRIMARY KEY (field2) )'
    )
  })

  after('client', function(){
    this.timeout(4000) // docker :/
    return client.keyspaceDrop()
  })

  after('disconnect', function(){
    debug('state', client.getState())
    return client.disconnect()
  })




})