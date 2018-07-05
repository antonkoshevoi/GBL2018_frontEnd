import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions,
  Paper, Tab, FormControlLabel, Radio
} from '@material-ui/core';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import Filter from "../../../components/pages/store/Filter";
import {selectGetStoreRecordsRequest, selectGetUnassignedRecordsRequest} from "../../../redux/courses/selectors";
import {getStoreRecords, getUnassignedRecords} from "../../../redux/courses/actions";
import {Row, Table, TablePreloader, Tbody, Td, Thead, HeadRow, Th} from "../../../components/ui/table";
import toastr from 'toastr';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class CourseModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      courseId: null,
      activeTab: 0,
      filterShow: {
        sort: false,
        all: false,
        subject: true,
        target: true,
        search: true,
        newest: false,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this._handleModalOpened(nextProps);
  }

  _getRecords(params) {
    this.props.getStoreRecords(params);
  }


  _setFilters(params) {
    if (params)
      this.setState({isFiltered: true});
    this._getRecords(params)
  }

  _handleModalOpened(nextProps) {
    const prev = this.props.isOpen;
    const next = nextProps.isOpen;

    if (!prev && next) {
      const {getStoreRecords, getUnassignedRecords, courseId} = this.props;

      getStoreRecords();
      getUnassignedRecords();

      this.setState({courseId})
    }
  }

  _handleChangeTab = (event, activeTab) => {
    this.setState({activeTab});
  };

  _close() {
    this.setState({
      courseId: this.props.courseId,
      activeTab: 0
    });
    this.props.onClose();
  };

  _onChange(course) {
    this.setState({course})
    const courseId = course.get('courseId');
    this.setState({courseId})

  };

  _onSubmit() {
    const {course,courseId} = this.state;
    const {t} = this.props;
    if (!courseId) {
      toastr.error(t(`messages:courseRequired`));
    } else {
      this.props.onSuccess(course);
      this._close();
    }
  };

  _renderStoreItems() {
    const {courseId} = this.state;
    const {t} = this.props;
    const storeCourses = this.props.storeRecordsRequest.get('records');

    if (!storeCourses.size) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('noStoreItems')}</h2>
            </div>
          </td>
        </tr>
      )
    } else {
      return storeCourses.map((course, i) => {
        return (
          <Row key={i} index={i}>
            <Td width='30px' first={true}>
              <FormControlLabel
                value="male"
                name="courseId"
                control={<Radio/>}                
                checked={course.get('courseId') == courseId}
                onChange={() => {
                  this._onChange(course)
                }}/>
            </Td>
            <Td width='70px'>
              <div>
                <img src={course.get('thumbnail')} width={70} alt={course.get('title')}/>
              </div>
            </Td>
            <Td width='100px'><span style={{fontWeight: 600}}>{course.get('title')}</span></Td>
            <Td width='300px'>{course.get('description')}</Td>
            <Td width='100px'><span style={{fontWeight: 600}}>{course.get('price')}</span></Td>
            <Td width='100px'><span style={{fontWeight: 600}}>{course.get('credit') ? course.get('credit') : '-'}</span></Td>
          </Row>
        )
      });
    }
  }

  render() {
    const {isOpen, t} = this.props;
    const {activeTab, filterShow, isFiltered} = this.state;
    const storeRecordsLoading = this.props.storeRecordsRequest.get('loading');
    const unassignedRecordsLoading = this.props.unassignedRecordsRequest.get('loading');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>
            <IconButton color="inherit" aria-label="Close">
              {storeRecordsLoading && unassignedRecordsLoading ? (
                <CircularProgress style={{float: 'right'}} color="inherit"/>
              ) : (
                <Icon>person</Icon>
              )}
            </IconButton>
            <Typography type="title" color="inherit">
              {t('chooseCourse')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText></DialogContentText>
          <Filter
            onChange={(params) => this._setFilters(params)}
            isActive={isFiltered}
            isShow={filterShow}
          ></Filter>
          <Paper className='full-width' style={{boxShadow: '0 0 0 0'}}>
            <Table>
              <Thead>
              <HeadRow>
                <Th width="30px" first={true}></Th>
                <Th width="70px">{t('image')}</Th>
                <Th width="100px">{t('courseTitle')}</Th>
                <Th width="300px">{t('courseDescription')}</Th>
                <Th width="100px">{t('priceEach')}</Th>
                <Th width="100px">{t('Unassigned Credits')}</Th>
              </HeadRow>
              </Thead>
              <Tbody>
              {storeRecordsLoading &&
              <TablePreloader text="Loading..." color="primary"/>
              }
              {!storeRecordsLoading && this._renderStoreItems()}
              </Tbody>
            </Table>
          </Paper>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            onClick={() => {
              this._onSubmit()
            }}
            type='button'
            form='choose-course-form'
            disabled={storeRecordsLoading && unassignedRecordsLoading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            {t('chooseCourse')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

CourseModal = connect(
  (state) => ({
    storeRecordsRequest: selectGetStoreRecordsRequest(state),
    unassignedRecordsRequest: selectGetUnassignedRecordsRequest(state),
  }),
  (dispatch) => ({
    getStoreRecords: (params) => {
      dispatch(getStoreRecords(params))
    },
    getUnassignedRecords: () => {
      dispatch(getUnassignedRecords())
    },
  })
)(CourseModal);

export default translate('translations')(CourseModal);