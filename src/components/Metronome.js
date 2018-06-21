import React, { Component } from 'react';

// components
import Controls from './Controls';
import Explanation from './Explanation';
import Title from './Title';

// assets
import tick from './assets/click.mp3';
// import tock from './audio/tock.mp3';
import wand from './assets/metronome-wand.svg';

import './style.sass';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      ms: 1000,
      bpm: 60,
      counter: 0,
      // wand stuff
      rotation: 26,
      direction: true,
      style: this.transformPrefixer('rotate(26deg)'),
      beat: 1,
      tockCounter: 0,
      tolerance: 6,
    };

    this.tickSound = new Audio(tick);
    this.tockSound = new Audio();
    this.frameRate = 4;
    this.switch = this.switch.bind(this);
  }

  onChange = (event) => {
    if (event.target.name === 'bpm') {
      this.setState({
        bpm: event.target.value,
        ms: this.ms(event.target.value),
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  ms = (bpm) => (60 * 1000) / bpm;
  bpm = (ms) => (ms / 1000) * 60;

  switch() {
    this.setState(function(prevState) {
      prevState.toggle ? this.stop() : this.start();
      return {
        toggle: !prevState.toggle,
      };
    });
  }

  start() {
    this.resetState();
    this.timerID = setInterval(() => {
      this.frame();
    }, this.frameRate);
  }

  stop() {
    clearInterval(this.timerID);
  }

  resetState() {
    this.setState({
      date: new Date(),
      counter: 0,
      // wand stuff
      rotation: 26,
      direction: true,
      style: this.transformPrefixer('rotate(26deg)'),
      tockCounter: 0,
    });
  }

  transformPrefixer(property) {
    return {
      WebkitTransform: property,
      msTransform: property,
      transform: property,
    };
  }

  // only update setInterval state here
  frame() {
    this.setState(function(prevState) {
      let counter, direction, tockCounter, date;

      // this sets accuracy so that the metronome does not 'drag'
      // metronome will click up to tolerance level milliseconds before
      if (
        Math.abs(prevState.counter - prevState.ms) < this.state.tolerance ||
        prevState.counter >= prevState.ms
      ) {
        date = new Date();
        counter = 0;
        prevState.direction ? (direction = false) : (direction = true);
        ({ tockCounter } = this.tickTock(
          prevState.beat,
          prevState.tockCounter
        ));
      } else {
        date = new Date();
        let difference = date - prevState.date;

        counter = prevState.counter + difference;
        direction = prevState.direction;
        tockCounter = prevState.tockCounter;
      }

      let { style } = this.animateWand(prevState.counter, prevState.direction);

      // console.log(counter);
      return {
        date,
        counter,
        direction,
        style,
        tockCounter,
      };
    });
  }

  // ticking and tocking and helpers
  tickTock(beat, tockCounter) {
    if (parseInt(beat, 10) === 1) {
      this.tick();
    } else {
      if (tockCounter) {
        this.tick();
      } else {
        this.tock();
      }
    }

    tockCounter += 1;
    tockCounter >= beat ? (tockCounter = 0) : undefined;
    return { tockCounter };
  }

  tick() {
    // console.log('tick');

    // ensures sounds don't run into each other
    this.tickSound.pause();
    this.tickSound.currentTime = 0;
    this.tickSound.play();
  }

  tock() {
    // console.log('tock');

    // ensures sounds don't run into each other
    this.tockSound.pause();
    this.tockSound.currentTime = 0;
    this.tockSound.play();
  }

  // wand animation and helpers
  animateWand(counter, direction) {
    let rotation = this.calcRotation(counter, direction);

    return {
      style: this.transformPrefixer(`rotate(${rotation}deg)`),
    };
  }

  calcRotation(counter, direction) {
    let ratio = counter / this.state.ms;
    if (direction) {
      return ratio * (-1 * 52) + 26;
    } else {
      return ratio * (1 * 52) - 26;
    }
  }

  render() {
    return (
      <div>
        <Title text="metronome" />
        <Controls
          bpm={this.state.bpm}
          beat={this.state.beat}
          tolerance={this.state.tolerance}
          onChange={this.onChange}
        />
        <div className="row">
          <div className="metronome">
            <img
              src={wand}
              style={this.state.style}
              className="wand"
              alt="metronome-wand"
            />
          </div>
        </div>
        <div className="row">
          <button className="button" onClick={this.switch}>
            {this.state.toggle ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
    );
  }
}

export default Metronome;
