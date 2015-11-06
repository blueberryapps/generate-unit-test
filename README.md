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
    generateUnitTest(`${__dirname}/${yargs.argv.file}`, __dirname, 'test/mochaTestHelperą')
  else
    console.error('Please provide component file by --file some/file')
})

# => gulp generate-test --file src/client/components/Xyz.js
```

## CLI Usage

```
generate-unit-test src/client/components/Xyz.js src/client/components/Zaz.js
```

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)

Boilerplated from (https://github.com/este/module)
