import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';

import Controls from './Controls';
import Tick from './Tick';
import Buttons from './Buttons';
import Animator from './Animator';
import Clock from '@metronome/components/src/Clock';
import Rotator from '@metronome/components/src/Rotator';
// assets
import Base from './Base';
import { blue, white } from '@metronome/assets/colors';

let time;

export default class App extends React.Component {
  state = {
    bpm: 120,
    beat: 1,
  };

  onBPM = (value) => {
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
        <Base />
        <Clock bpm={this.state.bpm}>
          <Buttons onTap={this.onTap} />
          <Tick />
          <Rotator>
            <Animator />
          </Rotator>
        </Clock>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appView: {
    backgroundColor: blue,
    flex: 1,
    padding: '2%',
    flexDirection: 'column',
  },
});
