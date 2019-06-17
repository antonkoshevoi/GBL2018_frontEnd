import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import {selectDiscountCodeRequest} from "../../../redux/store/selectors";
import {setDiscountCode, resetDiscountCodeRequest} from "../../../redux/store/actions";
import {FormControl, AppBar, CircularProgress, Icon, FormHelperText, Toolbar, Typography, Divider, Button, DialogActions, DialogContent, InputLabel, Input} from '@material-ui/core';
import SessionStorage from '../../../services/SessionStorage';

class DiscountCode extends Component {

    state = {
        isOpen: false,
        discountCode: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            discountCode: SessionStorage.get('discountCode', {path: '/'})
        }
        console.log(SessionStorage.get('discountCode'));
    }
    
    componentWillReceiveProps(nextProps) {
        if (!this.props.discountCodeRequest.get('success') && nextProps.discountCodeRequest.get('success')) {
            this.props.resetDiscountCodeRequest();
            this.setState({
                isOpen: false
            });            
        }
    }    

    _handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    _onClose() {
        
    }
    
    _openModal() {
        this.setState({
            isOpen: true
        });
    }
    
    _onSubmit(e) {
        e.preventDefault();
        
        this.props.setDiscountCode({
            discountCode: this.state.discountCode
        });
    }
  
    _renderModal()
    {
        const {discountCodeRequest, t}  = this.props;        
        const {discountCode, isOpen}    = this.state;
        const loading                   = discountCodeRequest.get('loading');
        const errors                    = discountCodeRequest.get('errors');
  
        return <Modal isOpen={isOpen} onClose={() => this._onClose()}>
            <AppBar position="static" color="primary" className="dialogAppBar">
                <Toolbar>                        
                    {loading ? (
                        <CircularProgress className="m--margin-right-15" color="inherit"/>
                    ) : (
                        <Icon className="m--margin-right-15">grade</Icon>
                    )}                        
                    <Typography variant="h6" color="inherit">
                        {t('enterPromocode')}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent className="m--margin-top-25">
                <form id='update-administrator-form' onSubmit={(e) => {
                    this._onSubmit(e)
                }}>
                <div className='row'>
                    <div className='col-12'>        
                      <FormControl className='full-width form-inputs'>
                        <InputLabel htmlFor='discountCode'>{t('promocode')}</InputLabel>
                        <Input
                          name='discountCode'
                          margin='dense'
                          fullWidth
                          value={discountCode || ''}
                          onChange={(e) => {
                            this._handleInputChange(e)
                          }}/>
                        {errors && errors.get('discountCode') && <FormHelperText error>{errors.get('discountCode').get(0)}</FormHelperText>}
                      </FormControl>
                    </div>
                  </div>
                </form>
            </DialogContent>
            <Divider className='full-width'/>
            <DialogActions>
                <Button
                    type='submit'
                    form='update-administrator-form'
                    disabled={loading}                        
                    className='mt-btn-success pull-right btn btn-success mt-btn'
                    color='primary'>
                    {t('apply')}
                </Button>
            </DialogActions>
        </Modal>
    }

    render() {
        const {t} = this.props;
        
        return <div className="py-2 pr-4 promocode-block">
            <span onClick={() => this._openModal()}>{t('gotPromocode')}</span>
            {this._renderModal()}
        </div>;
    }
}

DiscountCode = connect(
    (state) => ({        
        discountCodeRequest:  selectDiscountCodeRequest(state)
    }),
    (dispatch) => ({
        setDiscountCode: (params) => dispatch(setDiscountCode(params)),
        resetDiscountCodeRequest: () => dispatch(resetDiscountCodeRequest()),
    }),
)(DiscountCode);

export default withTranslation('translations')(DiscountCode);

