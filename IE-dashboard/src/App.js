import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from './components/overview/overview';
import SideNav from './components/sidenav/sidenav';
import TopNav from './components/topnav/topnav';
import Configuration from './components/configuration/Configuration';
import Datacollection from './components/datacollection/datacollection';
import Analytics from './components/analytics/analytics';
import Monitoring from './components/monitoring/Monitoring';
import Security from './components/security/security';
import './App.css';
import DeviceConfiguration from './components/device-configuration/deviceconfig';
import OverviewTablepage from './components/overview/Overviewtablepage';
import DatacollectionTablepage from './components/datacollection/datacollectiontablepage';


function App() {
  return (
    <React.Fragment>
      <Router>
        <div className='wrapper'>
          <SideNav />
          <main className='mainBlock'>
            <TopNav />
            <div className='main_content'>
              <Routes>
                <Route path="/" element={<Overview/>}></Route>
                 <Route path="/configuration" element={<Configuration/>}></Route>
                 <Route path="/deviceconfig" element={<DeviceConfiguration/>}></Route>
                 <Route path="/datacollection" element={<Datacollection/>}></Route>
                 <Route path="/analytics" element={<Analytics/>}></Route>
                 <Route path="/monitoring" element={<Monitoring/>}></Route>
                 <Route path="/security" element={<Security/>}></Route>
                 <Route path="/overviewdata" element={<OverviewTablepage/>}></Route>
                 <Route path="/datacollectiondata" element={<DatacollectionTablepage/>}></Route>
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </React.Fragment>
  );
}
export default App;