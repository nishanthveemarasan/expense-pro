import React from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./ShowCategorySummary.module.css";
const ShowCategorySummary = ({ cKey, balance }) => {
    return (
        <div className={classes.activityHeading}>
            <div className={classes.activityBody}>
                <div>Category Name</div>
                <div>Balance</div>
            </div>
            <div className={classes.activityValue}>
                <div className={classes.income}>
                    {getFirstLetterUpperWord(cKey)}
                </div>
                <div
                    className={
                        cKey.toLowerCase() == "income"
                            ? classes.income
                            : classes.expense
                    }
                >
                    {cKey.toLowerCase() == "income"
                        ? `£${balance.toFixed(2)}`
                        : `-£${Math.abs(balance.toFixed(2))}`}
                </div>
            </div>
        </div>
    );
};
export default ShowCategorySummary;
