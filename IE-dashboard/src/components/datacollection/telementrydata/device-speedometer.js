import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

function DeviceSpeedometer() {
    return (
        <React.Fragment>
            <div className="speedmeter_wrapper">
                <div className="dev_speed">
                    <h3 className='speed-text'>Temperature </h3>
                    <ReactSpeedometer
                        maxValue={100}
                        value={55}
                        currentValueText={55 + "F"}
                        needleColor="black"
                        startColor="lightblue"
                        segments={1}
                        endColor="tomato"
                        width={150}
                        height={100}
                        ringWidth={8}
                        segmentColors={["#3F51B5"]}
                        // customSegmentStops={[0, 50, 100, 150]}
                        // segmentColors={[// "#FAFAFA",// "#FAFAFA",// "#007fff",// "#FAFAFA",// "#FAFAFA",// "#FAFAFA"// ]}
                        needleHeightRatio={0.50}
                        valueTextFontSize="12px"
                        needleTransitionDuration={9000}
                        needleTransition="easeElastic"
                    />

                </div>
                <div className="dev_speed">
                    <h3 className='speed-text'>Humidity </h3>
                    <ReactSpeedometer
                        maxValue={100}
                        value={40}
                        currentValueText={40 + "%"}
                        needleColor="black"
                        startColor="lightblue"
                        segments={1}
                        endColor="tomato"
                        width={150}
                        height={100}
                        ringWidth={8}
                        segmentColors={["#3F51B5"]}
                        // customSegmentStops={[0, 50, 100, 150]}
                        // segmentColors={[// "#FAFAFA",// "#FAFAFA",// "#007fff",// "#FAFAFA",// "#FAFAFA",// "#FAFAFA"// ]}
                        needleHeightRatio={0.50}
                        valueTextFontSize="12px"
                        needleTransitionDuration={9000}
                        needleTransition="easeElastic"
                    />
                </div>
                <div className="dev_speed">
                    <h3 className='speed-text'>Pressure </h3>
                    <ReactSpeedometer
                        maxValue={100}
                        value={60}
                        currentValueText={60 + "Pa"}
                        needleColor="black"
                        startColor="lightblue"
                        segments={1}
                        endColor="tomato"
                        width={150}
                        height={100}
                        ringWidth={8}
                        segmentColors={["#3F51B5"]}
                        // customSegmentStops={[0, 50, 100, 150]}
                        // segmentColors={[// "#FAFAFA",// "#FAFAFA",// "#007fff",// "#FAFAFA",// "#FAFAFA",// "#FAFAFA"// ]}
                        needleHeightRatio={0.50}
                        valueTextFontSize="12px"
                        needleTransitionDuration={9000}
                        needleTransition="easeElastic"
                    />
                </div>
                <div className="dev_speed">
                    <h3 className='speed-text'>Speed </h3>
                    <ReactSpeedometer
                        maxValue={100}
                        value={50}
                        currentValueText={50 + "mbps"}
                        needleColor="black"
                        startColor="lightblue"
                        segments={1}
                        endColor="tomato"
                        width={150}
                        height={100}
                        ringWidth={8}
                        segmentColors={["#3F51B5"]}
                        // customSegmentStops={[0, 50, 100, 150]}
                        // segmentColors={[// "#FAFAFA",// "#FAFAFA",// "#007fff",// "#FAFAFA",// "#FAFAFA",// "#FAFAFA"// ]}
                        needleHeightRatio={0.50}
                        valueTextFontSize="12px"
                        needleTransitionDuration={9000}
                        needleTransition="easeElastic"
                    />
                </div>
                <div className="dev_speed">
                    <h3 className='speed-text'>Frequency </h3>
                    <ReactSpeedometer
                        maxValue={100}
                        value={30}
                        currentValueText={30 + "HZ"}
                        needleColor="black"
                        startColor="lightblue"
                        segments={1}
                        endColor="tomato"
                        width={150}
                        height={100}
                        ringWidth={8}
                        segmentColors={["#3F51B5"]}
                        // customSegmentStops={[0, 50, 100, 150]}
                        // segmentColors={[// "#FAFAFA",// "#FAFAFA",// "#007fff",// "#FAFAFA",// "#FAFAFA",// "#FAFAFA"// ]}
                        needleHeightRatio={0.50}
                        valueTextFontSize="12px"
                        needleTransitionDuration={9000}
                        needleTransition="easeElastic"
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
export default DeviceSpeedometer;