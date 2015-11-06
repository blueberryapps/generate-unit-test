# generate-unit-test
[![Circle CI](https://circleci.com/gh/blueberryapps/generate-unit-test/tree/master.svg?style=svg&circle-token=885eda2778038bda1423cacba2d371c73851515a)](https://circleci.com/gh/blueberryapps/generate-unit-test/tree/master)

Pass file to generate-unit-test and it will generate basic unit test boilerplate:
checkout: from [Headline.react.js](example/Headline.react.js) it creates test directory and generate [\_\_test\_\_/Headline.js](example/__test__/Headline.js)

## Install

```sh
$ npm install --save generate-unit-test
```

## Gulp Usage

```js
import generateUnitTest from 'generate-unit-test';

gulp.task('generate-test', (done) => {
  if (yargs.argv.file)
    // test/mochaTestHelper - is relative path to project which point to mocha test helper
    generateUnitTest(`${__dirname}/${yargs.argv.file}`, __dirname, 'test/mochaTestHelper')
  else
    console.error('Please provide component file by --file some/file')
})

# => gulp generate-test --file src/client/components/Xyz.js
```

## CLI Usage

```
generate-unit-test src/client/components/Xyz.js src/client/components/Zaz.js
```

## mochaTestHelper

```js
import chai, {assert, expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

export {
  assert,
  chai,
  expect,
  React,
  sinon,
  sinonChai,
  TestUtils
};
```

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)

Boilerplated from (https://github.com/este/module)
