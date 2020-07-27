export function isNullOrEmpty (str) {
  if (!str || str === undefined || str === 'null' || str === '') {
    return true
  }
  return false
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
