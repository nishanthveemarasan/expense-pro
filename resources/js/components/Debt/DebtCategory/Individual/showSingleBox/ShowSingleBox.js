import React from "react";
import classes from "./ShowSingleBox.module.css";
const ShowSingleBox = (props) => {
    console.log(props);
    return (
        <div
            className={
                props.type == "lend"
                    ? classes.outlineLend
                    : classes.outlineBorrow
            }
        >
            <div className={classes.details}>
                <div className={classes.name}>
                    {props.type == "lend" ? "Owed To Me/Paid" : "Owed By Me"}
                </div>
                <div>{props.description ?? "No Description"}</div>
                <div>
                    <span className={classes.date}>
                        Incurred : {props.date}
                    </span>
                </div>
            </div>
            <div className={classes.amount}>{props.amount}</div>
        </div>
    );
};
export default ShowSingleBox;
