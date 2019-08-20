import { combineReducers } from 'redux'
import userInfo from './userInfo'
import companyId from './companyId'

const todoApp = combineReducers({
    userInfo,
    companyId
})

export default todoApp