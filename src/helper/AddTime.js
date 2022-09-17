module.exports = (value) => {

    let timeFilter = value.split(':')
  
    let timeAdd = Number(timeFilter[1]) + 30

    if (timeAdd >= 60) {
      timeAdd = '00'
      timeFilter[0] = Number(timeFilter[0]) + 1
    }

    timeFilter[1] = timeAdd.toString()
    let timeFinal = timeFilter[0] + ':' + timeFilter[1] + ':00'
    
    return timeFinal
  }

