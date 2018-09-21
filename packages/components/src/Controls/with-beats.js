import { connect } from 'react-redux';

const withBeats = (Wrapped) => {
  const mapStateToProps = (state) => ({
    beat: state.beat,
    beats: state.beats,
    running: state.running,
  });

  return connect(mapStateToProps)(Wrapped);
};

export default withBeats;
