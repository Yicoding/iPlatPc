import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

// redux
import { Provider } from 'react-redux'
import store from './redux/store'

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/app/goods" push />} /> */}
        <Route exact path="/" render={() => <Redirect to="/login" push />} />
        <Route path="/app" component={(props) => <App {...props} />} />
        <Route path="/404" component={(props) => <NotFound {...props} />} />
        <Route path="/login" component={(props) => <Login {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)