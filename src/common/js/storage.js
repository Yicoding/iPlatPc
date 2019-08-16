/**
 * 
 * @param {*} 
 */

import { changeDate } from './tools';
// const changeDate = require('./tools')

const storage = window.localStorage;

class StoreBase{
    constructor(obj) {
        this.key = obj.key
        this.lifeTime = obj.lifeTime
    }
    // 获取值
    get() {
        let value = JSON.parse(storage.getItem(this.key))
        if (Object.prototype.toString.call(value) === '[object Null]') { // 不存在的情况
            return false
        } else { // 存在时，判断是否过期
            let currentTime = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            if (currentTime > value.validDate) { // 已过期
                return false
            }
        }
        return value
    }
    // 设置值
    set(value, concat = false) {
        let oldVal = JSON.parse(storage.getItem(this.key))
        // 存储日期
        let saveDate = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss')
        let day = parseFloat(this.lifeTime)
        let targetTime = Date.now() + day*24*3600*1000
        // 过期日期
        let validDate = changeDate(targetTime, 'yyyy-MM-dd HH:mm:ss')
        // 存储对象
        let item = {
            saveDate,
            validDate
        }
        if (concat) { // 合并
            if (Object.prototype.toString.call(oldVal) === '[object Null]') { // 不存在的情况，直接赋值
                item.value = value
                storage.setItem(this.key, JSON.stringify(item))
            } else { // 存在时，合并值
                item.value = Object.assign({}, oldVal.value, value)
                storage.setItem(this.key, JSON.stringify(item))
            }
        } else { // 设置新的值
            item.value = value
            storage.setItem(this.key, JSON.stringify(item))
        }
    }
    // 合并值
    assignObj(value) {
        this.set(value, true)
    }
    // 改变单个字段的值
    setAttrValue(name, value) {
        let oldVal = JSON.parse(storage.getItem(this.key))
        // 存储日期
        let saveDate = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss')
        let day = parseFloat(this.lifeTime)
        let targetTime = Date.now() + day*24*3600*1000
        // 过期日期
        let validDate = changeDate(targetTime, 'yyyy-MM-dd HH:mm:ss')
        // 存储对象
        let item = {
            saveDate,
            validDate
        }
        if (Object.prototype.toString.call(oldVal) === '[object Null]') { // 不存在的情况，直接赋值
            item.value = {
                [name]: value
            }
            storage.setItem(this.key, JSON.stringify(item))
        } else { // 存在时，设置对应项
            oldVal.value[name] = value
            item.value = oldVal.value
            storage.setItem(this.key, JSON.stringify(item))
        }
    }
    // 删除对应存储
    remove() {
        storage.removeItem(this.key)
    }
}

let Store = {}

// 用户信息
Store.userInfoStore = new StoreBase({
    key: 'USER_INFO',
    lifeTime: '30D'
})

export default Store