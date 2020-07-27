import request from 'src/utils/request.js'

export function getShops (loginName) {
  return request({
    url: '/a/login',
    method: 'get',
    params: {
      loginName: loginName,
      getShops: true
    }
  })
}
