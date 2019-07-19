
export const Price = ({price, currency}) => {
    const prefixes = {
        EUR: '€',
        RUB: '₽'
    }
    return (prefixes[currency] || '$') + parseFloat(price).toFixed(2) + ' ' + (currency || '');
}