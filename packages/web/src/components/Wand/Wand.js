import React, { Component } from 'react';
import wand from './metronome-wand.svg';

class Wand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.toggle,
      ms: this.props.ms,
      counter: this.props.counter,
      rotation: 26,
      direction: true,
      style: {
        transform: `rotate(26deg)`,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState(function(prevState) {
      if (prevProps.ms !== prevState.ms) {
        return {
          ms: prevProps.ms,
        };
      }
    });
  }

  calcRotation(counter, direction) {
    let ratio = counter / this.ms;
    if (direction) {
      return ratio * (-1 * 52) + 26;
    } else {
      return ratio * (1 * 52) - 26;
    }
  }

  render() {
    return (
      <div>
        <img src={wand} style={this.state.style} className="wand" />
      </div>
    );
  }
}

export default Wand;
