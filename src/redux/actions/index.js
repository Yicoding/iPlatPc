/**
 *  
 */
// 用户信息
export const setUserInfo = userInfo => {
  return {
    type: 'SET_USERINFO',
    userInfo
  }
}

// 公司id
export const setCompanyId = company_id => {
  return {
    type: 'SET_COMPANYID',
    company_id
  }
}