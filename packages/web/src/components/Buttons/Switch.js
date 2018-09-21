import * as React from 'react';
import withSwitches from '@metronome/components/src/Controls/with-switches';

const Switch = ({ stop, start, running } = {}) => (
  <button className="button" onClick={running ? stop : start}>
    {running ? 'Stop' : 'Start'}
  </button>
);

export default withSwitches(Switch);
