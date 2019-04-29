/**
 * 接口
 */

import { promiseHandler } from "./handler";
import apiMap from './apiMap';
import config from './config';

let requestApi = {}

for (let key in apiMap) {
  let api = apiMap[key];
  if (!api) {
    throw new Error("请求的接口不存在");
  }
  requestApi[key] = function (data) {
    let options = {
      method: api[0],
      url: `${config.host}${api[1]}`,
      data
    };
    return promiseHandler(options);
  }
}

export default requestApi;