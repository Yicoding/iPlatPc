/**
 * Promise handler
 */
import axios from 'axios';
import Store from '../common/js/storage';
import { message } from 'antd';
export function promiseHandler(options) {
  return new Promise((resolve, reject) => {
    // if (options.method === 'POST' || options.method === 'PUT') {
      //   options.data = JSON.stringify(options.data)
      // }
    let phone = '';
    let token = '';
    const userInfoStore = Store.userInfoStore.get()
    if (userInfoStore) {
      phone = userInfoStore.value.phone;
      token = userInfoStore.value.token;
    }
    let requestBody = {
      method: options.method,
      url: options.url,
      headers: {
        'Content-Type': 'application/json',
        phone,
        token
      }
    }
    let key = (options.method === 'POST' || options.method === 'PUT') ? 'data' : 'params'
    requestBody[key] = options.data
    axios(requestBody).then(response => {
      let { status, data } = response;
      if (status === 200) {
        if (data.code === 0) {
          return resolve(data);
        }
        if (data.code === 403) {
          console.log('登录过期');
          message.warning('登录过期');
          window.localStorage.clear();
          window.location.href = window.location.origin + window.location.pathname + '#' + '/login';
          return reject(data);
        }
      }
      console.error(`[api status error]: ${status}`);
      reject(`[api status error]: ${status}`);
    }).catch(error => {
      console.error(`[api called error]: ${error.stack}`);
      reject(`[api called error]: ${error.stack}`);
    })
  });
}