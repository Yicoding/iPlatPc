import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { setUserInfo } from '../../actions'

import {
  Icon,
  Layout
} from 'antd';

import Routes from '../../routes';
import SlideMenu from '../../components/SlideMenu';

const { Header, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    role: '',
  };
  // 页面初始化
  componentWillMount() {
    this.getLogin()
  }
  // 用户登录获取角色
  getLogin() {
    let userInfo = this.props.userInfo
    console.log('userInfo', userInfo)
    setTimeout(() => {
      this.setState({ role: 'admin' })
    }, 500)
  }
  // 收起展开菜单
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


const mapStateToProps = function(store) {
  return {
    userInfo: store.userInfo
  };
};

export default connect(mapStateToProps)(App);