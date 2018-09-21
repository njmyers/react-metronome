// @flow
import * as React from 'react';
// components
import Layout from '../Layout';
import Controls from '../Controls';
import Title from '../Title';
import Tick from '../Tick';
import Buttons from '../Buttons';
import Provider from '@metronome/components/src/Provider';
import Rotator from '@metronome/components/src/Rotator';
import Wand from '../Wand';
// assets
import base from '@metronome/assets/base.svg';
// styles
import './metronome.sass';

class Metronome extends React.Component<{}> {
  render() {
    return (
      <Provider>
        <Layout>
          <Title text="metronome" />
          <Controls />
          <figure
            className="metronome_figure"
            style={{ backgroundImage: `url("${base}")` }}
          >
            <Tick />
            <Rotator>
              <Wand />
            </Rotator>
            <Buttons />
          </figure>
        </Layout>
      </Provider>
    );
  }
}

export default Metronome;
