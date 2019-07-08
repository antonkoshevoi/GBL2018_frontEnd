import React from 'react';
import {Trans} from 'react-i18next';

const InvoiceNo = (props) => {
    const {number, amount, currency} = props;
    return (
        <div className="invoice-title my-3 my-lg-5 d-none d-sm-block">
            <Trans i18nKey="translations:yourInvoice">
                <span className="m--font-bolder">{{invoiceNo: number}}</span>
                <span className="m--font-bolder">{{invoiceAmount: ('$' + Number(amount).toFixed(2) + ' ' + currency)}}</span>
            </Trans>
        </div>
    );    
}

export default InvoiceNo;