import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import Tap from '@metronome/components/src/Tap';
import TapButton from './TapButton';
import Switch from './Switch';

class Buttons extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Switch {...this.props} />
        <Tap cb={this.props.onTap}>
          <TapButton />
        </Tap>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Buttons;
