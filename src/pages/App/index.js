import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../redux/actions'
import Store from '../../common/js/storage'

import {
  Icon,
  Layout,
  message
} from 'antd';

import Routes from '../../routes';
import SlideMenu from '../../components/SlideMenu';

const { Header, Content } = Layout;

class App extends Component {
  userInfoStore = Store.userInfoStore
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
    // 获取userInfo
    let userInfo = this.props.userInfo
    if (JSON.stringify(userInfo) === '{}') { // 不是登陆来的
      let data = this.userInfoStore.get()
      if (!data) { // 本地也没有存储信息，去登陆
        message.warning('您还没有登录呦')
        return this.props.history.replace('/login')
      } else { // 本地有用户信息，存储到redux
        const { loginOk } = this.props
        loginOk(data.value)
        userInfo = data.value
      }
    } else { // 登录获取用户信息，存储到本地
      this.userInfoStore.set(userInfo)
    }
    console.log('userInfo', userInfo)
    this.setState({ role: userInfo.role_name })
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

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    loginOk: (data) => {
      dispatch(setUserInfo(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);