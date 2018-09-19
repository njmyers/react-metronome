import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import Tap from '@metronome/components/src/Tap';

const TapButton = ({ tap }) => (
  <Button onPress={tap} title="Tap" color="white" style={styles.button} />
);

class Buttons extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.props.running ? this.props.stop : this.props.start}
          title={this.props.running ? 'Stop' : 'Start'}
          color="white"
          style={styles.button}
        />
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
  button: {
    backgroundColor: 'white',
    padding: '10pt',
  },
});

export default Buttons;
