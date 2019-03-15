export default {
  root: [
    { route: '/app/company', icon: 'mobile', component: 'Company', name: '公司管理' },
    { route: '/app/role', icon: 'mobile', component: 'Role', name: '角色管理' },
    { route: '/app/user', icon: 'mobile', component: 'User', name: '用户管理' },
    { route: '/app/map', icon: 'mobile', component: 'Map', name: '字典管理' },
    { route: '/app/goods', icon: 'mobile', component: 'Goods', name: '商品管理' },
    { route: '/app/order', icon: 'mobile', component: 'Order', name: '订单管理' },
  ],
  admin: [
    { route: '/app/user', icon: 'mobile', component: 'User', name: '用户管理' },
    { route: '/app/map', icon: 'mobile', component: 'Map', name: '字典管理' },
    { route: '/app/goods', icon: 'mobile', component: 'Goods', name: '商品管理' },
    { route: '/app/order', icon: 'mobile', component: 'Order', name: '订单管理' },
  ]
}