import React from 'react';
import ReactDOM from 'react-dom';
import Metronome from './components/Metronome';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';

ReactDOM.render(<Metronome />, document.getElementById('root'));
registerServiceWorker();
