import loadable from '@loadable/component';

import Company from './Company';
// 正常加载
// import Role from './Role';
// import User from './User';
// import Map from './Map';
// import Goods from './Goods';
// import Order from './Order';
// 按需加载
const Role = loadable(() => import('./Role'));
const User = loadable(() => import('./User'));
const Map = loadable(() => import('./Map'));
const Goods = loadable(() => import('./Goods'));
const Order = loadable(() => import('./Order'));

export default {
  Company,
  Role,
  User,
  Map,
  Goods,
  Order
}