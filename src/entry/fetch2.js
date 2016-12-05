import 'whatwg-fetch'

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function fetch2(url, options = {}) {
  const { headers, qp, ...others } =  options
  const computedOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    ...others
  }

  if(qp) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(qp)
  }
  console.log(qp)
  return fetch(url, computedOptions)
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  })
}

export default fetch2
