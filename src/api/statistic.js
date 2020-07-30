import request from 'src/utils/request.js'

export function getYesterdaySignNum () {
  return request({
    url: '/a/studio/signup/statistic/yesterdaySum',
    method: 'get'
  })
}

export function getTodaySignNum () {
  return request({
    url: '/a/studio/signup/statistic/todaySum',
    method: 'get'
  })
}

export function getYearSignSum () {
  return request({
    url: '/a/studio/signup/statistic/yearSum',
    method: 'get'
  })
}

export function getMapData () {
  return request({
    url: '/a/studio/signup/statistic/map',
    method: 'get'
  })
}

export function getSchoolData () {
  return request({
    url: '/a/studio/signup/statistic/school',
    method: 'get'
  })
}

export function getProvinceData () {
  return request({
    url: '/a/studio/signup/statistic/province',
    method: 'get'
  })
}

export function getKtProData () {
  return request({
    url: '/a/studio/signup/statistic/profession/kuaiti',
    method: 'get'
  })
}

export function getSoftwareProData () {
  return request({
    url: '/a/studio/signup/statistic/profession/software',
    method: 'get'
  })
}
