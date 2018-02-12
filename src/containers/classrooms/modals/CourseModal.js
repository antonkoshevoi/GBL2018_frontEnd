import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions,
  Paper, Tab, Tabs, FormControlLabel, Radio
} from 'material-ui';
import { connect } from 'react-redux';
import Modal from "../../../components/ui/Modal";
import {selectGetStoreRecordsRequest, selectGetUnassignedRecordsRequest} from "../../../redux/courses/selectors";
import {getStoreRecords, getUnassignedRecords} from "../../../redux/courses/actions";
import {Row, Table, TablePreloader, Tbody, Td} from "../../../components/ui/table";
import toastr from 'toastr';
import i18n from '../../../configs/i18n';

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

  constructor (props) {
    super(props);
    this.state = {
      courseId: null,
      activeTab: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this._handleModalOpened(nextProps);
  }

  _handleModalOpened(nextProps) {
    const prev = this.props.isOpen;
    const next = nextProps.isOpen;

    if (!prev && next) {
      const { getStoreRecords, getUnassignedRecords, courseId } = this.props;

      getStoreRecords();
      getUnassignedRecords();

      this.setState({ courseId })
    }
  }

  _handleChangeTab = (event, activeTab) => {
    this.setState({ activeTab });
  };

  _close () {
    this.setState({
      courseId: this.props.courseId,
      activeTab: 0
    });
    this.props.onClose();
  };

  _onChange (courseId) {
    this.setState({ courseId });
  };

  _onSubmit () {
    const { courseId } = this.state;

    if (!courseId) {
      toastr.error(
        i18n.t(`messages:courseRequired`)
      );
    } else {
      this.props.onSuccess(courseId);
      this._close();
    }
  };

  _renderUnassignedItems() {
    const { courseId } = this.state;
    const unassignedCourses = this.props.unassignedRecordsRequest.get('records');

    if (!unassignedCourses.size) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>No Unassigned Credits</h2>
            </div>
          </td>
        </tr>
      )
    } else {
      return unassignedCourses.map((course,i) => {
        return (
          <Row key={i} index={i}>
            <Td width="30px">
              <FormControlLabel
                value="male"
                name="courseId"
                control={<Radio />}
                label="Test"
                checked={course.get('crsId') == courseId}
                onChange={() => {this._onChange(course.get('crsId'))}}/>
            </Td>
            <Td width="70px">
              <div >
                <img src={course.get('image')} width={70} alt={course.get('crsTitle')}/>
              </div>
            </Td>
            <Td width='100px'><span style={{fontWeight:600}} className="g-blue">{course.get('crsTitle')}</span></Td>
          </Row>
        )
      });
    }
  }

  _renderStoreItems() {
    const { courseId } = this.state;
    const storeCourses = this.props.storeRecordsRequest.get('records');

    if (!storeCourses.size) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>No Store Items</h2>
            </div>
          </td>
        </tr>
      )
    } else {
      return storeCourses.map((course,i) => {
        return (
          <Row key={i} index={i}>
            <Td width="30px">
              <FormControlLabel
                value="male"
                name="courseId"
                control={<Radio />}
                label="Test"
                checked={course.get('crsId') == courseId}
                onChange={() => {this._onChange(course.get('crsId'))}}/>
            </Td>
            <Td width="70px">
              <div>
                <img src={course.get('image')} width={70} alt={course.get('crsTitle')}/>
              </div>
            </Td>
            <Td width='100px'><span style={{fontWeight:600}} className="g-blue">{course.get('crsTitle')}</span></Td>
          </Row>
        )
      });
    }
  }

  render() {
    const { isOpen } = this.props;
    const { activeTab } = this.state;
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
            <Typography type="title" color="inherit" >
              Choose Course
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText></DialogContentText>
          <Paper className='full-width' style={{boxShadow:'0 0 0 0'}}>
            <Tabs value={activeTab} onChange={this._handleChangeTab} centered>
              <Tab label="Unassigned Credits" />
              <Tab label="Store Items" />
            </Tabs>
            {activeTab === 0 && <TabContainer>
              <Table>
                <Tbody >
                  {unassignedRecordsLoading &&
                  <TablePreloader text="Loading..." color="primary"/>
                  }
                  {!unassignedRecordsLoading && this._renderUnassignedItems()}
                </Tbody>
              </Table>
            </TabContainer>}
            {activeTab === 1 && <TabContainer>
              <Table>
                <Tbody >
                  {storeRecordsLoading &&
                  <TablePreloader text="Loading..." color="primary"/>
                  }
                  {!storeRecordsLoading && this._renderStoreItems()}
                </Tbody>
              </Table>
            </TabContainer>}
          </Paper>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            onClick={() => {this._onSubmit()}}
            type='button'
            form='choose-course-form'
            disabled={storeRecordsLoading && unassignedRecordsLoading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Choose Course
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
    getStoreRecords: () => { dispatch(getStoreRecords()) },
    getUnassignedRecords: () => { dispatch(getUnassignedRecords()) },
  })
)(CourseModal);

export default CourseModal;
