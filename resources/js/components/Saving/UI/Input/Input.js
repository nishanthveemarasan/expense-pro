import React from "react";
import classes from "./input.module.css";
const Input = (props) => {
    return (
        <>
            <label className={classes.label}>Amount</label>
            <input {...props} />
        </>
    );
};
export default Input;
