const test = require('ava');

const getLogger = require('../lib');

test('log', (t) => {
  const log = getLogger({ level: 'trace' });

  log.info('one');
  log.error('two');
  log.warn('three');
  log.debug('four');
  log.trace('five');

  t.pass();
});
