
export const Price = ({price, currency}) => {
    const prefixes = {
        EUR: '€',
        RUB: '₽'
    }
    
    price = parseFloat(price).toFixed(2);
            
    price = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    return (prefixes[currency] || '$') + price + ' ' + (currency || '');
}