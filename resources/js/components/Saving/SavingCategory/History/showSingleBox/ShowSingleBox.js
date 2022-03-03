import React from "react";
import classes from "./ShowSingleBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
const ShowSingleBox = (props) => {
    return (
        <div
            className={
                props.type == "add"
                    ? classes.outlineIncome
                    : classes.outlineExpense
            }
        >
            <div className={classes.details}>
                <div>
                    <span className={classes.date}>{props.date}</span>
                </div>
                <div>
                    <span className={classes.description}>
                        {props.description}
                    </span>
                </div>
            </div>
            <div
                className={classes.amount}
                style={{ color: props.type == "add" ? "black" : "red" }}
            >
                <FontAwesomeIcon icon={faSterlingSign} />
                {props.amount}
            </div>
        </div>
    );
};
export default ShowSingleBox;
