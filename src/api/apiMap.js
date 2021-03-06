let apiMap = {
  // 公司
  getCompanyList: ['GET', '/getCompanyList'], // 查看公司列表
  getCompanyDetail: ['GET', '/getCompanyDetail'], // 查看单个公司详情
  addCompany: ['POST', '/addCompany'], // 新增公司
  updateCompany: ['PUT', '/updateCompany'], // 更新单个公司
  removeCompany: ['PUT', '/removeCompany'], // 删除单个公司
  // 角色
  getRoleList: ['GET', '/getRoleList'], // 查看角色列表
  getRoleDetail: ['GET', '/getRoleDetail'], // 查看单个角色详情
  addRole: ['POST', '/addRole'], // 新增角色
  updateRole: ['PUT', '/updateRole'], // 更新单个角色
  removeRole: ['PUT', '/removeRole'], // 删除单个角色
  // 商品类型
  getGoodsTypeList: ['GET', '/getGoodsTypeList'], // 查看商品类型列表
  getGoodsTypeDetail: ['GET', '/getGoodsTypeDetail'], // 查看单个商品类型详情
  addGoodsType: ['POST', '/addGoodsType'], // 新增商品类型
  updateGoodsType: ['PUT', '/updateGoodsType'], // 更新单个商品类型
  removeGoodsType: ['PUT', '/removeGoodsType'], // 删除单个商品类型
  // 用户
  getUserList: ['GET', '/getUserList'], // 查看用户列表
  getUserDetail: ['GET', '/getUserDetail'], // 查看单个用户详情
  loginByWx: ['POST', '/loginByWx'], // 用户登录
  addUser: ['POST', '/addUser'], // 新增用户
  updateUser: ['PUT', '/updateUser'], // 更新单个用户
  removeUser: ['PUT', '/removeUser'], // 删除单个用户
  // 商品
  getGoodsList: ['GET', '/getGoodsList'], // 查看商品列表
  getGoodsDetail: ['GET', '/getGoodsDetail'], // 查看单个商品详情
  addGoods: ['POST', '/addGoods'], // 新增商品
  updateGoods: ['PUT', '/updateGoods'], // 更新单个商品
  removeGoods: ['PUT', '/removeGoods'], // 删除单个商品
  // 单位
  getUnitList: ['GET', '/getUnitList'], // 查看单位列表
  getUnitDetail: ['GET', '/getUnitDetail'], // 查看单个单位详情
  addUnit: ['POST', '/addUnit'], // 新增单位
  updateUnit: ['PUT', '/updateUnit'], // 更新单个单位
  removeUnit: ['PUT', '/removeUnit'], // 删除单个单位
  // 订单
  getOrderList: ['GET', '/getOrderList'], // 查看订单列表
  getOrderDetail: ['GET', '/getOrderDetail'], // 查看单个订单详情
  updateOrder: ['PUT', '/updateOrder'], // 更新单个订单
  removeOrder: ['PUT', '/removeOrder'], // 删除单个订单
  getOrderDetailList: ['GET', '/getOrderDetailList'], // 单个订单包含的商品列表
}

export default apiMap