/**
 * 接口配置
 * dev: 开发
 * test: 测试
 * prd: 生产
 */

const env = 'test';

function useConfig() {

  let config = {
    dev: {
      host: 'http://172.30.66.55:9000'
    },
    test: {
      host: '',
    },
    prd: {
      host: '',
    }
  }[env];

  return config;
}

export default useConfig();
