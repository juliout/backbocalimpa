
module.exports = (date, tipo) => {
    let data = date
    let type = tipo ? tipo : '-'
    data = date.split(type).reverse()
    let final = `${data[0]}-${data[1]}-${data[2]}`
    return final
}
