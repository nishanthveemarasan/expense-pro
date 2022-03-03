import React from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./ShowSingleBox.module.css";
const ShowSingleBox = (props) => {
    return (
        <div
            className={
                props.type == "expense"
                    ? classes.outlineExpense
                    : classes.outlineIncome
            }
        >
            <div className={classes.details}>
                <div>{getFirstLetterUpperWord(props.type)}</div>
                {props.type == "expense" && (
                    <div className={classes.name}>{props.category.name}</div>
                )}
            </div>
            <div>
                <span className={classes.date}>{props.date}</span>
            </div>
            <div
                className={classes.amount}
                style={{ color: props.amount > 0 ? "green" : "red" }}
            >
                {props.amount > 0
                    ? `£${props.amount}`
                    : `-£${Math.abs(props.amount)}`}
            </div>
        </div>
    );
};
export default ShowSingleBox;
