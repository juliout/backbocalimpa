module.exports = () => {
    let dateNow = new Date()
    var dia = String(dateNow.getDate()).padStart(2, '0');
    var mes = String(dateNow.getMonth() + 1).padStart(2, '0');
    var ano = dateNow.getFullYear();
    const dataAtual = dia + '/' + mes + '/' + ano;

    horaAtual = dateNow.toLocaleTimeString('pt-br',{ timeZone: 'America/Sao_Paulo'})

    const horaEdata = horaAtual + ' - ' + dataAtual
    return horaEdata
}