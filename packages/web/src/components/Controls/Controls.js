// @flow
import * as React from 'react';
import withControls from '@metronome/components/src/Controls/with-controls';
import './controls.sass';
import './range.sass';

type Props = {
  ms: number,
  bpm: number,
  beat: number,
  setBPM: Function,
  setBeat: Function,
};

class Controls extends React.Component<Props> {
  onChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'beat':
        return this.props.setBeat(value);
      case 'bpm':
        return this.props.setBPM(value);
      default:
        return;
    }
  };

  render() {
    return (
      <section className="controls">
        <div>
          <label className="controls_label">BPM: {this.props.bpm}</label>
          <input
            type="range"
            min="30"
            max="400"
            name="bpm"
            value={this.props.bpm}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label className="controls_label">Beat: {this.props.beat}</label>
          <input
            type="range"
            min="0"
            max="7"
            name="beat"
            value={this.props.beat}
            onChange={this.onChange}
          />
        </div>
      </section>
    );
  }
}

export default withControls(Controls);
