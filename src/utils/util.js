// 判断是否是微信浏览器的函数
export function isWechat () {
  const ua = window.navigator.userAgent.toLowerCase()
  alert(JSON.stringify(ua))
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}

export function isNullOrEmpty (str) {
  if (!str || str === undefined || str === 'null' || str === '') {
    return true
  }
  return false
}

export function parseQuery (str) {
  if (str === undefined || str === '' || str == null) {
    return undefined
  }
  const query = {}
  str = decodeURIComponent(str)
  str = str.split(',')
  str.forEach(s => {
    const q = s.split('$')
    if (q.length === 2) {
      query[q[0]] = q[1]
    }
  })
  return query
}

export function getQueryParam (param) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === param) {
      return pair[1]
    }
  }
  return (false)
}

// 用于分组的时间
export function formatGroupTime (time, option) {
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  return (
    Number(d.getMonth() + 1) +
    '月' +
    d.getDate() + '日'
  )
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
