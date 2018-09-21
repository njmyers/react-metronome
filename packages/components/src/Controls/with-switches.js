import { connect } from 'react-redux';
import { start, stop } from '../Clock/clock-side-effects';

const withSwitches = (Wrapped) => {
  const mapStateToProps = (state) => ({
    running: state.running,
  });

  const mapDispatchToProps = (dispatch) => ({
    start: () => dispatch(start()),
    stop: () => dispatch(stop()),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);
};

export default withSwitches;
