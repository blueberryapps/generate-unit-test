import buildDefaultProps from './buildDefaultProps';
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import mkdirp from 'mkdirp';
import nunjucks from 'nunjucks';
import renderStateAsHash from './renderStateAsHash';
import {parse} from 'react-docgen';

export default function generateTest(file, mochaTestHelper = 'test/mochaTestHelper') {
  const absolutePath = path.resolve(file);
  const filePath = absolutePath.split('/');
  const fileDepth = file.split('/');

  const Class = require(absolutePath);
  const sourceFile = fs.readFileSync(file).toString();

  const component = {
    Class: Class,
    doc: parse(sourceFile),
    name: Class.displayName || Class.name,
    instanceName: lodash.camelCase(Class.displayName || Class.name),
    fileName: filePath[filePath.length - 1],
    directory: file.replace(fileDepth[fileDepth.length - 1], ''),
    mochaConfiguration: `${fileDepth.splice(1).map(() => '..').join('/')}/${mochaTestHelper}`,
  };

  component.state = buildDefaultProps(component.doc.props);

  component.formatedState = renderStateAsHash(component.state, '    ');

  component.returnRootElement = sourceFile
    .replace(/\n/g, '')
    .replace(/.*render\(/, '')
    .replace(/.*return\(/, '')
    .match(/\<(\w+)/)[1];

  const testDirectory = `${component.directory}__test__`;
  const testFile = `${testDirectory}/${component.fileName.split('.')[0]}.js`;

  if (!fs.existsSync(testDirectory)) {
    mkdirp.sync(testDirectory);
    console.log(`Creating test directory: ${testDirectory}`);
  } else {
    console.log(`Test directory ${testDirectory} is already there`);
  }

  nunjucks.configure('src', {autoescape: false});
  const testContent = nunjucks.render('unit_test.js.nunjucks', component);

  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, testContent);
    console.log(`Creating test file: ${testFile}`);
  } else {
    throw new Error(`Test file ${testFile} is already there`);
  }
}
