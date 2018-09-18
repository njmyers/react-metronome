// @flow
import * as React from 'react';

type Props = {
  ms: number,
  counter: number,
  beats: number,
  children: React.Node,
};

class Rotator extends React.Component<Props> {
  calcRotation = () => {
    const ratio = this.props.counter / this.props.ms;
    return this.props.beats % 2 === 0
      ? ratio * (-1 * 52) + 26
      : ratio * (1 * 52) - 26;
  };

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ...this.props,
      rotation: this.calcRotation(),
    });
  }
}

export default Rotator;
