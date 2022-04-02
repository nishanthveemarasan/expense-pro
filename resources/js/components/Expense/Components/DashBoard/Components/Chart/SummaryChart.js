import React from "react";
import PieChart from "../../../../../../Chart/PieChart/PieChart";
import { limitDemialPlaces } from "../../../../../Helper/Helper";

const SummaryChart = ({ chartKey, data }) => {
    const series = [];
    const labels = [];
    for (const key in data) {
        series.push(limitDemialPlaces(data[key]));
        labels.push(`${key} £${limitDemialPlaces(data[key])}`);
    }
    return (
        <>
            {Object.keys(data).length == 0 ? (
                "no data to show"
            ) : (
                <PieChart series={series} labels={labels} />
            )}
        </>
    );
};
export default SummaryChart;
