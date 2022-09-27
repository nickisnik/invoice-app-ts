const formatCurrency = (amount : string | number) => {
    let value = Number(amount)
    let pence : string | number = value%100
    if(pence === 0) {
      pence = '00'
    } else if(pence < 10) {
      pence = `0${pence}`
    }
    value = Math.floor(value/100) // convert to pounds.cents
    return `£${value}.${pence}`
  }

export default formatCurrency