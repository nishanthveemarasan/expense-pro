import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TotalBalance from "./Components/TotalBalance/TotalBalance";
import classes from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import Activity from "./Components/Activity/Activity";
import Select from "react-select";
import {
    chartFilterOption,
    expenseSummary,
    getExpenseSummary,
} from "../../../Helper/Helper";
import SummaryChart from "./Components/Chart/SummaryChart";
import ESelect from "../../UI/Select/ESelect";
import { expenseStoreAction } from "../../Store/Store";

const DashBoard = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.data,
            date: state.expenseStore.dateGroup,
            heading: state.expenseStore.heading,
            expenseData: state.expenseStore.payment.data.expense,
            chartKey: state.expenseStore.chartKey,
            expense: state.expenseStore.summary,
            changeSummary: state.expenseStore.changeSummary,
        };
    };
    const state = useSelector(mapStateToProps);
    useEffect(() => {
        if (state.changeSummary) {
            dispatch(expenseStoreAction.calculateSummary());
        }
    }, [state.changeSummary]);

    const changeChartKeyHandler = (chartKey) => {
        dispatch(expenseStoreAction.chageChartFilterKey({ chartKey }));
    };
    return (
        <>
            {Object.keys(state.expense).length > 0 && (
                <>
                    <Container>
                        <TotalBalance balance={state.expense.balance} />
                        <div className={classes.heading}>
                            <div>Income</div>
                            <div>Expense</div>
                            <div>Balance</div>
                        </div>
                        <div>
                            <div>
                                <Activity
                                    heading={state.date.today}
                                    body={state.expense.today}
                                />
                                <Activity
                                    heading={state.date.thisWeek}
                                    body={state.expense.week}
                                />
                                <Activity
                                    heading={state.date.thisMonth}
                                    body={state.expense.month}
                                />
                                <Activity
                                    heading={state.date.thisYear}
                                    body={state.expense.year}
                                />
                            </div>
                        </div>
                    </Container>
                    <Container className={classes.summaryChart}>
                        <div className={classes.selectChart}>
                            <ESelect
                                value={state.chartKey}
                                change={changeChartKeyHandler}
                            />
                        </div>
                        <div className={classes.chart}>
                            <SummaryChart
                                chartKey={state.chartKey}
                                data={state.expense[state.chartKey].chart}
                            />
                        </div>
                    </Container>
                </>
            )}
        </>
    );
};
export default DashBoard;
