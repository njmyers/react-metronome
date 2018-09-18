import * as React from 'react';
import '../Switch/switch.sass';

const TapButton = ({ tap }) => (
  <button className="button" onClick={tap}>
    Tap
  </button>
);

export default TapButton;
