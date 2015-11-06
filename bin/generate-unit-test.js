#! /usr/bin/env node
require('babel/register');
const generateUnitTest = require('../src/index');

const fileNames = process.argv.slice(2);
const directory = process.cwd();

fileNames.map(fileName => {
  generateUnitTest(`${directory}/${fileName}`, directory);
});
