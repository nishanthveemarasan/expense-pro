import React from "react";
const BarChart = ({ data, colors, categories }) => {
    const chartData = {
        series: [
            {
                data,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "bar",
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    },
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories,
                labels: {
                    style: {
                        colors: colors,
                        fontSize: "12px",
                    },
                },
            },
        },
    };
    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
        />
    );
};
export default BarChart;
