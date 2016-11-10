const time = Date.now()

function tick() {
  postMessage(Math.round((Date.now() - time) / 1000))
  setTimeout(tick, 1000)
}

tick()
