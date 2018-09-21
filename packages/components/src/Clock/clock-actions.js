const updateTimer = ({ date, counter, beats }) => ({
  type: '@TIMER/FRAME',
  date,
  counter,
  beats,
});

const saveImmediateID = (value) => ({
  type: '@TIMER/IMMEDIATE_ID',
  key: 'immediateID',
  value,
});

const saveTimeoutID = (value) => ({
  type: '@TIMER/TIMEOUT_ID',
  key: 'timeoutID',
  value,
});

const startTimer = (value) => ({
  type: '@TIMER/START',
  key: 'running',
  value: true,
});

const stopTimer = (value) => ({
  type: '@TIMER/STOP',
  key: 'running',
  value: false,
});

const resetState = () => ({
  type: '@TIMER/RESET',
  date: Date.now(),
  counter: 0,
  beats: 0,
});

const bpmToMs = (bpm) => Math.round((60 * 1000) / bpm);

const setBPM = (value) => ({
  type: '@TIMER/SET_BPM',
  key: 'ms',
  value: bpmToMs(value),
});

const setMS = (value) => ({
  type: '@TIMER/SET_MS',
  key: 'ms',
  value,
});

const setBeat = (value) => ({
  type: '@TIMER/SET_BEAT',
  key: 'beat',
  value,
});

export {
  updateTimer,
  saveTimeoutID,
  saveImmediateID,
  startTimer,
  stopTimer,
  resetState,
  setBPM,
  setMS,
  setBeat,
};
