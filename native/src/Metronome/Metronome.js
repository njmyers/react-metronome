import React from 'react';
import Expo from 'expo'
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  sound = new Expo.Audio.Sound();

  state = {
    soundLoaded: false
  }

  play = this.sound.replayAsync.bind(this)

  loadAudio = () => {
    this.sound.loadAsync(require('../assets/click.mp3')).then(() => {
      this.setState((state) => ({ soundLoaded: true }))
    }).catch((error) => {
      this.setState((state) => ({ soundLoaded: false }))
      console.log(error)
    })
  }

  componentDidMount() {
    this.loadAudio();
  }

  logSound = () => {
    console.log(typeof this.sound.replayAsync)
  }

  play = async () => {
    if (this.state.soundLoaded) {
      try {
        await this.sound.stopAsync();
        await this.sound.replayAsync();
      } catch(error) {
        console.log(error)
      }
    }
  }

  onPress = () => {
    setInterval(this.play, 500)
  }

  render() {
    return (

      <View style={styles.container}>
        <Button onPress={this.onPress} title="Sound"/>
        <Text>Open up this App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
