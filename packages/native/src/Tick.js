// @flow
import * as React from 'react';
import Expo from 'expo';

type Props = {
  beats: number,
};

type State = {
  loaded: boolean,
};

class Tick extends React.Component<Props, State> {
  sound = new Expo.Audio.Sound();

  state = {
    loaded: false,
  };

  // play = this.sound.replayAsync.bind(this);

  loadAudio = () => {
    this.sound
      .loadAsync(require('@metronome/assets/click.mp3'))
      .then(() => {
        this.setState((state) => ({ loaded: true }));
      })
      .catch((error) => {
        this.setState((state) => ({ loaded: false }));
        console.log(error);
      });
  };

  play = () => {
    if (this.state.loaded) {
      // this.sound
      // .stopAsync()
      // .then(() => {
      this.sound
        .replayAsync()
        .then(() => setTimeout(this.sound.stopAsync, 100))
        // })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.loadAudio();
  }

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
