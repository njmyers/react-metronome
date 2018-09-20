import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Svg } from 'expo';
import { lightBlue } from '@metronome/assets/colors';

const { Polygon, Path } = Svg;

const { width, height } = Dimensions.get('window');

const Wand = () => (
  <View style={style}>
    <Svg
      width={width * 0.6}
      height={width * 0.9}
      origin="50 125"
      viewBox="0 0 100 150"
    >
      <Path
        fill="none"
        stroke={lightBlue}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M50 25 V 125"
      />
      <Polygon
        points="46 50, 54 50, 50 63"
        fill={lightBlue}
        stroke={lightBlue}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
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

export default Wand;
