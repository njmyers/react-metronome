// @flow

import * as React from 'react';
import wand from '@metronome/assets/wand.svg';

import './wand.sass';

type Props = {
  rotation: number,
};

class Wand extends React.Component<Props> {
  transformPrefixer = (property: string) => ({
    WebkitTransform: property,
    msTransform: property,
    transform: property,
  });

  transform = () => `rotate(${this.props.rotation}deg)`;

  style = () => ({
    ...this.transformPrefixer(this.transform()),
  });

  render() {
    return (
      <img
        src={wand}
        style={this.style()}
        className="wand"
        alt="metronome-wand"
      />
    );
  }
}

export default Wand;
