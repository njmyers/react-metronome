import { connect } from 'react-redux';

const withClock = (Wrapped) => {
  const mapStateToProps = (state) => ({
    ms: state.ms,
    counter: state.counter,
    beat: state.beat,
    beats: state.beats,
    running: state.running,
  });

  return connect(mapStateToProps)(Wrapped);
};

export default withClock;
