import React from "react";
import classes from "./ShowTotalSummary.module.css";
const ShowTotalSummary = ({ income, expense, balance }) => {
    // console.log(props.body);
    return (
        <div className={classes.activityHeading}>
            <div className={classes.activityBody}>
                <div>Total Income</div>
                <div>Total Expense</div>
                <div>Balance</div>
            </div>
            <div className={classes.activityValue}>
                <div className={classes.income}>£{income.toFixed(2)}</div>
                <div className={classes.expense}>{`£${Math.abs(
                    expense.toFixed(2)
                )}`}</div>
                <div className={balance > 0 ? classes.income : classes.expense}>
                    {balance > 0
                        ? `£${balance.toFixed(2)}`
                        : `-£${Math.abs(balance.toFixed(2))}`}
                </div>
            </div>
        </div>
    );
};
export default ShowTotalSummary;
