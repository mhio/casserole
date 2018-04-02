const { Client, Model } = require('../')
//const { Client, Model } = require('casserole')

let client = new Client('my_keyspace') 

let MyModel = Model.generate('MyModel', {
  id: { type:'uuid', primary: true },
  name: 'string',
  count: 'integer',
})

async function go(){
  await client.connect() // Connect to Cassandra and sync all Models (in the default ModelStore)

  // Use MyModel
  let mym = new MyModel({ id: '12341234-1234-1234-1234-123412341234', name: 'kimmy', count: 5 })
  let res = await mym.execSave()
  console.log('Saved id "%s" result set:', mym.id, res)

  return client.disconnect()
}

go()
