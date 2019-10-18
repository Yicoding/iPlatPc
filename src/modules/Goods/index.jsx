/**
 * goods
 */
import React, { Component } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Tag
} from 'antd';

import { connect } from 'react-redux';
import { api } from '../../api/index.js'

const colorArr = ['green', 'cyan', 'purple', 'geekblue', 'blue']

class Goods extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center', fixed: 'left' },
    { title: '商品名', dataIndex: 'name', key: 'name', align: 'center', fixed: 'left' },
    { title: '所属公司', dataIndex: 'companyName', key: 'companyName', align: 'center' },
    { title: '单价单位', dataIndex: 'unitOne.name', key: 'unitOne.name', align: 'center' },
    { title: '总单位', dataIndex: 'unitDouble.name', key: 'unitDouble.name', align: 'center' },
    { title: '进货单价(元)', dataIndex: 'buySingle', key: 'buySingle', align: 'center' },
    { title: '进货总价(元)', dataIndex: 'buyAll', key: 'buyAll', align: 'center' },
    { title: '批发单价(元)', dataIndex: 'midSingle', key: 'midSingle', align: 'center' },
    { title: '批发总价(元)', dataIndex: 'midAll', key: 'midAll', align: 'center' },
    { title: '零售单价(元)', dataIndex: 'sellSingle', key: 'sellSingle', align: 'center' },
    { title: '零售总价(元)', dataIndex: 'sellAll', key: 'sellAll', align: 'center' },
    { title: '商品数量', dataIndex: 'num', key: 'num', align: 'center' },
    { title: '商品描述', dataIndex: 'desc', key: 'desc', align: 'center' },
    { title: '商品来源', dataIndex: 'origin', key: 'origin', align: 'center' },
    { title: '商品类别', key: 'typeName', align: 'center', width: 200, render: (text) => (
      <div>
        {
          text.typeName.map((item, index) => {
            return <Tag key={index} color={colorArr[index]}>{item.name}</Tag>
          })
        }
      </div>
    ) },
    { title: '商品图片', dataIndex: 'coverImg', key: 'coverImg', align: 'center', width: 150 },
    { title: '操作', key: 'edit', align: 'center', fixed: 'right', render: (text) => (
      <div>
        <Button className="right-space" icon="edit" onClick={() => this.edit(text)}>编辑</Button>
        <Button type="danger" icon="delete" onClick={() => this.remove(text)}>删除</Button>
      </div>
    )},
  ]
  
  dataCompanys = [] // 公司数据列表
  optionCompanys = [] // 公司选择器列表
  dataUnits = [] // 单位数据列表
  // optionUints = [] // 单位选择器列表
  dataTypes = [] // 商品类别数据列表
  // optionTypes = [] // 商品类别选择器列表
  
  type = ''
  id = 0
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      title: '',
      visible: false,
      confirmLoading: false,
      showUnit: false,
      optionUints: [], // 单位选择器列表
      optionTypes: [] // 商品类别选择器列表
    }
  }
  componentDidMount() {
    console.log('form------', this.props.form)
    const { company_id } = this.props
    this.getGoodsList()
    if (!company_id) {
      this.getCompanyList()
    } else {
      this.getUnitList()
      this.getGoodsTypeList()
    }
  }
  // 获取商品列表
  async getGoodsList() {
    try {
      const { company_id } = this.props
      let { data } = await api.getGoodsList({
        company_id: company_id
      })
      console.log(data)
      this.setState({ dataList: data })
    } catch(e) {
      console.log('getGoodsList', e)
    }
  }
  // 获取公司列表
  async getCompanyList() {
    const { Option } = Select;
    try {
      let { data } = await api.getCompanyList()
      console.log(data)
      this.dataCompanys = data
      this.optionCompanys = data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    } catch(e) {
      console.log('getCompanyList报错', e)
    }
  }
  // 获取商品类型列表
  async getGoodsTypeList(id=null, text=null) {
    const { Option } = Select;
    try {
      const { company_id } = this.props
      let value = {
        company_id: id || company_id
      }
      let { data } = await api.getGoodsTypeList(value)
      console.log(data)
      this.dataTypes = data
      const optionTypes = data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
      this.setState({ optionTypes });
      if (text) {
        const { form } = this.props;
        form.setFieldsValue({
          typeName: text.typeName.map(item => item.id)
        });
      }
    } catch(e) {
      console.log('getGoodsTypeList', e)
    }
  }
  // 获取单位列表
  async getUnitList(id=null, text=null) {
    const { Option } = Select;
    try {
      const { company_id } = this.props
      let value = {
        company_id: id || company_id
      }
      let { data } = await api.getUnitList(value)
      this.dataUnits = data
      console.log('getUnitList***', data)
      const optionUints = data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
      this.setState({ optionUints });
      console.log('optionUints', optionUints)
      if (text) {
        const { form } = this.props
        form.setFieldsValue({
          unitOne_id: text.unitOne.id,
          unitDouble_id: text.unitDouble.id,
        });
      }
    } catch(e) {
      console.log('getUnitList', e)
    }
  }

  // 新增按钮
  add = () => {
    console.log('add');
    this.type = 'add'
    const { form, userInfo, company_id } = this.props
    form.setFieldsValue({
      name: '',
      company_id: !company_id ? null : userInfo.company_id,
      unitOne_id: null,
      unitDouble_id: null,
      buySingle: '',
      buyAll: '',
      midSingle: '',
      midAll: '',
      sellSingle: '',
      sellAll: '',
      num: '',
      desc: '',
      origin: '',
      typeName: []
    });
    this.setState({
      title: '新增商品',
      visible: true,
      showUnit: false
    })
  }
  // 编辑按钮
  edit = (text) => {
    console.log(text);
    console.log('text.typeName.map(item => item.id)', text.typeName.map(item => item.id));
    this.type = 'edit'
    this.id = text.id
    const { form, company_id } = this.props
    form.setFieldsValue({
      name: text.name,
      company_id: text.company_id,
      unitOne_id: text.unitOne.id,
      unitDouble_id: text.unitDouble.id,
      buySingle: text.buySingle,
      buyAll: text.buyAll,
      midSingle: text.midSingle,
      midAll: text.midAll,
      sellSingle: text.sellSingle,
      sellAll: text.sellAll,
      num: text.num,
      desc: text.desc,
      origin: text.origin,
      typeName: text.typeName.map(item => item.id)
    });
    this.setState({
      title: '编辑商品',
      visible: true,
      showUnit: true
    })
    // root编辑时，需要根据公司查询该公司的单位列表
    if (!company_id) {
      this.getUnitList(text.company_id, text)
      this.getGoodsTypeList(text.company_id, text)
    }
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
      const index = this.state.dataList.findIndex(item => item.id === text.id)
      message.success('删除成功');
      const dataList = this.state.dataList
      dataList.splice(index, 1)
      this.setState({ dataList })
    } catch(e) {
      console.log('removeError', e)
    }
  }
  // 确定按钮
  handleOk = () => {
    const { validateFields } = this.props.form
    const { userInfo, company_id } = this.props
    validateFields(async(err, values) => {
      if (err) {
        return console.log('handleOkError', err)
      }
      console.log('form', values);
      if (company_id) {
        values.company_id = userInfo.company_id
      }
      let index = this.dataCompanys.findIndex(item => item.id === values.company_id)
      let companyName = !company_id ? this.dataCompanys[index].name : userInfo.companyName
      let roleIndex = this.dataTypes.findIndex(item => item.id === values.role_id)
      let role_fullName = this.dataTypes[roleIndex].fullName
      try {
        this.setState({ confirmLoading: true })
        let info = '创建成功，商品家族又添新同胞啦'
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
  // 选择公司时触发
  companyHandle = val => {
    console.log(val)
    this.setState({
      showUnit: true
    })
    this.getUnitList(val)
    this.getGoodsTypeList(val)
    const { form } = this.props
    form.setFieldsValue({
      unitOne_id: null,
      unitDouble_id: null,
      typeName: []
    });
  }

  render() {
    const {
      add,
      columns,
      optionCompanys,
      // optionTypes,
      // optionUints,
      handleOk,
      handleCancel,
      companyHandle
    } = this
    const {
      dataList,
      title,
      visible,
      showUnit,
      confirmLoading,
      optionUints,
      optionTypes
    } = this.state
    const { company_id } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="table-filter-box">
          <Button type="primary" icon="plus" onClick={add}>添加</Button>
        </div>
        <Table columns={columns} dataSource={dataList} rowKey="id" scroll={{ x: 1880 }} />
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          okText="确定"
          onCancel={handleCancel} 
          cancelText="取消" >
            <Form>
              <Form.Item label="商品名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, whitespace: true, message: '请输入商品名称' }]
                })(<Input className="form-input" placeholder="请输入商品名称" />)}
              </Form.Item>
              {
                !company_id && (
                  <Form.Item label="所属公司">
                    {getFieldDecorator('company_id', {
                      rules: [{ required: true, message: '请选择所属公司' }]
                    })(<Select
                      notFoundContent="暂未找到"
                      placeholder="请选择所属公司"
                      onChange={(val) => companyHandle(val)}
                      >
                      {optionCompanys}
                    </Select>)}
                  </Form.Item>
                )
              }
              {
                (showUnit || company_id) && (
                  <Form.Item label="单价单位">
                    {getFieldDecorator('unitOne_id', {
                      rules: [{ required: true, message: '请选择单价单位' }]
                    })(<Select
                      notFoundContent="暂未找到"
                      placeholder="请选择单价单位" >
                      {optionUints}
                    </Select>)}
                  </Form.Item>
                )
              }
              {
                (showUnit || company_id) && (
                  <Form.Item label="总单位">
                    {getFieldDecorator('unitDouble_id', {
                      rules: [{ required: true, message: '请选择总单位' }]
                    })(<Select
                      notFoundContent="暂未找到"
                      placeholder="请选择总单位" >
                      {optionUints}
                    </Select>)}
                  </Form.Item>
                )
              }
              {
                (showUnit || company_id) && (
                  <Form.Item label="商品类别">
                    {getFieldDecorator('typeName', {
                      rules: [{ required: true, message: '请选择所属商品类别' }]
                    })(<Select
                      mode="multiple"
                      notFoundContent="暂未找到"
                      placeholder="请选择所属商品类别" >
                      {optionTypes}
                    </Select>)}
                  </Form.Item>
                )
              }
              <Form.Item label="进货单价">
                {getFieldDecorator('buySingle', {
                  rules: [{ required: true, whitespace: true, message: '请输入进货单价' }]
                })(<Input className="form-input" placeholder="请输入进货单价" />)}
              </Form.Item>
              <Form.Item label="进货总价">
                {getFieldDecorator('buyAll', {
                  rules: [{ required: true, whitespace: true, message: '请输入进货总价' }]
                })(<Input className="form-input" placeholder="请输入进货总价" />)}
              </Form.Item>
              <Form.Item label="批发单价">
                {getFieldDecorator('midSingle', {
                  rules: [{ message: '请输入批发单价' }]
                })(<Input className="form-input" placeholder="请输入批发单价" />)}
              </Form.Item>
              <Form.Item label="批发总价">
                {getFieldDecorator('midAll', {
                  rules: [{ message: '请输入批发总价' }]
                })(<Input className="form-input" placeholder="请输入批发总价" />)}
              </Form.Item>
              <Form.Item label="零售单价">
                {getFieldDecorator('sellSingle', {
                  rules: [{ message: '请输入零售单价' }]
                })(<Input className="form-input" placeholder="请输入零售单价" />)}
              </Form.Item>
              <Form.Item label="零售总价">
                {getFieldDecorator('sellAll', {
                  rules: [{ message: '请输入零售总价' }]
                })(<Input className="form-input" placeholder="请输入零售总价" />)}
              </Form.Item>
              <Form.Item label="商品数量">
                {getFieldDecorator('num', {
                  rules: [{ message: '请输入商品数量' }]
                })(<Input className="form-input" placeholder="请输入商品数量" />)}
              </Form.Item>
              <Form.Item label="商品描述">
                {getFieldDecorator('desc', {
                  rules: [{ message: '请输入商品描述' }]
                })(<Input className="form-input" placeholder="请输入商品描述" />)}
              </Form.Item>
              <Form.Item label="商品来源">
                {getFieldDecorator('origin', {
                  rules: [{ message: '请输入商品来源' }]
                })(<Input className="form-input" placeholder="请输入商品来源" />)}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Goods' })(Goods)

const mapStateToProps = function(store) {
  return {
    userInfo: store.userInfo,
    company_id: store.company_id
  };
};

export default connect(mapStateToProps)(WrappedHorizontalLoginForm);
