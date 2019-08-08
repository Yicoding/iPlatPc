/**
 * company
 */
import React, { Component } from 'react'
import { Table } from 'antd';

import { api } from '../../api/index.js'

export default class Home extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '公司名称', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '标志', dataIndex: 'logo', key: 'logo' },
    { title: '公司描述', dataIndex: 'desc', key: 'desc' },
  ]
  constructor(props) {
    super(props)
    this.state = {
      dataList: []
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
  render() {
    let { columns } = this
    let { dataList } = this.state
    return (
      <div>
        <Table columns={columns} dataSource={dataList} rowKey="id" />
      </div>
    )
  }
}