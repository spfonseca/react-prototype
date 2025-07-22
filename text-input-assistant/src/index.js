import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBackwardStep,
  faBackward,
  faForward,
  faForwardStep,
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faFileExport
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBackwardStep,
  faBackward,
  faForward,
  faForwardStep,
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faFileExport
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
