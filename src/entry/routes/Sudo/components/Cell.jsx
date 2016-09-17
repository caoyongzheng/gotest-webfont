import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CellSize } from './constants'

const styles = {
  container: {
    position: 'absolute',
    display: 'inline-block',
    width: `${CellSize}px`,
    height: `${CellSize}px`,
    backgroundColor: 'lightyellow',
    textAlign: 'center',
    lineHeight: `${CellSize}px`,
    border: 'solid 1px rgb(218, 184, 126)',
  },
}

class Cell extends React.Component {
  state = {}
  render() {
    const { style, number, onTouchTap } = this.props
    return (
      <div style={_.merge({}, styles.container, style)} onTouchTap={onTouchTap}>
        <span>{number}</span>
      </div>
    )
  }
}
Cell.propTypes = {
  style: PropTypes.object,
  number: PropTypes.number,
  onTouchTap: PropTypes.func,
}
export default Cell
