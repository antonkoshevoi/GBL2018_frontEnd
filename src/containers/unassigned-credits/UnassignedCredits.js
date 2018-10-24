import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from '../../components/ui/table';
import { connect } from 'react-redux';
import {getRecords} from "../../redux/course-credits/actions";
import {selectGetRecordsRequest} from "../../redux/course-credits/selectors";
import {buildSortersQuery} from "../../helpers/utils";
import Card from "../../components/ui/Card";

class UnassignedCredits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorters: {},
      filters: {},
      page: props.recordsRequest.get('pagination').get('page'),
      perPage: props.recordsRequest.get('pagination').get('perPage')
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }

  _getRecords () {
    const { sorters, filters, page, perPage } = this.state;

    this.props.getRecords({
      orderBy: buildSortersQuery(sorters),
      filter: filters,
      page, perPage
    });
  }

  _renderRecords () {
    const records = this.props.recordsRequest.get('records');
    const loading = this.props.recordsRequest.get('loading');
    const { t } = this.props;
    
    if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('noUnassignedCredits')}</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='60px'>{key + 1}</Td>
        <Td width="100px">
          <div >
            <img alt={t('course')} src={record.get('item').get('thumbnail')} width={70}/>
          </div>
        </Td>
        <Td width='130px'>{record.get('item').get('title')}</Td>
        <Td width='150px'>{record.get('item').get('description')}</Td>
        <Td width='130px'>{record.get('quantity')}</Td>
      </Row>
    ));
  }

  _sort (name) {
    let sorters = {};

    if(this.state.sorters[name]) {
      sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
    } else {
      sorters[name] = 'asc';
    }

    this.setState({ sorters }, this._getRecords);
  }

  render() {
    const { sorters } = this.state;
    const { t } = this.props;
    const loading = this.props.recordsRequest.get('loading');
    
    return (
        <div>
            <Card title={t('unassignedCredits')} icon="la la-money">
            <Table>
              <Thead>
                <HeadRow>
                  <Th first={true} width='60px'>#</Th>
                  <Th width='100px'>{t('thumbnail')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['resurce']} name='resource' width='130px'>{t('resource')}</Th>
                  <Th width='150px'>{t('description')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['count']} name='count' width='130px'>{t('count')}</Th>
                </HeadRow>
              </Thead>
              <Tbody>
              { loading && <TablePreloader text="Loading..." color="primary"/> }
              { this._renderRecords() }
              </Tbody>
            </Table>
          </Card>        
      </div>
    );
  }
}

UnassignedCredits = connect(
  (state) => ({
    recordsRequest: selectGetRecordsRequest(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) }
  })
)(UnassignedCredits);

export default translate('translations')(UnassignedCredits);