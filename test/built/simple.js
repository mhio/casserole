/* global expect */
const { Client, Model } = require('../../')

describe('mhio::test::built::casserole', function(){

  it('should require the files', function(){
    expect(Client).to.be.a('function')
    expect(Model).to.be.a('function')
  })

  describe('connections', function(){
    
    let client = null

    before('client connect', async function(){
      client = new Client('casserole_test_built')
      await client.connect()
    })

    after('client disconnect', function(){
      return client.disconnect()
    })


    it('should do some stuff', function(){
      let MyModel = Model.generate(
        'MyModel',
        { id: { type:'uuid', primary: true }, name: 'string', count: 'integer' },
        { client: client }
      )
      return client.connect()
        .then(() => {
          let mym = new MyModel({ id: '12341234-1234-1234-1234-123412341234', name: 'kimmy', count: 5 })
          return mym.execSave()
        })
    })

    it('should select the stuff', async function(){
      let res = await client.select('my_models', '*', {id: '12341234-1234-1234-1234-123412341234' })
      expect( res.rowLength ).to.equal(1)
      expect( res.rows[0].name ).to.equal('kimmy')
    })

  })

})