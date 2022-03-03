import React from "react";
import PieChart from "../../../../../../Chart/PieChart/PieChart";

const SummaryChart = ({ chartKey, data }) => {
    const series = [];
    const labels = [];
    for (const key in data) {
        series.push(data[key]);
        labels.push(`${key} £${data[key]}`);
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
