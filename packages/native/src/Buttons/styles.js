import { StyleSheet } from 'react-native';
import { white, black } from '@metronome/assets/colors';

const styles = StyleSheet.create({
  button: {
    color: white,
    height: 44,
    width: 104,
    backgroundColor: white,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  text: {
    color: black,
    fontSize: 20,
  },
});

export default styles;
