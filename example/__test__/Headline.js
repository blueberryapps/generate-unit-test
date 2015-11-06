import Heading from '../Headline.react.js';

import {
  expect,
  React,
  sinon,
  TestUtils
} from '../../test/mochaTestHelper';

describe('Heading component', () => {

  const data = {
    children: 'Default ANY',
    enumProp: '10',
    numberProp: 1,
    functionProp: () => {},
    shapeProp: {
      subProp: 1,
    },
  };

  let sandbox, heading, content;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    heading = TestUtils.renderIntoDocument(<Heading {...data} />);
    content = TestUtils.findRenderedDOMComponentWithTag(heading, 'h1');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should generate !!Something!! inside of h1', () => {
    expect(content.innerHTML).to.contains('!!Something!!');
  });
});
