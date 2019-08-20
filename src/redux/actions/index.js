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
export const setCompanyId = id => {
  return {
    type: 'SET_COMPANYID',
    id
  }
}