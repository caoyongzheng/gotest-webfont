import React, { PropTypes } from 'react'

import Grid from './Grid'
import Stack from './Stack'
import Hint from './Hint'
import Timer from './Timer'
import sudoku from '../utils/sudoku'
import { getLeft, getTop } from './constants'

const styles = {
  container: {
    position: 'relative',
    width: `${getLeft(9)}px`,
    height: `${getTop(9) + 60}px`,
  },
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzle: _.times(81, () => (null)),
      stackCells: _.times(9, () => _.times(9, () => ({ position: -1, step: 0 }))),
      active: -1,
      edit: -1,
      errors: 0,
    }
    this.step = 10
  }
  componentDidMount() {
    this.init()
    this.timer.start()
  }
  onActive = (active) => this.setState({ active })
  onEdit = (edit) => this.setState({ edit })
  setHightLight = (number, position, heightLight) => {
    const { stackCells } = this.state
    const cells = stackCells[number]
    const x = position % 9
    const y = Math.floor(position / 9)
    _.forEach(cells, (c) => {
      if (c.position > -1 && c.position !== position) {
        const cX = c.position % 9
        const cY = Math.floor(c.position / 9)
        if (x === cX || y === cY ||
          (Math.floor(x / 3) === Math.floor(cX / 3) &&
          Math.floor(y / 3) === Math.floor(cY / 3))) {
          c.heightLight = heightLight
        }
      }
    })
    this.setState({ stackCells })
  }
  init = () => {
    this.state = {
      puzzle: _.times(81, () => (null)),
      stackCells: _.times(9, () => _.times(9, () => ({ position: -1, step: 0 }))),
      active: -1,
      edit: -1,
      errors: 0,
    }
    const puzzle = sudoku.makepuzzle()
    _.forEach(puzzle, (number, position) => {
      if (_.isNumber(number)) {
        this.fillCell(number, position)
      }
    })
  }
  handleErrorFill = (number, position) => {
    this.setState({
      errors: this.state.errors + 1,
    })
    this.unFillCell(number, position)
    this.setHightLight(number, position, true)
    this.onEdit(position)
    setTimeout(() => {
      this.setHightLight(number, position, false)
    }, 500)
  }
  fillCell = (number, position) => {
    const { puzzle, stackCells } = this.state

    puzzle[position] = number
    const c = _.find(stackCells[number], (cell) => cell.position === -1)
    if (c) {
      c.position = position
      c.step = this.step
      this.step++
    }
    this.setState({ puzzle, stackCells })
    const isError = !sudoku.solvepuzzle(puzzle)
    if (isError) {
      setTimeout(() => this.handleErrorFill(number, position), 500)
    } else {
      if (this.isFinished()) {
        this.timer.stop()
      }
    }
  }
  isFinished = () => {
    let isFinished = true
    _.forEach(this.state.puzzle, (number) => {
      if (!_.isNumber(number)) {
        isFinished = false
      }
    })
    return isFinished
  }
  unFillCell = (number, position) => {
    const { puzzle, stackCells } = this.state
    puzzle[position] = null
    const c = _.find(stackCells[number], (cell) => cell.position === position)
    if (c) {
      c.position = -1
    }
    this.setState({ puzzle, stackCells })
  }
  render() {
    const { puzzle, stackCells, active, edit, errors } = this.state
    return (
      <div style={styles.container}>
        <Grid puzzle={puzzle} edit={edit} onActive={this.onActive} onEdit={this.onEdit} />
        <Stack
          puzzle={puzzle}
          stackCells={stackCells}
          active={active}
          onActive={this.onActive}
          edit={edit}
          onEdit={this.onEdit}
          fillCell={this.fillCell}
        />
        <Hint edit={edit} />
        <div style={{ position: 'absolute', fontSize: '24px', top: '-40px' }}>
          {`错误次数：${errors}`}
        </div>
        <div style={{ position: 'absolute', fontSize: '24px', top: '-40px', left: '150px' }}>
          {'时间：'}<Timer ref={(timer) => (this.timer = timer)} />
        </div>
      </div>
    )
  }
}
Board.propTypes = {
  className: PropTypes.string,
}
export default Board
