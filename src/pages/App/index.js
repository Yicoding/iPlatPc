import React, { Component } from 'react';

import {
  Icon,
  Layout
} from 'antd';

import Routes from '../../routes';
import SlideMenu from '../../components/SlideMenu';

const { Header, Content } = Layout;

export default class App extends Component {
  state = {
    collapsed: false,
    role: '',
  };
  // 页面初始化
  componentWillMount() {
    // 用户登录获取角色
    setTimeout(() => {
      this.setState({ role: 'root' })
    }, 500)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    let {
      role,
      collapsed
    } = this.state
    return (
      <Layout className="app">
        <SlideMenu role={role} collapsed={collapsed} />
        <Layout>
          <Header>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280
          }}
          >
            <Routes role={role} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
