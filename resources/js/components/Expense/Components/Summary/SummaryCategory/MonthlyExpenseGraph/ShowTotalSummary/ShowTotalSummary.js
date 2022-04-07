import React from "react";
import { limitDemialPlaces } from "../../../../../../Helper/Helper";
import classes from "./ShowTotalSummary.module.css";
const ShowTotalSummary = ({ income, expense, balance, type }) => {
    // console.log(props.body);
    return (
        <div className={classes.activityHeading}>
            <div className={classes.activityBody}>
                <div>Total Income</div>
                <div>Total Expense</div>
                <div>{`Avg. ${type} Expense`}</div>
            </div>
            <div className={classes.activityValue}>
                <div className={classes.income}>£{income.toFixed(2)}</div>
                <div className={classes.expense}>{`£${limitDemialPlaces(
                    Math.abs(expense)
                )}`}</div>
                <div className={classes.expense}>
                    {`£${limitDemialPlaces(Math.abs(balance))}`}
                </div>
            </div>
        </div>
    );
};
export default ShowTotalSummary;
