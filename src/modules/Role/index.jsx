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
} from 'antd';


import { api } from '../../api/index.js'

class Role extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '角色名称', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '角色全称', dataIndex: 'fullName', key: 'fullName', align: 'center' },
    { title: '操作', key: 'edit', align: 'center', render: (text) => (
      <div>
        <Button className="right-space" icon="edit" onClick={() => this.edit(text)}>编辑</Button>
        <Button type="danger" icon="delete" onClick={() => this.remove(text)}>删除</Button>
      </div>
    )},
  ]
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
    this.getRoleList()
  }
  // 获取角色列表
  async getRoleList() {
    try {
      let { data } = await api.getRoleList()
      console.log(data)
      this.setState({ dataList: data })
    } catch(e) {
      console.log('getRoleList', e)
    }
  }
  // 新增按钮
  add = () => {
    console.log('add');
    this.type = 'add'
    let { form } = this.props
    form.setFieldsValue({
      name: '',
      fullName: ''
    });
    this.setState({
      title: '新增角色',
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
      fullName: text.fullName
    });
    this.setState({
      title: '编辑角色',
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
      api.removeRole({
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
    validateFields(async(err, values) => {
      if (err) {
        return console.log('handleOkError', err)
      }
      console.log('form', values)
      try {
        this.setState({ confirmLoading: true })
        let info = '创建成功，角色家族又添新同胞啦'
        let dataList = this.state.dataList
        if (this.type === 'add') { // 新增
          let { data } = await api.addRole(values)
          console.log(data);
          dataList.push({
            id: data.id,
            name: values.name,
            fullName: values.fullName
          })
          this.setState({ dataList })
        } else {
          await api.updateRole(Object.assign({}, values, {
            id: this.id
          }))
          info = '更新成功'
          let index = dataList.findIndex(item => item.id === this.id)
          let item = dataList[index]
          Object.assign(item, {
            name: values.name,
            fullName: values.fullName
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
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  // 取消按钮
  handleCancel = () => {
    this.setState({ visible: false })
  }
  render() {
    let {
      add,
      columns,
      handleOk,
      handleCancel,
    } = this
    let {
      dataList,
      title,
      visible,
      confirmLoading
    } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="table-filter-box">
          <Button type="primary" icon="plus" onClick={add}>添加</Button>
        </div>
        <Table columns={columns} dataSource={dataList} rowKey="id" />
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          okText="确定"
          onCancel={handleCancel} 
          cancelText="取消" >
            <Form layout="inline">
              <Form.Item label="角色名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, whitespace: true, message: '请输入角色名称' }]
                })(<Input className="form-input" placeholder="请输入角色名称" />)}
              </Form.Item>
              <Form.Item label="角色全称">
                {getFieldDecorator('fullName', {
                  rules: [{ required: true, whitespace: true, message: '请输入角色全称' }]
                })(<Input className="form-input" placeholder="请输入角色全称" />)}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Role' })(Role)

export default WrappedHorizontalLoginForm