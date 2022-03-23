import React from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./SummaryCategory.module.css";
const SummaryCategory = (props) => {
    return (
        <div className={classes.outlineExpense} onClick={props.click}>
            <div className={classes.details}>
                <div className={classes.name}>{props.category}</div>
            </div>
        </div>
    );
};
export default SummaryCategory;
