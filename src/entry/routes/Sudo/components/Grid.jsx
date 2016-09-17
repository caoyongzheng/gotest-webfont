import React, { PropTypes } from 'react'
import _ from 'lodash'

import Cell from './Cell'

import { getLeft, getTop } from './constants'

const styles = {
  grid: {
    backgroundColor: 'rgb(218, 184, 126)',
    width: `${getLeft(9)}px`,
    height: `${getTop(9)}px`,
  },
}

class Grid extends React.Component {
  onTouchTap = (number, position) => {
    if (!_.isNumber(number)) {
      this.props.onEdit(position)
      this.props.onActive(-1)
    }
  }
  editStyle = (position, edit) =>
  (position === edit ? { backgroundColor: 'rgb(171, 132, 0)' } : {})
  render() {
    const { puzzle, edit } = this.props
    return (
      <div style={{ position: 'absolute' }}>
        <div style={styles.grid}>
          {
            _.map(puzzle, (number, position) => {
              const x = position % 9
              const y = Math.floor(position / 9)
              return (
                <Cell
                  key={position}
                  onTouchTap={() => this.onTouchTap(number, position)}
                  style={{
                    left: `${getLeft(x)}px`,
                    top: `${getTop(y)}px`,
                    ...this.editStyle(position, edit),
                  }}
                  number={null}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
Grid.propTypes = {
  puzzle: PropTypes.arrayOf(PropTypes.number).isRequired,
  edit: PropTypes.number.isRequired,
  onActive: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
export default Grid
