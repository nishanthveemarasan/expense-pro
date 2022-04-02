import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import {
    extractMonthlyExpenseIncomeDataValues,
    getMonthlySummaryChartData,
} from "../../../../../Helper/ChartHelper";
import { limitDemialPlaces, monthNames } from "../../../../../Helper/Helper";
import MonthlyCategoryWiseGraph from "./MonthlyCategoryWiseGraph";
import MonthlyColumnGraph from "./MonthlyColumnGraph";

import classes from "./MonthlyExpenseGraph.module.css";
import MonthlyLineGraph from "./MonthlyLineGraph";

const MonthlyExpenseGraph = ({ data, yearArray }) => {
    const [loading, setLoading] = useState();
    const [series, setSeries] = useState([]);
    const [limit, setLimit] = useState(1500);
    const [categoryWiseSeries, setCategoryWiseSeries] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    useEffect(() => {
        setLoading(true);
        const date = new Date();
        setSelectedYear(date.getFullYear());
        const allGraphData = getMonthlySummaryChartData(
            data,
            date.getFullYear()
        );

        const result = extractMonthlyExpenseIncomeDataValues(
            allGraphData.summaryData
        );

        setSeries(result.series);
        setLimit(result.highNumber);

        const categoryMonthlyData = allGraphData.categoryChartData;
        let categoryWise = [];
        allGraphData.categories.forEach((category) => {
            if (category.toLowerCase() != "income") {
                categoryWise.push({
                    name: category,
                    data: categoryMonthlyData[category],
                });
            }
        });
        setCategoryWiseSeries(categoryWise);
        setLoading(false);
    }, [data]);

    const onSelectedYearChangeHandler = (e) => {
        const year = Number(e.target.value);
        setSelectedYear(e.target.value);
        setLoading(true);
        const allGraphData = getMonthlySummaryChartData(data, year);

        const result = extractMonthlyExpenseIncomeDataValues(
            allGraphData.summaryData
        );

        setSeries(result.series);
        setLimit(result.highNumber);

        const categoryMonthlyData = allGraphData.categoryChartData;
        let categoryWise = [];
        allGraphData.categories.forEach((category) => {
            if (category.toLowerCase() != "income") {
                categoryWise.push({
                    name: category,
                    data: categoryMonthlyData[category],
                });
            }
        });
        setCategoryWiseSeries(categoryWise);
        setLoading(false);
    };

    return (
        <>
            {loading ? (
                <div className={classes.spinner}>
                    <Spinner animation="grow" size="xl" variant="danger" />
                </div>
            ) : (
                <>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ fontWeight: "bold" }}>Selected Year</div>
                        <Form.Select
                            value={selectedYear}
                            onChange={onSelectedYearChangeHandler}
                        >
                            {yearArray.map((year, i) => {
                                return (
                                    <option value={year} key={i}>
                                        {year}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>

                    <MonthlyColumnGraph
                        categories={monthNames}
                        data={series}
                        rotate={-45}
                        title="Expense Vs Income in Column Chart"
                    />

                    <MonthlyLineGraph
                        data={series}
                        limit={limit}
                        rotate={-45}
                        categories={monthNames}
                        title="Expense Vs Income in Line Chart"
                    />

                    <MonthlyCategoryWiseGraph
                        categories={monthNames}
                        data={categoryWiseSeries}
                        height={500}
                        stack={true}
                        rotate={-45}
                        chartType="bar"
                        title={
                            "Monthly Expense Data BY Category wise In Column Chart"
                        }
                    />

                    <MonthlyCategoryWiseGraph
                        categories={monthNames}
                        data={categoryWiseSeries}
                        chartType="line"
                        height={700}
                        rotate={-45}
                        stack={false}
                        title={
                            "Monthly Expense Data BY Category wise In Line Chart"
                        }
                        limit={500}
                    />
                </>
            )}
        </>
    );
};

export default MonthlyExpenseGraph;
