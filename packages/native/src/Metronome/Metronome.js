import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Button, Header } from 'react-native';

import Controls from '../Controls';
import Tick from '../Tick';
import Clock from '@metronome/components/src/Clock';

class Animator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.start} title="Start" />
        <Button onPress={this.props.stop} title="Stop" />
        <Text>Beats: {this.props.beats}</Text>
        <Tick beats={this.props.beats} />
      </View>
    );
  }
}

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

  render() {
    return (
      <View style={styles.appView}>
        <Controls {...this.state} onBPM={this.onBPM} onBeat={this.onBeat} />
        <Clock bpm={this.state.bpm}>
          <Animator />
        </Clock>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appView: {
    flex: 1,
  },
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
