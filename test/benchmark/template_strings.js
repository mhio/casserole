/* eslint no-console: 0 */

import Benchmark from 'benchmark'
import assert from 'assert'
import Util from '../../src/Util'

const suite = new Benchmark.Suite()

const format_str = 'CREATE %s BLAG SET( a = 5, b = 7 ) PRIMARY REPLICATION {\'whatever\': \'my-super-data-center-numbered-1\' } BLAG %s WITH SUPER'
const template_str = require('util').format(format_str, '{{s}}', '{{s}}')
const object_str = require('util').format(format_str, '{{a}}', '{{b}}')
const object_deep_str = require('util').format(format_str, '{{a.s}}', '{{b.s}}')
const final_str = 'CREATE one BLAG SET( a = 5, b = 7 ) PRIMARY REPLICATION {\'whatever\': \'my-super-data-center-numbered-1\' } BLAG twotwo WITH SUPER'

// make sure they work first
assert(Util.format(format_str, 'one', 'twotwo'), final_str)
assert(Util.format2(format_str, 'one', 'twotwo'), final_str)
assert(Util.templateArgs(template_str, 'one', 'twotwo'), final_str)
assert(Util.template(template_str, 'one', 'twotwo'), final_str)
assert(Util.templateArray(template_str, [ 'one', 'twotwo' ]), final_str)
assert(Util.template(template_str, [ 'one', 'twotwo' ]), final_str)
assert(Util.templateObject(object_str, {a: 'one', b: 'twotwo' }), final_str)
assert(Util.template(object_str, {a: 'one', b: 'twotwo' }), final_str)
assert(Util.templateObjectDeep(object_deep_str, {a:{s:'one'}, b:{s:'twotwo'}}), final_str)


suite.add('Util.format', function utilFormat(){
  return Util.format(format_str, 'one', 'twotwo')
})
suite.add('Util.format2', function utilFormat(){
  return Util.format2(format_str, 'one', 'twotwo')
})
suite.add('Util.templateArgs', function templateArgs(){
  return Util.templateArgs(template_str, 'one', 'twotwo')
})
suite.add('Util.template args', function templateWithArgs(){
  return Util.template(template_str, 'one', 'twotwo')
})
suite.add('Util.templateArray', function templateArray(){
  return Util.templateArray(template_str, [ 'one', 'twotwo' ])
})
suite.add('Util.template array', function templateWithArray(){
  return Util.template(template_str, [ 'one', 'twotwo' ])
})
suite.add('Util.templateObject', function templateObject(){
  return Util.templateObject(object_str, {a: 'one', b: 'twotwo' })
})
suite.add('Util.template object', function templateWithObject(){
  return Util.template(object_str, {a: 'one', b: 'twotwo' })
})
suite.add('Util.templateObjectDeep', function templateObjectDeep(){
  return Util.templateObjectDeep(object_deep_str, {a:{s:'one'}, b:{s:'twotwo'}})
})


.on('cycle', event => console.log(String(event.target)) )
.on('error', event => console.error('Error Running Test "%s": ', event.target.name, event.target.error) )
.on('complete', function(){ 
  console.log('Fastest is ' + this.filter('fastest').map('name')) 
})
.run({ 'async': false })