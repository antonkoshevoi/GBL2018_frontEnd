import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { randColorName } from "../../../helpers/colors";
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectUpdateRequest} from "../../../redux/user/selectors";

class Summery extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    schools: PropTypes.array.isRequired,
    homerooms: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      user: this.props.user
    });
  }

  componentWillReceiveProps(nextProps) {
    this._updateUserSuccess(nextProps);
  }

  _updateUserSuccess(nextProps) {
    const prev = this.props.getUpdateRequest.get('success');
    const next = nextProps.getUpdateRequest.get('success');

    if (!prev && next) {
      this.setState({
        ...this.state,
        user: nextProps.user
      });
    }
  }

  _renderSchools() {
    const { schools } = this.props;

    return (
      schools.map((school, key) => {
        return <div className="m-timeline-2 my-timeline" key={key}>
          <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
            <div className="m-timeline-2__item m--margin-bottom-10">
              <div className="m-timeline-2__item-cricle">
                <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
              </div>
              <div className="m-timeline-2__item-text  m--padding-top-5">
                {school.schName}
              </div>
            </div>
          </div>
        </div>
      })
    )
  }

  _renderHomerooms() {
    const { homerooms } = this.props;

    return (
      homerooms.map((homeroom, key) => {
        return <div className="m-timeline-2 my-timeline" key={key}>
          <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
            <div className="m-timeline-2__item m--margin-bottom-10">
              <div className="m-timeline-2__item-cricle">
                <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
              </div>
              <div className="m-timeline-2__item-text  m--padding-top-5">
                {homeroom.name}
              </div>
            </div>
          </div>
        </div>
      })
    )
  }

  _renderClassrooms() {
    return (
      <div className="m-timeline-2 my-timeline">
        <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
          <div className="m-timeline-2__item m--margin-bottom-10">
            <div className="m-timeline-2__item-cricle">
              <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
            </div>
            <div className="m-timeline-2__item-text  m--padding-top-5">
              Test
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
        <div className="m-portlet__head">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
							<i className='flaticon-list-2'></i>
						</span>
              <h3 className="m-portlet__head-text">
                Summery
              </h3>
            </div>
          </div>
        </div>
        <div className="m-portlet__body">
          <h3>Schools</h3>
          {this._renderSchools()}
          <h3>Homerooms</h3>
          {this._renderHomerooms()}
          <h3>Classrooms</h3>
          {this._renderClassrooms()}
        </div>
      </div>

    );
  }
}

Summery = connect(
  (state) => ({
    getUpdateRequest: selectUpdateRequest(state),
  })
)(Summery);

export default Summery;
