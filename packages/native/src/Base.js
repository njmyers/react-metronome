import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Svg } from 'expo';
import { white } from '@metronome/assets/colors';

const { Rect, Path } = Svg;

const { width, height } = Dimensions.get('window');

const Base = () => (
  <View style={style}>
    <Svg width={width * 0.6} height={height * 0.6} viewBox="0 0 100 150">
      <Path
        fill="none"
        stroke={white}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M27 10 H 73 L 90 140 H 10 Z"
      />
    </Svg>
  </View>
);

const style = [
  StyleSheet.absoluteFill,
  {
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
];

export default Base;
