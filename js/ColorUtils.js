function getRandomHexColor () {
    var hex = ('00000'+(Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
    return `#${hex}`
  }
