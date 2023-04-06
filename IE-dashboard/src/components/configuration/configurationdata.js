import React from "react";
import { Grid, Card } from "@mui/material";
import ConfigurationTable from "./configurationTable";

function ConfigurationData() {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card className='card-configuration' style={{position:'relative', display:'grid'}}>
                        <ConfigurationTable/>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ConfigurationData;