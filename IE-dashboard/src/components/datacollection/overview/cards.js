import React from 'react';
import { Card, Grid } from "@mui/material";
import { NavLink } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import SyncLockOutlinedIcon from '@mui/icons-material/SyncLockOutlined';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

function CardBlock() {
    return (
        <React.Fragment>
            <div style={{ paddingBottom: '15px' }}>
                <Grid container spacing={1}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className='contblock'>
                            <h2>IOT Device Count</h2>
                        </div>
                        <div className='card_block'>
                            <Card className="card_wrappers bgbox1">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <DevicesOtherIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Total Device</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox2">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <SyncLockOutlinedIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Provisioned</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox3">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <SyncDisabledOutlinedIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>UnProvisioned</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox4">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <OnlinePredictionIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Online</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox5">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <PortableWifiOffIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Offline</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox6">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <WifiOutlinedIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Active</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                            <Card className="card_wrappers bgbox7">
                                <div className="cards_title">
                                    <LoopIcon />
                                </div>
                                <div className='card_icons'>
                                    <WifiOffOutlinedIcon />
                                </div>
                                <div className="card_content">
                                    <h2>880</h2>
                                    <p>Inactive</p>
                                </div>
                                <NavLink to="/datacollectiondata">
                                    <div className='linkcard'>View <ArrowForwardIcon /></div>
                                </NavLink>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}
export default CardBlock;