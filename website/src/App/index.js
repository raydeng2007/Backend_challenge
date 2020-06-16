import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Route, Switch } from 'react-router';

import TestSelect from './TestSelect';
import FrontEndClassicSearch from '../front-end-classic/containers/search';
import FrontEndHooksSearch from '../front-end-hooks/containers/Search';
import Vehicles from '../back-end/containers/Vehicles';

const App = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={TestSelect}
      />
      <Route
        exact
        path="/front-end-classic"
        component={FrontEndClassicSearch}
      />
      <Route
        exact
        path="/front-end-hooks"
        component={FrontEndHooksSearch}
      />
      <Route
        exact
        path="/back-end"
        component={Vehicles}
      />
    </Switch>
  </Router>
);

export default App;
