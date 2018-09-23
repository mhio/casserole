[Casserole](https://github.com/mhio/casserole)
-----------

Cassandra JS Object Mapper. Build models and queries from JS objects. (WIP)

[API docco](doc/API.md)

### Install
```
yarn add casserole
npm i casserole --save
```

### Usage
```
const { Client, Model } = require('casserole')

let client = new Client('my_keyspace') 

let CounterModel = Model.generate('Counter',{ 
  id: { type:'uuid', primary: true },
  name: 'string',
  count: 'integer',
})

async function go(){
  // Connect to Cassandra and sync all Models (in the default ModelStore)
  await client.connect() 

  // Use MyModel
  let myc = new CounterModel({ id: '12341234-1234-1234-1234-123412341234', name: 'kimmy', count: 5 })
  let res = await myc.execSave()
  console.log('Saved id "%s" result set:', mym.id, res)

  return client.disconnect()
}

go()
```

### Links

- [NPM `casserole`](https://www.npmjs.com/package/casserole)
- [Github mhio/casserole](https://github.com/mhio/casserole)
- [Cassandra](https://cassandra.apache.org/) 
- [CQL](https://cassandra.apache.org/doc/latest/cql/index.html)
- [Node.js Driver](https://github.com/datastax/nodejs-driver)
