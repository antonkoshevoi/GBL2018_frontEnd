import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { randColorName } from "../../../helpers/colors";
import { translate } from 'react-i18next';

class Summery extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    schools: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {

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
    const { homerooms } = this.props.user;

    if (!homerooms || !homerooms.length) {
      return <div className="m-timeline-2 my-timeline">
        <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
          <div className="m-timeline-2__item m--margin-bottom-10">
            <div className="m-timeline-2__item-cricle">
              <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
            </div>
            <div className="m-timeline-2__item-text  m--padding-top-5">
              No Homerooms found
            </div>
          </div>
        </div>
      </div>
    }
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

export default Summery;
