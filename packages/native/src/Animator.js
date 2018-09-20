import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Wand from './Wand';
import Rotator from '@metronome/components/src/Rotator';
// get dimensions
const { width } = Dimensions.get('window');
// height of wand svg
const wandHeight = (width * 9) / 10;
// this is the ratio of total wand svg length to a point below wand end
const ratio = 0.41;

class Animator extends React.Component {
  getRotation = () => `${this.props.rotation}deg`;

  render() {
    console.log(this.getRotation());
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          {
            transform: [
              {
                rotate: this.getRotation(),
              },
              {
                translateY: wandHeight * ratio * -1,
              },
            ],
          },
        ]}
      >
        <Wand />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // adjust focal point down by an additional ratio for cosmetics
    marginTop: wandHeight * (ratio + 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});

export default Animator;
