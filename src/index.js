import buildDefaultProps from './buildDefaultProps';
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import mkdirp from 'mkdirp';
import nunjucks from 'nunjucks';
import renderStateAsHash from './renderStateAsHash';
import {parse} from 'react-docgen';

const nunjuckEnv = nunjucks.configure(`${__dirname}/../templates/`, {autoescape: false});

export default function generateTest(file, pwd, mochaTestHelper = 'test/mochaTestHelper') {
  const absolutePath = path.resolve(file);
  const relativePath = absolutePath.replace(pwd, '');
  const relativePathSplited = relativePath.split('/');
  const fileName = relativePathSplited[relativePathSplited.length - 1];
  const Class = require(absolutePath);
  const sourceFile = fs.readFileSync(file).toString();

  const component = {
    Class: Class,
    doc: parse(sourceFile),
    name: Class.displayName || Class.name,
    instanceName: lodash.camelCase(Class.displayName || Class.name),
    directory: absolutePath.replace(fileName, ''),
    fileName: fileName,
    mochaConfiguration: `${relativePathSplited.splice(1).map(() => '..').join('/')}/${mochaTestHelper}`,
  };

  component.state = buildDefaultProps(component.doc.props);

  component.formatedState = renderStateAsHash(component.state, '    ');

  component.returnRootElement = sourceFile
    .replace(/\n/g, '')
    .replace(/.*render\(/, '')
    .replace(/.*return\(/, '')
    .match(/\<(\w+)/)[1];

  const testDirectory = path.resolve(`${component.directory}__test__`);
  const testFile = path.resolve(`${testDirectory}/${component.fileName.split('.')[0]}.js`);

  if (!fs.existsSync(testDirectory)) {
    mkdirp.sync(testDirectory);
    console.log(`Creating test directory: ${testDirectory}`);
  } else {
    console.log(`Test directory ${testDirectory} is already there`);
  }

  const testContent = nunjuckEnv.render('unit_test.js.nunjucks', component);

  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, testContent);
    console.log(`Creating test file: ${testFile}`);
  } else {
    throw new Error(`Test file ${testFile} is already there`);
  }
}
