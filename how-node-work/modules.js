// console.log(arguments);
// console.log(require('module').wrapper);
//first method
//module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(3, 4));
console.log(calc1.multiply(4, 5));

//second method
//exports
//const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));
console.log(multiply(2, 5));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();