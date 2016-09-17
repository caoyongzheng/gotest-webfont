import React, { PropTypes } from 'react'

import { getTop, getLeft, CellSize, CellBorderWidth } from './constants'

const styles = {
  container: {
    position: 'absolute',
    zIndex: '99',
    pointerEvents: 'none',
  },
  row: {
    position: 'absolute',
    display: 'block',
    width: `${getLeft(9) - 4 * CellBorderWidth}px`,
    height: `${CellSize}px`,
    border: `solid ${2 * CellBorderWidth}px rgb(171, 132, 0)`,
    transition: 'top 500ms, left 500ms',
    pointerEvents: 'none',
  },
  col: {
    position: 'absolute',
    display: 'block',
    width: `${CellSize}px`,
    height: `${getTop(9) - 4 * CellBorderWidth}px`,
    border: `solid ${2 * CellBorderWidth}px rgb(171, 132, 0)`,
    transition: 'top 500ms, left 500ms',
    pointerEvents: 'none',
  },
}

class Hint extends React.Component {
  state = {}
  getTopStyle = (edit) => `${getTop(Math.floor(edit / 9)) - CellBorderWidth}px`
  getLeftStyle = (edit) => `${getLeft(edit % 9) - CellBorderWidth}px`
  render() {
    const { edit } = this.props
    return (
      <div style={styles.container}>
        {
          edit > -1 ? <div style={{ ...styles.row, top: this.getTopStyle(edit) }} /> : null
        }
        {
          edit > -1 ? <div style={{ ...styles.col, left: this.getLeftStyle(edit) }} /> : null
        }
      </div>
    )
  }
}
Hint.propTypes = {
  edit: PropTypes.number,
}
export default Hint
