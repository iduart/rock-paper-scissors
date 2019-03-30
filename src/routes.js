import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import PlayerSelector from './components/PlayerSelector';

export const MainRoutes = () => (
  <Switch>
    <Route path='/players' component={PlayerSelector} />
    <Route path='/' component={App} />
  </Switch>
);
