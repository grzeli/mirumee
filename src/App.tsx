import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import asyncComponent from './hoc/asyncComponent';

import Home from './containers/home/home';

// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// })

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
