/* global expect */
import Query from '../../src/CassQuery_3_3'

describe('unit::mh::casserole::CassQuery_3_3', function(){

  describe('#INSERT', function(){

    it('should create an insert query', function(){
      let q = Query.insert('atable').values({test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('INSERT INTO "atable" ( "test", "other" ) VALUES ( ?, ? )')
      expect( q.paramaters ).to.eql(['one', 'two'])
    })

    it('should create an insert query', function(){
      let q = Query.insert('atable', {test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('INSERT INTO "atable" ( "test", "other" ) VALUES ( ?, ? )')
      expect( q.paramaters ).to.eql(['one', 'two'])
    })

  })

  describe('#SELECT', function(){
    
    it('should create a select query', function(){
      let q = Query.select('atable', ['whate']).where({ test: 'one'})
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "test" = ?')
      expect( q.paramaters ).to.eql([ 'one' ])
    })

    it('should create a select query for *', function(){
      let q = Query.select('atable', '*').where({ test: 'one'})
      expect( q.toString() ).to.equal('SELECT * FROM "atable" WHERE "test" = ?')
      expect( q.paramaters ).to.eql([ 'one' ])
    })

    it('should create a select query with multiple columns', function(){
      let q = Query.select('atable', ['whate', 'twi']).where({ test: 'one'})
      expect( q.toString() ).to.equal('SELECT "whate", "twi" FROM "atable" WHERE "test" = ?')
      expect( q.paramaters ).to.eql([ 'one' ])
    })

    it('should create a select query', function(){
      let q = Query.select('atable', ['whate']).where({ test: 'one', btest: 2 })
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "test" = ? AND "btest" = ?')
      expect( q.paramaters ).to.eql([ 'one', 2 ])
    })

    it('should create a select query', function(){
      let q = Query.select('atable', ['whate'], { one: 1, two: 2 })
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" = ? AND "two" = ?')
      expect( q.paramaters ).to.eql([ 1, 2 ])
    })

    it('should create a select query with or wheres', function(){
      let q = Query.select('atable', ['whate'])
      q.where('one').equals(1).and('two').equals(2)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" = ? AND "two" = ?')
      expect( q.paramaters ).to.eql([ 1, 2 ])
    })

    it('should create a select query with and wheres', function(){
      let q = Query.select('atable', ['whate'])
      q.where('one').equals(1).or('two').equals(2)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" = ? OR "two" = ?')
      expect( q.paramaters ).to.eql([ 1, 2 ])
    })

    it('should create a select query with lte', function(){
      let q = Query.select('atable', ['whate']).where('one').lte(1)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" <= ?')
      expect( q.paramaters ).to.eql([ 1 ])
    })

    it('should create a select query with lt', function(){
      let q = Query.select('atable', ['whate']).where('one').lt(1)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" < ?')
      expect( q.paramaters ).to.eql([ 1 ])
    })

    it('should create a select query with gte', function(){
      let q = Query.select('atable', ['whate']).where('one').gte(1)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" >= ?')
      expect( q.paramaters ).to.eql([ 1 ])
    })

    it('should create a select query with gt', function(){
      let q = Query.select('atable', ['whate']).where('one').gt(1)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" > ?')
      expect( q.paramaters ).to.eql([ 1 ])
    })

    it('should create a select query with "in"', function(){
      let q = Query.select('atable', ['whate']).where('one').in([1,2,3])
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" IN ?')
      expect( q.paramaters ).to.eql([[ 1,2,3 ]])
    })

    it('should create a select query with "like"', function(){
      let q = Query.select('atable', ['whate']).where('one').like('%what')
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" LIKE ?')
      expect( q.paramaters ).to.eql(['%what'])
    })

    it('should create a select query with "token"', function(){
      let q = Query.select('atable', ['whate']).where('one').token(1)
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" TOKEN(?)')
      expect( q.paramaters ).to.eql([1])
    })

    it('should create a select query with "contains"', function(){
      let q = Query.select('atable', ['whate']).where('one').contains([1,2,3])
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" CONTAINS ?')
      expect( q.paramaters ).to.eql([[ 1,2,3 ]])
    })

    it('should create a select query with "contains key"', function(){
      let q = Query.select('atable', ['whate']).where('one').containsKey([1,2,3])
      expect( q.toString() ).to.equal('SELECT "whate" FROM "atable" WHERE "one" CONTAINS KEY ?')
      expect( q.paramaters ).to.eql([[ 1,2,3 ]])
    })

  })

  describe('#UPDATE', function(){

    it('should create an update query', function(){
      let q = Query.update('atable', {c:1}, {test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('UPDATE "atable" SET "test" = ?, "other" = ? WHERE "c" = ?')
      expect( q.paramaters ).to.eql([ 'one', 'two', 1 ])
    })

  })

  describe('#DELETE', function(){

    it('should create a delete query', function(){
      let q = Query.delete('atable').where({test: 'one'})
      expect( q.toString() ).to.equal('DELETE FROM "atable" WHERE "test" = ?')
      expect( q.paramaters ).to.eql([ 'one' ])
    })

  })

})