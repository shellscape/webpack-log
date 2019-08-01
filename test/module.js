const test = require('ava');

const getLogger = require('../lib');

test('default', (t) => {
  const log = getLogger();
  const { name, options } = log;
  const { id } = options;

  delete options.id;

  getLogger.delete('<webpack-log>');

  t.snapshot(name);
  t.snapshot(options);
  t.truthy(id);
});

test('options', (t) => {
  const log = getLogger({
    level: 'warn',
    name: 'batman',
    timestamp: true,
    unique: false
  });
  const { name, options } = log;
  const { id } = options;

  getLogger.delete('batman');

  t.snapshot(name);
  t.snapshot(options);
  t.is(id, name);
});

test('unique', (t) => {
  const first = getLogger({ name: 'batman' });
  const second = getLogger({ name: 'batman' });
  const one = first.options.id;
  const two = second.options.id;

  t.not(one, two);

  getLogger.delete(one);
  getLogger.delete(two);
});
