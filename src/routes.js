import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import PlayerSelector from './components/PlayerSelector';
import Match from './components/Match';
import Result from './components/Result';

export const MainRoutes = () => (
  <Switch>
    <Route path='/result' component={Result} />
    <Route path='/match' component={Match} />
    <Route path='/players' component={PlayerSelector} />
    <Route path='/' component={App} />
  </Switch>
);
