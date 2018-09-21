import { connect } from 'react-redux';
import { setBeat, setBPM, setMS } from '../Clock/clock-actions';

const msToBpm = (ms) => Math.round(60 / (ms / 1000));

const withControls = (Wrapped) => {
  const mapStateToProps = (state) => ({
    beat: state.beat,
    ms: state.ms,
    bpm: msToBpm(state.ms),
  });

  const mapDispatchToProps = (dispatch) => ({
    setMS: (value) => dispatch(setMS(value)),
    setBPM: (value) => dispatch(setBPM(value)),
    setBeat: (value) => dispatch(setBeat(value)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);
};

export default withControls;
