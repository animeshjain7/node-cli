import chalk from 'chalk';
import {createLogger} from '../logger.js';

const logger = createLogger('commands:start');
export function start(config){
    logger.highlight('  Starting the App  ');
    logger.debug('Recieved configuration' ,config);
}  