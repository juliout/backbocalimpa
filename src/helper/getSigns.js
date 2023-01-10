module.exports = (setDay, setMonth, language) => {
    // Base index for numeric entries (in setMonth)
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const errorMessage = 'The entry value in days is greater than the month limit.';
  
   /*
    Is it a number?
      It adopts the value of the matrix with the input value as index (-1) :
      It transforms the text into lowercase letters and returns 3 letters (0, 3);
    */
      setMonth = !isNaN(setMonth) ? String(setMonth).replace(setMonth, months[setMonth - 1]) : setMonth.toLowerCase().substr(0, 3)
  
    // Change the names of the signs, to other languages, if you need to
    const month = {
        jan: function(setDay) {
        var valueReturn = setDay > 20 ? "Aquário" : "Capricórnio"
        return setDay > 31 ? errorMessage : valueReturn
      },
        feb: function(setDay) {
        var valueReturn = setDay > 18 ? "Peixes" : "Aquário"
        return setDay > 29 ? errorMessage : valueReturn
      },
        mar: function(setDay) {
        var valueReturn = setDay > 20 ? "Áries" : "Peixes"
        return setDay > 31 ? errorMessage : valueReturn
      },
        apr: function(setDay) {
        var valueReturn = setDay > 20 ? "Touro" : "Áries"
        return setDay > 30 ? errorMessage : valueReturn
      },
        may: function(setDay) {
        var valueReturn = setDay > 20 ? "Gêmeos" : "Touros"
        return setDay > 31 ? errorMessage : valueReturn
      },
        jun: function(setDay) {
        var valueReturn = setDay > 20 ? "Câncer" : "Gêmeos"
        return setDay > 30 ? errorMessage : valueReturn
      },
        jul: function(setDay) {
        var valueReturn = setDay > 22 ? "Leão" : "Câncer"
        return setDay > 31 ? errorMessage : valueReturn
      },
        aug: function(setDay) {
        var valueReturn = setDay > 22 ? "Virgem" : "Leão"
        return setDay > 31 ? errorMessage : valueReturn
      },
        sep: function(setDay) {
        var valueReturn = setDay > 22 ? "Libra" : "Virgem"
        return setDay > 30 ? errorMessage : valueReturn
      },
        oct: function(setDay) {
        var valueReturn = setDay > 22 ? "Escorpião" : "Libra"
        return setDay > 31 ? errorMessage : valueReturn
      },
        nov: function(setDay) {
        var valueReturn = setDay > 21 ? "Sagitário" : "Escorpião"
        return setDay > 30 ? errorMessage : valueReturn
      },
        dec: function(setDay) {
        var valueReturn = setDay > 21 ? "Capricórnio" : "Sagitário"
        return setDay > 30 ? errorMessage : valueReturn
      }
    }
  
    /*
    Calls the Month function with the first 3 letters of the month,
    according to the function names.
    */
    const getReturn = month[setMonth];
    return getReturn(setDay);
  }
  
  function returnMonth(setMonth){
    setMonth = setMonth.toLowerCase()
  
      const months = [
      "January --Janeiro--Enero",
      "February --Fevereiro--Febrero",
      "March --Março--Marco--Marzo",
      "April --Abril",
      "May --Maio--Mayo",
      "June --Junho--Junio",
      "July --Julho--Julio",
      "August --Agosto",
      "September --Setembro--Septiembre",
      "October --Outubro--Octubre",
      "November --Novembro--Noviembre",
      "December --Dezembro--Diciembre"
    ].map(v => v.toLowerCase())
    
      for(let numberMonth = 0; numberMonth < months.length; numberMonth++){
          months[numberMonth] = months[numberMonth].split("--")
          for(let c = 0; c < months[numberMonth].length; c++){
              if(months[numberMonth][c] == setMonth){
          return months[numberMonth][0]
              }
          }
      }
  }