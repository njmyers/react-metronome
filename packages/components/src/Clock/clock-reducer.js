// @flow
type State = {
  date: number,
  counter: number,
  beats: number,
  ms: number,
  beat: number,
  running: boolean,
  timeoutID: null | TimeoutID,
  immediateID: null | ImmediateID,
};

const initialState: State = {
  date: 0,
  counter: 0,
  beats: 0,
  // speed of the metronome
  ms: 1000,
  // when to have the down beat
  beat: 4,
  running: false,
  timeoutID: null,
  immediateID: null,
};

const clockReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case '@TIMER/FRAME':
    case '@TIMER/RESET':
      return {
        ...state,
        date: action.date,
        counter: action.counter,
        beats: action.beats,
      };
    default:
      return {
        ...state,
        [action.key]: action.value,
      };
  }
};

export default clockReducer;
