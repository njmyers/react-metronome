import {
  updateTimer,
  saveTimeoutID,
  saveImmediateID,
  resetState,
  startTimer,
  stopTimer,
} from './clock-actions';

// when to switch to setImmediate
const tolerance = 50;
const frameRate = 1;

const shouldBeat = (state: State) => {
  return state.counter >= state.ms || Math.abs(state.ms - state.counter) <= 0;
};

const withinTolerance = (state: State) => {
  return Math.abs(state.counter - state.ms) <= tolerance;
};

const frame = () => (dispatch, getState) => {
  const prevState = getState();

  let scheduleNext = () => null;

  if (!prevState.running) {
    return;
  }

  if (shouldBeat(prevState)) {
    // do other stuff first
    scheduleNext = () =>
      dispatch(saveTimeoutID(setTimeout(() => dispatch(frame()), frameRate)));
    // log
    if (process.env.NODE_ENV !== 'production') {
      console.log('beat: ', prevState.counter);
    }
    // now do time sensitive stuff
    // get the next performance stamp
    const date = window.performance.now();
    // calculate difference...
    const difference = date - prevState.date;
    // ... and carry over remainder to next state
    const counter = prevState.counter + difference - prevState.ms;
    // log the passing of a beat
    const beats = prevState.beats + 1;

    dispatch(
      updateTimer({
        date,
        counter,
        beats,
      })
    );
  } else {
    // do other stuff first
    scheduleNext = () =>
      dispatch(saveTimeoutID(setTimeout(() => dispatch(frame()), frameRate)));

    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('timeout: ', prevState.counter);
    // }

    // now do time sensitive stuff
    const date = window.performance.now();
    const difference = date - prevState.date;
    const counter = prevState.counter + difference;

    dispatch(
      updateTimer({
        beats: prevState.beats,
        date,
        counter,
      })
    );
  }

  scheduleNext();
};

const stop = () => (dispatch, getState) => {
  const { timerID, immediateID } = getState();

  if (timerID) {
    clearTimeout(timerID);
  }

  if (immediateID) {
    clearImmediate(immediateID);
  }

  dispatch(stopTimer());
  dispatch(resetState());
};

const start = () => (dispatch) => {
  // reset
  dispatch(resetState());
  // save the timeoutID and start the timer
  dispatch(saveTimeoutID(setTimeout(() => dispatch(frame()), frameRate)));
  // save state
  dispatch(startTimer());
};

export { start, stop };
