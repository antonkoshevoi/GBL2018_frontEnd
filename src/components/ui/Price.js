
export const Price = ({price, currency}) => {    
    return '$' + parseFloat(price).toFixed(2) + ' ' + (currency || '');
}