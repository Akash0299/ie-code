import React from "react";
import MUIDataTable from "mui-datatables";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../configuration/devicetable.css"

const options = {
  textLabels: {
    toolbar: {
      search: "Search",
      downloadCsv: "Download CSV",
      print: "Print",
      viewColumns: "View Columns",
      filterTable: "Filter Table",
    },
    filter: {
      all: "All",
      title: "Filters",
      reset: "Reset",
    },
  }
}

function IOTdeviceTable() {

  const columns = [
    {
      name: "IOT Device ID",
      options: {
        filter: true,
        filterOptions: { fullWidth: true }
      },
    },
    {
      name: "IOT Device Name",
      options: {
        filter: true,
        filterOptions: { fullWidth: true }
      },
    },
    {
      name: "Description",
      options: {
        filter: false,
      },
    },
    {
      name: "IP address/Port",
      options: {
        filter: false,
      },
    },
    {
      name: "Associated Gateway",
      options: {
        filter: false,
      },
    },
    {
      name: "Associated Service/Protocol Version",
      options: {
        filter: false,
      },
    },
    {
      name: "Associated Device Profile",
      options: {
        filter: false,
      },
    },
    {
      name: "Status",
      options: {
        filter: false,
        customBodyRender: value => {
          return(
            !value ? (<span className="activeicon statusicons">Online <CheckCircleIcon/></span>)  : (<span className="inactiveicon statusicons">Offline <CancelIcon/></span>) 
          );
           
        }
      },
    },
    {
      name: "Manufacturer Model",
      options: {
        filter: false,
      },
    },
    {
      name: "Active/Inactive",
      options: {
        filter: false,
      },
    },
    {
      name: "Timestamp",
      options: {
        filter: false,
      },
    },
    {
      name: "Provisioned Date & Time",
      options: {
        filter: false,
      },
    },
    {
      name: "Last Communicated",
      options: {
        filter: false,
      },
    }
  ];

  const data = [
    ['757686', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0', 'modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['757626', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0','modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['757656', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0', 'modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['757786', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0', 'modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['757886', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0','modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['753686', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0', 'modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['755686', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0','modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'],
    ['758686', 'Modbussim', 'Used to measure pHrate', '168.67.198.76 _ 1502', 'gatewayzone1', 'modbus_tcp_8.0', 'modbustemp_profile', 'online', 'LT_AR76', 'Active', '20-03-2023  14:34:00', '18-03-2023  12:08:00', '18-03-2023  22:08:00'], 
  ];

  return (
    <div className="devicetable">
      <MUIDataTable data={data} columns={columns} options={options} title="IOT Device Details"/>
    </div>
   
  );
}

export default IOTdeviceTable;
