// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var assert = require('assert');
var common = require('../common');


// `ignore` --> ['ignore', 'ignore', 'ignore']
var ignore = common.spawnPwd({ stdio: 'inherit' });

assert(!ignore.stdin);
assert(!ignore.stdout);
assert(!ignore.stderr);
assert(!ignore.stdio);

var ignoreExitCode = -1;
ignore.on('exit', function(c) {
  ignoreExitCode = c;
});

process.on('exit', function() {
  assert.equal(0, ignoreExitCode);
});


// `pipe` --> ['pipe', 'pipe', 'pipe'] == [-1,-1,-1]
// (this is essentially `spawn`s default...)
var pipe = common.spawnPwd({ stdio: 'pipe' });

assert(pipe.stdin && pipe.stdin.writable)
assert(pipe.stdout && pipe.stdout.readable)
assert(pipe.stderr && pipe.stderr.readable)

var pipeExitCode = -1;
pipe.on('exit', function(c) {
  pipeExitCode = c;
});

process.on('exit', function() {
  assert.equal(0, pipeExitCode);
});


// `inherit` --> [process.stdin, process.stdout, process.stderr] == [0,1,2]
var inherit = common.spawnPwd({ stdio: 'inherit' });

assert(!inherit.stdin);
assert(!inherit.stdout);
assert(!inherit.stderr);
assert(!inherit.stdio);

var inheritExitCode = -1;
inherit.on('exit', function(c) {
  inheritExitCode = c;
});

process.on('exit', function() {
  assert.equal(0, inheritExitCode);
});
