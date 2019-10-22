/**
 * company
 */
import React, { Component } from 'react'
import {
  Table,
  Button,
  Modal,
  message,
  Tag,
  Pagination
} from 'antd';

import { connect } from 'react-redux';
import { api } from '../../api/index.js'

class Order extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center', render: (text) => (
      <div className="blue pointer" onClick={() => this.rowHandleClick(text)}>{text}</div>
    ) },
    { title: '成本', dataIndex: 'spend', key: 'spend', align: 'center' },
    { title: '售价', dataIndex: 'total', key: 'total', align: 'center' },
    { title: '利润', dataIndex: 'gain', key: 'gain', align: 'center' },
    { title: '状态', dataIndex: 'state', key: 'state', align: 'center', render: (text) => {
      if (text === 1) {
        return <Tag color="magenta">待付款</Tag>;
      } else if (text === 2) {
        return <Tag color="geekblue">待收货</Tag>;
      } else if (text === 3) {
        return <Tag color="green">已完成</Tag>;
      } else {
        return null;
      }
    } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center' },
    { title: '创建人', dataIndex: 'createUser.name', key: 'createUser.name', align: 'center', render: (text) => (
      <Tag color="cyan">{text}</Tag>
    ) },
    { title: '收款时间', dataIndex: 'payTime', key: 'payTime', align: 'center' },
    { title: '收款人', key: 'payUser.name', align: 'center', render: (text) => {
      if (text.payUser) {
        return <Tag color="cyan">{text.payUser.name}</Tag>
      } else {
        return <Button type="primary" icon="delete" onClick={() => this.edit(text.id, 2)}>确认收款</Button>
      }
    } },
    { title: '发货时间', dataIndex: 'finishTime', key: 'finishTime', align: 'center' },
    { title: '发货人', key: 'finishUser.name', align: 'center', render: (text) => {
      if (!text.payUser) {
        return null;
      } else if (text.finishUser) {
        return <Tag color="cyan">{text.payUser.name}</Tag>;
      } else {
        return <Button type="primary" icon="delete" onClick={() => this.edit(text.id, 3)}>确认发货</Button>;
      }
    } },
    { title: '操作', key: 'edit', align: 'center', render: (text) => (
      <Button type="danger" icon="delete" onClick={() => this.remove(text)}>删除</Button>
    )},
  ]
  pageIndex = 0 // 当前页数
  pageSize = 10 // 每页条数

  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      loading: false, // 表格loading
      total: 0,
    }
  }
  componentDidMount() {
    this.getOrderList()
  }
  // 查看订单列表
  async getOrderList(totalAll) {
    const { userInfo: { role_name }, company_id } = this.props;
    const { pageIndex, pageSize } = this;
    this.setState({ loading: true });
    try {
      let { data: { data, total } } = await api.getOrderList({
        company_id: company_id,
        role: role_name,
        pageIndex,
        pageSize
      })
      console.log(data)
      this.setState({
        dataList: data,
        total: totalAll || total,
        loading: false,
      })
    } catch(e) {
      console.log('getOrderList', e)
    }
  }
  // 编辑按钮
  edit = (id, state) => {
    console.log(state);
    const config = {
      2: '收款',
      3: '发货'
    }
    const { confirm } = Modal
    confirm({
      title: `确定${config[state]}吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        this.handleOk(id, state);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 确定修改
  handleOk = async (id, state) => {
    const { userInfo } = this.props;
    let values = {
      id,
      state,
      user_id: userInfo.id
    };
    try {
      await api.updateOrder(values);
      message.success('修改成功');
      this.getOrderList();
    } catch(e) {
      message.error('修改失败');
      console.log('handleOk报错', e);
    }
  }
  // 删除按钮
  remove = text => {
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
      await api.removeOrder({
        id: text.id
      })
      message.success('删除成功');
      const { dataList } = this.state;
      if (dataList.length === 1) {
        this.pageIndex -= 1;
      }
      const total = this.state.total - 1;
      this.getOrderList(total);
    } catch(e) {
      console.log('removeError', e)
    }
  }
  
  // 分页器
  // 条数改变
  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.pageSize = pageSize;
    this.pageIndex = 0;
    this.getOrderList();
  }

  // 页码改变
  onChangePage = (page, pageSize) => {
    console.log(page, pageSize);
    this.pageIndex = page - 1;
    this.getOrderList();
  }

  // 跳转到详情页
  rowHandleClick = id => {
    const { history } = this.props;
    history.push(`/app/order/${id}`);
  }

  render() {
    const {
      columns,
      onShowSizeChange,
      onChangePage,
      pageIndex,
      pageSize,
      rowHandleClick
    } = this
    const {
      dataList,
      total
    } = this.state
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataList}
          pagination={false}
          rowKey="id" />
        <Pagination
          className="pagination"
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          total={total}
          onChange={onChangePage}
          showQuickJumper
          current={pageIndex+1}
          defaultPageSize={pageSize}
          pageSizeOptions={['1', '3', '10', '20', '50', '100']}
        />
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    userInfo: store.userInfo,
    company_id: store.company_id
  };
};

export default connect(mapStateToProps)(Order);
