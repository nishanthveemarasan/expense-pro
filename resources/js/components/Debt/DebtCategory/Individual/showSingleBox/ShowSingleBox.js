import React from "react";
import classes from "./ShowSingleBox.module.css";

const ShowSingleBox = (props) => {
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
                    {props.type == "lend" ? "Owed To Me/Paids" : "Owed By Me"}
                </div>
                <div>{props.description ?? "No Description"}</div>
                <div>
                    <span className={classes.date}>
                        Incurred : {props.date}
                    </span>
                </div>
            </div>
            <div className={classes.amount}>
                <span>£</span>
                {props.amount}
            </div>
        </div>
    );
};
export default ShowSingleBox;
