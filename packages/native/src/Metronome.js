import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Header, Image } from 'react-native';

import Controls from './Controls';
import Tick from './Tick';
import Buttons from './Buttons';
import Clock from '@metronome/components/src/Clock';
import base from '@metronome/assets/base.svg';

const Animator = () => null;

export default class App extends React.Component {
  state = {
    bpm: 120,
    beat: 1,
  };

  onBPM = (value) => {
    console.log(value);
    this.setState((state) => ({ bpm: value }));
  };

  onBeat = (value) => {
    this.setState((state) => ({ beat: value }));
  };

  onTap = (value) => {
    this.setState((state) => ({ bpm: value }));
  };

  render() {
    return (
      <View style={styles.appView}>
        <Controls {...this.state} onBPM={this.onBPM} onBeat={this.onBeat} />
        <Clock bpm={this.state.bpm}>
          <Buttons onTap={this.onTap} />
          <Tick />
          <Animator />
        </Clock>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appView: {
    backgroundColor: '#1b3867',
    flex: 8,
    flexDirection: 'column',
  },
  buttonsContainer: {
    width: '30%',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    padding: '10pt',
  },
});
