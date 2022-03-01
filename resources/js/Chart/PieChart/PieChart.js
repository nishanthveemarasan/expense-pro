import React from "react";
const PieChart = ({ labels, series }) => {
    const chartData = {
        series,
        options: {
            chart: {
                type: "donut",
            },
            labels,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };

    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={350}
        />
    );
};
export default PieChart;
