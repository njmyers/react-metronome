// @flow
import * as React from 'react';
import withControls from '../Controls/with-controls';

type Props = {
  setMS: Function,
  children: React.Node,
};

type State = {
  tempo: number,
  last: number,
  intervals: Array<number>,
  timeout: null | TimeoutID,
};

class Tap extends React.Component<Props, State> {
  state = {
    tempo: 1000,
    intervals: [],
    last: 0,
    timeout: null,
  };

  reduceTempo = () =>
    Math.round(
      this.state.intervals.slice(-3).reduce((a, b) => a + b, 0) /
        Math.min(this.state.intervals.length, 3)
    );

  reset = () => this.setState({ intervals: [], last: 0 });

  tap = () => {
    const now = Date.now();

    this.setState((state) => ({
      last: now,
      intervals: state.last ? [...state.intervals, now - state.last] : [],
      tempo: state.intervals.length > 1 ? this.reduceTempo() : state.tempo,
    }));

    // force clear intervals after 2 seconds
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      timeout: setTimeout(this.reset, 1000 * 2),
    });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.tempo !== prevState.tempo) {
      this.props.setMS(this.state.tempo);
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      tap: this.tap,
    });
  }
}

export default withControls(Tap);
