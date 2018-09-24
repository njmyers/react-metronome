// @flow
import * as React from 'react';
import tick from '@metronome/assets/click.mp3';
import withClock from '@metronome/components/src/Controls/with-clock';

type Props = {
  ms: number,
  counter: number,
  running: boolean,
  beat: number,
  beats: number,
};

type State = {
  AudioContext: null | AudioContext,
  tick: null | ArrayBuffer,
  tock: null | ArrayBuffer,
  loaded: boolean,
  scheduled: boolean,
};

function webAudioTouchUnlock(context) {
  return new Promise(function(resolve, reject) {
    if (context.state === 'suspended' && 'ontouchstart' in window) {
      var unlock = function() {
        context.resume().then(
          function() {
            document.body.removeEventListener('touchstart', unlock);
            document.body.removeEventListener('touchend', unlock);

            resolve(true);
          },
          function(reason) {
            reject(reason);
          }
        );
      };

      document.body.addEventListener('touchstart', unlock, false);
      document.body.addEventListener('touchend', unlock, false);
    } else {
      resolve(false);
    }
  });
}

class Tick extends React.Component<Props, State> {
  state = {
    AudioContext: null,
    tick: null,
    tock: null,
    loaded: false,
    scheduled: false,
  };

  getLookahead = () => (this.props.ms - this.props.counter) / 1000;

  play = (buffer: AudioBuffer) => {
    if (this.state.AudioContext) {
      const currentTime = this.state.AudioContext.currentTime;
      const source = this.state.AudioContext.createBufferSource();

      source.buffer = buffer;
      source.connect(this.state.AudioContext.destination);
      source.start(currentTime + this.getLookahead());

      this.setState({
        scheduled: true,
      });
    }
  };

  createAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    this.setState({
      AudioContext: new AudioContext(),
    });
  };

  loadAudioAsync = (url: string, name: string) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      if (this.state.AudioContext) {
        this.state.AudioContext.decodeAudioData(request.response, (buffer) => {
          this.setState({
            [name]: buffer,
            loaded: true,
          });
        });
      }
    };

    request.onerror = (error) => {
      console.log(error);
    };

    request.send();
  };

  shouldSchedule = (lookAhead = 50) => {
    return (
      this.props.ms - this.props.counter < lookAhead && !this.state.scheduled
    );
  };

  log = (string: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(string);
    }
  };

  componentDidMount() {
    this.createAudioContext();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.shouldSchedule()) {
      if (this.props.beats % this.props.beat !== 0) {
        this.log('tick');
        this.play(this.state.tick);
      } else {
        this.log('tock');
        this.play(this.state.tock);
      }
    }

    // when beat hits remove scheduled flag
    if (prevProps.beats !== this.props.beats) {
      this.setState({
        scheduled: false,
      });
    }

    if (this.state.AudioContext && !prevState.AudioContext) {
      webAudioTouchUnlock(this.state.AudioContext);
      this.loadAudioAsync(tick, 'tick');
      this.loadAudioAsync(tick, 'tock');
    }
  }

  render() {
    return null;
  }
}

export default withClock(Tick);
