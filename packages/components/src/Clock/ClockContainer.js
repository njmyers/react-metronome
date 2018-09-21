import { connect } from 'react-redux';
import { setBPM, resetState } from './clock-actions';
import { start, stop } from './clock-side-effects';
import ClockComponent from './ClockComponent';

const mapStateToProps = (state) => ({
  date: state.date,
  counter: state.counter,
  beats: state.beats,
  ms: state.ms,
  running: state.running,
});

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(resetState()),
  setBPM: (value) => dispatch(setBPM(value)),
  stop: () => dispatch(stop()),
  start: () => dispatch(start()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockComponent);
