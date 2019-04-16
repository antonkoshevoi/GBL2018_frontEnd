import moment from 'moment/moment';

export const Date = (time) => {            
    return moment(time).format('YYYY/MM/DD');
};

export const DateTime = (time) => {
    return moment(time).format('YYYY/MM/DD h:mm A');
};