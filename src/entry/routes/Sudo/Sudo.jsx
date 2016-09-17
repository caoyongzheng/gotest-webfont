import React from 'react'
import Board from './components/Board'

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

class SudoApp extends React.Component {
  state = {}
  render() {
    return (
      <div style={styles.container}>
        <Board />
      </div>
    )
  }
}

module.exports = SudoApp
