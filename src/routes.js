import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import PlayerSelector from './components/PlayerSelector';
import Match from './components/Match';
import Result from './components/Result';
import Statistics from './components/Statistics';

export const MainRoutes = () => (
  <Switch>
    <Route path='/statistics' component={Statistics} />
    <Route path='/result' component={Result} />
    <Route path='/match' component={Match} />
    <Route path='/players' component={PlayerSelector} />
    <Route path='/' component={App} />
  </Switch>
);
