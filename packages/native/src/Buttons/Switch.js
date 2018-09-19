import * as React from 'react';
import Button from 'apsl-react-native-button';
import Lato from '../Lato';
import styles from './styles';

class Switch extends React.Component {
  render() {
    return (
      <Button
        onPress={this.props.running ? this.props.stop : this.props.start}
        color="white"
        style={styles.button}
      >
        <Lato style={styles.text}>{this.props.running ? 'Stop' : 'Start'}</Lato>
      </Button>
    );
  }
}

export default Switch;
