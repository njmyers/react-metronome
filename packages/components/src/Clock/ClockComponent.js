// @flow
import * as React from 'react';

type Props = {
  children?: React.Node,
};

class Clock extends React.Component<Props> {
  componentDidMount() {
    this.props.resetState();
  }

  componentWillUnmount() {
    this.props.stop();
  }

  render() {
    return this.props.children;
  }
}

export default Clock;
