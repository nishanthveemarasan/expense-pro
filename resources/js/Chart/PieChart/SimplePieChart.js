import React from "react";
const SimplePieChart = ({ categories, series }) => {
    // console.log("hellos");
    const chartData = {
        series,
        options: {
            chart: {
                width: 380,
                type: "pie",
            },
            labels: categories,
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
            type="pie"
            height={350}
        />
    );
};
export default SimplePieChart;
