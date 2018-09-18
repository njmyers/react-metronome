// @flow
import * as React from 'react';
import tick from '@metronome/assets/click.mp3';

type Props = {
  beat: number,
  beats: number,
};

class Tick extends React.Component {
  tick = new Audio(tick);
  tock = new Audio(tick);

  play = () => {
    // reset state of all audio object before playing
    if (this.props.beats % this.props.beat === 0) {
      this.tick.pause();
      this.tick.currentTime = 0;
      this.tick();
    } else {
      this.tock.pause();
      this.tock.currentTime = 0;
      this.tock();
    }
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.beats !== prevProps.beats && this.props.beats !== 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('tick');
      }
      this.play();
    }
  }

  render() {
    return null;
  }
}

export default Tick;
