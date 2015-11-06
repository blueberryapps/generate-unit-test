import Heading from '../Headline.react.js';

import {
  expect,
  React,
  sinon,
  TestUtils
} from '../../../../../../../test/mochaTestHelper';

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

  function createComponent(overrideData = {}) {
    const props = {...data, ...overrideData}
    heading = TestUtils.renderIntoDocument(<Heading {...props} />);
    content = TestUtils.findRenderedDOMComponentWithTag(heading, 'h1');
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createComponent()
  });

  afterEach(() => {
    sandbox.restore();
  });

// EXAMPLES:
//
//  it('default should generate !!Something!! inside of h1', () => {
//    expect(content.innerHTML).to.contains('!!Something!!');
//  });
//
//  it('defaul should have attribute style which contains font-icons', () => {
//    expect(content.getAttribute('style')).to.contains('font-family:font-icons');
//  });
//
//  it('should override fontFamily and style will contains font-override', () => {
//    createComponent({fontFamily: 'font-override'})
//    expect(content.getAttribute('style')).to.contains('font-family:font-override');
//  });

});
