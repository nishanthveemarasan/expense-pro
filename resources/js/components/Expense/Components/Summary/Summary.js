import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";
import ShowSingleBox from "./showSingleBox/ShowSingleBox";
import classes from "./Summary.module.css";
import AllSummary from "./SummaryCategory/AllSummary/AllSummary";
import ExpenseSummary from "./SummaryCategory/ExpenseSummary/ExpenseSummary";
import IncomeSummary from "./SummaryCategory/IncomeSummary/IncomeSummary";
import SummaryCategory from "./SummaryCategory/SummaryCategory";
const Summary = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.data.expense,
        };
    };
    const state = useSelector(mapStateToProps);

    const onPageChangeHandler = (page, heading) => {
        dispatch(
            expenseStoreAction.UpdateSummaryContentPage({
                mainPage: "summary",
                page,
                heading,
            })
        );
    };

    return (
        <>
            <SummaryCategory
                category="All Exepense & Income"
                click={onPageChangeHandler.bind(
                    this,
                    "all_summary",
                    "All Exepense & Income"
                )}
            />
            <SummaryCategory
                category="Expense Summary"
                click={onPageChangeHandler.bind(
                    this,
                    "expense_summary",
                    "Expense Summary"
                )}
            />
            <SummaryCategory
                category="Income Summary"
                click={onPageChangeHandler.bind(
                    this,
                    "income_summary",
                    "Income Summary"
                )}
            />
            <SummaryCategory
                category="Expense&Income Monthly Graph"
                click={onPageChangeHandler.bind(
                    this,
                    "income_expense_monthly_graph",
                    "Monthly Graph"
                )}
            />
            <SummaryCategory
                category="Expense&Income Weekly Graph"
                click={onPageChangeHandler.bind(
                    this,
                    "income_expense_weekly_graph",
                    "Weekly Graph"
                )}
            />
        </>

        /* {content == "all_summary" && (
                <>
                    <AllSummary
                        data={state.data}
                        change={onPageChangeHandler}
                    />
                </>
            )}
            {content == "income_summary" && (
                <>
                    <IncomeSummary
                        data={state.data}
                        change={onPageChangeHandler}
                    />
                </>
            )}
            {content == "expense_summary" && (
                <>
                    <ExpenseSummary
                        data={state.data}
                        change={onPageChangeHandler}
                    />
                </>
            )} */
    );
};

export default Summary;
