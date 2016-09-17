import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Motion, spring } from 'react-motion'

import Cell from './Cell'
import { getTop, getLeft } from './constants'

const styles = {
  active: {
    backgroundColor: 'rgb(245, 226, 162)',
  },
}

class Stack extends React.Component {
  onCellTouchTap = (number, position) => {
    const { edit, fillCell, onActive, onEdit } = this.props
    if (edit > -1 && position === -1) {
      fillCell(number, edit)
    } else {
      onActive(number)
    }
    onEdit(-1)
  }
  getPositionStyle = (position, number, index) => {
    const style = {}
    if (position > -1) {
      style.y = spring(getTop(Math.floor(position / 9)))
      style.x = spring(getLeft(position % 9))
    } else {
      style.y = spring(getTop(9) + 20 + index * 2)
      style.x = spring(getLeft(9) / 9 * number)
    }
    return style
  }
  getDefaultStyle = (number, index) => (
    { x: getLeft(9) / 9 * number, y: getTop(9) + 20 + index * 2 }
  )
  render() {
    const { stackCells, active } = this.props
    return (
      <div>
        {
          _.map(stackCells, (cells, number) => {
            let index = -1
            return _.map(cells, (c, i) => {
              const { position, heightLight } = c
              if (position === -1) {
                index++
              }
              return (
                <Motion
                  defaultStyle={this.getDefaultStyle(number, index)}
                  style={this.getPositionStyle(position, number, index)}
                >
                  {
                    ({ x, y }) => (
                      <Cell
                        onTouchTap={() => this.onCellTouchTap(number, position)}
                        key={number * 9 + i}
                        number={number + 1}
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          ...((active === number && position > -1) ? styles.active : {}),
                          ...(heightLight ? { backgroundColor: 'rgb(171, 132, 0)' } : {}),
                          zIndex: 9 - i,
                        }}
                      />
                    )
                  }
                </Motion>
              )
            })
          })
        }
      </div>
    )
  }
}
Stack.propTypes = {
  puzzle: PropTypes.arrayOf(PropTypes.number).isRequired,
  stackCells: PropTypes.arrayOf(PropTypes.array).isRequired,
  active: PropTypes.number.isRequired,
  edit: PropTypes.number.isRequired,
  onActive: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  fillCell: PropTypes.func.isRequired,
}
export default Stack
