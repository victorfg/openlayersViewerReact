import React from 'react';
import ReactDOM from 'react-dom';
import RouterMiddleware from './RouterMiddleware';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <RouterMiddleware />
  </React.StrictMode>,
  document.getElementById('root')
);