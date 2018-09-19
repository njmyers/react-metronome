import * as React from 'react';

import Tap from '@metronome/components/src/Tap';
import TapButton from './TapButton';
import Switch from './Switch';

import './button.sass';

class Buttons extends React.Component {
  render() {
    return (
      <section className="buttons_container">
        <Tap cb={this.props.onTap}>
          <TapButton />
        </Tap>
        <Switch {...this.props} />
      </section>
    );
  }
}

export default Buttons;
