/* global expect */
const { Client, Model } = require('../../')

describe('mhio::test::built::casserole', function(){

  let client = null

  after(function(){
    return (client) ? client.disconnect() : null
  })

  it('should require the files', function(){
    expect(Client).to.be.a('function')
    expect(Model).to.be.a('function')
  })

  it('should do some stuff', function(){
    client = new Client('my_keyspace')
    let MyModel = Model.generate(
      'MyModel',
      { id: { type:'uuid', primary: true }, name: 'string', count: 'integer' },
      { client: client }
    )
    return client.connect()
      .then(() => MyModel.sync())
      .then(() => {
        let mym = new MyModel({ id: '12341234-1234-1234-1234-123412341234', name: 'kimmy', count: 5 })
        return mym.execSave()
      })
  })

})