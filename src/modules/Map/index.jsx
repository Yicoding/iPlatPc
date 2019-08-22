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

class Map extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '类型名称', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '所属公司', dataIndex: 'companyName', key: 'companyName', align: 'center' },
    { title: '公司id', dataIndex: 'company_id', key: 'company_id', align: 'center' },
    { title: '操作', key: 'edit', align: 'center', render: (text) => (
      <div>
        <Button className="right-space" icon="edit" onClick={() => this.edit(text)}>编辑</Button>
        <Button type="danger" icon="delete" onClick={() => this.remove(text)}>删除</Button>
      </div>
    )},
  ]
  children = []
  options = []
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
    this.getGoodsTypeList()
    this.getCompanyList()
  }
  // 获取类型列表
  async getGoodsTypeList() {
    try {
      const { userInfo } = this.props
      let { data } = await api.getGoodsTypeList({
        role_id: userInfo.role_id,
        company_id: userInfo.company_id
      })
      console.log(data)
      this.setState({ dataList: data })
    } catch(e) {
      console.log('getGoodsTypeList', e)
    }
  }
  // 获取公司列表
  async getCompanyList() {
    const { Option } = Select;
    try {
      let { data } = await api.getCompanyList()
      console.log(data)
      this.options = data
      this.children = data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    } catch(e) {
      console.log('getCompanyList报错', e)
    }
  }
  // 新增按钮
  add = () => {
    console.log('add');
    this.type = 'add'
    let { form } = this.props
    form.setFieldsValue({
      name: '',
      company_id: ''
    });
    this.setState({
      title: '新增类型',
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
      company_id: text.company_id
    });
    this.setState({
      title: '编辑类型',
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
      api.removeGoodsType({
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
      let index = this.options.findIndex(item => item.id === values.company_id)
      let companyName = this.options[index].name
      try {
        this.setState({ confirmLoading: true })
        let info = '创建成功，类型家族又添新同胞啦'
        let dataList = this.state.dataList
        if (this.type === 'add') { // 新增
          let { data } = await api.addGoodsType(values)
          console.log(data);
          dataList.push({
            id: data.id,
            name: values.name,
            company_id: values.company_id,
            companyName: companyName
          })
          this.setState({ dataList })
        } else {
          await api.updateGoodsType(Object.assign({}, values, {
            id: this.id
          }))
          info = '更新成功'
          let index = dataList.findIndex(item => item.id === this.id)
          let item = dataList[index]
          Object.assign(item, {
            name: values.name,
            company_id: values.company_id,
            companyName: companyName
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
  render() {
    let {
      add,
      columns,
      children,
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
            <Form>
              <Form.Item label="类型名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, whitespace: true, message: '请输入类型名称' }]
                })(<Input className="form-input" placeholder="请输入类型名称" />)}
              </Form.Item>
              <Form.Item label="所属公司">
                {getFieldDecorator('company_id', {
                  rules: [{ required: true, message: '请选择所属公司' }]
                })(<Select
                  notFoundContent="暂未找到"
                  placeholder="请选择所属公司" >
                  {children}
                </Select>)}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Map' })(Map)

const mapStateToProps = function(store) {
  return {
    userInfo: store.userInfo
  };
};

export default connect(mapStateToProps)(WrappedHorizontalLoginForm);
