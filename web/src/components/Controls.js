// @flow
import * as React from 'react';
import './controls.sass';
import './range.sass';

const Controls = ({ bpm, beat, tolerance, onChange }) => (
  <aside className="controls">
    <div>
      <label>BPM: {bpm}</label>
      <input
        type="range"
        min="30"
        max="320"
        name="bpm"
        value={bpm}
        onChange={onChange}
      />
    </div>
    <div>
      <label className="beat_input">Beat: {beat}</label>
      <input
        className="beat"
        type="range"
        min="0"
        max="7"
        name="beat"
        value={beat}
        onChange={onChange}
      />
    </div>
    <div>
      <label>Tolerance: {tolerance}</label>
      <input
        type="range"
        min="0"
        max="10"
        name="tolerance"
        value={tolerance}
        onChange={onChange}
      />
    </div>
  </aside>
);

export default Controls;
