import React from 'react';
export default class Heading extends React.Component {

  static propTypes = {
    booleanProp: React.PropTypes.bool,
    children: React.PropTypes.any.isRequired,
    objectProp: React.PropTypes.object,
    enumProp: React.PropTypes.oneOf(['10', '20', '30']).isRequired,
    numberProp: React.PropTypes.number.isRequired,
    functionProp: React.PropTypes.func.isRequired,
    shapeProp: React.PropTypes.shape({
      subProp: React.PropTypes.number.isRequired,
    }).isRequired,
  }

  render() {
    const {functionProp, children} = this.props;

    return (
      <h1 onClick={functionProp}>
        {children}
      </h1>
    );
  }
}
