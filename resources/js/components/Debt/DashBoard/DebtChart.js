import React from "react";
import BarChart from "../../../Chart/BarChart/BarChart";
const colors = ["#26a69a", "#FF4560"];
const DebtChart = ({ css, total }) => {
    const chartData = {
        colors,
        data: [total.lend, total.borrow],
        categories: [
            ["Total Owed to Me", `$${total.lend}`],
            ["Total Owed by Me ", `$${total.borrow}`],
        ],
    };
    return (
        <div className={css.chart}>
            <BarChart {...chartData} />
        </div>
    );
};
export default DebtChart;
