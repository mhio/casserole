/* eslint no-console: 0 */

import Benchmark from 'benchmark'

import Util from '../../src/Util'

console.log('Util')

const suite = new Benchmark.Suite()

const long_str = '%s %s and some more text to make it longer %s %s %s %s %s'

suite.add('Util.format short 2', function utilFormat(){
  return Util.format('ab%s %scd', 1, 2)
})
suite.add('Util.format2 short 2', function utilFormat(){
  return Util.format2('ab%s %scd', 1, 2)
})
suite.add('Util.format long 1', function utilFormat(){
  return Util.format(long_str, '123')
})
suite.add('Util.format2 long 1', function utilFormat(){
  return Util.format2(long_str, '123')
})
suite.add('Util.format long 6', function utilFormat(){
  return Util.format(long_str, '2', 'something in the middle', '5', '6', 'longer')
})
suite.add('Util.format2 long 6', function utilFormat(){
  return Util.format(long_str, '2', 'something in the middle', '5', '6', 'longer')
})


.on('cycle', event => console.log(String(event.target)) )
.on('error', event => console.error('Error Running Test "%s": ', event.target.name, event.target.error) )
.on('complete', function(){ 
  console.log('Fastest is ' + this.filter('fastest').map('name')) 
})
.run({ 'async': false })
