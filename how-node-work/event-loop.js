const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;
setTimeout(() => console.log('Timer 1 finised'), 0);
setImmediate(() => console.log('Immediate 1 finised'));
fs.readFile('text-file.txt', () => {
  console.log('I/O finised');
  console.log('------------------');
  setTimeout(() => console.log('Timer 2 finised'), 0);
  setTimeout(() => console.log('Timer 3 finised'), 3000);
  setTimeout(() => console.log('Timer 4 finised'), 4000);
  setTimeout(() => console.log('Timer 5 finised'), 5000);
  setImmediate(() => console.log('Immediate 2 finised'));
  process.nextTick(() => console.log('Process.nextTick'));
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});
console.log('Hello from the top-lvel code');
