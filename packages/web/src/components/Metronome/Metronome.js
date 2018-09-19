// @flow
import * as React from 'react';
// components
import Layout from '../Layout';
import Controls from '../Controls';
import Title from '../Title';
import Tick from '../Tick';
import Buttons from '../Buttons';
import Clock from '@metronome/components/src/Clock';
import Rotator from '@metronome/components/src/Rotator';
import Wand from '../Wand';
// assets
import base from '@metronome/assets/base.svg';
// styles
import './metronome.sass';

type State = {
  bpm: number,
  tolerance: number,
  beat: number,
};

class Metronome extends React.Component<{}, State> {
  state = {
    bpm: 60,
    tolerance: 6,
    beat: 1,
  };

  onChange = ({
    currentTarget: { name, value },
  }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [name]: value });
  };

  onTap = (value: number) => {
    this.setState({ bpm: value });
  };

  render() {
    return (
      <Layout>
        <Title text="metronome" />
        <Controls
          bpm={this.state.bpm}
          beat={this.state.beat}
          tolerance={this.state.tolerance}
          onChange={this.onChange}
        />
        <figure
          className="metronome_figure"
          style={{ backgroundImage: `url("${base}")` }}
        >
          <Clock {...this.state}>
            <Tick />
            <Rotator>
              <Wand />
            </Rotator>
            <Buttons onTap={this.onTap} />
          </Clock>
        </figure>
      </Layout>
    );
  }
}

export default Metronome;
