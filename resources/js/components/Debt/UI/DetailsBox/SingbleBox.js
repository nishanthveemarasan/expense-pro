import React from "react";
import classes from "./SingbleBox.module.css";
const SingbleBox = (props) => {
    return (
        <div className={classes.outline} onClick={props.editDebt}>
            <div className={classes.details}>
                <div className={classes.name}>{props.name}</div>
                <div>{props.description ?? "No Description"}</div>
                <div>
                    <span className={classes.date}>
                        borrowed Date : {props.date}
                    </span>
                </div>
            </div>
            <div className={classes.amount}>{props.amount}</div>
        </div>
    );
};
export default SingbleBox;
