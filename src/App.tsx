import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Home from './containers/home/home';

export class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(App);
