import React from "react";
import classes from "./SingbleBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
const SingbleBox = (props) => {
    return (
        <div className={classes.outline} onClick={props.editDebt}>
            <div className={classes.details}>
                <div className={classes.name}>{props.name}</div>
                <div>{props.description ?? "No Description"}</div>
                <div>
                    <span className={classes.date}>
                        {props.type == "lend" ? "lent " : "borrowed "}
                        Date : {props.date}
                    </span>
                </div>
            </div>
            <div className={classes.amount}>
                <FontAwesomeIcon icon={faSterlingSign} />
                {props.amount}
            </div>
        </div>
    );
};
export default SingbleBox;
