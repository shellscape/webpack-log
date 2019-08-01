/* eslint-disable no-console */
const test = require('ava');
const sinon = require('sinon');

const getLogger = require('../lib');

const sandbox = sinon.createSandbox();
const spyMethods = ['info', 'warn', 'error'];

test.before(() => {
  for (const method of spyMethods) {
    sandbox.spy(console, method);
  }
  sandbox.spy(console, 'log');
});

test.afterEach(() => {
  for (const method of spyMethods) {
    if (console[method]) {
      console[method].resetHistory();
    }
  }
  console.log.resetHistory();
});

test.after(() => {
  sandbox.restore();
});

test.serial('logging', (t) => {
  const log = getLogger({ name: 'logging' });

  for (const method of spyMethods) {
    log[method](`batman:${method}`);
    t.snapshot(console[method].getCall(0).args, method);
  }

  t.pass();

  getLogger.delete('logging');
});

test.serial('timestamp', (t) => {
  const log = getLogger({ name: 'timestamp', timestamp: true });

  for (const method of spyMethods) {
    log[method]('batman');
    const [arg] = console[method].getCall(0).args;
    t.regex(arg, /\[\d\d:\d\d:\d\d\]/);
  }
});
