import { combineReducers } from 'redux'
import userInfo from './userInfo'

const todoApp = combineReducers({
    userInfo
})

export default todoApp