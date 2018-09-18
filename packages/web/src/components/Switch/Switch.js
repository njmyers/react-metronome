import * as React from 'react';
import './switch.sass';

const Switch = ({ stop, start, running } = {}) => (
  <button className="button" onClick={running ? stop : start}>
    {running ? 'stop' : 'start'}
  </button>
);

export default Switch;
