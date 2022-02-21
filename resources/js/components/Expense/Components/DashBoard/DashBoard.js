import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import TotalBalance from "./Components/TotalBalance/TotalBalance";
import classes from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getDate } from "../../../Helper/Helper";
import Activity from "./Components/Activity/Activity";
import { expenseStoreAction } from "../../Store/Store";
// import { Bar } from "react-chartjs-2";

const chartData = {
    data: {
        labels: ["Red", "Orange", "Blue"],
    },
};

const DashBoard = (props) => {
    const { showPayment } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(expenseStoreAction.showPayment({ showPayment }));
    }, [showPayment]);
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.data,
            date: state.expenseStore.dateGroup,
        };
    };
    const state = useSelector(mapStateToProps);

    return (
        <Container>
            <TotalBalance balance={state.data.totalBalance.balance} />
            <div className={classes.heading}>
                <div>Income</div>
                <div>Expense</div>
                <div>Balance</div>
            </div>
            <div>
                {state.date?.today && (
                    <>
                        <Activity
                            heading={state.date.today}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisWeek}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisMonth}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisYear}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.today}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisWeek}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisMonth}
                            body={state.data.todayExpense}
                        />
                        <Activity
                            heading={state.date.thisYear}
                            body={state.data.todayExpense}
                        />
                    </>
                )}
            </div>
        </Container>
    );
};
export default DashBoard;
