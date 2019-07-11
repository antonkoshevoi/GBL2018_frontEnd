import React from 'react';
import {Trans} from 'react-i18next';

export const InvoiceNo = (props) => {
    const {number, amount, currency, className} = props;
    return (
        <div className={className || 'invoice-title my-3 my-lg-5 d-none d-sm-block'}>
            <Trans i18nKey="translations:yourInvoice">
                <span className="font-weight-bold">{{invoiceNo: number}}</span>
                <span className="font-weight-bold">{{invoiceAmount: ('$' + Number(amount).toFixed(2) + ' ' + currency)}}</span>
            </Trans>
        </div>
    );    
}