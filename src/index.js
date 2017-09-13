import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Metronome from './Metronome';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Metronome />, document.getElementById('root'));
registerServiceWorker();
