/**
 * Promise handler
 */
import axios from 'axios';

export function promiseHandler(options) {
  return new Promise((resolve, reject) => {
    // if (options.method === 'POST' || options.method === 'PUT') {
    //   options.data = JSON.stringify(options.data)
    // }
    let requestBody = {
      method: options.method,
      url: options.url
    }
    let key = (options.method === 'POST' || options.method === 'PUT') ? 'data' : 'params'
    requestBody[key] = options.data
    axios(requestBody).then(response => {
      let { status, data } = response;
      if (status === 200) {
        return resolve(data);
      }
      console.error(`[api status error]: ${status}`);
      reject(`[api status error]: ${status}`);
    }).catch(error => {
      console.error(`[api called error]: ${error.stack}`);
      reject(`[api called error]: ${error.stack}`);
    })
  });
}