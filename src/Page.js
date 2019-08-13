import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

// redux
import { Provider } from 'react-redux'
import store from './store'

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/app/goods" push />} /> */}
        <Route exact path="/" render={() => <Redirect to="/login" push />} />
        <Route path="/app" component={App} />
        <Route path="/404" component={NotFound} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)