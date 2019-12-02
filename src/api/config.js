/**
 * 接口配置
 * dev: 开发
 * test: 测试
 * prd: 生产
 */

const env = 'prd';

function useConfig() {

  let config = {
    dev: {
      host: 'http://172.30.66.55:9000'
    },
    test: {
      host: '',
    },
    prd: {
      host: 'https://ilovelyplat.com:3000',
    }
  }[env];

  return config;
}

export default useConfig();
