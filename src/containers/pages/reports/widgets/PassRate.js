import React, {Component} from 'react';
import Card from "../../../../components/ui/Card";
import {CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';

class PassRate extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {loading, data, t} = this.props;

    return (
      <Card title={t('passRate')} icon="flaticon-list-2" className='passRateCard'>
        <h1  className="d-flex justify-content-center align-items-center absolute-center" style={{fontSize:'7rem',color:'rgb(0, 128, 0)'}}>
          {loading ? <CircularProgress color="primary"/> : (data.passRate + '%')}          
        </h1>
      </Card>
    );
  }
}

export default translate('translations')(PassRate);
