import expect from 'expect';
import fs from 'fs';
import index from '../src/index';

describe('generate unit test', () => {
  const testDirectory = './example/__test__';
  const testOutputFile = `${testDirectory}/Headline.js`;
  let content;

  beforeEach(() => {
    if (fs.existsSync(testOutputFile)) {
      fs.unlinkSync(testOutputFile);
    }

    if (fs.existsSync(testDirectory)) {
      fs.rmdirSync(testDirectory);
    }

    index('./example/Headline.react.js');
    content = fs.readFileSync(testOutputFile, {encoding: 'utf-8'});
  });

  it('should create test directory', () => {
    expect(fs.existsSync(testDirectory)).toBe(true);
  });

  it('should generate test file', () => {
    expect(fs.existsSync(testOutputFile)).toBe(true);
  });

  it('should insert import', () => {
    expect(content).toInclude('import Heading from \'../Headline.react.js\'');
  });

  it('should insert describe', () => {
    expect(content).toInclude('describe(\'Heading component');
  });

  it('should insert props', () => {
    expect(content).toInclude('enumProp: \'10\',');
  });

  it('should insert render component to DOM', () => {
    expect(content).toInclude('renderIntoDocument(<Heading');
  });

  it('should insert retrival of root component from render', () => {
    expect(content).toInclude('findRenderedDOMComponentWithTag(heading, \'h1\')');
  });
});
