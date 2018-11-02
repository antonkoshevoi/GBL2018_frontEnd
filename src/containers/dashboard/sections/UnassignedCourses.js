import React, {Component} from 'react';
import Card from "../../../components/ui/Card";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../../components/ui/table";
import {connect} from "react-redux";
import {translate} from "react-i18next";
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
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>{t('noUnassignedCredits')}</h2>
                        </div>
                    </td>
                </tr>
            );
        }

        return records.map((record, i) => (      
            <Row index={i} key={i}>
              <Td width="70px">               
                  <img alt={record.get('item').get('title')} src={record.get('item').get('thumbnail')} width={70}/>                
              </Td>
              <Td width='150px'>{record.get('item').get('title')}
              </Td>
              <Td width='50px'>{record.get('quantity')}</Td>
              <Td width='100px'>
                {record.get('isGift') ?  
                    <ConfirmButton icon='la la-gift' className='btn-success margin-0' confirmOnly={true} title={t('giftCourseFrom', {user: record.get('userName')}) } />
                :
                    <button className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._openGiftDialog(record) }} >
                        <i className='la la-gift'></i>
                    </button>
                }          
                <button className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-5' onClick={() => { this._openAssignDialog(record) }} >
                    <i className='la la-user-plus'></i>
                </button>
              </Td>
            </Row>
        ));
    }

  render() {
      
    const {selectedItem, assignModalIsOpen, giftModalIsOpen} = this.state;
    const {t} = this.props;
    
    return (
      <Card title={t('unassignedCourses')} icon="fa fa-list-alt" isMainCard={true} isStore={true} className="m--margin-top-15">
        <Table>
          <Thead>
          <HeadRow>
            <Th name='image' width='70px'>{t('image')}</Th>
            <Th name='name' width='150px'>{t('courseName')}</Th>
            <Th name='count' width='50px'>{t('count')}</Th>
            <Th name='assign' width='100px'>{t('actions')}</Th>
          </HeadRow>
          </Thead>
          <Tbody>
            {this._renderUnassigneds()}
          </Tbody>
        </Table>
        <GiftModal isOpen={ giftModalIsOpen } onClose={() => {this._closeGiftDialog()}} onSuccess={() => {this._handleAssigned()}}  unassignedItem={ selectedItem } />
        <AssignStudentModal isOpen={ assignModalIsOpen } onClose={() => {this._closeAssignDialog()}} onSuccess={() => {this._handleAssigned()}}  unassignedItem={ selectedItem } />
      </Card>
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

export default translate('translations')(UnassignedCourses);
