import React, {Component} from 'react';

class SubHeader extends Component {

    render() {

        return (
            <div className="m-subheader m--hide">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h3 className="m-subheader__title ">Dashboard</h3>
                    </div>
                    <div>
  							<span className="m-subheader__daterange" id="m_dashboard_daterangepicker">
					<span className="m-subheader__daterange-label">
						<span className="m-subheader__daterange-title">Today:</span>
						<span className="m-subheader__daterange-date m--font-brand">Jan 9</span>
					</span>
				</span>
                    </div>
                </div>
            </div>
        );
    }
}

SubHeader.propTypes = {};

export default SubHeader;
