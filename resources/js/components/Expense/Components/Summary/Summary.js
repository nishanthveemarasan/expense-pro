import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowSingleBox from "./showSingleBox/ShowSingleBox";
import classes from "./Summary.module.css";
import AllSummary from "./SummaryCategory/AllSummary/AllSummary";
import ExpenseSummary from "./SummaryCategory/ExpenseSummary/ExpenseSummary";
import IncomeSummary from "./SummaryCategory/IncomeSummary/IncomeSummary";
import SummaryCategory from "./SummaryCategory/SummaryCategory";
const Summary = (props) => {
    const [content, setContent] = useState("summary");
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.data.expense,
        };
    };
    const state = useSelector(mapStateToProps);

    const onPageChangeHandler = (page) => {
        setContent(page);
    };

    return (
        <>
            {content == "summary" && (
                <>
                    <SummaryCategory
                        category="All Exepense & Income"
                        click={onPageChangeHandler.bind(this, "all_summary")}
                    />
                    <SummaryCategory
                        category="Expense Summary"
                        click={onPageChangeHandler.bind(
                            this,
                            "expense_summary"
                        )}
                    />
                    <SummaryCategory
                        category="Income Summary"
                        click={onPageChangeHandler.bind(this, "income_summary")}
                    />
                </>
            )}

            {content == "all_summary" && (
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
            )}
        </>
    );
};

export default Summary;
