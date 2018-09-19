// @flow
import * as React from 'react';
import Slider from 'react-native-slider';
import { StyleSheet, View } from 'react-native';

import Lato from './Lato';

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
          trackStyle={track}
          thumbStyle={thumb}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="#82a2c1"
          value={this.props.bpm}
          onValueChange={this.props.onBPM}
          minimumValue={20}
          maximumValue={400}
          step={1}
        />
        <Lato style={style.label}>Beat: {this.props.beat}</Lato>
        <Slider
          style={style.slider}
          trackStyle={track}
          thumbStyle={thumb}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="#82a2c1"
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

const thumb = {
  height: 20,
  width: 28,
  borderRadius: 12,
};

const track = {
  height: 8,
  borderRadius: 5,
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    padding: '5%',
  },
  slider: {
    marginTop: 10,
  },
  label: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
  },
});

export default Controls;