// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Bezier from 'bezier-easing';
import memoize from 'fast-memoize';

const points = [0, 0.25, 0.75, 1];

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
  gravity = (ratio: number) => ratio;

  calcRotation = () =>
    this.gravity(this.props.counter / this.props.ms) * maxRotation;
  // multiply by -1 to signal change in direction
  // (this.props.beats % 2 === 0 ? -1 : 1);

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

const mapStateToProps = (state) => ({
  ms: state.ms,
  counter: state.counter,
  beats: state.beats,
});

export default connect(mapStateToProps)(Rotator);
