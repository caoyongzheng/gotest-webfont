const constants = {}

if (process.env.NODE_ENV === 'production') {
  constants.Host = 'http://www.caoyongzheng.com'
} else {
  constants.Host = 'http://localhost:3000'
}
export default constants
