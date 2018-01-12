import React, {Component} from 'react';
import * as AUTH from '../services/AuthService'
import InfoSection from "../components/pages/reports/InfoSection";
import ChartsSection from "../components/pages/reports/ChartsSection";
import TabSection from "../components/pages/reports/TabSection";

class Reports extends Component {



    render() {

        console.log(AUTH.isLodegIn());
        return (
            <div className="fadeInLeft  animated">
                <h3>SCHOOLS</h3>

                <div className="row">
                    <div className="col-xl-3 col-lg-4">
                        <InfoSection/>
                    </div>

                    <div className="col-xl-9 col-lg-8">
                        <ChartsSection/>
                        <TabSection/>
                    </div>
                </div>

            </div>
        );
    }
}


export default Reports;
