import React, { Component } from 'react'
import { Table } from 'antd';

import { api } from '../../api/index.js'

const { Column } = Table;

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: []
    }
  }
  async componentDidMount() {
    let dataList = []
    for (let i = 0; i < 10; i++) {
      dataList.push({
        key: i,
        id: i,
        name: `花世界${i}`,
        admin: {
          name: `梅花${i}`,
        },
        info: '花世界是一家世外桃源'
      })
    }
    this.setState({ dataList })
    let data = await api.getCompanyList()
    console.log(data)
  }
  render() {
    let { dataList } = this.state
    return (
      <div>
        <Table dataSource={dataList}>
          <Column
            title="id"
            dataIndex="id"
            key="id"
          />
          <Column
            title="公司名称"
            dataIndex="name"
            key="name"
          />
          <Column
            title="管理员"
            dataIndex="admin.name"
            key="admin.name"
          />
          <Column
            title="公司信息"
            dataIndex="info"
            key="info"
          />
        </Table>
      </div>
    )
  }
}