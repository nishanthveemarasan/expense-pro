import React from "react";

const MonthlyCategoryWiseGraph = (props) => {
    const chartData = {
        series: props.data,
        options: {
            chart: {
                type: "bar",
                height: props.height,
                stacked: props.stack ? props.stack : false,
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],

            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    if (val > 0) {
                        return "£" + val;
                    }
                },
                offsetY: 0,
                style: {
                    fontSize: "12px",
                    colors: ["#304758"],
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                },
            },
            xaxis: {
                labels: {
                    rotate: props.rotate,
                },
                categories: props.categories,
                title: {
                    text: props.year,
                },
            },
            legend: {
                position: "right",
                offsetY: 40,
            },
            fill: {
                opacity: 1,
            },
        },
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                }}
            >
                {props.title}
            </div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type={props.chartType}
                height={props.height}
            />
        </div>
    );
};

export default MonthlyCategoryWiseGraph;
