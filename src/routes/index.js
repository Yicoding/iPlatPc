import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AllComponents from '../modules';
import config from './config';

import OrderDetail from '../modules/Order/detail';
import NotFound from '../pages/NotFound';

export default class RouteConfig extends Component {
  // 渲染初始化路由 /app时
  _renderInitRoute = role => {
    if (role && config[role] && config[role].length > 0) {
      const Component = AllComponents[config[role][0].component]
      return (
        <Route path="/app" exact render={(props) => {
          return <Component {...props} />
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
              render={(props) => {
                return <Component {...props} />
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
        {
          role && role === 'admin' &&
          <Route path="/app/order/:order_id" exact render={(props) => {
            return <OrderDetail {...props} />
          }} />
        }
        {this._renderRouteList(role)}
        <Route path="/404" exact render={(props) => {
          return <NotFound {...props} />
        }} />
      </Switch>
    )
  }
}
