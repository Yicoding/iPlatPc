/**
 * company
 */
import React, { Component } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input
} from 'antd';

import { api } from '../../api/index.js'

class Company extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '公司名称', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '标志', dataIndex: 'logo', key: 'logo' },
    { title: '公司描述', dataIndex: 'desc', key: 'desc' },
    { title: '操作', key: 'edit', render: () => (
      <div>
        <Button icon="edit" onClick={() => this.edit()}>编辑</Button>
        <Button type="danger" icon="delete" onClick={this.add}>删除</Button>
      </div>
    )},
  ]
  type = ''
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      title: '',
      visible: false,
      confirmLoading: false
    }
  }
  async componentDidMount() {
    try {
      let { data } = await api.getCompanyList()
      console.log(data)
      this.setState({ dataList: data })
    } catch(e) {
      console.log('getCompanyList报错', e)
    }
  }
  // 新增按钮
  add = () => {
    console.log('add');
    this.type = 'add'
    this.setState({
      title: '新增公司',
      visible: true
    })
  }
  // 编辑按钮
  edit = () => {

  }
  // 确定按钮
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(err)
      }
      console.log('form', values)
    });
  }
  // 取消按钮
  handleCancel = () => {
    this.setState({ visible: false })
  }
  handleSelectChange = (e) => {
    // const { form } = this.props;
    // const keys = form.getFieldValue('keys');debugger
    // console.log(e.target.value)
    // var value = e.target.value
    // form.setFieldsValue({
    //   keys: value
    // });
  }
  render() {
    let {
      columns,
      handleOk,
      handleCancel
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
          <Button type="primary" icon="plus" onClick={this.add}>添加</Button>
        </div>
        <Table columns={columns} dataSource={dataList} rowKey="id" />
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          onCancel={handleCancel} >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="公司名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入公司名称' }]
                })(<Input placeholder="请输入公司名称" />)}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Company' })(Company)

export default WrappedHorizontalLoginForm