// @flow
import React from 'react';
import { render } from 'react-dom';

import App from './App';

const root: HTMLElement = global.window.document.getElementById('root')

render(<App />, root);
