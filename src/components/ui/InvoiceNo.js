import React from 'react';
import {renderToString} from 'react-dom/server'
import {Trans} from 'react-i18next';
import {Price} from './Price';

export const InvoiceNo = (props) => {
    const {number, amount, currency, className} = props;
    return (
        <div className={className || 'invoice-title my-3 my-lg-5 d-none d-sm-block'}>
            <Trans i18nKey="translations:yourInvoice">
                <span className="font-weight-bold">{{invoiceNo: number}}</span>
                <span className="font-weight-bold">{{invoiceAmount: renderToString(<Price price={amount} currency={currency} />)}}</span>
            </Trans>
        </div>
    );    
}