import * as React from 'react';
import Metronome from '../components/Metronome';
import AppLink from '../components/AppLink';
import 'normalize.css';

const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

const WebApp = () => (!iOS ? <Metronome /> : <AppLink />);

export default WebApp;
