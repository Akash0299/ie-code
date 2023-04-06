import React from 'react'
import ReactApexChart from "react-apexcharts";

class GatewayCountgraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        data: [40, 80, 30, 75]
      }],
      options: {
        colors: ['#0481a7', '#0481a7', '#0481a7', '#0481a7'],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
        },
        dataLabels: {
          enabled: true,
          position: 'center',
          style: {
            fontSize: '10px',
            fontWeight: 600
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
            distributed: false,
          },
        },
        legend: {
          show: false,
          position: 'top',
          fontSize: '11px',
        },
        xaxis: {
          categories: ['Linux', 'PI', 'ESP', 'Windows'],
          labels: {
            show: true,
            hideOverlappingLabels: true,
            trim: true,
            style: {
              fontSize: '10px',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
            },
          },
          title: {
            text: 'Gateways',
            offsetY: 75,
            style: {
              color: '#004a87',
              fontSize: '10px',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: '600',
            },
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          tickAmount: 2,
          show: true,
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            style: {
              fontSize: '10px',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
            },
          },
          axisBorder: {
            show: true,
            color: '#ccc',
          },
          title: {
            text: 'Values',
            style: {
              color: '#004a87',
              fontSize: '10px',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: '600',
            },
          },

        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={210} />
      </div>
    )
  }
}
export default GatewayCountgraph;