// @flow
import * as React from 'react';
import tick from '@metronome/assets/click.mp3';
import withBeats from '@metronome/components/src/Controls/with-beats';

type Props = {
  running: boolean,
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
      this.tick.play();
    } else {
      this.tock.pause();
      this.tock.currentTime = 0;
      this.tock.play();
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

export default withBeats(Tick);
