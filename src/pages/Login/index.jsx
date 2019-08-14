import React, { Component } from 'react';
import {
  Icon,
  Button,
  Form,
  Input,
  message
} from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions'
import store from '../../store';


import { api } from '../../api/index.js'

class Login extends Component {
  componentDidMount() {
  }
  // 用户登录
  handleSubmit = e => {
    e.preventDefault();
    let { validateFields } = this.props.form
    validateFields(async(err, values) => {
      if (err) {
        return console.log('handleOkError', err)
      }
      console.log('form', values)
      this.userLogin(values)
    });
  }
  // 用户登录
  async userLogin(values) {
    const { loginOk } = this.props
    try {
      let { code, data } = await api.userLogin(values)
      console.log(data);
      if (code === 0) {
        message.success('恭喜你，登录成功');
        loginOk(data)
        setTimeout(() => {
          this.props.history.push('/app')
        }, 1000)
      } else {
        message.error(data);
      }
    } catch(e) {
      console.log('handleSubmit', e)
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let { handleSubmit } = this
    return (
      <div className="login">
        <div className="login-box">
          <p className="login-title">系统登录</p>
          <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, whitespace: true, message: '请输入账号' }]
                })(<Input placeholder="账号" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, whitespace: true, message: '请输入密码' }]
                })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" size="large" />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block >
                  登录
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Login' })(Login)

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

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);