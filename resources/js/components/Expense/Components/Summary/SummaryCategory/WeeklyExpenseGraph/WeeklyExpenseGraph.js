import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import {
    constructWeeklyExpenseWiseData,
    generateWeeklyExpenseAndIncomeChartColumnData,
    todayDetails,
    weeklyChartData,
} from "../../../../../Helper/ChartHelper";
import { monthNames } from "../../../../../Helper/Helper";
import MonthlyCategoryWiseGraph from "../MonthlyExpenseGraph/MonthlyCategoryWiseGraph";
import MonthlyColumnGraph from "../MonthlyExpenseGraph/MonthlyColumnGraph";
import MonthlyLineGraph from "../MonthlyExpenseGraph/MonthlyLineGraph";
import ShowTotalSummary from "../MonthlyExpenseGraph/ShowTotalSummary/ShowTotalSummary";
import classes from "./MonthlyExpenseGraph.module.css";

const WeeklyExpenseGraph = ({ data, yearArray }) => {
    const [loading, setLoading] = useState();
    const [dataExists, setDataExists] = useState(true);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [weeklyExpenseAndIncome, setWeeklyExpenseAndIncome] = useState({
        labels: [],
        series: [],
    });
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        avg: 0,
    });
    const [weeklyExpenseAndIncomeInTotal, setWeeklyExpenseAndIncomeInTotal] =
        useState({
            labels: [],
            series: [],
        });
    const [weeklyExpenseCategoryWise, setWeeklyExpenseCategoryWise] = useState({
        labels: [],
        series: [],
    });
    useEffect(() => {
        setLoading(true);
        setDataExists(true);
        const date = todayDetails();
        setSelectedYear(date.year);
        setSelectedMonth(date.month);
        const chartData = weeklyChartData(
            data,
            date.monthFirstDay,
            date.lastMonthDay
        );

        if (chartData.category.length == 0) {
            setDataExists(false);
        } else {
            const columnChartDataAll =
                generateWeeklyExpenseAndIncomeChartColumnData(chartData);

            setSummary({
                income: columnChartDataAll.summary.totalIncome,
                expense: columnChartDataAll.summary.totalExpense,
                avg: columnChartDataAll.summary.averageWeeklySpending,
            });
            setWeeklyExpenseAndIncomeInTotal({
                labels: columnChartDataAll.summaryChartInTotal.labels,
                series: columnChartDataAll.summaryChartInTotal.seriesForTotal,
            });
            setWeeklyExpenseAndIncome({
                labels: columnChartDataAll.labels,
                series: columnChartDataAll.series,
            });

            const categoryWiseSeries = constructWeeklyExpenseWiseData(
                columnChartDataAll.categoryWise
            );

            setWeeklyExpenseCategoryWise({
                labels: columnChartDataAll.labels,
                series: categoryWiseSeries,
            });
        }

        setLoading(false);
    }, [data]);

    const onSelectedYearChangeHandler = (e) => {
        const year = Number(e.target.value);
        const getDate = `${year}-${(selectedMonth + 1)
            .toString()
            .padStart(2, "0")}-01`;

        setSelectedYear(e.target.value);
        setLoading(true);
        setDataExists(true);
        const date = todayDetails(getDate);
        const chartData = weeklyChartData(
            data,
            date.monthFirstDay,
            date.lastMonthDay
        );

        if (chartData.category.length == 0) {
            setDataExists(false);
        } else {
            const columnChartDataAll =
                generateWeeklyExpenseAndIncomeChartColumnData(chartData);
            setSummary({
                income: columnChartDataAll.summary.totalIncome,
                expense: columnChartDataAll.summary.totalExpense,
                avg: columnChartDataAll.summary.averageWeeklySpending,
            });
            setWeeklyExpenseAndIncomeInTotal({
                labels: columnChartDataAll.summaryChartInTotal.labels,
                series: columnChartDataAll.summaryChartInTotal.seriesForTotal,
            });
            setWeeklyExpenseAndIncome({
                labels: columnChartDataAll.labels,
                series: columnChartDataAll.series,
            });
            const categoryWiseSeries = constructWeeklyExpenseWiseData(
                columnChartDataAll.categoryWise
            );

            setWeeklyExpenseCategoryWise({
                labels: columnChartDataAll.labels,
                series: categoryWiseSeries,
            });
        }
        setLoading(false);
    };

    const onSelectedMonthChangeHandler = (e) => {
        const month = Number(e.target.value);

        const getDate = `${selectedYear}-${(month + 1)
            .toString()
            .padStart(2, "0")}-01`;

        setSelectedMonth(e.target.value);
        setLoading(true);
        setDataExists(true);
        const date = todayDetails(getDate);

        const chartData = weeklyChartData(
            data,
            date.monthFirstDay,
            date.lastMonthDay
        );

        if (chartData.category.length == 0) {
            setDataExists(false);
        } else {
            const columnChartDataAll =
                generateWeeklyExpenseAndIncomeChartColumnData(chartData);

            setSummary({
                income: columnChartDataAll.summary.totalIncome,
                expense: columnChartDataAll.summary.totalExpense,
                avg: columnChartDataAll.summary.averageWeeklySpending,
            });
            setWeeklyExpenseAndIncome({
                labels: columnChartDataAll.labels,
                series: columnChartDataAll.series,
            });
            setWeeklyExpenseAndIncomeInTotal({
                labels: columnChartDataAll.summaryChartInTotal.labels,
                series: columnChartDataAll.summaryChartInTotal.seriesForTotal,
            });

            const categoryWiseSeries = constructWeeklyExpenseWiseData(
                columnChartDataAll.categoryWise
            );

            setWeeklyExpenseCategoryWise({
                labels: columnChartDataAll.labels,
                series: categoryWiseSeries,
            });
        }
        setLoading(false);
    };

    // console.log(weeklyExpenseCategoryWise);

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <div className="row">
                    <div className="col-6">
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
                    <div className="col-6">
                        <div style={{ fontWeight: "bold" }}>Selected Year</div>
                        <Form.Select
                            value={selectedMonth}
                            onChange={onSelectedMonthChangeHandler}
                        >
                            {monthNames.map((month, i) => {
                                return (
                                    <option value={i} key={i}>
                                        {month}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className={classes.spinner}>
                    <Spinner animation="grow" size="xl" variant="danger" />
                </div>
            ) : dataExists ? (
                <>
                    <ShowTotalSummary
                        income={summary.income}
                        expense={summary.expense}
                        balance={summary.avg}
                        type="Weekly"
                    />
                    <MonthlyColumnGraph
                        categories={weeklyExpenseAndIncome.labels}
                        data={weeklyExpenseAndIncome.series}
                        title="Expense Vs Income in Column Chart(Weekly wise)"
                        rotate={-45}
                    />

                    <MonthlyLineGraph
                        data={weeklyExpenseAndIncome.series}
                        categories={weeklyExpenseAndIncome.labels}
                        rotate={-45}
                        title="Expense Vs Income in Line Chart(Weekly wise)"
                    />
                    <MonthlyLineGraph
                        data={weeklyExpenseAndIncomeInTotal.series}
                        categories={weeklyExpenseAndIncomeInTotal.labels}
                        rotate={-45}
                        title="Expense Vs Income in Line Chart( IN Total)"
                    />

                    <MonthlyCategoryWiseGraph
                        categories={weeklyExpenseCategoryWise.labels}
                        data={weeklyExpenseCategoryWise.series}
                        height={500}
                        stack={true}
                        rotate={-45}
                        chartType="bar"
                        title={
                            "Weekly Expense Data BY Category wise In Column Chart(Weekly wise)"
                        }
                    />

                    <MonthlyCategoryWiseGraph
                        categories={weeklyExpenseCategoryWise.labels}
                        data={weeklyExpenseCategoryWise.series}
                        stack={false}
                        height={700}
                        rotate={-45}
                        chartType="line"
                        title={
                            "Monthly Expense Data BY Category wise In Line Chart(Weekly wise)"
                        }
                    />
                </>
            ) : (
                <div className={classes.emptyData}>{"No Data to Show "}</div>
            )}
        </>
    );
};

export default WeeklyExpenseGraph;
