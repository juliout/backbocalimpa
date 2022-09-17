
module.exports = (date) => {
    let data = date
    data = date.split('-').reverse()
    let final = `${data[0]}-${data[1]}-${data[2]}`
    return final
}
