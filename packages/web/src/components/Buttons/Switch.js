import * as React from 'react';

const Switch = ({ stop, start, running } = {}) => (
  <button className="button" onClick={running ? stop : start}>
    {running ? 'Stop' : 'Start'}
  </button>
);

export default Switch;
