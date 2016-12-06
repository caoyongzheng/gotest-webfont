import 'whatwg-fetch'
import C from 'C'

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function fetch2(url, options = {}) {
  const urlParse = document.createElement('a')
  urlParse.href = url
  if (!urlParse.hostname) {
    urlParse.href = `${C.host}${url}`
  }

  const { headers, qp, ...others } =  options
  const computedOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    ...others
  }
  if (qp) {
    urlParse.search += `${urlParse.search ? '&' : ''}${queryParams(qp)}`
  }
  return fetch(urlParse.href, computedOptions)
  .then((response) => {
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  })
}

export default fetch2
