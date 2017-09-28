/* global expect */
import Query from '../../src/CassQuery'

describe('unit::mh::casserole::CassQuery', function(){

  describe('#INSERT', function () {

    it('should create an insert query', function () {
      let q = Query.insert('atable').values({test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('INSERT INTO atable ( test, other ) VALUES ( ?, ? )')
      expect( q.paramaters ).to.eql(['one', 'two'])
    })

    it('should create an insert query', function () {
      let q = Query.insert('atable', {test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('INSERT INTO atable ( test, other ) VALUES ( ?, ? )')
      expect( q.paramaters ).to.eql(['one', 'two'])
    })

  })

  describe('#SELECT', function () {
    
    it('should create a select query', function () {
      let q = Query.select('atable', ['whate']).where({ test: 'one'})
      expect( q.toString() ).to.equal('SELECT whate FROM atable WHERE test = ?')
      expect( q.paramaters ).to.eql(['one'])
    })

    it('should create a select query', function () {
      let q = Query.select('atable', ['whate']).where({ test: 'one', btest: 2 })
      expect( q.toString() ).to.equal('SELECT whate FROM atable WHERE test = ? AND btest = ?')
      expect( q.paramaters ).to.eql(['one', 2])
    })

    it('should create a select query', function () {
      let q = Query.select('atable', ['whate'], { one: 1, two: 2 })
      expect( q.toString() ).to.equal('SELECT whate FROM atable WHERE one = ? AND two = ?')
      expect( q.paramaters ).to.eql([1,2])
    })

  })

  describe('#UPDATE', function () {

    it('should create an update query', function () {
      let q = Query.update('atable', {c:1}, {test: 'one', other: 'two'})
      expect( q.toString() ).to.equal('UPDATE atable SET test = ?, other = ? WHERE c = ?')
      expect( q.paramaters ).to.eql(['one', 'two', 1])
    })

  })

  describe('#DELETE', function () {

    it('should create a delete query', function () {
      let q = Query.delete('atable').where({test: 'one'})
      expect( q.toString() ).to.equal('DELETE FROM atable WHERE test = ?')
      expect( q.paramaters ).to.eql(['one'])
    })

  })

})