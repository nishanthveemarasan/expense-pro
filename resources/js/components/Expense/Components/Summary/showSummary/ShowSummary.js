import React from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./ShowSummary.module.css";
const ShowSummary = (props) => {
    return (
        <div
            className={classes.totalExpenseSummary}
            style={{
                backgroundColor: props.viewType == "expense" ? "red" : "green",
            }}
        >
            <div className={classes.details}>
                <div>{getFirstLetterUpperWord(props.type)}</div>
            </div>
            <div className={classes.amount}>{`£${Math.abs(props.amount)}`}</div>
        </div>
    );
};
export default ShowSummary;
