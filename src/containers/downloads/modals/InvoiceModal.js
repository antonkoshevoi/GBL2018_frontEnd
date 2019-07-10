import React, {Component} from 'react';
import {
  AppBar, 
  DialogContent, 
  Icon, Toolbar, Typography  
} from '@material-ui/core';
import {withTranslation} from "react-i18next";
import Modal from '../../../components/ui/Modal';
import InvoiceNo from "../../store/sections/InvoiceNo";

class InvoiceModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            data: this.props.data
        };
    };  
  
    _close () {
        this.setState({isOpen: false});
    };
  
    render() {
        const { t } = this.props;
        const { data, isOpen } = this.state;

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position='static' color='primary' className='dialogAppBar'>
                  <Toolbar>
                    <Icon className="mr-3">assignment</Icon>                  
                    <Typography variant="h6" color='inherit'>{t('thankYou')} </Typography>
                  </Toolbar>
                </AppBar>
                <DialogContent className='m-2'>                    
                    <InvoiceNo className="display-6 my-3" number={data.get('invoiceNo')} amount={data.get('total')} currency={data.get('currency')} />
                    <div className="text-center">
                        <a rel="noopener noreferrer" className="btn btn-success" href={data.get('pdfUrl')} target="_blank">{t('downloadPdf')}</a>
                    </div>
                </DialogContent>                
            </Modal>
        );
    }
}
   

export default withTranslation('translations')(InvoiceModal);