import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

import {
  Layout, Menu, Icon,
} from 'antd';

import AllComponents from '../../modules';
import config from '../../routes/config';

const { Sider } = Layout;

class SlideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultKey: ''
    }
  }
  componentDidMount() {
    let { pathname } = window.location
    console.log(pathname)
    setTimeout(() => {

      this.setState({
        defaultKey: pathname
      })
    }, 1000)
  }
  // 确定key
  _renderKey = role => {
    if (role) {
      let routeList = config[role]
      // alert(routeList[0].route)
      return [routeList[0].route]
    }
    return []
  }
  // 渲染列表
  _renderList = role => {
    if (role) {
      let routeList = config[role]
      return (
        routeList && routeList.length > 0 && routeList.map(item => {
          return (
            <Menu.Item key={item.route}>
              <Link to={item.route}>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          )
        })
      )
    }
    return null
  }
  render() {
    const { role, collapsed } = this.props
    let { defaultKey } = this.state
    return (
      <Sider
        trigger={null}
        collapsible
        theme="light"
        collapsed={collapsed} >
        <div className="logo">
          <div />
        </div>
        <Menu mode="inline" defaultSelectedKeys={[defaultKey]}>
          {this._renderList(role)}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SlideMenu);