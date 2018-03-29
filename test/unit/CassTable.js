/* global expect */
import CassTable from '../../src/CassTable'

describe('unit::mh::casserole::CassTable', function(){

  it('should have cassandra-drivers types attached', function(){
    expect( CassTable.data_types ).to.be.an('object')
    expect( CassTable.data_types.time ).to.equal(0x0012)
    expect( CassTable.data_types.text ).to.equal(0x000a)
    expect( CassTable.data_types.string ).to.equal(0x000a)
    expect( CassTable.data_types.ascii ).to.equal(0x0001)
  })

  let field = { name: 'a', type: 'int'}
  let fields = { a: field }

  it('should dump CREATE cql from the class', function () {
    expect( CassTable.toCqlCreate('one', fields, [ 'a' ] ) ).to.equal(
      'CREATE TABLE "one" ( "a" int, PRIMARY KEY (a) );'
    )
  })

  it('should dump CREATE cql from the class', function () {
    expect( CassTable.toCqlCreate('one', fields, [ 'a','b' ] ) ).to.equal(
      'CREATE TABLE "one" ( "a" int, PRIMARY KEY (a, b) );'
    )
  })

  it('should dump CREATE cql from the class', function () {
    expect( CassTable.toCqlCreate('one', fields, [ 'a','b' ], { exists: true }) ).to.equal(
      'CREATE TABLE IF NOT EXISTS "one" ( "a" int, PRIMARY KEY (a, b) );'
    )
  })

  it('should dump CREATE cql with cluster order by', function () {
    let options = { order_by: 'whatever', order: 'DESC'}
    let query = CassTable.toCqlCreate('one', fields, [ 'a','b' ], options)
    expect( query ).to.equal(
      'CREATE TABLE "one" ( "a" int, PRIMARY KEY (a, b) ) WITH CLUSTERING ORDER BY ( "whatever" DESC );'
    )
  })

  it('should throw on CREATE without name', function () {
    let fn = ()=> CassTable.toCqlCreate()
    expect( fn ).to.throw(/CassTable Create cql requires a table "name"/)
  })

  it('should throw on CREATE without fields', function () {
    let fn = ()=> CassTable.toCqlCreate('one')
    expect( fn ).to.throw(/CassTable Create cql requires "fields"/)
  })

  it('should throw on CREATE without primary keys', function () {
    let fn = ()=> CassTable.toCqlCreate('one', fields)
    expect( fn ).to.throw(/CassTable Create cql requires "primary_keys"/)
  })

  it('should dump DROP cql', function () {
    expect( CassTable.toCqlDrop('one') ).to.equal( 'DROP TABLE "one";' )
  })

  describe('instance', function(){
    
    let table = null

    beforeEach(function(){
      table = new CassTable('atable')
    })

    it('should create an instance', function(){
      expect( table ).to.be.ok  
    })

    it('should add a field to the table', function(){
      expect( table.addField('aname', 'ascii') ).to.be.ok
    })

    it('should add a field to the table with a Casserole/js type name', function(){
      expect( table.addField('aname', 'string') ).to.be.ok
    })

    it('should add a field to the table with a Casserole/js type name', function(){
      expect( table.addField('aname', 'number') ).to.be.ok
    })

    it('should add a nested to the table', function(){
      expect( table.addField('aname', 'set<text>') ).to.be.ok
    })

    it('should add a nested to the table', function(){
      expect( table.addField('aname', 'map<text>') ).to.be.ok
    })

    it('should fail to add a user defined type to the table', function(){
      let fn = ()=> table.addField('aname', 'text<whatever>')
      expect( fn ).to.throw(/can not be used to house other types/)
    })

    it('should fail to add a user defined type to the table', function(){
      let fn = ()=> table.addField('aname', '<whatever>')
      expect( fn ).to.throw(/User defined types are not supported/)
    })

    it('should fail a field to the table', function(){
      expect( ()=> table.addField('aname', 'wakka') ).to.throw(/type/)
    })

    it('should throw when using alter for the moment', function(){
      expect( ()=> table.toCqlAlter() ).to.throw(/nope/)
    })

    it('should create the drop CQL', function(){
      table.table_name = 'adrop'
      expect( table.toCqlDrop() ).to.equal('DROP TABLE "adrop";')
    })

    it('should create the drop CQL', function(){
      table.table_name = 'adrop'
      expect( table.toCqlDrop({ exists: true }) ).to.equal('DROP TABLE "adrop" IF EXISTS;')
    })
  })

})