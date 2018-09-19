import * as React from 'react';
import Button from 'apsl-react-native-button';
import Lato from '../Lato';
import styles from './styles';

const TapButton = ({ tap }) => (
  <Button onPress={tap} style={styles.button}>
    <Lato style={styles.text}>Tap</Lato>
  </Button>
);

export default TapButton;
