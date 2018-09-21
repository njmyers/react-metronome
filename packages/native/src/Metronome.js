import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';

import Provider from '@metronome/components/src/Provider';
import Controls from './Controls';
import Tick from './Tick';
import Buttons from './Buttons';
import Animator from './Animator';
import Clock from '@metronome/components/src/Clock';
import Rotator from '@metronome/components/src/Rotator';
// // assets
import Base from './Base';
import { blue, white } from '@metronome/assets/colors';

class Metronome extends React.Component {
  render() {
    return (
      <Provider>
        <View style={styles.appView}>
          <Controls />
          <Base />
          <Rotator>
            <Animator />
          </Rotator>
          <Tick />
          <Buttons />
        </View>
      </Provider>
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

export default Metronome;
