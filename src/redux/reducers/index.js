import { combineReducers } from 'redux'
import userInfo from './userInfo'
import company_id from './companyId'

const todoApp = combineReducers({
    userInfo,
    company_id
})

export default todoApp