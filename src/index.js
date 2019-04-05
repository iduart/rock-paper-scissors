import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes';
import { Provider } from './state';

ReactDOM.render(
  <Provider>
    <BrowserRouter basename="/rock-paper-scissors">
      <MainRoutes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
