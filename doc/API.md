## Classes

<dl>
<dt><a href="#CassCql">CassCql</a></dt>
<dd><p>Base class for other CQL implementations to extend</p></dd>
<dt><a href="#CassEntity">CassEntity</a> ⇐ <code><a href="#CassCql">CassCql</a></code></dt>
<dd><p>Base class for CQL entities to extend</p></dd>
<dt><a href="#CassException">CassException</a> ⇐ <code>Exception</code></dt>
<dd><p>Extended Error classes for Casserole</p></dd>
<dt><a href="#CassKeyspace">CassKeyspace</a> ⇐ <code><a href="#CassEntity">CassEntity</a></code></dt>
<dd><p>Manage a Cassandra Keyspace</p></dd>
<dt><a href="#CassMap">CassMap</a></dt>
<dd><p>Base class for other CQL Map implementations to extend</p></dd>
<dt><a href="#CassQuery">CassQuery</a> ⇐ <code><a href="#CassCql">CassCql</a></code></dt>
<dd><p>Base class for versioned Query implementations to extend</p></dd>
<dt><a href="#CassQuery_3_3">CassQuery_3_3</a> ⇐ <code><a href="#CassQuery">CassQuery</a></code></dt>
<dd><p>Creates CQL 3.3 compatible queries</p></dd>
<dt><a href="#CassReplicationStrategy">CassReplicationStrategy</a> ⇐ <code><a href="#CassMap">CassMap</a></code></dt>
<dd></dd>
<dt><a href="#CassTable">CassTable</a> ⇐ <code><a href="#CassEntity">CassEntity</a></code></dt>
<dd><p>Covers all operations to a table, like CREATE and ALTER</p></dd>
<dt><a href="#CassType">CassType</a></dt>
<dd><p>Manage Custom Cassandra Types</p></dd>
<dt><a href="#Client">Client</a></dt>
<dd><p>Client for apps to interact with Cassandra</p></dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>Model for apps to work with</p></dd>
<dt><a href="#ModelStore">ModelStore</a></dt>
<dd><p>A Model Storage area to make setup easier</p></dd>
<dt><a href="#Paramaters">Paramaters</a></dt>
<dd><p>Paramaters for other classes to import</p></dd>
<dt><a href="#Schema">Schema</a></dt>
<dd><p>Schema for apps to build into Models</p></dd>
<dt><a href="#Util">Util</a></dt>
<dd><p>Utility class, templating and CQL maps</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ClientOptions">ClientOptions</a> : <code>Object</code></dt>
<dd><p>Client options</p></dd>
</dl>

<a name="CassCql"></a>

## CassCql
<p>Base class for other CQL implementations to extend</p>

**Kind**: global class  

* * *

<a name="CassCql.withOptions"></a>

### CassCql.withOptions()
<p>Create an options string, </p>
<pre class="prettyprint source"><code>whatever = { 'some' : 'cqlvalues' } AND other = 'cqlValue'`</code></pre><p>ID = 'uppercase'
CDC = TRUE</p>

**Kind**: static method of [<code>CassCql</code>](#CassCql)  

* * *

<a name="CassEntity"></a>

## CassEntity ⇐ [<code>CassCql</code>](#CassCql)
<p>Base class for CQL entities to extend</p>

**Kind**: global class  
**Extends**: [<code>CassCql</code>](#CassCql)  

* * *

<a name="CassException"></a>

## CassException ⇐ <code>Exception</code>
<p>Extended Error classes for Casserole</p>

**Kind**: global class  
**Extends**: <code>Exception</code>  

* * *

<a name="new_CassException_new"></a>

### new exports.CassException(message, metadata)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | <p>Standard Error message</p> |
| metadata | <code>Object</code> | <p>-</p> |
| metadata.details | <code>Object</code> | <p>Store more error details for the humans                                   Single level objects are ok and should be presented to                                    the user as such.</p> |


* * *

<a name="CassKeyspace"></a>

## CassKeyspace ⇐ [<code>CassEntity</code>](#CassEntity)
<p>Manage a Cassandra Keyspace</p>

**Kind**: global class  
**Extends**: [<code>CassEntity</code>](#CassEntity)  

* * *

<a name="CassMap"></a>

## CassMap
<p>Base class for other CQL Map implementations to extend</p>

**Kind**: global class  

* [CassMap](#CassMap)
    * [new exports.CassMap(data, options)](#new_CassMap_new)
    * _instance_
        * [.name](#CassMap+name) : <code>String</code>
        * [.data](#CassMap+data) : <code>Object</code>
        * [.toCqlMap()](#CassMap+toCqlMap) ⇒ <code>String</code>
        * [.toCqlWith()](#CassMap+toCqlWith) ⇒ <code>String</code>
        * [.get(Name)](#CassMap+get) ⇒
        * [.set()](#CassMap+set)
        * [.add()](#CassMap+add)
        * [.delete()](#CassMap+delete)
    * _static_
        * [.template](#CassMap.template) : <code>function</code>
        * [.toCqlMap](#CassMap.toCqlMap) : <code>function</code>


* * *

<a name="new_CassMap_new"></a>

### new exports.CassMap(data, options)
<p>new CassMap</p>


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>JS Data to build the map from</p> |
| options | <code>Object</code> |  |
| options.name | <code>String</code> | <p>Name of the map data</p> |


* * *

<a name="CassMap+name"></a>

### cassMap.name : <code>String</code>
<p>The name of the CQL Map, usually a paramater name before the Map data</p>

**Kind**: instance property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+data"></a>

### cassMap.data : <code>Object</code>
<p>Data is where the map is stored</p>

**Kind**: instance property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+toCqlMap"></a>

### cassMap.toCqlMap() ⇒ <code>String</code>
<p>Convert data to a CQL Map</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  
**Returns**: <code>String</code> - <p>Data as a CQL Map</p>  

* * *

<a name="CassMap+toCqlWith"></a>

### cassMap.toCqlWith() ⇒ <code>String</code>
<p>Convert to CQL with <code>name = {}</code></p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  
**Returns**: <code>String</code> - <p>Name = data as a CQL Map</p>  

* * *

<a name="CassMap+get"></a>

### cassMap.get(Name) ⇒
<p>Get map data for a field</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  
**Returns**: <p>Field definition</p>  

| Param | Type | Description |
| --- | --- | --- |
| Name | <code>String</code> | <p>of field to retrieve</p> |


* * *

<a name="CassMap+set"></a>

### cassMap.set()
<p>Set map data</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+add"></a>

### cassMap.add()
<p>Add new data</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+delete"></a>

### cassMap.delete()
<p>Delete map data</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap.template"></a>

### CassMap.template : <code>function</code>
<p>Template string parsing and replacing</p>

**Kind**: static property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap.toCqlMap"></a>

### CassMap.toCqlMap : <code>function</code>
<p>Map values to a CQL Map</p>

**Kind**: static property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassQuery"></a>

## CassQuery ⇐ [<code>CassCql</code>](#CassCql)
<p>Base class for versioned Query implementations to extend</p>

**Kind**: global class  
**Extends**: [<code>CassCql</code>](#CassCql)  

* * *

<a name="CassQuery_3_3"></a>

## CassQuery\_3\_3 ⇐ [<code>CassQuery</code>](#CassQuery)
<p>Creates CQL 3.3 compatible queries</p>

**Kind**: global class  
**Extends**: [<code>CassQuery</code>](#CassQuery)  

* [CassQuery_3_3](#CassQuery_3_3) ⇐ [<code>CassQuery</code>](#CassQuery)
    * [new CassQuery_3_3(type, options)](#new_CassQuery_3_3_new)
    * [.select(table, columns, where)](#CassQuery_3_3+select) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.insert(table, values)](#CassQuery_3_3+insert) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.update(table, set, where)](#CassQuery_3_3+update) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.delete(table, where)](#CassQuery_3_3+delete) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.values()](#CassQuery_3_3+values)
    * [.set()](#CassQuery_3_3+set)
    * [.whereObject(clause)](#CassQuery_3_3+whereObject) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)
    * [.whereString(field)](#CassQuery_3_3+whereString) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)
    * [.where(param)](#CassQuery_3_3+where) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)


* * *

<a name="new_CassQuery_3_3_new"></a>

### new CassQuery\_3\_3(type, options)

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | <p>select, insert, update, delete</p> |
| options | <code>Object</code> |  |
| options.table | <code>Object</code> | <p>Table to act upon</p> |
| options.columns | <code>Object</code> | <p>Columns to return, for select</p> |
| options.values | <code>Object</code> | <p>Values to update, insert</p> |
| options.set | <code>Object</code> | <p>See values</p> |
| options.where | <code>Object</code> | <p>Limit operation to these values</p> |


* * *

<a name="CassQuery_3_3+select"></a>

### cassQuery_3_3.select(table, columns, where) ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build a select query </p>
<pre class="prettyprint source"><code>select(table_name, columns_array, where_fields)</code></pre>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| columns | <code>string</code> \| <code>array</code> | <p>Column(s) to return</p> |
| where | <code>string</code> \| <code>object</code> | <p>Where clause</p> |


* * *

<a name="CassQuery_3_3+insert"></a>

### cassQuery_3_3.insert(table, values) ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build an insert query </p>
<pre class="prettyprint source"><code>insert(table_name, fields_values)</code></pre>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| values | <code>object</code> | <p>Column/Value pairs to insert</p> |


* * *

<a name="CassQuery_3_3+update"></a>

### cassQuery_3_3.update(table, set, where) ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build an update query </p>
<pre class="prettyprint source"><code>update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })</code></pre>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| set | <code>object</code> | <p>Column/Value pairs to set</p> |
| where | <code>string</code> \| <code>object</code> | <p>Where clause</p> |


* * *

<a name="CassQuery_3_3+delete"></a>

### cassQuery_3_3.delete(table, where) ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build a delete query </p>
<pre class="prettyprint source"><code>delete(table_name, { id: 'equals_some_id' })</code></pre>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| where | <code>string</code> \| <code>object</code> | <p>Where clause</p> |


* * *

<a name="CassQuery_3_3+values"></a>

### cassQuery_3_3.values()
<p>INSERT values</p>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

* * *

<a name="CassQuery_3_3+set"></a>

### cassQuery_3_3.set()
<p>UPDATE set</p>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

* * *

<a name="CassQuery_3_3+whereObject"></a>

### cassQuery_3_3.whereObject(clause) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)
<p>WHERE from an object</p>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| clause | <code>Object</code> | <p>Fields to match on for WHERE clause</p> |


* * *

<a name="CassQuery_3_3+whereString"></a>

### cassQuery_3_3.whereString(field) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)
<p>WHERE from a string</p>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>String</code> | <p>Name of the field</p> |


* * *

<a name="CassQuery_3_3+where"></a>

### cassQuery_3_3.where(param) ⇒ [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)
<p>Supply a string to start setting up a chain for a field. 
             Supply an object to setup a simple <code>field = value</code> clause.</p>

**Kind**: instance method of [<code>CassQuery\_3\_3</code>](#CassQuery_3_3)  
**Summary**: <p>Setup a WHERE clause</p>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>String</code> \| <code>Object</code> | <p>Field(s) to setup for WHERE clause</p> |


* * *

<a name="CassReplicationStrategy"></a>

## CassReplicationStrategy ⇐ [<code>CassMap</code>](#CassMap)
**Kind**: global class  
**Summary**: <p>Setup replication strategies</p>  
**Extends**: [<code>CassMap</code>](#CassMap)  

* [CassReplicationStrategy](#CassReplicationStrategy) ⇐ [<code>CassMap</code>](#CassMap)
    * [new CassReplicationStrategy(replication_class, data)](#new_CassReplicationStrategy_new)
    * [.name](#CassMap+name) : <code>String</code>
    * [.data](#CassMap+data) : <code>Object</code>
    * [.toCqlMap()](#CassMap+toCqlMap) ⇒ <code>String</code>
    * [.toCqlWith()](#CassMap+toCqlWith) ⇒ <code>String</code>
    * [.get(Name)](#CassMap+get) ⇒
    * [.set()](#CassMap+set)
    * [.add()](#CassMap+add)
    * [.delete()](#CassMap+delete)


* * *

<a name="new_CassReplicationStrategy_new"></a>

### new CassReplicationStrategy(replication_class, data)
<ul>
<li><a href="https://cassandra.apache.org/doc/latest/architecture/dynamo.html#replication-strategy">Architecture</a><ul>
<li><a href="https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsChangeKSStrategy.html">Alerting replication strategy</a></li>
</ul>
</li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| replication_class | <code>String</code> | <p>The replication class name to create</p> |
| data | <code>Object</code> | <p>The configuration data for the class</p> |


* * *

<a name="CassMap+name"></a>

### cassReplicationStrategy.name : <code>String</code>
<p>The name of the CQL Map, usually a paramater name before the Map data</p>

**Kind**: instance property of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+data"></a>

### cassReplicationStrategy.data : <code>Object</code>
<p>Data is where the map is stored</p>

**Kind**: instance property of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+toCqlMap"></a>

### cassReplicationStrategy.toCqlMap() ⇒ <code>String</code>
<p>Convert data to a CQL Map</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  
**Returns**: <code>String</code> - <p>Data as a CQL Map</p>  

* * *

<a name="CassMap+toCqlWith"></a>

### cassReplicationStrategy.toCqlWith() ⇒ <code>String</code>
<p>Convert to CQL with <code>name = {}</code></p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  
**Returns**: <code>String</code> - <p>Name = data as a CQL Map</p>  

* * *

<a name="CassMap+get"></a>

### cassReplicationStrategy.get(Name) ⇒
<p>Get map data for a field</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  
**Returns**: <p>Field definition</p>  

| Param | Type | Description |
| --- | --- | --- |
| Name | <code>String</code> | <p>of field to retrieve</p> |


* * *

<a name="CassMap+set"></a>

### cassReplicationStrategy.set()
<p>Set map data</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+add"></a>

### cassReplicationStrategy.add()
<p>Add new data</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+delete"></a>

### cassReplicationStrategy.delete()
<p>Delete map data</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassTable"></a>

## CassTable ⇐ [<code>CassEntity</code>](#CassEntity)
<p>Covers all operations to a table, like CREATE and ALTER</p>

**Kind**: global class  
**Extends**: [<code>CassEntity</code>](#CassEntity)  

* * *

<a name="new_CassTable_new"></a>

### new CassTable(name, options)
<p>Create a table instance with a name, fields and primary keys.</p>


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | <p>The table name all the operations within the [CassTable](#CassTable) instance.</p> |
| options | <code>Object</code> |  |
| options.fields | <code>Object</code> | <p>Field name, type defintion <code>{ name: { type: '' }}</code></p> |
| options.keyspace | <code>String</code> | <p>Keyspace for table</p> |
| options.primary_keys | <code>Array</code> | <p>Primary Keys</p> |
| options.replication | <code>object</code> | <p>Replication options for the table</p> |
| options.durable | <code>Boolean</code> | <p>Turn Durable on/off</p> |


* * *

<a name="CassType"></a>

## CassType
<p>Manage Custom Cassandra Types</p>

**Kind**: global class  

* [CassType](#CassType)
    * [new exports.CassType(name, fields)](#new_CassType_new)
    * _instance_
        * [.addField()](#CassType+addField) ⇒
    * _static_
        * [._classInit()](#CassType._classInit)
        * [.toCqlDrop()](#CassType.toCqlDrop)
        * [.toCqlAlter()](#CassType.toCqlAlter)
        * [.toCqlCreate()](#CassType.toCqlCreate)


* * *

<a name="new_CassType_new"></a>

### new exports.CassType(name, fields)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | <p>Name of Type</p> |
| fields | <code>Object</code> | <p>Field definitions for Type</p> |


* * *

<a name="CassType+addField"></a>

### cassType.addField() ⇒
<p>Add a field to the Type</p>

**Kind**: instance method of [<code>CassType</code>](#CassType)  
**Returns**: <p>this</p>  
**Params**: <code>String</code> field       - Name of the field to add  
**Params**: <code>Object</code> fields      - Definitions of the field to add  

* * *

<a name="CassType._classInit"></a>

### CassType.\_classInit()
**Kind**: static method of [<code>CassType</code>](#CassType)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| noun | <code>string</code> | <p>Set a generic prefix var, so users can subclass in the                                    their app (see [ClassDebug.extend](ClassDebug.extend))</p> |
| drop_cql | <code>string</code> | <p>CQL to DROP a TYPE</p> |
| create_cql | <code>string</code> | <p>CQL to CREATE a TYPE</p> |
| create_fields_cql | <code>string</code> | <p>CQL setup a field in CREATE</p> |


* * *

<a name="CassType.toCqlDrop"></a>

### CassType.toCqlDrop()
<p>Create a CQL <code>DROP TYPE</code> string</p>

**Kind**: static method of [<code>CassType</code>](#CassType)  
**Params**: <code>String</code> name - Name of the TYPE to drop  

* * *

<a name="CassType.toCqlAlter"></a>

### CassType.toCqlAlter()
<p>Create a CQL <code>ALTER TYPE</code> string</p>

**Kind**: static method of [<code>CassType</code>](#CassType)  
**Params**: <code>String</code> name - Name of the TYPE to drop  

* * *

<a name="CassType.toCqlCreate"></a>

### CassType.toCqlCreate()
<p>Create a CQL <code>CREATE TYPE</code> string</p>

**Kind**: static method of [<code>CassType</code>](#CassType)  
**Params**: <code>String</code> name             - Name of the TYPE to create  
**Params**: <code>Object</code> fields           - Field definitions to add to the TYPE  
**Params**: <code>Object</code> options          - Options to pass to CQL  
**Params**: <code>Boolean</code> options.exists  - Add exists clause  
**Params**: <code>String</code> options.keyspace - Set the keyspace to use  

* * *

<a name="Client"></a>

## Client
<p>Client for apps to interact with Cassandra</p>

**Kind**: global class  

* [Client](#Client)
    * [.client](#Client+client) : <code>CassandraDriver.Client</code>
    * [.keyspace](#Client+keyspace) : <code>String</code>
    * [.model_store](#Client+model_store) : [<code>ModelStore</code>](#ModelStore)
    * [.sync_models](#Client+sync_models)
    * [.connect()](#Client+connect) ⇒ <code>Array</code>
    * [.keyspaceDrop()](#Client+keyspaceDrop) ⇒ <code>ResultSet</code>
    * [.keyspaceCreate()](#Client+keyspaceCreate) ⇒ <code>ResultSet</code>
    * [.sync()](#Client+sync) ⇒ <code>ResultSet</code>
    * [.createTable(name, fields, primary_keys, fields)](#Client+createTable) ⇒ <code>ResultSet</code>
    * [.query(query, options)](#Client+query) ⇒ <code>ResultSet</code>
    * [.execute(query, params, options)](#Client+execute) ⇒ <code>ResultSet</code>
    * [.insert(table, values, options)](#Client+insert) ⇒ <code>ResultSet</code>
    * [.select(table, columns, where, options)](#Client+select) ⇒ <code>ResultSet</code>
    * [.update(table, values, where, options)](#Client+update) ⇒ <code>ResultSet</code>
    * [.delete(table, where, options)](#Client+delete) ⇒ <code>ResultSet</code>
    * [.disconnect()](#Client+disconnect) ⇒
    * [.getState()](#Client+getState) ⇒


* * *

<a name="Client+client"></a>

### client.client : <code>CassandraDriver.Client</code>
<p>The Cassandra driver client</p>

**Kind**: instance property of [<code>Client</code>](#Client)  

* * *

<a name="Client+keyspace"></a>

### client.keyspace : <code>String</code>
<p>The default keyspace</p>

**Kind**: instance property of [<code>Client</code>](#Client)  

* * *

<a name="Client+model_store"></a>

### client.model\_store : [<code>ModelStore</code>](#ModelStore)
<p>The model store for this client to lookup models with
Defaults to <code>Model.model_store</code></p>

**Kind**: instance property of [<code>Client</code>](#Client)  

* * *

<a name="Client+sync_models"></a>

### client.sync\_models
<p>The model store for this client to lookup models</p>

**Kind**: instance property of [<code>Client</code>](#Client)  

* * *

<a name="Client+connect"></a>

### client.connect() ⇒ <code>Array</code>
<p>Connect to the cassandra db</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Array</code> - <p>Connect, Create and optional Sync elements</p>  

* * *

<a name="Client+keyspaceDrop"></a>

### client.keyspaceDrop() ⇒ <code>ResultSet</code>
<p>Drop the default keyspace</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <p>Result of query</p>  

* * *

<a name="Client+keyspaceCreate"></a>

### client.keyspaceCreate() ⇒ <code>ResultSet</code>
<p>Create the default keyspace</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <p>Result of query</p>  

* * *

<a name="Client+sync"></a>

### client.sync() ⇒ <code>ResultSet</code>
<p>Synchronise all models to the default keyspace</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <p>Result of query</p>  

* * *

<a name="Client+createTable"></a>

### client.createTable(name, fields, primary_keys, fields) ⇒ <code>ResultSet</code>
<p>Create a table in the default keyspace</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <p>Result of query</p>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | <p>The tables name</p> |
| fields | <code>Object</code> | <p>The field/column definition to create</p> |
| primary_keys | <code>Array</code> | <p>The field/columns to use as primary keys</p> |
| fields | <code>Object</code> | <p>The field/column definition to create</p> |


* * *

<a name="Client+query"></a>

### client.query(query, options) ⇒ <code>ResultSet</code>
<p>Run a Query</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Query</code> | <p>Query object</p> |
| options | <code>object</code> | <p>Cassandra Driver query options</p> |


* * *

<a name="Client+execute"></a>

### client.execute(query, params, options) ⇒ <code>ResultSet</code>
<p>Execute a string query, and possible paramaters and Cassandra driver options.</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Execute a query string</p>  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | <p>Query string</p> |
| params | <code>array</code> | <p>Paramaters for the <code>?</code> in plain string query</p> |
| options | <code>object</code> | <p>Cassandra Driver query options</p> |


* * *

<a name="Client+insert"></a>

### client.insert(table, values, options) ⇒ <code>ResultSet</code>
<p>Execute a...</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Run an insert query</p>  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | <p>Name of the table to insert to</p> |
| values | <code>Object</code> | <p>field: value pairs to insert</p> |
| options | <code>object</code> | <p>Cassandra Driver query options</p> |


* * *

<a name="Client+select"></a>

### client.select(table, columns, where, options) ⇒ <code>ResultSet</code>
<p>Execute a...</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Run an select query</p>  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | <p>Name of the table to insert to</p> |
| columns | <code>Array</code> \| <code>String</code> | <p>The columns to return in the ResultSet</p> |
| where | <code>Object</code> | <p>Where clause to use</p> |
| options | <code>Object</code> | <p>Cassandra query options</p> |


* * *

<a name="Client+update"></a>

### client.update(table, values, where, options) ⇒ <code>ResultSet</code>
<p>Execute a...</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Run an update query</p>  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | <p>Name of the table to insert to</p> |
| values | <code>Object</code> | <p><code>field: value</code> pairs to update</p> |
| where | <code>Object</code> | <p>Where clause to use</p> |
| options | <code>Object</code> | <p>Cassandra query options</p> |


* * *

<a name="Client+delete"></a>

### client.delete(table, where, options) ⇒ <code>ResultSet</code>
<p>Execute a...</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Run an delete query</p>  
**Returns**: <code>ResultSet</code> - <p>Cassandra ResultSet</p>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | <p>Name of the table to insert to</p> |
| where | <code>Object</code> | <p>Where clause to use</p> |
| options | <code>Object</code> | <p>Cassandra query options</p> |


* * *

<a name="Client+disconnect"></a>

### client.disconnect() ⇒
**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Disconnect</p>  
**Returns**: <p>???</p>  

* * *

<a name="Client+getState"></a>

### client.getState() ⇒
**Kind**: instance method of [<code>Client</code>](#Client)  
**Summary**: <p>Get the state of the Cassandra client connection</p>  
**Returns**: <p>???</p>  

* * *

<a name="Model"></a>

## Model
<p>Model for apps to work with</p>

**Kind**: global class  

* [Model](#Model)
    * [new Model(data, options)](#new_Model_new)
    * _instance_
        * [.schema](#Model+schema)
        * [.hidden_fields](#Model+hidden_fields)
        * [.reserved_fields](#Model+reserved_fields)
        * [.buildPrimaryKeyWhere()](#Model+buildPrimaryKeyWhere)
        * [.execSave()](#Model+execSave)
        * [.execRemove()](#Model+execRemove)
        * [.toJSON()](#Model+toJSON)
    * _static_
        * [.table_name](#Model.table_name)
        * [.table](#Model.table)
        * [.client](#Model.client)
        * [.model_store](#Model.model_store) : [<code>ModelStore</code>](#ModelStore)
        * [.schema](#Model.schema)
        * [.hidden_fields](#Model.hidden_fields)
        * [.primary_keys](#Model.primary_keys)
        * [.generate()](#Model.generate)
        * [.applySchema()](#Model.applySchema)
        * [.store()](#Model.store)
        * [.sync()](#Model.sync)
        * [.select()](#Model.select)
        * [.findOne()](#Model.findOne)
        * [.insert()](#Model.insert)
        * [.update()](#Model.update)
        * [.delete()](#Model.delete)


* * *

<a name="new_Model_new"></a>

### new Model(data, options)
<p>new Model</p>


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>Data to populate the Model with</p> |
| options | <code>Object</code> | <p>Metadata for the Model instance</p> |
| options.new | <code>Object</code> | <p>Is this new or existing data</p> |


* * *

<a name="Model+schema"></a>

### model.schema
<p>The main schema for the Model</p>

**Kind**: instance property of [<code>Model</code>](#Model)  

* * *

<a name="Model+hidden_fields"></a>

### model.hidden\_fields
<p>Fields to hide from JSON outpu</p>

**Kind**: instance property of [<code>Model</code>](#Model)  

* * *

<a name="Model+reserved_fields"></a>

### model.reserved\_fields
<p>JS name that would collide with the Model instance fields</p>

**Kind**: instance property of [<code>Model</code>](#Model)  

* * *

<a name="Model+buildPrimaryKeyWhere"></a>

### model.buildPrimaryKeyWhere()
<p>Build a where clause based on primary key</p>

**Kind**: instance method of [<code>Model</code>](#Model)  

* * *

<a name="Model+execSave"></a>

### model.execSave()
<p>Save this instance to the database</p>

**Kind**: instance method of [<code>Model</code>](#Model)  

* * *

<a name="Model+execRemove"></a>

### model.execRemove()
<p>Remove this instance from the database</p>

**Kind**: instance method of [<code>Model</code>](#Model)  

* * *

<a name="Model+toJSON"></a>

### model.toJSON()
<p>Convert data to JSON, taking account of hidden fields</p>

**Kind**: instance method of [<code>Model</code>](#Model)  

* * *

<a name="Model.table_name"></a>

### Model.table\_name
<p>Name for the table</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.table"></a>

### Model.table
<p>CassTable</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.client"></a>

### Model.client
<p>Store a cassandera client</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.model_store"></a>

### Model.model\_store : [<code>ModelStore</code>](#ModelStore)
<p>A custom store can be created and added when generating a new model.</p>

**Kind**: static property of [<code>Model</code>](#Model)  
**Summary**: <p>The default store for all generated Models</p>  

* * *

<a name="Model.schema"></a>

### Model.schema
<p>Store the schema</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.hidden_fields"></a>

### Model.hidden\_fields
<p>Hidden fields in the schema (should this be in Schema?)</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.primary_keys"></a>

### Model.primary\_keys
<p>Hidden fields in the schema (should this be in Schema?)</p>

**Kind**: static property of [<code>Model</code>](#Model)  

* * *

<a name="Model.generate"></a>

### Model.generate()
<p>Generate a new extended version of Model for a Schema</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.applySchema"></a>

### Model.applySchema()
<p>Apply a Schema setup to this Model</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.store"></a>

### Model.store()
<p>Store this model instance in the configured model store</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.sync"></a>

### Model.sync()
<p>Sync a table definition to the cassandra server</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.select"></a>

### Model.select()
<p>Select from this Model</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.findOne"></a>

### Model.findOne()
<p>Select one from this Model</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.insert"></a>

### Model.insert()
<p>Insert a new Model instance into the database</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.update"></a>

### Model.update()
<p>Update an instance of this model</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.delete"></a>

### Model.delete()
<p>Delete an instance of this model</p>

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="ModelStore"></a>

## ModelStore
<p>A Model Storage area to make setup easier</p>

**Kind**: global class  

* [ModelStore](#ModelStore)
    * [new exports.ModelStore(label, options)](#new_ModelStore_new)
    * _instance_
        * [.add()](#ModelStore+add)
        * [.get()](#ModelStore+get)
        * [.sync()](#ModelStore+sync)
    * _static_
        * [.default_store](#ModelStore.default_store) : [<code>ModelStore</code>](#ModelStore)


* * *

<a name="new_ModelStore_new"></a>

### new exports.ModelStore(label, options)
<p>new ModelStore</p>


| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | <p>required         - Label for the store</p> |
| options | <code>Object</code> | <p>Metadata for the Model instance</p> |
| options.models | <code>Array</code> \| <code>Object</code> | <p>Collection of models to add</p> |


* * *

<a name="ModelStore+add"></a>

### modelStore.add()
<p>Add a model to the store</p>

**Kind**: instance method of [<code>ModelStore</code>](#ModelStore)  

* * *

<a name="ModelStore+get"></a>

### modelStore.get()
<p>Get a model by name</p>

**Kind**: instance method of [<code>ModelStore</code>](#ModelStore)  

* * *

<a name="ModelStore+sync"></a>

### modelStore.sync()
<p>Sync all table definitions to cassandra</p>

**Kind**: instance method of [<code>ModelStore</code>](#ModelStore)  

* * *

<a name="ModelStore.default_store"></a>

### ModelStore.default\_store : [<code>ModelStore</code>](#ModelStore)
<p>A Module singleton default store</p>

**Kind**: static property of [<code>ModelStore</code>](#ModelStore)  

* * *

<a name="Paramaters"></a>

## Paramaters
<p>Paramaters for other classes to import</p>

**Kind**: global class  

* [Paramaters](#Paramaters)
    * [._classInit()](#Paramaters._classInit)
    * [.checkType(type_name)](#Paramaters.checkType) ⇒ <code>String</code>


* * *

<a name="Paramaters._classInit"></a>

### Paramaters.\_classInit()
**Kind**: static method of [<code>Paramaters</code>](#Paramaters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| debug | <code>string</code> | <p>A <code>debug</code> instance for the class</p> |
| types | <code>string</code> | <p>Cassandra data types from datastax driver</p> |
| reserved_fields | <code>string</code> | <p>Model field names that are not allowed</p> |
| warning_fields | <code>string</code> | <p>Model field names that generate a warning</p> |
| fmt_identifier_str | <code>string</code> | <p>String re for CQL Identifiers</p> |
| fmt_identifier_re | <code>string</code> | <p>Regex for CQL Identifiers</p> |
| fmt_identifier_all_re | <code>string</code> | <p>Regex for string start to end CQL Identifiers</p> |


* * *

<a name="Paramaters.checkType"></a>

### Paramaters.checkType(type_name) ⇒ <code>String</code>
<p>Map any of our type aliases into Cassandra types</p>

**Kind**: static method of [<code>Paramaters</code>](#Paramaters)  
**Returns**: <code>String</code> - <ul>
<li>The actual type name</li>
</ul>  
**Throws**:

- [<code>CassException</code>](#CassException) <ul>
<li>On an unknown type name</li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| type_name | <code>String</code> | <p>Name of the data type to check</p> |


* * *

<a name="Schema"></a>

## Schema
<p>Schema for apps to build into Models</p>

**Kind**: global class  

* [Schema](#Schema)
    * [new exports.Schema(config)](#new_Schema_new)
    * _instance_
        * [.debug](#Schema+debug) : <code>function</code>
        * [.data_types](#Schema+data_types) : <code>Array</code>
        * [.dates](#Schema+dates) : <code>Boolean</code>
        * [.soft_delete](#Schema+soft_delete) : <code>Boolean</code>
        * [.config](#Schema+config) : <code>Object</code>
        * [.primary_keys](#Schema+primary_keys) : <code>Array</code>
        * [.column_types](#Schema+column_types) : <code>Array</code>
        * [.columns](#Schema+columns) : <code>Object</code>
        * [.forEach(fn)](#Schema+forEach)
    * _static_
        * [.debug](#Schema.debug) : <code>function</code>
        * [.reserved_fields](#Schema.reserved_fields) : <code>Array</code>
        * [.warning_fields](#Schema.warning_fields) : <code>Array</code>
        * [.data_types](#Schema.data_types) : <code>Array</code>


* * *

<a name="new_Schema_new"></a>

### new exports.Schema(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | <p>The Schema config object <code>{ field: { type: 'x' }</code></p> |


* * *

<a name="Schema+debug"></a>

### schema.debug : <code>function</code>
<p>A <code>debug</code> instance for the class instance</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+data_types"></a>

### schema.data\_types : <code>Array</code>
<p>Cassandra data types from datastax driver</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+dates"></a>

### schema.dates : <code>Boolean</code>
<p>Schema adds created/modified data handlers</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+soft_delete"></a>

### schema.soft\_delete : <code>Boolean</code>
<p>Schema track deletes rathe than deleting data</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+config"></a>

### schema.config : <code>Object</code>
<p>The schemas config object</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+primary_keys"></a>

### schema.primary\_keys : <code>Array</code>
<p>All primary keys for the schema</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+column_types"></a>

### schema.column\_types : <code>Array</code>
<p>All columns in an array</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+columns"></a>

### schema.columns : <code>Object</code>
<p>All columns types, keyed by name</p>

**Kind**: instance property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema+forEach"></a>

### schema.forEach(fn)
<p>Run a function for each schema config item</p>

**Kind**: instance method of [<code>Schema</code>](#Schema)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>The function to run</p> |


* * *

<a name="Schema.debug"></a>

### Schema.debug : <code>function</code>
<p>A <code>debug</code> instance for the class</p>

**Kind**: static property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema.reserved_fields"></a>

### Schema.reserved\_fields : <code>Array</code>
<p>Model field names that are not allowed</p>

**Kind**: static property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema.warning_fields"></a>

### Schema.warning\_fields : <code>Array</code>
<p>Model field names that generate a warning</p>

**Kind**: static property of [<code>Schema</code>](#Schema)  

* * *

<a name="Schema.data_types"></a>

### Schema.data\_types : <code>Array</code>
<p>Cassandra data types from datastax driver</p>

**Kind**: static property of [<code>Schema</code>](#Schema)  

* * *

<a name="Util"></a>

## Util
<p>Utility class, templating and CQL maps</p>

**Kind**: global class  

* [Util](#Util)
    * [.template(str)](#Util.template) ⇒ <code>String</code>
    * [.templateArgs(str, ...params)](#Util.templateArgs) ⇒ <code>String</code>
    * [.compileArgsTemplate(str, options)](#Util.compileArgsTemplate) ⇒ <code>function</code>
    * [.templateArray(str, params)](#Util.templateArray) ⇒ <code>String</code>
    * [.compileArrayTemplate(str, options)](#Util.compileArrayTemplate) ⇒ <code>function</code>
    * [.templateObject(str, params)](#Util.templateObject) ⇒ <code>String</code>
    * [.compileObjectTemplate(str, options)](#Util.compileObjectTemplate) ⇒ <code>function</code>
    * [.templateObjectDeep(str, params_deep)](#Util.templateObjectDeep) ⇒ <code>String</code>
    * [.objectToCqlMap(obj)](#Util.objectToCqlMap) ⇒ <code>String</code>
    * [.arrayToCqlMap(arr)](#Util.arrayToCqlMap) ⇒ <code>String</code>
    * [.valueToCqlMap(value)](#Util.valueToCqlMap) ⇒ <code>String</code>


* * *

<a name="Util.template"></a>

### Util.template(str) ⇒ <code>String</code>
<p>Generic entry function to each type of template function</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>String</code> - <ul>
<li>String with template params replaced</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | <p>Template string</p> |
| ...args | <code>\*</code> | <p>Array or Object or arguments</p> |


* * *

<a name="Util.templateArgs"></a>

### Util.templateArgs(str, ...params) ⇒ <code>String</code>
<p>Template a string with function arguments, in order</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>String</code> - <ul>
<li>String with template params replaced</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | <p>Template string</p> |
| ...params | <code>String</code> | <p>Strings to replace in template</p> |


* * *

<a name="Util.compileArgsTemplate"></a>

### Util.compileArgsTemplate(str, options) ⇒ <code>function</code>
<p>If you have a common template string that is replaced a
lot, compile it first to remove some of the repeated string
processing.</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>function</code> - <p>Templating function</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>Template string to compile <code>a {{param}} replacer</code></p> |
| options | <code>object</code> | <p>Options</p> |
| options.re | <code>RegExp</code> | <p>Regular Expression for the param tags to be replaced</p> |


* * *

<a name="Util.templateArray"></a>

### Util.templateArray(str, params) ⇒ <code>String</code>
<p>Template a string with an array of params</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>String</code> - <ul>
<li>String with template params replaced</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | <p>Template string</p> |
| params | <code>Array</code> | <p>Array of params for template string</p> |


* * *

<a name="Util.compileArrayTemplate"></a>

### Util.compileArrayTemplate(str, options) ⇒ <code>function</code>
<p>If you have a common template string that is replaced a
lot, compile it first to remove some of the repeated string
processing.</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>function</code> - <p>Templating function</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>Template string to compile <code>a {{param}} replacer</code></p> |
| options | <code>object</code> | <p>Options</p> |
| options.re | <code>RegExp</code> | <p>Regular Expression for the param tags to be replaced</p> |


* * *

<a name="Util.templateObject"></a>

### Util.templateObject(str, params) ⇒ <code>String</code>
<p>Plain string param names  only <code>{{whatever}}</code> or <code>{{what_ever}}</code></p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>String</code> - <ul>
<li>String with template params replaced</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | <p>Template string</p> |
| params | <code>Object</code> | <p>Key/Value pairs matching template param names</p> |


* * *

<a name="Util.compileObjectTemplate"></a>

### Util.compileObjectTemplate(str, options) ⇒ <code>function</code>
<p>If you have a common template string that is replaced a
lot, compile it first to remove some of the repeated string
processing.
When supplying your own template paramater regular expression, <code>{ re: /({{(\w+?)}})/ }</code>
there must be two capture groups. The first for the entire tag, the second for the &quot;word&quot;
to be looked up in the eventual template paramaters object.</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>function</code> - <p>Templating function</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>Template string to compile <code>a {{param}} replacer</code></p> |
| options | <code>object</code> | <p>Options</p> |
| options.re | <code>RegExp</code> | <p>Regular Expression for the param tags to be replaced</p> |


* * *

<a name="Util.templateObjectDeep"></a>

### Util.templateObjectDeep(str, params_deep) ⇒ <code>String</code>
<p>Support <code>one.two</code> and <code>one[1]</code> lodash <code>get</code> syntax to fetch nested properties.</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>String</code> - <ul>
<li>Templated string</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | <p>Template string</p> |
| params_deep | <code>Object</code> | <p>Object matching template params</p> |


* * *

<a name="Util.objectToCqlMap"></a>

### Util.objectToCqlMap(obj) ⇒ <code>String</code>
<p>Turn a JS object into a CQL map string.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>Object to convert to a CQL Map</p> |


* * *

<a name="Util.arrayToCqlMap"></a>

### Util.arrayToCqlMap(arr) ⇒ <code>String</code>
<p>Turn a JS array into a CQL map string.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | <p>Object to convert to a CQL Map</p> |


* * *

<a name="Util.valueToCqlMap"></a>

### Util.valueToCqlMap(value) ⇒ <code>String</code>
<p>CQL is all not quite JSON :/</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | <p>Value to convert to CQL Map</p> |


* * *

<a name="ClientOptions"></a>

## ClientOptions : <code>Object</code>
<p>Client options</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keyspace | <code>String</code> | <p>The keyspace for all the operations within the [Client](#Client) instance.</p> |


* * *

