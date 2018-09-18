// @flow
import * as React from 'react';

type Props = {
  bpm: number,
  tolerance: number,
  frameRate: number,
  children?: React.Node,
};

type State = {
  date: number,
  counter: number,
  beats: number,
  running: boolean,
};

const bpmToMs = (bpm) => (60 * 1000) / bpm;
const msToBpm = (ms) => (ms / 1000) * 60;

class Clock extends React.Component<Props, State> {
  state = {
    date: 0,
    counter: 0,
    beats: 0,
    running: false,
  };

  timerID: null | IntervalID;

  static defaultProps = {
    bpm: 60,
    tolerance: 3,
    frameRate: 4,
  };

  ms = () => bpmToMs(this.props.bpm);

  start = () => {
    this.resetState();
    this.timerID = setInterval(() => {
      this.frame();
    }, this.props.frameRate);
  };

  stop = () => {
    if (this.timerID) {
      clearInterval(this.timerID);
    }

    this.resetState();
  };

  resetState() {
    this.setState({
      date: Date.now(),
      counter: 0,
      beats: 0,
    });
  }

  componentDidMount() {
    this.resetState();
  }

  componentWillUnmount() {
    this.stop();
    this.resetState();
  }

  shouldBeat = (state: State) => {
    const { counter } = state;
    const ms = this.ms();

    return Math.abs(counter - ms) <= this.props.tolerance || counter >= ms;
  };

  // only update setInterval state here
  frame() {
    this.setState((prevState) => {
      // this sets accuracy so that the metronome does not 'drag'
      // metronome will click up to tolerance level milliseconds before
      if (this.shouldBeat(prevState)) {
        const date = Date.now();
        const counter = 0;
        const beats = prevState.beats + 1;

        return {
          date,
          counter,
          beats,
        };
      } else {
        const date = Date.now();
        const difference = date - prevState.date;
        const counter = prevState.counter + difference;

        return {
          date,
          counter,
        };
      }
    });
  }

  render() {
    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        start: this.start,
        stop: this.stop,
        beats: this.state.beats,
        running: this.state.running,
        counter: this.state.counter,
      })
    );
  }
}

export default Clock;
