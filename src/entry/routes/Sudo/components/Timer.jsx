import React from 'react'

class Timer extends React.Component {
  state = {
    time: 0,
  }
  componentWillUnmount() {
    this.clear()
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
    this.inter = setInterval(() => {
      this.setState({
        time: this.state.time + 1,
      })
    }, 1000)
  }
  stop = () => clearInterval(this.inter)
  clear = () => this.setState({ time: 0 })
  render() {
    return (
      <span>{this.format()}</span>
    )
  }
}

export default Timer
