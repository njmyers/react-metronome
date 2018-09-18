import React from 'react';
import ReactDOM from 'react-dom';
import WebApp from './pages/WebApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WebApp />, document.getElementById('root'));
registerServiceWorker();
