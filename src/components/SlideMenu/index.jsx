import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {
  Layout, Menu, Icon,
} from 'antd';

import config from '../../routes/config';
import { getQueryString } from '../../common/js/tools'

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
    let string = hash.split('?')[0]
    console.log('hash***', string)
    this.setState({ routeKey: string.slice(1) })
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
      // 判断是否是root查看某个公司的信息
      let company_id = window.sessionStorage.getItem('company_id');
      if (Object.prototype.toString.call(company_id) === '[object Null]') {
        company_id = getQueryString('company_id');
        if (company_id) {
          window.sessionStorage.setItem('company_id', company_id)
        }
      }
      if (company_id) {
        routeList.forEach(item => {
          item.route = item.route.split(':')[0] + company_id
        })
      }
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
