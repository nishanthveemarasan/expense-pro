import React from "react";
import classes from "./SingbleBox.module.css";
const SingbleBox = (props) => {
    return (
        <div className={classes.outline}>
            <div className={classes.details}>
                <div className={classes.name}>Nishanth</div>
                <div>ddsdas ad asd asd as dsd</div>
                <div>
                    <span className={classes.date}>borrowed Date : </span>
                </div>
            </div>
            <div className={classes.amount}>5000</div>
        </div>
    );
};
export default SingbleBox;
