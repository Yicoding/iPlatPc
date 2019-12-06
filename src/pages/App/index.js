import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo, setCompanyId } from '../../redux/actions'
import Store from '../../common/js/storage'

import {
  Icon,
  Menu,
  Modal,
  Layout,
  message,
  Dropdown,
} from 'antd';


import Routes from '../../routes';
import SlideMenu from '../../components/SlideMenu';

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      role: '',
    };
  }
  userInfoStore = Store.userInfoStore
  menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => this.showDeleteConfirm()}>退出</span>
      </Menu.Item>
    </Menu>
  )
  // 页面初始化
  componentWillMount() {
    this.getLogin()
  }
  // 删除按钮
  showDeleteConfirm() {
    Modal.confirm({
      title: '确认要退出吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        this.userInfoStore.remove();
        this.props.history.replace('/login');
        console.log(this.props.history)
      },
    });
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
    }
    console.log('userInfo', userInfo)
    // 是否只查看某个公司
    let single = false;
    let params = new URLSearchParams(window.location.search);
    let company_id = params.get('company_id');
    console.log('company_id****', company_id);
    if (userInfo.role_name === 'admin') {
      single = true
      const { setCompany } = this.props;
      setCompany(userInfo.company_id);
    }
    if (company_id) { // root查看
      single = true
      const { setCompany } = this.props;
      setCompany(company_id);
    }
    if (single) {
      this.setState({ role: 'admin' })
    } else {
      this.setState({ role: userInfo.role_name })
    }
  }
  // 收起展开菜单
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {
      role,
      collapsed
    } = this.state
    const { userInfo } = this.props;
    return (
      <Layout className="app">
        <SlideMenu role={role} collapsed={collapsed} />
        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Dropdown overlay={this.menu}>
              <div className="name">
                {userInfo.name} <Icon type="down" />
              </div>
            </Dropdown>
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


const mapStateToProps = function (store) {
  return {
    userInfo: store.userInfo,
    company_id: store.company_id
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    loginOk: (data) => {
      dispatch(setUserInfo(data))
    },
    setCompany: (id) => {
      dispatch(setCompanyId(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);