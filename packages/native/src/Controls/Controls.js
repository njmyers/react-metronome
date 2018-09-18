// @flow
import * as React from 'react';
import { StyleSheet, View, Slider, Text } from 'react-native';

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
        <Slider
          style={style.slider}
          value={this.props.bpm}
          onValueChange={this.props.onBPM}
          minimumValue={20}
          maximumValue={400}
          step={5}
        />
        <Text style={style.label}>{this.props.bpm}</Text>
        <Slider
          style={style.slider}
          value={this.props.beat}
          onValueChange={this.props.onBeat}
          minimumValue={0}
          maximumValue={11}
          step={1}
        />
        <Text style={style.label}>{this.props.beat}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 2,
  },
  slider: {},
  label: {},
});

export default Controls;
