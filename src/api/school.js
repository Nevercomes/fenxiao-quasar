import request from 'src/utils/request.js'

export function listSchool (query) {
  return request({
    url: '/f/eduSchool/list',
    method: 'get',
    params: query
  })
}
