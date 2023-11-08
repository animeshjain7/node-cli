#!/home/animesh/nodejs/bin/node --no-warnings
console.log('--------------------------------------------');
import arg from 'arg';
import chalk from 'chalk';
import { start } from '../src/commands/start.js';
import { getConfig } from '../src/config/config-mgr.js';
import { createLogger } from '../src/logger.js';

const logger = createLogger('bin');
function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
    ${chalk.greenBright('--start')}\tstarts the app
    ${chalk.greenBright('--build')}\tbuilds the app
    `);
}

try {
  
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });
  
  logger.debug('Received args',args);
  if (args['--start']) {
    const config = getConfig();
    start(config);
  }
  
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}
console.log('--------------------------------------------');