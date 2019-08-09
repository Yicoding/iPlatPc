let apiMap = {
  // 公司
  getCompanyList: ['GET', '/getCompanyList'], // 查看公司列表
  getCompanyDetail: ['GET', '/getCompanyDetail'], // 查看单个公司详情
  addCompany: ['POST', '/addCompany'], // 新增公司
  updateCompany: ['PUT', '/updateCompany'], // 更新单个公司
  removeCompany: ['DELETE', '/removeCompany'], // 删除单个公司
}

export default apiMap