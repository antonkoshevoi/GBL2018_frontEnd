import React, {Component} from 'react';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead, MessageRow} from "../../../components/ui/table";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getRecords} from "../../../redux/course-credits/actions";
import {selectGetRecordsRequest} from "../../../redux/course-credits/selectors";
import AssignStudentModal from "../modals/AssignStudentModal"
import GiftModal from "../modals/GiftModal"
import ConfirmButton from "../../../components/ui/ConfirmButton";

class UnassignedCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            assignModalIsOpen: false,
            giftModalIsOpen: false
        }
    }
  
    componentDidMount() {
        const { getRecords } = this.props;
        getRecords();
    }
  
    _closeAssignDialog() {      
        this.setState({ assignModalIsOpen: false, selectedCourse: null });
    }
  
    _openAssignDialog(item) {
        this.setState({
            selectedItem: item.toJS(),
            assignModalIsOpen: true
        });
    }

    _closeGiftDialog() {      
        this.setState({ giftModalIsOpen: false, selectedItem: null });
    }
  
    _openGiftDialog(item) {
        this.setState({
            selectedItem: item.toJS(),      
            giftModalIsOpen: true 
        });
    }
  
    _handleAssigned() {      
        const { getRecords } = this.props;        
        getRecords();
    }
  
    _renderUnassigneds() {
        const {t, recordsRequest} = this.props;
        const records = recordsRequest.get('records');
    
        if (!records.size && !recordsRequest.get('loading')) {
            return (
                <MessageRow>{t('noUnassignedCredits')}</MessageRow>
            );
        }

        return records.map((record, i) => (      
            <Row index={i} key={i}>
              <Td className='m--padding-left-0 m--padding-right-0'>               
                  <img alt={record.get('item').get('title')} src={record.get('item').get('thumbnail')} width={70}/>                
              </Td>
              <Td>{record.get('item').get('title')}
              </Td>
              <Td>{record.get('quantity')}</Td>
              <Td className="actions">
                {record.get('isGift') ?  
                    <ConfirmButton icon='la la-gift' className='btn-success margin-0' confirmOnly={true} title={t('giftCourseFrom', {user: record.get('userName')}) } />
                :
                    <button title={t('giftCourseCredit')} className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._openGiftDialog(record) }} >
                        <i className='la la-gift'></i>
                    </button>
                }          
                <button title={t('assignStudent')} className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-5' onClick={() => { this._openAssignDialog(record) }} >
                    <i className='la la-user-plus'></i>
                </button>
              </Td>
            </Row>
        ));
    }

  render() {
      
    const {selectedItem, assignModalIsOpen, giftModalIsOpen} = this.state;
    const {t} = this.props;
    
    const blockStyles = {
        minHeight: 340,
        overflowY: 'auto',
        overflowX: 'hidden'
    };
    
    return (
            <div>
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'> {t('manageCourses')}</h3>
                </div>              
                <div className="m-portlet m-portlet--head-solid-bg">
                    <div className="m-portlet__body m--padding-top-10">
                        <div style={blockStyles}>
                            <Table>
                                <Thead>
                                <HeadRow>
                                    <Th>{t('image')}</Th>
                                    <Th>{t('course')}</Th>
                                    <Th>{t('count')}</Th>
                                    <Th>{t('actions')}</Th>
                                </HeadRow>
                                </Thead>
                                <Tbody>
                                    {this._renderUnassigneds()}
                                </Tbody>
                            </Table>
                            <GiftModal isOpen={ giftModalIsOpen } onClose={() => {this._closeGiftDialog()}} onSuccess={() => {this._handleAssigned()}}  unassignedItem={ selectedItem } />
                            <AssignStudentModal isOpen={ assignModalIsOpen } onClose={() => {this._closeAssignDialog()}} onSuccess={() => {this._handleAssigned()}}  unassignedItem={ selectedItem } />
                        </div>
                    </div>
                </div>        
            </div>
    );
  }
}

UnassignedCourses = connect(
  (state) => ({
    recordsRequest: selectGetRecordsRequest(state),
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
  })
)(UnassignedCourses);

export default withTranslation('translations')(UnassignedCourses);
