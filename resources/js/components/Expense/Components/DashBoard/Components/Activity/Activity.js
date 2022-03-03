import React from "react";
import classes from "./Activity.module.css";
const Activity = (props) => {
    // console.log(props.body);
    return (
        <div className={classes.activityHeading}>
            <div className={classes.activityBody}>
                <div>{props.heading.title}</div>
                <div>{props.heading.date}</div>
                <div>Activitys</div>
            </div>
            <div className={classes.activityValue}>
                <div className={classes.income}>£{props.body.income}</div>
                <div className={classes.expense}>{`£${Math.abs(
                    props.body.expense
                )}`}</div>
                <div
                    className={
                        props.body.balance > 0
                            ? classes.income
                            : classes.expense
                    }
                >
                    {props.body.balance > 0
                        ? `£${props.body.balance}`
                        : `-£${Math.abs(props.body.balance)}`}
                </div>
            </div>
        </div>
    );
};
export default Activity;
