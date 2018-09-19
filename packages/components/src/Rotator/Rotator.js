// @flow
import * as React from 'react';
import bezier from 'bezier';
import memoize from 'fast-memoize';

type Props = {
  ms: number,
  counter: number,
  beats: number,
  children: React.Node,
};

const cubic = bezier.prepare(4);

class Rotator extends React.Component<Props> {
  prebuildCache = (limit: number = 10000) => {
    for (let i = 0; i < limit; i++) {
      this.gravity(i / limit);
    }
  };

  /**
   * Apply gravity like cubic bezier curve and memoize the calculations
   * @param {ratio} number t or time along the bezier curve
   */
  gravity = memoize((ratio) => cubic([-28, -22, 22, 28], ratio));

  calcRotation = () =>
    this.gravity(this.props.counter / this.props.ms) *
    // multiply by -1 to signal change in direction
    (this.props.beats % 2 === 0 ? -1 : 1);

  componentDidMount() {
    this.prebuildCache();
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ...this.props,
      rotation: this.calcRotation(),
    });
  }
}

export default Rotator;
