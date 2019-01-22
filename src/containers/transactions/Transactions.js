import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Tab, Tabs} from '@material-ui/core';
import Card from "../../components/ui/Card";
import HasRole from "../middlewares/HasRole";
import StoreItems from './StoreItems';
import SubscriptionPayments from './SubscriptionPayments';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'storeItems'
        }
    }
    
    _setCurrentTab(value) {
        this.setState({
            currentTab: value
        });
    }    

    render() {
        const { t} = this.props;
        const {currentTab} = this.state;
        
        return (
            <div className="transactionsList">
                <Card title={t('transactions')} icon="la la-money">
                    <HasRole roles={['Parents']}>
                        <div className='m-form m-form--label-align-left m--margin-bottom-15'>
                            <Tabs                             
                                value={currentTab} 
                                onChange={(event, value) => { this._setCurrentTab(value) }}
                                indicatorColor="primary"
                                textColor="primary" >
                                  <Tab value="storeItems" label={t('storePayments')} />
                                  <Tab value="subscriptions" label={t('subscriptionPayments')} />
                            </Tabs>  
                        </div>                    
                        <div>
                            {currentTab === 'storeItems' && <StoreItems />}
                            {currentTab === 'subscriptions' && <SubscriptionPayments />}
                        </div>
                    </HasRole>
                    <HasRole roles={['Superadministrator', 'School', 'Teacher',]}>
                        <StoreItems />
                    </HasRole>
                </Card>
            </div>
        );
    }    
}

export default translate("translations")(Transactions);



