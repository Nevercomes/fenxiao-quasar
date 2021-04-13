import request from 'src/utils/request.js'

export function getSchools (shopId) {
  return request({
    url: '/f/school/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function getClassTypes (shopId) {
  return request({
    url: '/f/classType/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function getClassTimes (shopId) {
  return request({
    url: '/f/classTime/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function getPros (shopId) {
  return request({
    url: '/f/professnal/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function getProsByStudentTempId (id) {
  return request({
    url: '/a/professnal/listByStudentTempId',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function saveSignup (data) {
  return request({
    url: '/f/signup',
    method: 'post',
    data: data
  })
}

export function updateSignup (data) {
  return request({
    url: '/f/signup/update',
    method: 'put',
    data: data
  })
}

export function getSignup (id) {
  return request({
    url: '/f/signup/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function listSignup (query) {
  return request({
    url: '/a/signup/simplelist',
    method: 'get',
    params: query
  })
}

export function toRedirect (param) {
  return request({
    url: '/f/signup/snsapi',
    method: 'get',
    params: param
  })
}

export function getQrCodeUrl (query) {
  return request({
    url: '/f/signup/snsapi/student',
    method: 'get',
    params: query
  })
}

export function getOpenId (code) {
  return request({
    url: '/f/signup/openId',
    method: 'get',
    params: {
      code: code
    }
  })
}

export function getAreas () {
  return request({
    url: '/f/signup/area',
    method: 'get'
  })
}

export function updateBasicInfo (data) {
  return request({
    url: '/a/signup/basicInfo',
    method: 'put',
    data: data
  })
}
