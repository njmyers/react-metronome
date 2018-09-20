// @flow
import * as React from 'react';
import Bezier from 'bezier-easing';
import memoize from 'fast-memoize';

const points = [0, 0.22, 0.88, 1];

const cubic = memoize(Bezier(...points));
const reverseCubic = memoize(Bezier(...points.reverse()));

type Props = {
  ms: number,
  counter: number,
  beats: number,
  children: React.Node,
};

const maxRotation = 32;

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
  gravity = (ratio: number) =>
    ratio < 1 ? cubic(ratio) : reverseCubic(2 - ratio);

  calcRotation = () =>
    this.gravity((this.props.counter / this.props.ms) * 2) *
    // multiply by -1 to signal change in direction
    (this.props.beats % 2 === 0 ? maxRotation * -1 : maxRotation);
  // (this.props.beats % 2 === 0 ? 28 : -28);

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
