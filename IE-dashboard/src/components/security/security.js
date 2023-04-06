import React from "react";
import SecurityTab from "./securityTab";

function Security(){
    return(
        <React.Fragment>
             <div className='p_title'>
                <h1>Security</h1>
            </div>
            <SecurityTab/>
        </React.Fragment>
    )
}
export default Security;