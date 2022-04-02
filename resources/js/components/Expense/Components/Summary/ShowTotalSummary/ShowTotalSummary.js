import React from "react";
import { limitDemialPlaces } from "../../../../Helper/Helper";
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
                <div className={classes.expense}>{`£${limitDemialPlaces(
                    Math.abs(expense)
                )}`}</div>
                <div className={balance > 0 ? classes.income : classes.expense}>
                    {balance > 0
                        ? `£${limitDemialPlaces(balance)}`
                        : `-£${limitDemialPlaces(Math.abs(balance))}`}
                </div>
            </div>
        </div>
    );
};
export default ShowTotalSummary;
