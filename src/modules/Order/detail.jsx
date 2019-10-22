/**
 * company
 */
import React, { Component } from 'react'
import {
  Table,
  Button,
  Modal,
  message,
  Card,
  Col,
  Row,
  Steps,
  Divider,
  Tag,
  PageHeader
} from 'antd';

import { connect } from 'react-redux';
import { api } from '../../api/index.js'

const { Step } = Steps;

const colorArr = ['green', 'cyan', 'purple', 'geekblue', 'blue']

class OrderDetail extends Component {
  columns = [
    { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '商品id', dataIndex: 'good_id', key: 'good_id', align: 'center' },
    { title: '商品名称', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '单位', dataIndex: 'unit', key: 'unit', align: 'center' },
    { title: '成本', dataIndex: 'spend', key: 'spend', align: 'center' },
    { title: '售价', dataIndex: 'sale', key: 'sale', align: 'center' },
    { title: '数量', dataIndex: 'num', key: 'num', align: 'center' },
    { title: '总计', dataIndex: 'total', key: 'total', align: 'center' },
    { title: '利润', dataIndex: 'gain', key: 'gain', align: 'center' },
    { title: '商品类型', dataIndex: 'typeName', key: 'typeName', align: 'center', render: (text) => {
      return text.map((item, i) => {
        return <Tag key={i} color={colorArr[i]}>{item}</Tag>
      })
    } },
  ]
  constructor(props) {
    super(props)
    this.state = {
      orderInfo: {},
      dataList: [],
      total: 0,
    }
  }

  componentDidMount() {
    console.log('orderthis.props', this.props)
    this.getOrderDetail();
    this.getOrderDetailList();
  }

  // 查看单个订单详情
  async getOrderDetail() {
    const { match: { params: { order_id } } } = this.props;
    try {
      const { data } = await api.getOrderDetail({
        id: order_id,
        role: 'admin'
      });
      this.setState({ orderInfo: data });
    } catch(e) {
      console.log('getOrderDetail接口报错：', e);
    }
  }

  // 单个订单包含的商品列表
  async getOrderDetailList() {
    const { match: { params: { order_id } } } = this.props;
    try {
      const { data: { data, total } } = await api.getOrderDetailList({ order_id: order_id });
      this.setState({
        dataList: data,
        total
      });
    } catch(e) {
      console.log('getOrderDetailList接口报错：', e);
    }
  }

  // 编辑按钮
  edit = state => {
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
        this.handleOk(state);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 确定修改
  handleOk = async state => {
    const { userInfo, match: { params: { order_id } } } = this.props;
    let values = {
      id: order_id,
      state,
      user_id: userInfo.id
    };
    try {
      await api.updateOrder(values);
      message.success('修改成功');
      this.getOrderDetail();
    } catch(e) {
      message.error('修改失败');
      console.log('handleOk报错', e);
    }
  }

  // 付款
  RenderStepPay = item => {
    const { state } = item;
    if (state === 1) { // 待付款
      return <Step title="待付款" description={<Button type="primary" onClick={() => this.edit(2)}>确认付款</Button>} />;
    }
    return <Step title="已付款" description={item.payTime} />; // 已付款
  }

  // 发货
  RenderStepFinish = item => {
    const { state } = item;
    if (state === 1) {
      return <Step title="待发货" description="先收款才能发货哦" />;
    }
    if (state === 3) { // 已发货
      return <Step title="已发货" description={item.finishTime} />;
    }
    return <Step title="待发货" description={<Button type="primary" onClick={() => this.edit(3)}>确认发货</Button>} />; // 待发货
  }

  // 返回
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      columns,
      RenderStepPay,
      RenderStepFinish,
      goBack
    } = this
    const {
      orderInfo,
      dataList,
      total,
    } = this.state
    const { userInfo } = this.props
    const { match: { params: { order_id } } } = this.props;
    return (
      <div className="order-detail">
        <PageHeader
          className="page-header"
          onBack={() => goBack()}
          title="订单编号："
          subTitle={<span className="blue">{order_id}</span>}
        />
        <div className="card">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="合计成本" bordered={false}>
                {orderInfo.spend}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="合计售价" bordered={false}>
                {orderInfo.total}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="合计利润" bordered={false}>
                {orderInfo.gain}
              </Card>
            </Col>
          </Row>
        </div>
        <Steps current={orderInfo.state}>
          <Step title="已创建" description={orderInfo.createTime} />
          {RenderStepPay(orderInfo)}
          {RenderStepFinish(orderInfo)}
        </Steps>
        <Divider dashed />
        <p className="total">共<span>{total}</span>条数据</p>
        <Table columns={columns} dataSource={dataList} rowKey="id" scroll={{ x: 'max-content' }} />
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

export default connect(mapStateToProps)(OrderDetail);
