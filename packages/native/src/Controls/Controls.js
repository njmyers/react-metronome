// @flow
import * as React from 'react';
import { StyleSheet, View, Slider } from 'react-native';

import Lato from '../Lato';

type Props = {
  bpm: number,
  beat: number,
  onBPM: Function,
  onBeat: Function,
};

class Controls extends React.Component<Props> {
  render() {
    return (
      <View style={style.container}>
        <Lato style={style.label}>BPM: {this.props.bpm}</Lato>
        <Slider
          style={style.slider}
          value={this.props.bpm}
          onValueChange={this.props.onBPM}
          minimumValue={20}
          maximumValue={400}
          step={5}
        />
        <Lato style={style.label}>Beat: {this.props.beat}</Lato>
        <Slider
          style={style.slider}
          value={this.props.beat}
          onValueChange={this.props.onBeat}
          minimumValue={0}
          maximumValue={11}
          step={1}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 2,
    padding: '5%',
  },
  slider: {},
  label: {
    color: 'white',
  },
});

export default Controls;
