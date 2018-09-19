import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Font } from 'expo';

class Lato extends React.Component {
  state = {
    loaded: false,
  };

  loadFont = async () => {
    Font.loadAsync({
      Lato: require('@metronome/assets/lato/Lato-Regular.ttf'),
    })
      .then(() => {
        this.setState(
          {
            loaded: true,
          },
          console.log(this.state)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadFont();
  }

  render() {
    return this.state.loaded ? (
      <Text style={{ ...this.props.styles, ...styles.text }}>
        {this.props.children}
      </Text>
    ) : null;
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato',
  },
});

export default Lato;
