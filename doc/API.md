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
<dt><a href="#CassTable">CassTable</a></dt>
<dd><p>Covers all operations to a table, like CREATE and ALTER</p></dd>
<dt><a href="#CassType">CassType</a></dt>
<dd></dd>
<dt><a href="#Client">Client</a></dt>
<dd><p>Client for apps to interact with Cassandra</p></dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>Model for apps to work with</p></dd>
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
    * [new CassMap(data, options)](#new_CassMap_new)
    * [.name](#CassMap+name)
    * [.data](#CassMap+data)
    * [.toCqlMap()](#CassMap+toCqlMap)
    * [.toCqlWith()](#CassMap+toCqlWith)
    * [.get()](#CassMap+get)
    * [.set()](#CassMap+set)
    * [.add()](#CassMap+add)
    * [.delete()](#CassMap+delete)


* * *

<a name="new_CassMap_new"></a>

### new CassMap(data, options)
<p>new CassMap</p>


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>JS Data to build the map from</p> |
| options | <code>Object</code> |  |
| options.name | <code>String</code> | <p>Name for the map</p> |


* * *

<a name="CassMap+name"></a>

### cassMap.name
<p>Name is for the CQL paramater name outside the Map</p>

**Kind**: instance property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+data"></a>

### cassMap.data
<p>Data is where the map is stored</p>

**Kind**: instance property of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+toCqlMap"></a>

### cassMap.toCqlMap()
<p>Convert data to a CQL Map</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+toCqlWith"></a>

### cassMap.toCqlWith()
<p>Convert to CQL with <code>name = {}</code></p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

* * *

<a name="CassMap+get"></a>

### cassMap.get()
<p>Get map data</p>

**Kind**: instance method of [<code>CassMap</code>](#CassMap)  

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

<a name="CassQuery"></a>

## CassQuery ⇐ [<code>CassCql</code>](#CassCql)
<p>Base class for versioned Query implementations to extend</p>

**Kind**: global class  
**Extends**: [<code>CassCql</code>](#CassCql)  

* * *

<a name="CassQuery_3_3"></a>

## CassQuery_3_3 ⇐ [<code>CassQuery</code>](#CassQuery)
<p>Creates CQL 3.3 compatible queries</p>

**Kind**: global class  
**Extends**: [<code>CassQuery</code>](#CassQuery)  

* [CassQuery_3_3](#CassQuery_3_3) ⇐ [<code>CassQuery</code>](#CassQuery)
    * [new CassQuery_3_3(type, options)](#new_CassQuery_3_3_new)
    * [.select(table, columns, where)](#CassQuery_3_3+select) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.insert(table, values)](#CassQuery_3_3+insert) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.update(table, set, where)](#CassQuery_3_3+update) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.delete(table, where)](#CassQuery_3_3+delete) ⇒ [<code>CassQuery</code>](#CassQuery)


* * *

<a name="new_CassQuery_3_3_new"></a>

### new CassQuery_3_3(type, options)

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

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  

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

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| values | <code>object</code> | <p>Column/Value pairs to insert</p> |


* * *

<a name="CassQuery_3_3+update"></a>

### cassQuery_3_3.update(table, set, where) ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build an update query </p>
<pre class="prettyprint source"><code>update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })</code></pre>

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  

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

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | <p>Table to select from</p> |
| where | <code>string</code> \| <code>object</code> | <p>Where clause</p> |


* * *

<a name="CassReplicationStrategy"></a>

## CassReplicationStrategy ⇐ [<code>CassMap</code>](#CassMap)
**Kind**: global class  
**Summary**: <p>Setup replication strategies</p>  
**Extends**: [<code>CassMap</code>](#CassMap)  

* [CassReplicationStrategy](#CassReplicationStrategy) ⇐ [<code>CassMap</code>](#CassMap)
    * [new CassReplicationStrategy(replication_class, data)](#new_CassReplicationStrategy_new)
    * [.name](#CassMap+name)
    * [.data](#CassMap+data)
    * [.toCqlMap()](#CassMap+toCqlMap)
    * [.toCqlWith()](#CassMap+toCqlWith)
    * [.get()](#CassMap+get)
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

### cassReplicationStrategy.name
<p>Name is for the CQL paramater name outside the Map</p>

**Kind**: instance property of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+data"></a>

### cassReplicationStrategy.data
<p>Data is where the map is stored</p>

**Kind**: instance property of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+toCqlMap"></a>

### cassReplicationStrategy.toCqlMap()
<p>Convert data to a CQL Map</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+toCqlWith"></a>

### cassReplicationStrategy.toCqlWith()
<p>Convert to CQL with <code>name = {}</code></p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

* * *

<a name="CassMap+get"></a>

### cassReplicationStrategy.get()
<p>Get map data</p>

**Kind**: instance method of [<code>CassReplicationStrategy</code>](#CassReplicationStrategy)  

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

## CassTable
<p>Covers all operations to a table, like CREATE and ALTER</p>

**Kind**: global class  

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
**Kind**: global class  
**Summary**: <p>Manage Cassandra Types</p>  

* * *

<a name="new_CassType_new"></a>

### new CassType()
<p>Create, Drop and Alter custom Cassandra types.</p>


* * *

<a name="Client"></a>

## Client
<p>Client for apps to interact with Cassandra</p>

**Kind**: global class  

* [Client](#Client)
    * [.query(query, options)](#Client+query) ⇒ <code>ResultSet</code>
    * [.execute(query, params, options)](#Client+execute) ⇒ <code>ResultSet</code>


* * *

<a name="Client+query"></a>

### client.query(query, options) ⇒ <code>ResultSet</code>
<p>Run a Query</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <ul>
<li>Cassandra ResultSet</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Query</code> | <p>Query object</p> |
| options | <code>object</code> | <p>Cassandra Driver query options</p> |


* * *

<a name="Client+execute"></a>

### client.execute(query, params, options) ⇒ <code>ResultSet</code>
<ul>
<li>Execute a string query, and possible paramaters and Cassandra driver options.</li>
</ul>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <ul>
<li>Cassandra ResultSet</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | <p>Query string</p> |
| params | <code>array</code> | <p>Params for a plain string query</p> |
| options | <code>object</code> | <p>Cassandra Driver query options</p> |


* * *

<a name="Model"></a>

## Model
<p>Model for apps to work with</p>

**Kind**: global class  

* [Model](#Model)
    * [new Model(data, options)](#new_Model_new)
    * _instance_
        * [.buildPrimaryKeyWhere()](#Model+buildPrimaryKeyWhere)
        * [.execSave()](#Model+execSave)
        * [.execRemove()](#Model+execRemove)
        * [.toJSON()](#Model+toJSON)
    * _static_
        * [.applySchema()](#Model.applySchema)
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

<a name="Model.applySchema"></a>

### Model.applySchema()
<p>Apply a Schema setup to this Model</p>

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

<a name="Schema"></a>

## Schema
<p>Schema for apps to build into Models</p>

**Kind**: global class  

* * *

<a name="Util"></a>

## Util
<p>Utility class, templating and CQL maps</p>

**Kind**: global class  

* [Util](#Util)
    * [.template(str)](#Util.template) ⇒ <code>String</code>
    * [.templateArgs(str, ...params)](#Util.templateArgs) ⇒ <code>String</code>
    * [.templateArray(str, params)](#Util.templateArray) ⇒ <code>String</code>
    * [.templateObject(str, params)](#Util.templateObject) ⇒ <code>String</code>
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

