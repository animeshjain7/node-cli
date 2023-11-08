import chalk from 'chalk';
// import { findUpSync } from 'find-up';
// import { createRequire } from 'module';
import {cosmiconfigSync } from 'cosmiconfig';
import schema from './schema.json' assert {type:'json'};
import { createLogger } from '../logger.js';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';


const ajv =  new Ajv({jsonPointers:true}); 
const confiLoader = cosmiconfigSync('tool');
const logger = createLogger('config:mgr');
export  function getConfig() {
  
    // console.log(result); 
    // const require = createRequire(import.meta.url);
    // const pkgPath = findUpSync('package.json', { cwd: process.cwd() });
    // const pkg = require(pkgPath);
    // if (pkg.tool) {
    //     console.log('Found configuration', pkg.tool);
    //     return pkg.tool;
    // }
    // else {
    //     console.log(chalk.yellow('Could not find configuration, using default'));
    //     return { port: 9999 };
    // }
    
    const result = confiLoader.search(process.cwd());
    if (!result) {
        logger.warning('Could not find configuration, using default');
        return { port: 6666 };
      } else {
        const isValid = ajv.validate(schema, result.config);
        if (!isValid) {
        logger.warning('Invalid configuration was supplied');
        console.log(betterAjvErrors(schema, result.config, ajv.errors));
        process.exit(1);
        }
        logger.debug('Found configuration', result.config);
        return result.config;
      }
}