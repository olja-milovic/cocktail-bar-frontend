import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-lora';
import 'typeface-noto-sans';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './app/App';
import './index.css';

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);

serviceWorkerRegistration.register();
