import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {
  Layout, Menu, Icon,
} from 'antd';

import config from '../../routes/config';

const { Sider } = Layout;


export default class SlideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeKey: ''
    }
  }
  componentDidMount() {
    console.log(window.location)
    let { hash } = window.location
    console.log('hash***', hash)
    this.setState({ routeKey: hash.slice(1) })
  }
  // 设置menu菜单高亮
  setKey(routeKey) {
    this.setState({ routeKey })
  }
  // 渲染列表
  _renderList = role => {
    if (role) {
      let routeList = config[role]
      console.log('routeList', routeList)
      return (
        routeList && routeList.length > 0 && routeList.map(item => {
          return (
            <Menu.Item key={item.route}>
              <Link to={item.route} onClick={() => this.setKey(item.route)}>
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
    let { routeKey } = this.state
    return (
      <Sider
        trigger={null}
        collapsible
        theme="light"
        collapsed={collapsed} >
        <div className="logo">
          <div></div>
        </div>
        <Menu mode="inline" selectedKeys={[routeKey]}>
          {this._renderList(role)}
        </Menu>
      </Sider>
    )
  }
}
