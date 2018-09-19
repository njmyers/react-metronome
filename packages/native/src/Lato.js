import * as React from 'react';
import { Text, StyleSheet, StyleSheetRegistry } from 'react-native';
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
        this.setState({
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getChildStyleSheet = () => StyleSheet.flatten(this.props.style);

  componentDidMount() {
    this.loadFont();
  }

  render() {
    return this.state.loaded ? (
      <Text style={[this.getChildStyleSheet(), styles.lato]}>
        {this.props.children}
      </Text>
    ) : null;
  }
}

const styles = StyleSheet.create({
  lato: {
    fontFamily: 'Lato',
  },
});

export default Lato;
