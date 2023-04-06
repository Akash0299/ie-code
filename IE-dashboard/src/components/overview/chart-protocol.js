import React from 'react'
import ReactApexChart from "react-apexcharts";

class OverviewDeviceprotocol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Success',
                data: [34, 50, 35, 20]
            },
            {
                name: 'Failure',
                data: [10, 6, 8, 7]
            }],
            options: {
                colors: [
                    function ({ value }) {
                        if (value < 15) {
                            return '#FF0000'
                        } else {
                            return '#0481a7'
                        }
                    }
                ],
                chart: {
                    height: 350,
                    type: 'bar',
                    stacked: true,
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
                        dataLabels: {
                            enabled: true,
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: '10px',
                                    fontWeight: 600
                                }
                            },
                            position: 'center',
                            style: {
                                fontSize: '10px',
                                fontWeight: 500
                            }
                        },
                    },
                },
                legend: {
                    show: true,
                    position: 'top',
                    fontSize: '11px',
                },
                xaxis: {
                    categories: ['Modbus', 'REST', 'MQTT', 'REST'],
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
                        text: 'Gateways Protocol',
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
export default OverviewDeviceprotocol;