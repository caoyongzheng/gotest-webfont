import React from 'react'
import TickWorker from '../utils/tick.worker.js'

class Timer extends React.Component {
  state = {
    time: 0,
  }
  componentWillUnmount() {
    this.stop()
  }
  format = () => {
    const { time } = this.state
    const hour = Math.floor(time / 3600)
    const mins = Math.floor(time / 60) % 60
    const seconds = time % 60
    const hourShow = hour > 9 ? hour : `0${hour}`
    const minsShow = mins > 9 ? mins : `0${mins}`
    const secondsShow = seconds > 9 ? seconds : `0${seconds}`
    return `${hourShow} : ${minsShow} : ${secondsShow}`
  }
  start = () => {
    this.tickWorker = new TickWorker()
    this.tickWorker.onmessage = (e) => {
      this.setState({
        time: e.data,
      })
    }
  }
  stop = () => this.tickWorker.terminate()
  render() {
    return (
      <span>{this.format()}</span>
    )
  }
}

export default Timer
