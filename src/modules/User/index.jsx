/**
 * company
 */
import React, { Component } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select
} from 'antd';

import { connect } from 'react-redux';
import { api } from '../../api/index.js'
const { Option } = Select;

class User extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '用户名', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '手机号', dataIndex: 'phone', key: 'phone', align: 'center' },
    { title: '密码', dataIndex: 'password', key: 'password', align: 'center' },
    { title: '年龄', dataIndex: 'age', key: 'age', align: 'center' },
    { title: '角色', dataIndex: 'role_fullName', key: 'role_fullName', align: 'center' },
    { title: '性别', dataIndex: 'sex', key: 'sex', align: 'center', render: (text) => {
      if (text === 'man') {
        return '男士';
      }
      return '女士';
    } },
    { title: '个性签名', dataIndex: 'sign', key: 'sign', align: 'center' },
    { title: '操作', key: 'edit', align: 'center', render: (text) => (
      <div>
        <Button className="right-space" icon="edit" onClick={() => this.edit(text)}>编辑</Button>
        <Button type="danger" icon="delete" onClick={() => this.remove(text)}>删除</Button>
      </div>
    )},
  ]
  children = []
  roles = []
  sexs = [
    <Option key={1} value="man">男士</Option>,
    <Option key={2} value="woman">女士</Option>
  ]
  options = []
  optionsRole = []
  type = ''
  id = 0
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      title: '',
      visible: false,
      confirmLoading: false
    }
  }
  componentDidMount() {
    const { company_id } = this.props;
    const { columns } = this;
    this.getUserList()
    this.getRoleList()
    if (!company_id) {
      this.getCompanyList()
      columns.splice(5, 0, { title: '所属公司', dataIndex: 'companyName', key: 'companyName', align: 'center' });
    }
  }
  // 获取用户列表
  async getUserList() {
    try {
      const { company_id } = this.props
      let { data } = await api.getUserList({
        company_id: company_id
      })
      console.log(data)
      this.setState({ dataList: data })
    } catch(e) {
      console.log('getUserList', e)
    }
  }
  // 获取公司列表
  async getCompanyList() {
    try {
      let { data } = await api.getCompanyList()
      console.log(data)
      this.options = data
      this.children = data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    } catch(e) {
      console.log('getCompanyList报错', e)
    }
  }
  // 获取角色列表
  async getRoleList() {
    try {
      const { company_id } = this.props
      let value = {
        company_id
      }
      let { data } = await api.getRoleList(value)
      console.log(data)
      this.optionsRole = data
      this.roles = data.map(item => <Option key={item.id} value={item.id}>{item.fullName}</Option>)
    } catch(e) {
      console.log('getRoleList', e)
    }
  }
  // 新增按钮
  add = () => {
    console.log('add');
    this.type = 'add'
    let { form, userInfo, company_id } = this.props
    form.setFieldsValue({
      name: '',
      phone: '',
      password: '',
      age: '',
      company_id: !company_id ? null : userInfo.company_id,
      role_id: '',
      sex: '',
      sign: '',
      avatar: ''
    });
    this.setState({
      title: '新增用户',
      visible: true
    })
  }
  // 编辑按钮
  edit = (text) => {
    console.log(text);
    this.type = 'edit'
    this.id = text.id
    let { form } = this.props
    form.setFieldsValue({
      name: text.name,
      phone: text.phone,
      password: text.password,
      age: text.age,
      company_id: text.company_id,
      role_id: text.role_id,
      sex: text.sex,
      sign: text.sign,
      avatar: text.avatar
    });
    this.setState({
      title: '编辑用户',
      visible: true
    })
  }
  // 删除按钮
  remove = (text) => {
    const { confirm } = Modal
    confirm({
      title: `确定要删除${text.name}吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        this.removeFuc(text)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 删除逻辑
  async removeFuc(text) {
    try {
      api.removeUser({
        id: text.id
      })
      let index = this.state.dataList.findIndex(item => item.id === text.id)
      message.success('删除成功');
      let dataList = this.state.dataList
      dataList.splice(index, 1)
      this.setState({ dataList })
    } catch(e) {
      console.log('removeError', e)
    }
  }
  // 确定按钮
  handleOk = () => {
    let { validateFields } = this.props.form
    const { userInfo, company_id } = this.props
    validateFields(async(err, values) => {
      if (err) {
        return console.log('handleOkError', err)
      }
      console.log('form', values);
      if (company_id) {
        values.company_id = userInfo.company_id
      }
      let index = this.options.findIndex(item => item.id === values.company_id)
      let companyName = !company_id ? this.options[index].name : userInfo.companyName
      let roleIndex = this.optionsRole.findIndex(item => item.id === values.role_id)
      let role_fullName = this.optionsRole[roleIndex].fullName
      try {
        this.setState({ confirmLoading: true })
        let info = '创建成功，用户家族又添新同胞啦'
        let dataList = this.state.dataList
        if (this.type === 'add') { // 新增
          let { data } = await api.addUser(values)
          console.log(data);
          dataList.push({
            id: data.id,
            name: values.name,
            phone: values.phone,
            password: values.password,
            age: values.age,
            company_id: values.company_id,
            companyName: companyName,
            role_id: values.role_id,
            sex: values.sex,
            role_fullName: role_fullName,
            sign: values.sign,
            avatar: values.avatar
          })
          this.setState({ dataList })
        } else {
          await api.updateUser(Object.assign({}, values, {
            id: this.id
          }))
          info = '更新成功'
          let index = dataList.findIndex(item => item.id === this.id)
          let item = dataList[index]
          Object.assign(item, {
            name: values.name,
            name: values.name,
            phone: values.phone,
            password: values.password,
            age: values.age,
            company_id: values.company_id,
            companyName: companyName,
            role_id: values.role_id,
            sex: values.sex,
            role_fullName: role_fullName,
            sign: values.sign,
            avatar: values.avatar
          })
        }
        this.setState({
          dataList,
          visible: false,
          confirmLoading: false
        })
        message.success(info);
      } catch(e) {
        console.log('handleOkError', e)
      }
    });
  }
  // 验证表单
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  // 取消按钮
  handleCancel = () => {
    this.setState({ visible: false })
  }
  // 渲染弹窗中的公司选择器
  _renderFormCompany = role_name => {
    const { getFieldDecorator } = this.props.form;
    const { children } = this
    const { company_id } = this.props
    if (!company_id) {
      return (
        <Form.Item label="所属公司">
          {getFieldDecorator('company_id', {
            rules: [{ required: true, message: '请选择所属公司' }]
          })(<Select
            notFoundContent="暂未找到"
            placeholder="请选择所属公司" >
            {children}
          </Select>)}
        </Form.Item>
      )
    }
    return null
  }
  render() {
    const {
      add,
      columns,
      roles,
      sexs,
      handleOk,
      handleCancel
    } = this
    const {
      dataList,
      title,
      visible,
      confirmLoading
    } = this.state
    const { userInfo } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="table-filter-box">
          <Button type="primary" icon="plus" onClick={add}>添加</Button>
        </div>
        <Table columns={columns} dataSource={dataList} rowKey="id" scroll={{ x: 'max-content' }} />
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          okText="确定"
          onCancel={handleCancel} 
          cancelText="取消" >
            <Form>
              <Form.Item label="用户名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, whitespace: true, message: '请输入用户名称' }]
                })(<Input className="form-input" placeholder="请输入用户名称" />)}
              </Form.Item>
              <Form.Item label="手机号">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, whitespace: true, message: '请输入手机号' }]
                })(<Input className="form-input" placeholder="请输入手机号" />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, whitespace: true, message: '请输入密码' }]
                })(<Input className="form-input" placeholder="请输入密码" />)}
              </Form.Item>
              <Form.Item label="年龄">
                {getFieldDecorator('age', {
                  rules: [{ message: '请输入年龄' }]
                })(<Input className="form-input" placeholder="请输入年龄" />)}
              </Form.Item>
              {this._renderFormCompany(userInfo.role_name)}
              <Form.Item label="角色">
                {getFieldDecorator('role_id', {
                  rules: [{ required: true, message: '请选择所属角色' }]
                })(<Select
                  notFoundContent="暂未找到"
                  placeholder="请选择所属角色" >
                  {roles}
                </Select>)}
              </Form.Item>
              <Form.Item label="性别">
                {getFieldDecorator('sex', {
                  rules: [{ message: '请选择性别' }]
                })(<Select
                  notFoundContent="暂未找到"
                  placeholder="请选择性别" >
                  {sexs}
                </Select>)}
              </Form.Item>
              <Form.Item label="个性签名">
                {getFieldDecorator('sign', {
                  rules: [{ message: '请输入个性签名' }]
                })(<Input className="form-input" placeholder="请输入个性签名" />)}
              </Form.Item>
              <Form.Item label="头像地址">
                {getFieldDecorator('avatar', {
                  rules: [{ message: '请输入头像地址' }]
                })(<Input className="form-input" placeholder="请输入头像地址" />)}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'User' })(User)

const mapStateToProps = function(store) {
  return {
    userInfo: store.userInfo,
    company_id: store.company_id
  };
};

export default connect(mapStateToProps)(WrappedHorizontalLoginForm);
