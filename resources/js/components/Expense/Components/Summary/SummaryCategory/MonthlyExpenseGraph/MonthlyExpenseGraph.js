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
import ShowTotalSummary from "./ShowTotalSummary/ShowTotalSummary";

const MonthlyExpenseGraph = ({ data, yearArray }) => {
    const [loading, setLoading] = useState();
    const [series, setSeries] = useState([]);
    const [categoryWiseSeries, setCategoryWiseSeries] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        avg: 0,
    });
    const [monthlyExpenseAndIncomeInTotal, setMonthlyExpenseAndIncomeInTotal] =
        useState({
            labels: [],
            series: [],
        });
    useEffect(() => {
        setLoading(true);
        const date = new Date();
        setSelectedYear(date.getFullYear());
        const allGraphData = getMonthlySummaryChartData(
            data,
            date.getFullYear()
        );
        const result = extractMonthlyExpenseIncomeDataValues(
            allGraphData.summaryData,
            date.getFullYear()
        );

        setSeries(result.series);
        setSummary({
            expense: result.summaryChartInTotal.totalExpense,
            income: result.summaryChartInTotal.totalIncome,
            avg: result.summaryChartInTotal.avgSpending,
        });
        setMonthlyExpenseAndIncomeInTotal({
            series: result.summaryChartInTotal.series,
            labels: result.summaryChartInTotal.labels,
        });

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
            allGraphData.summaryData,
            year
        );
        // console.log(result);
        setSummary({
            expense: result.summaryChartInTotal.totalExpense,
            income: result.summaryChartInTotal.totalIncome,
            avg: result.summaryChartInTotal.avgSpending,
        });
        setSeries(result.series);
        setMonthlyExpenseAndIncomeInTotal({
            series: result.summaryChartInTotal.series,
            labels: result.summaryChartInTotal.labels,
        });

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
            {loading ? (
                <div className={classes.spinner}>
                    <Spinner animation="grow" size="xl" variant="danger" />
                </div>
            ) : (
                <>
                    <ShowTotalSummary
                        income={summary.income}
                        expense={summary.expense}
                        balance={summary.avg}
                        type="Monthly"
                    />

                    <MonthlyColumnGraph
                        categories={monthNames}
                        data={series}
                        rotate={-45}
                        title="Expense Vs Income in Column Chart(Monthly Wise)"
                    />

                    <MonthlyLineGraph
                        data={series}
                        rotate={-45}
                        categories={monthNames}
                        title="Expense Vs Income in Line Chart(Monthly Wise)"
                    />
                    <MonthlyLineGraph
                        data={monthlyExpenseAndIncomeInTotal.series}
                        categories={monthlyExpenseAndIncomeInTotal.labels}
                        rotate={-45}
                        title="Expense Vs Income in Line Chart( IN Total)"
                    />

                    <MonthlyCategoryWiseGraph
                        categories={monthNames}
                        data={categoryWiseSeries}
                        height={500}
                        stack={true}
                        rotate={-45}
                        chartType="bar"
                        title={
                            "Monthly Expense Data BY Category wise In Column Chart(Monthly Wise)"
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
                            "Monthly Expense Data BY Category wise In Line Chart(Monthly Wise)"
                        }
                        limit={500}
                    />
                </>
            )}
        </>
    );
};

export default MonthlyExpenseGraph;
