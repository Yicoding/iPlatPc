import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AllComponents from '../modules';
import config from './config';

export default class RouteConfig extends Component {
  // 渲染初始化路由
  _renderInitRoute = role => {
    if (role && config[role] && config[role].length > 0) {
      const Component = AllComponents[config[role][0].component]
      return (
        <Route path="/app" exact render={() => {
          return <Component />
        }} />
      )
    }
    return null
  }
  // 渲染列表
  _renderRouteList = role => {
    if (role) {
      const routeList = config[role]
      return (
        routeList && routeList.length > 0 && routeList.map(item => {
          const Component = AllComponents[item.component]
          return (
            <Route
              key={item.route}
              path={item.route}
              exact
              render={() => {
                return <Component />
              }} />
          )
        })
      )
    }
    return null
  }
  render() {
    const { role } = this.props
    return (
      <Switch>
        {this._renderInitRoute(role)}
        {this._renderRouteList(role)}
      </Switch>
    )
  }
}
