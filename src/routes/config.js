export default {
  root: [
    { route: '/app/goods', icon: 'tag', component: 'Goods', name: '商品管理' },
    { route: '/app/order', icon: 'shop', component: 'Order', name: '订单管理' },
    { route: '/app/user', icon: 'user', component: 'User', name: '用户管理' },
    { route: '/app/map', icon: 'file', component: 'Map', name: '字典管理' },
    { route: '/app/company', icon: 'home', component: 'Company', name: '公司管理' },
    { route: '/app/role', icon: 'contacts', component: 'Role', name: '角色管理' },
  ],
  admin: [
    { route: '/app/goods/:company_id', icon: 'tag', component: 'Goods', name: '商品管理' },
    { route: '/app/order/:company_id', icon: 'shop', component: 'Order', name: '订单管理' },
    { route: '/app/user/:company_id', icon: 'user', component: 'User', name: '用户管理' },
    { route: '/app/map/:company_id', icon: 'file', component: 'Map', name: '字典管理' },
  ]
}