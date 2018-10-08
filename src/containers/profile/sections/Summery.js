import React, {Component} from 'react';
import { randColorName } from "../../../helpers/colors";
import { translate } from 'react-i18next';

class Summery extends Component {

  _renderData(name) {    
    const { t } = this.props;
    const { [name]: data } = this.props.user;
    
    if (!data || !data.length) {
      return <div className="m-timeline-2 my-timeline">
        <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
          <div className="m-timeline-2__item m--margin-bottom-10">
            <div className="m-timeline-2__item-cricle">
              <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
            </div>
            <div className="m-timeline-2__item-text  m--padding-top-5">              
              {t(name + 'NotFound')}
            </div>
          </div>
        </div>
      </div>
    }
    return (
      data.map((item, key) => {
        return <div className="m-timeline-2 my-timeline" key={key}>
          <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
            <div className="m-timeline-2__item m--margin-bottom-10">
              <div className="m-timeline-2__item-cricle">
                <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
              </div>
              <div className="m-timeline-2__item-text  m--padding-top-5">
                {item.name}
              </div>
            </div>
          </div>
        </div>
      })
    )
  }

  render() {
    const { t } = this.props;
    
    return (
      <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
        <div className="m-portlet__head">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                    <i className='flaticon-list-2'></i>
              </span>
              <h3 className="m-portlet__head-text">
                {t('summery')}
              </h3>
            </div>
          </div>
        </div>
        <div className="m-portlet__body">         
          <h3>{t('homerooms')}</h3>
          {this._renderData('homerooms')}
          <h3>{t('classrooms')}</h3>
          {this._renderData('classrooms')}
        </div>
      </div>
    );
  }
}

export default translate('translations')(Summery);
