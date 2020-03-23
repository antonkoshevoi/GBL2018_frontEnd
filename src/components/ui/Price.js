
export const Price = ({price, currency}) => {
    const prefixes = {
        EUR: '€',
        RUB: '₽'
    }        
                   
    price = (prefixes[currency] || '$') + parseFloat(price).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
    if (currency) {
        price = price + ' ' + currency;
    }        
    return  price
}