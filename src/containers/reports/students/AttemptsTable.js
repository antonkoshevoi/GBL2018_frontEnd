import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../components/ui/table';
import {selectAttemptsRequest} from "../../../redux/reports/students/selectors";
import {getAttempts} from "../../../redux/reports/students/actions";
import {translate} from 'react-i18next';
import Pagination from '../../../components/ui/Pagination';
import Loader from "../../../components/layouts/Loader";
import moment from "moment/moment";

class AttemptsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      page: props.attemptsRequest.get('pagination').get('page'),
      perPage: props.attemptsRequest.get('pagination').get('perPage')
    };
  }
  
  componentDidMount() {
    this._getRecords();
  }

  handleChange (event) {
      const { value } = event.target;
  
      this.setState({classroom: value});
  };
  
  _getRecords () {
    const { page, perPage } = this.state;
    const { getAttempts, studentId } = this.props;
       
    getAttempts(studentId, {
        page, perPage
    });
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords);
  }  

  _recordNumber(key) {
      const { page, perPage } = this.state;
      return (key + 1 + ((page - 1) * perPage));
  }
  
  render() {
    const {t, attemptsRequest} = this.props;    
    const { page }      = this.state;    
    const totalPages    = attemptsRequest.get('pagination').get('totalPages');
    
    if (attemptsRequest.get('loading')) {
        return <Loader />;
    }
    
    if (!attemptsRequest.get('records').size) {
        return <Table>
            <Tbody>
                <Row index={0} key={0}>
                    <Td><h2>{t('noData')}</h2></Td>
                </Row>
            </Tbody>
        </Table>;
    }

    return (
        <div>
            <Table>
                <Thead>
                    <HeadRow>
                      <Th width='20px'>#</Th>
                      <Th width='150px'>{t('date')}</Th>
                      <Th width='150px'>{t('classroom')}</Th>
                      <Th width='150px'>{t('course')}</Th>
                      <Th width='200px'>{t('unitLesson')}</Th>
                      <Th width='50px'>{t('score')}</Th>
                      <Th width='50px'>{t('percent')}</Th>
                      <Th width='50px'>{t('passFail')}</Th>                      
                    </HeadRow>
                </Thead>
                <Tbody>                
                    {attemptsRequest.get('records').toJS().map((attempt, i) => {                                    
                      return (
                        <Row index={i} key={i}>
                          <Td width='20px'>{this._recordNumber(i)}</Td>
                          <Td width='150px'>{moment(attempt.attDate).format('lll')}</Td>
                          <Td width='150px'>{attempt.classroomName}</Td>
                          <Td width='150px'>{attempt.courseName}</Td>
                          <Td width='200px'>{attempt.unit || '-'} / {attempt.lesson || '-'}</Td>
                          <Td width='50px'>{attempt.scoredPoints} / {attempt.lessonPoints}</Td>
                          <Td width='50px'>{((attempt.scoredPoints / attempt.lessonPoints) * 100).toFixed(1).replace('.0', '')}</Td>
                          <Td width='50px'>
                            <span className={`m-badge m-badge--brand m-badge--wide ${attempt.pass ? 'm-badge--success' : 'm-badge--danger'}`}>
                              {attempt.pass ? t('pass') : t('fail')}
                            </span>
                          </Td>                         
                        </Row>)
                    })}
                </Tbody>
            </Table>
            <div className="row">
                <div className="col-sm-12 m--margin-top-20 m--margin-bottom-40 text-right">
                    <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                </div>
            </div>
        </div>);
  }
}

AttemptsTable = connect(
    (state) => ({
        attemptsRequest: selectAttemptsRequest(state)
    }),
    (dispatch) => ({
        getAttempts: (id, params = {}) => {dispatch(getAttempts(id, params))},    
    })
)(AttemptsTable);

export default translate('translations')(AttemptsTable);