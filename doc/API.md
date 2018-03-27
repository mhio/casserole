## Classes

<dl>
<dt><a href="#CassCql">CassCql</a></dt>
<dd><p>Base class for other CQL implementations to extend</p></dd>
<dt><a href="#CassEntity">CassEntity</a></dt>
<dd><p>Base entity class for specific CQL entities to extend</p></dd>
<dt><a href="#CassError">CassError</a></dt>
<dd><p>Extended Error classes for Casserole</p></dd>
<dt><a href="#CassKeyspace">CassKeyspace</a></dt>
<dd></dd>
<dt><a href="#CassMap">CassMap</a></dt>
<dd><p>Base class for other CQL Map implementations to extend</p></dd>
<dt><a href="#CassQuery">CassQuery</a></dt>
<dd><p>Base class for versioned Query implementations to extend</p></dd>
<dt><a href="#CassQuery_3_3">CassQuery_3_3</a></dt>
<dd><p>Creates CQL 3.3 compatible queries</p></dd>
<dt><a href="#CassReplicationStrategy">CassReplicationStrategy</a></dt>
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

## CassEntity
<p>Base entity class for specific CQL entities to extend</p>

**Kind**: global class  

* * *

<a name="CassError"></a>

## CassError
<p>Extended Error classes for Casserole</p>

**Kind**: global class  

* * *

<a name="CassKeyspace"></a>

## CassKeyspace
**Kind**: global class  
**Summary**: <p>Manage a Cassandra Keyspace</p>  

* * *

<a name="new_CassKeyspace_new"></a>

### new CassKeyspace()
<pre class="prettyprint source"><code>    CREATE KEYSPACE [ IF NOT EXISTS ] keyspace_name WITH options
    options ::=  option ( AND option )*
    option  ::=  identifier '=' ( identifier | constant | map_literal )

    CREATE  KEYSPACE [IF NOT EXISTS] keyspace_name 
       WITH REPLICATION = { 
          'class' : 'SimpleStrategy', 'replication_factor' : N } 
         | 'class' : 'NetworkTopologyStrategy', 
           'dc1_name' : N [, ...] 
       }
       [AND DURABLE_WRITES =  true|false] ;

    ALTER  KEYSPACE keyspace_name 
     WITH REPLICATION = { 
        'class' : 'SimpleStrategy', 'replication_factor' : N  
       | 'class' : 'NetworkTopologyStrategy', 'dc1_name' : N [, ...] 
     }
     [AND DURABLE_WRITES =  true|false] ;

    DROP KEYSPACE [IF EXISTS] keyspace_name</code></pre>


* * *

<a name="CassMap"></a>

## CassMap
<p>Base class for other CQL Map implementations to extend</p>

**Kind**: global class  

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

<a name="CassQuery"></a>

## CassQuery
<p>Base class for versioned Query implementations to extend</p>

**Kind**: global class  

* * *

<a name="CassQuery_3_3"></a>

## CassQuery_3_3
<p>Creates CQL 3.3 compatible queries</p>

**Kind**: global class  

* [CassQuery_3_3](#CassQuery_3_3)
    * [.select()](#CassQuery_3_3+select) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.insert()](#CassQuery_3_3+insert) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.update()](#CassQuery_3_3+update) ⇒ [<code>CassQuery</code>](#CassQuery)
    * [.delete()](#CassQuery_3_3+delete) ⇒ [<code>CassQuery</code>](#CassQuery)


* * *

<a name="CassQuery_3_3+select"></a>

### cassQuery_3_3.select() ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build a select query </p>
<pre class="prettyprint source"><code>select(table_name, columns_array, where_fields)</code></pre>

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>string\|array</code> columns - Column(s) to return  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="CassQuery_3_3+insert"></a>

### cassQuery_3_3.insert() ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build an insert query </p>
<pre class="prettyprint source"><code>insert(table_name, fields_values)</code></pre>

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>object</code> values - Column/Value pairs to insert  

* * *

<a name="CassQuery_3_3+update"></a>

### cassQuery_3_3.update() ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build an update query </p>
<pre class="prettyprint source"><code>update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })</code></pre>

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>object</code> set - Column/Value pairs to set  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="CassQuery_3_3+delete"></a>

### cassQuery_3_3.delete() ⇒ [<code>CassQuery</code>](#CassQuery)
<p>Build a delete query </p>
<pre class="prettyprint source"><code>delete(table_name, { id: 'equals_some_id' })</code></pre>

**Kind**: instance method of [<code>CassQuery_3_3</code>](#CassQuery_3_3)  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="CassReplicationStrategy"></a>

## CassReplicationStrategy
**Kind**: global class  

* * *

<a name="new_CassReplicationStrategy_new"></a>

### new CassReplicationStrategy()
<p>https://cassandra.apache.org/doc/latest/architecture/dynamo.html#replication-strategy
    https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsChangeKSStrategy.html</p>


* * *

<a name="CassTable"></a>

## CassTable
<p>Covers all operations to a table, like CREATE and ALTER</p>

**Kind**: global class  

* * *

<a name="new_CassTable_new"></a>

### new CassTable(name, options)
<p>new Client</p>


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | <p>The table name all the operations within the [CassTable](#CassTable) instance.</p> |
| options | <code>Object</code> |  |
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
<p>Create, drop and alter custom Cassandra types.</p>
<pre class="prettyprint source"><code>  CREATE TYPE [IF NOT EXISTS] 
  keyspace_name.type_name(
  field_name cql_datatype[,] 
  [field_name cql_datatype] [,...]
  )

  DROP TYPE [IF EXISTS] keyspace_name.type_name

  ALTER TYPE field_name 
  [ALTER field_name TYPE new_cql_datatype
  | ADD (field_name cql_datatype[,...])
  | RENAME field_name TO new_field_name[AND ...]]</code></pre>


* * *

<a name="Client"></a>

## Client
<p>Client for apps to interact with Cassandra</p>

**Kind**: global class  

* [Client](#Client)
    * [.query()](#Client+query) ⇒ <code>ResultSet</code>
    * [.execute()](#Client+execute) ⇒ <code>ResultSet</code>


* * *

<a name="Client+query"></a>

### client.query() ⇒ <code>ResultSet</code>
<p>Run a Query</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <ul>
<li>Cassandra ResultSet</li>
</ul>  
**Params**: <code>Query</code> query - Query object  
**Params**: <code>object</code> options - Cassandra Driver query options  

* * *

<a name="Client+execute"></a>

### client.execute() ⇒ <code>ResultSet</code>
<ul>
<li>Execute a string query, and possible paramaters and Cassandra driver options.</li>
</ul>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>ResultSet</code> - <ul>
<li>Cassandra ResultSet</li>
</ul>  
**Params**: <code>string</code> query - Query string  
**Params**: <code>array</code> params - Params for a plain string query  
**Params**: <code>object</code> options - Cassandra Driver query options  

* * *

<a name="Model"></a>

## Model
<p>Model for apps to work with</p>

**Kind**: global class  

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
    * [.template()](#Util.template)
    * [.templateArgs()](#Util.templateArgs) ⇒ <code>string</code>
    * [.templateArray()](#Util.templateArray) ⇒ <code>string</code>
    * [.templateObject()](#Util.templateObject) ⇒ <code>string</code>
    * [.templateObjectDeep()](#Util.templateObjectDeep) ⇒ <code>string</code>
    * [.objectToCqlMap()](#Util.objectToCqlMap)
    * [.arrayToCqlMap()](#Util.arrayToCqlMap)
    * [.valueToCqlMap()](#Util.valueToCqlMap)


* * *

<a name="Util.template"></a>

### Util.template()
<p>Generic entry function to each type of template function</p>

**Kind**: static method of [<code>Util</code>](#Util)  

* * *

<a name="Util.templateArgs"></a>

### Util.templateArgs() ⇒ <code>string</code>
<p>Template a string with function arguments, in order</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str - Template string  
**Params**: <code>string</code>  

* * *

<a name="Util.templateArray"></a>

### Util.templateArray() ⇒ <code>string</code>
<p>Template a string with an array of params</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str - Template string  
**Params**: <code>array</code> params -  

* * *

<a name="Util.templateObject"></a>

### Util.templateObject() ⇒ <code>string</code>
<p>Plain string param names  only <code>{{whatever}}</code> or <code>{{what_ever}}</code></p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str     - Template string  
**Params**: <code>object</code> params  - Key/Value paris matching template params  

* * *

<a name="Util.templateObjectDeep"></a>

### Util.templateObjectDeep() ⇒ <code>string</code>
<p>Support <code>one.two</code> and <code>one[1]</code> lodash <code>get</code> syntax to fetch nested properties.</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str         - Template string  
**Params**: <code>object</code> params_deep - Object matching template params  

* * *

<a name="Util.objectToCqlMap"></a>

### Util.objectToCqlMap()
<p>Turn a JS object into a CQL map string.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

* * *

<a name="Util.arrayToCqlMap"></a>

### Util.arrayToCqlMap()
<p>Turn a JS array into a CQL map string.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

* * *

<a name="Util.valueToCqlMap"></a>

### Util.valueToCqlMap()
<p>CQL is all not quite JSON :/</p>

**Kind**: static method of [<code>Util</code>](#Util)  
**Summary**: <p>Turn a JS value into a CQL map string</p>  

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

