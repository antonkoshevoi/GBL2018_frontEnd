import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, FormControl, InputLabel, FormHelperText,
  Icon, Toolbar, Typography, MenuItem, Select, FormGroup,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import {translate} from "react-i18next";
import Modal from '../../../components/ui/Modal';
import { selectGetUsersRequest } from "../../../redux/connections/selectors";
import { getUsers } from "../../../redux/connections/actions";
import { selectGiftCourseCreditRequest } from "../../../redux/course-credits/selectors";
import { giftCourseCredit, resetGiftCourseCreditRequest } from "../../../redux/course-credits/actions";

class GiftModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,    
        onSuccess: PropTypes.func.isRequired    
    };

    constructor (props) {
        super(props);
        this.state = {
            userId: null,
            quantity: 1,
            connections: []
        };
    };

  
    componentWillReceiveProps(nextProps) {    
        const success = this.props.giftCourseCreditRequest.get('success');
        const nextSuccess = nextProps.giftCourseCreditRequest.get('success');

        if (!success && nextSuccess) {
            this._close();     
            this.props.onSuccess();
        }

        if (!this.props.isOpen && nextProps.isOpen) {
            this.props.getConnections();
        }    
    };
  
    _close () {     
        this.setState({userId: null, quantity: 1});  
        this.props.resetGiftCourseCreditRequest();
        this.props.onClose();
    };
  
    _handleSubmit (e) {            
        e.preventDefault();

        const { unassignedItem } = this.props;

        this.props.giftCourseCredit({
            creditId: unassignedItem.id,
            userId: this.state.userId,
            quantity: this.state.quantity
        });    
    };
  
    _renderConnections() {
      
        const { connectionsRequest } = this.props;
      
        const users = connectionsRequest.get('records');
        
        if (!connectionsRequest.get('success')) {
            return '';
        }

        return users.toJS().map((user, key) => (
            <MenuItem key={key} value={user.id}>
              {user.name}
            </MenuItem>
        ));
    }  

    _handleInputChange(event) {
        const {name, value} = event.target;    

        this.setState({[name]: value});
    }
  
  render() {
    const { isOpen, unassignedItem, giftCourseCreditRequest, connectionsRequest, t } = this.props;
    const loading = giftCourseCreditRequest.get('loading') || connectionsRequest.get('loading');
    const errors  = giftCourseCreditRequest.get('errors');
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color='inherit'/>
              ) : (
                <Icon className="m--margin-right-15">card_giftcard</Icon>
              )}            
            <Typography type='title' color='inherit'>{t('giftCourseCredit')} </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>        
            <div className='row'>                    
                <FormGroup row style={{minWidth: '500px'}}>
                    <div className='col-sm-6 col-lg-6 m-auto'>
                    {unassignedItem &&
                        <div className="text-center">
                            <img alt={unassignedItem.item.title} src={unassignedItem.item.thumbnail} width={70}/>
                            <p className='m--margin-top-25'><strong>{unassignedItem.item.title}</strong></p>
                        </div>}
                    </div>
                    <div className='col-sm-6 col-lg-6 m-auto'>
                    {(unassignedItem && unassignedItem.quantity > 1) && 
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='userId'>{t('quantity')}</InputLabel>
                            <Select
                              primarytext={t('quantity')}
                              id='quantity'
                              name='quantity'
                              value={this.state.quantity || '1'}
                              onChange={(e) => { this._handleInputChange(e) }}>
                              {Array.from({length: unassignedItem.quantity}, (i, x) => (x + 1)).map((count, i) =>    
                                  <MenuItem key={i} value={count}>{count}</MenuItem>
                              )}  
                            </Select>
                            {errors && errors.get('quantity') && <FormHelperText error>{errors.get('quantity').get(0)}</FormHelperText>}
                        </FormControl>}                        
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='userId'>{t('selectPersone')}</InputLabel>
                            <Select
                              primarytext={t('selectPersone')}
                              id='userId'
                              name='userId'
                              value={this.state.userId || ''}
                              onChange={(e) => { this._handleInputChange(e) }}> 
                              <MenuItem value={null} primarytext=""/>
                              {this._renderConnections()}
                            </Select>
                            {errors && errors.get('userId') && <FormHelperText error>{errors.get('userId').get(0)}</FormHelperText>}
                        </FormControl>            
                    </div>
                </FormGroup>          
            </div>       
        </DialogContent>
        
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='button'
            onClick={(e) => { this._handleSubmit(e) }}
            form='create-student-form'
            disabled={loading}            
            className='mt-btn-success pull-right btn btn-success mt-btn'
            color='primary'>
            {t('makeGift')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
    
GiftModal = connect(
    (state) => ({    
        connectionsRequest: selectGetUsersRequest(state),
        giftCourseCreditRequest: selectGiftCourseCreditRequest(state)
    }),
    (dispatch) => ({
        getConnections: (params = {}) => { dispatch(getUsers(params)) },
        giftCourseCredit: (form, params = {}) => { dispatch(giftCourseCredit(form, params)) },
        resetGiftCourseCreditRequest: () => { dispatch(resetGiftCourseCreditRequest()) }
    })
)(GiftModal);
  
export default translate('translations')(GiftModal);