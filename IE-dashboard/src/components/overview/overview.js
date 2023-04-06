import React from 'react';
import OverviewData from './overviewdata';

function Overview() {
    return (
        <React.Fragment>
            <div className='p_title'>
                <h1>Dashboard</h1>
            </div>
          
            <OverviewData />

        </React.Fragment>
    )
}
export default Overview;