import R from 'R'

module.exports = {
  path: R.Sudo.pathname,
  onEnter(nextState, replace, next) {
    R.verifyAuth({ page: R.Sudo, replace, next, nextState })
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Sudo'))
    })
  },
}
