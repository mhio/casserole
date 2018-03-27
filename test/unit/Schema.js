/* global expect */
import Schema from '../../src/Schema'

describe('unit::mh::casserole::Schema', function(){

  const big_schema = {
    field1: { type: 'string'},
    field2: { type: 'uuid', primary: true},
    field3: { type: 'int'},
    field4: { type: 'decimal'},
    field5: { type: 'timestamp'},
  }

  it('should create a new Schema', function(){
    expect( new Schema({ a: 'string' }) ).to.be.ok
  })

  it('should fail to create an empty Schema', function(){
    expect( ()=> new Schema() ).to.throw(/needs/)
  })

  it('should create a new Schema', function(){
    let schema = new Schema(big_schema)
    expect( schema ).to.be.ok
  })

  it('should convert integer to int', function(){
    let schema = new Schema({ astr: { type: 'string' }})
    expect( schema ).to.be.ok
  })

  it('should convert integer to int', function(){
    let schema = new Schema({ anint: { type: 'integer' }})
    expect( schema ).to.be.ok
  })

  it('should convert datetime to timestamp', function(){
    let schema = new Schema({ adate: { type: 'datetime' }})
    expect( schema ).to.be.ok
  })

  it('should allow just a type specification', function(){
    let schema = new Schema({ anint: 'int' })
    expect( schema ).to.be.ok
  })

  it('should not allow blank types', function(){
    let fn = ()=> new Schema({ anint: {} })
    expect( fn ).to.throw(/Schema "type" must be defined for field "anint"/)
  })

  it('should not allow a bad config', function(){
    let fn = ()=> new Schema(undefined)
    expect( fn ).to.throw(/Schema needs to be created with a config/)
  })

  it('should not allow an empty config', function(){
    let fn = ()=> new Schema({})
    expect( fn ).to.throw(/Schema config must have field/)
  })

  it('should not allow a bad type string', function(){
    let fn = ()=> new Schema({ anint: 'bad' })
    expect( fn ).to.throw(/No cassandra type "bad"/)
  })

  it('should not allow a bad type property', function(){
    let fn = ()=> new Schema({ anint: { type: 'bad'} })
    expect( fn ).to.throw(/No cassandra type "bad"/)
  })

  it('should get the config for a Schema', function(){
    let schema = new Schema({
      field1: { type: 'string'},
    })
    expect( schema.config ).to.eql({ field1: { type: 'text'} })
  })

  it('should set the config for a Schema', function(){
    let schema = new Schema({
      field1: { type: 'string'},
    })
    schema.config = { field2: { type: 'text'} }
    expect( schema.config ).to.eql({ field2: { type: 'text'} })
  })

  it('should get the column types', function(){
    let schema = new Schema(big_schema)
    expect( schema.column_types ).to.eql({
      field1: 'text',
      field2: 'uuid',
      field3: 'int',
      field4: 'decimal',
      field5: 'timestamp',
    })
  })

  it('should set column names', function(){
    let schema = new Schema(big_schema)
    expect( schema.columns ).to.eql([ 'field1', 'field2', 'field3', 'field4', 'field5' ])
  })

  it('should get the primary keys', function(){
    let schema = new Schema(big_schema)
    expect( schema.primary_keys ).to.eql([ 'field2' ])
  })

})