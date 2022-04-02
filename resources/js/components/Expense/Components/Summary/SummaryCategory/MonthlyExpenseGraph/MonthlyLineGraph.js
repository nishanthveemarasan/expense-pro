import React from "react";

const MonthlyLineGraph = (props) => {
    const chartData = {
        series: props.data,
        options: {
            chart: {
                height: 450,
                type: "line",
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                },
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            colors: ["#FF3333", "#03A10E"],
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    if (val > 0) {
                        return val;
                    }
                },
            },
            stroke: {
                curve: "smooth",
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },

            grid: {
                borderColor: "#e7e7e7",
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            markers: {
                size: 1,
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
            yaxis: {
                title: {
                    text: "£ ( Sterling Pounds )",
                },
                min: 1,
                max: props.limit,
            },
            legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
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
                type="line"
                height={450}
            />
        </div>
    );
};

export default MonthlyLineGraph;
