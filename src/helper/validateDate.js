
module.exports = (date) => {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    let data = date
    data = date.split('/').reverse()

    if(!data[2] || data[2]> 31 || data[2] < 1 || data[2].length >2 || data[2].length < 2){
        return 'data invalida'
    }
    if(!data[1] || data[1]> 12 || data[1] < 1 || data[1].length >2 || data[1].length < 2){
        return 'data invalida'
    }
    if (!data[0] || data[0].length > 4 || data[0].length < 4 || data[0] > anoAtual){
        return 'data invalida'
    }
    let final = `${data[0]}-${data[1]}-${data[2]}`
    return final
}
