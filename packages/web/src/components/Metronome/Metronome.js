// @flow
import * as React from 'react';
// components
import Controls from '../Controls';
import Title from '../Title';
import Tick from '../Tick';
import Clock from '@metronome/components/src/Clock';
// assets
import wand from '@metronome/assets/metronome-wand.svg';
import base from '@metronome/assets/metronome-base.svg';
// styles
import './style.sass';

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 60,
      tolerance: 6,
      beat: 1,
      // wand stuff
      // rotation: 26,
      // direction: true,
      // style: this.transformPrefixer('rotate(26deg)'),
      // tockCounter: 0,
    };

    // this.frameRate = 4;
    // this.switch = this.switch.bind(this);
  }

  onChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // switch() {
  //   this.setState(function(prevState) {
  //     prevState.toggle ? this.stop() : this.start();
  //     return {
  //       toggle: !prevState.toggle,
  //     };
  //   });
  // }
  //
  // transformPrefixer(property) {
  //   return {
  //     WebkitTransform: property,
  //     msTransform: property,
  //     transform: property,
  //   };
  // }

  // wand animation and helpers
  // animateWand(counter, direction) {
  //   let rotation = this.calcRotation(counter, direction);
  //
  //   return {
  //     style: this.transformPrefixer(`rotate(${rotation}deg)`),
  //   };
  // }
  //
  // calcRotation(counter, direction) {
  //   let ratio = counter / this.state.ms;
  //   if (direction) {
  //     return ratio * (-1 * 52) + 26;
  //   } else {
  //     return ratio * (1 * 52) - 26;
  //   }
  // }

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
        <Clock>
          <Tick />
        </Clock>
        <div className="row">
          <div className="metronome" style={{ background: `url("${base}")` }}>
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
