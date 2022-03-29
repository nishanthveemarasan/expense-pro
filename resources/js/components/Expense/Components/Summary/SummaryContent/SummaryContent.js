import React, { useState } from "react";
import Head from "../../../UI/head/Head";
import classes from "./SummaryContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import AllSummary from "../SummaryCategory/AllSummary/AllSummary";
import IncomeSummary from "../SummaryCategory/IncomeSummary/IncomeSummary";
import ExpenseSummary from "../SummaryCategory/ExpenseSummary/ExpenseSummary";
const SummaryContent = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            summaryPage: state.expenseStore.summaryContent.page,
            summaryHeading: state.expenseStore.summaryContent.heading,
            data: state.expenseStore.payment.data.expense,
        };
    };
    const states = useSelector(mapStateToProps);
    const onPageChangeHandler = () => {
        dispatch(
            expenseStoreAction.UpdateSummaryContentPage({
                mainPage: "expenseCategory",
                page: "",
                heading: "",
            })
        );
    };
    return (
        <>
            <Head type="space">
                <div className={classes.heading}>{states.summaryHeading}</div>
                <div className={classes.heading}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onPageChangeHandler}
                    />
                </div>
            </Head>
            <div style={{ padding: "0% 3% 5% 3%" }}>
                {states.summaryPage == "all_summary" && (
                    <>
                        <AllSummary data={states.data} />
                    </>
                )}
                {states.summaryPage == "income_summary" && (
                    <>
                        <IncomeSummary data={states.data} />
                    </>
                )}
                {states.summaryPage == "expense_summary" && (
                    <>
                        <ExpenseSummary data={states.data} />
                    </>
                )}
            </div>
        </>
    );
};
export default SummaryContent;
