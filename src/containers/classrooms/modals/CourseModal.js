import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions,
  Paper, FormControlLabel, Radio
} from '@material-ui/core';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import Filter from "../../../components/store/Filter";
import {selectGetStoreRecordsRequest} from "../../../redux/courses/selectors";
import {getStoreRecords} from "../../../redux/courses/actions";
import {Row, Table, TablePreloader, Tbody, Td, Thead, HeadRow, Th, MessageRow} from "../../../components/ui/table";
import toastr from 'toastr';

class CourseModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      course: null,
      courseId: null,      
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
      const {getStoreRecords, courseId} = this.props;

      getStoreRecords();      

      this.setState({courseId})
    }
  }

  _close() {
    this.setState({
      courseId: this.props.courseId      
    });
    this.props.onClose();
  };

  _onChange(course) {
    this.setState({course})
    const courseId = course.get('courseId');
    this.setState({courseId: courseId})

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
    const {courseId, course} = this.state;
    const {t} = this.props;
    const storeCourses = this.props.storeRecordsRequest.get('records');

    if (!storeCourses.size) {
      return (
        <MessageRow>{t('noStoreItems')}</MessageRow>
      )
    } else {
      return storeCourses.map((storeCourse ,i) => {
        if (storeCourse.get('courseId') === courseId && !course) {
           this._onChange(storeCourse);
        }
        return (
          <Row key={i} index={i}>
            <Td width='30px'>
              <FormControlLabel
                value="male"
                name="courseId"
                control={<Radio color="primary"/>}                
                checked={storeCourse.get('courseId') === courseId}
                onChange={() => {
                  this._onChange(storeCourse)
                }}/>
            </Td>
            <Td width='70px'>
              <div>
                <img src={storeCourse.get('thumbnail')} width={70} alt={storeCourse.get('title')}/>
              </div>
            </Td>
            <Td width='100px'><strong>{storeCourse.get('title')}</strong></Td>
            <Td width='300px'>{storeCourse.get('description')}</Td>
            <Td width='100px'><strong>{storeCourse.get('price')}</strong></Td>
            <Td width='100px'><strong>{storeCourse.get('credit') ? storeCourse.get('credit') : '-'}</strong></Td>
          </Row>
        )
      });
    }
  }

  render() {
    const {isOpen, t} = this.props;
    const {filterShow, isFiltered} = this.state;
    const storeRecordsLoading = this.props.storeRecordsRequest.get('loading');    

    return (
      <Modal bigger={true}  isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {storeRecordsLoading ? (
                <CircularProgress  className="m--margin-right-15" color="inherit"/>
              ) : (
                <Icon className="m--margin-right-15">person</Icon>
              )}            
            <Typography variant="h6" color="inherit">
              {t('chooseCourse')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">          
          <Filter            
            onChange={(params) => this._setFilters(params)}
            isActive={isFiltered}
            isShow={filterShow}
          ></Filter>
          <Paper className='full-width' elevation={0}>
            <Table>
              <Thead>
              <HeadRow>
                <Th width="30px"></Th>
                <Th width="70px">{t('image')}</Th>
                <Th width="100px">{t('courseTitle')}</Th>
                <Th width="300px">{t('courseDescription')}</Th>
                <Th width="100px">{t('priceEach')}</Th>
                <Th width="100px">{t('unassignedCredits')}</Th>
              </HeadRow>
              </Thead>
              <Tbody>
              {storeRecordsLoading &&
              <TablePreloader text={t('loading')} />
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
            disabled={storeRecordsLoading}            
            className='mt-btn-success pull-right btn btn-success mt-btn'
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
    storeRecordsRequest: selectGetStoreRecordsRequest(state)    
  }),
  (dispatch) => ({
    getStoreRecords: (params) => {
      dispatch(getStoreRecords(params))
    }
  })
)(CourseModal);

export default translate('translations')(CourseModal);