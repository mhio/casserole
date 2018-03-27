## Functions

<dl>
<dt><a href="#select">select()</a> ⇒ <code>CassQuery</code></dt>
<dd><p><p>Build a select query </p></p>
<pre class="prettyprint source"><code>select(table_name, columns_array, where_fields)</code></pre></dd>
<dt><a href="#insert">insert()</a> ⇒ <code>CassQuery</code></dt>
<dd><p><p>Build an insert query </p></p>
<pre class="prettyprint source"><code>insert(table_name, fields_values)</code></pre></dd>
<dt><a href="#update">update()</a> ⇒ <code>CassQuery</code></dt>
<dd><p><p>Build an update query </p></p>
<pre class="prettyprint source"><code>update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })</code></pre></dd>
<dt><a href="#delete">delete()</a> ⇒ <code>CassQuery</code></dt>
<dd><p><p>Build a delete query </p></p>
<pre class="prettyprint source"><code>delete(table_name, { id: 'equals_some_id' })</code></pre></dd>
<dt><a href="#template">template()</a></dt>
<dd><p>Generic entry function to each type of template function</p></dd>
<dt><a href="#templateArgs">templateArgs()</a> ⇒ <code>string</code></dt>
<dd><p>Template a string with function arguments, in order</p></dd>
<dt><a href="#templateArray">templateArray()</a> ⇒ <code>string</code></dt>
<dd><p>Template a string with an array of params</p></dd>
<dt><a href="#templateObject">templateObject()</a> ⇒ <code>string</code></dt>
<dd><p>Plain string param names  only <code>{{whatever}}</code> or <code>{{what_ever}}</code></p></dd>
<dt><a href="#templateObjectDeep">templateObjectDeep()</a> ⇒ <code>string</code></dt>
<dd><p>Support <code>one.two</code> and <code>one[1]</code> lodash <code>get</code> syntax to fetch nested properties.</p></dd>
<dt><a href="#objectToCqlMap">objectToCqlMap()</a></dt>
<dd><p>Turn a JS object into a CQL map string.</p></dd>
<dt><a href="#arrayToCqlMap">arrayToCqlMap()</a></dt>
<dd><p>Turn a JS array into a CQL map string.</p></dd>
<dt><a href="#valueToCqlMap">valueToCqlMap()</a></dt>
<dd><p>CQL is all not quite JSON :/</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ClientOptions">ClientOptions</a> : <code>Object</code></dt>
<dd><p>Client options</p></dd>
</dl>

<a name="select"></a>

## select() ⇒ <code>CassQuery</code>
<p>Build a select query </p>
<pre class="prettyprint source"><code>select(table_name, columns_array, where_fields)</code></pre>

**Kind**: global function  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>string\|array</code> columns - Column(s) to return  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="insert"></a>

## insert() ⇒ <code>CassQuery</code>
<p>Build an insert query </p>
<pre class="prettyprint source"><code>insert(table_name, fields_values)</code></pre>

**Kind**: global function  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>object</code> values - Column/Value pairs to insert  

* * *

<a name="update"></a>

## update() ⇒ <code>CassQuery</code>
<p>Build an update query </p>
<pre class="prettyprint source"><code>update('table_name', { column: 'new_value' }, { id: 'equals_some_id' })</code></pre>

**Kind**: global function  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>object</code> set - Column/Value pairs to set  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="delete"></a>

## delete() ⇒ <code>CassQuery</code>
<p>Build a delete query </p>
<pre class="prettyprint source"><code>delete(table_name, { id: 'equals_some_id' })</code></pre>

**Kind**: global function  
**Params**: <code>string</code> table - Table to select from  
**Params**: <code>string\|object</code> where - Where clause  

* * *

<a name="template"></a>

## template()
<p>Generic entry function to each type of template function</p>

**Kind**: global function  

* * *

<a name="templateArgs"></a>

## templateArgs() ⇒ <code>string</code>
<p>Template a string with function arguments, in order</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str - Template string  
**Params**: <code>string</code>  

* * *

<a name="templateArray"></a>

## templateArray() ⇒ <code>string</code>
<p>Template a string with an array of params</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str - Template string  
**Params**: <code>array</code> params -  

* * *

<a name="templateObject"></a>

## templateObject() ⇒ <code>string</code>
<p>Plain string param names  only <code>{{whatever}}</code> or <code>{{what_ever}}</code></p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str     - Template string  
**Params**: <code>object</code> params  - Key/Value paris matching template params  

* * *

<a name="templateObjectDeep"></a>

## templateObjectDeep() ⇒ <code>string</code>
<p>Support <code>one.two</code> and <code>one[1]</code> lodash <code>get</code> syntax to fetch nested properties.</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>Templated string</li>
</ul>  
**Params**: <code>string</code> str         - Template string  
**Params**: <code>object</code> params_deep - Object matching template params  

* * *

<a name="objectToCqlMap"></a>

## objectToCqlMap()
<p>Turn a JS object into a CQL map string.</p>

**Kind**: global function  

* * *

<a name="arrayToCqlMap"></a>

## arrayToCqlMap()
<p>Turn a JS array into a CQL map string.</p>

**Kind**: global function  

* * *

<a name="valueToCqlMap"></a>

## valueToCqlMap()
<p>CQL is all not quite JSON :/</p>

**Kind**: global function  
**Summary**: <p>Turn a JS value into a CQL map string</p>  

* * *

<a name="ClientOptions"></a>

## ClientOptions : <code>Object</code>
<p>Client options</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keyspace | <code>String</code> | <p>The keyspace for all the operations within the [Client](Client) instance.</p> |


* * *

