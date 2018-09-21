import * as React from 'react';
import Button from 'apsl-react-native-button';
import withSwitches from '@metronome/components/src/Controls/with-switches';
import Lato from '../Lato';
import styles from './styles';

class Switch extends React.Component {
  render() {
    return (
      <Button
        onPress={this.props.running ? this.props.stop : this.props.start}
        style={styles.button}
      >
        <Lato style={styles.text}>{this.props.running ? 'Stop' : 'Start'}</Lato>
      </Button>
    );
  }
}

export default withSwitches(Switch);
