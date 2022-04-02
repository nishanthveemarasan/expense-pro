import React from "react";

const MonthlyColumnGraph = (props) => {
    const chartData = {
        series: props.data,
        options: {
            chart: {
                type: "bar",
                height: 450,
                zoom: {
                    enabled: true,
                },
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
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            colors: ["#FF3333", "#03A10E"],
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    if (val > 0) {
                        return "£" + val;
                    }
                },
                offsetY: -20,
                style: {
                    fontSize: "12px",
                    colors: ["#304758"],
                },
            },

            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
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
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "£ " + val;
                    },
                },
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
                type="bar"
                height={450}
            />
        </div>
    );
};

export default MonthlyColumnGraph;
