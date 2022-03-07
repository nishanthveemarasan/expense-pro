import React from "react";
import classes from "./EInput.module.css";
const EInput = (props) => {
    return (
        <>
            <label className={classes.label}>{props.label}</label>
            <input
                type={props.type}
                id="roundText"
                className="form-control round"
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e, props.eType)}
                value={props.value}
                style={{ padding: "2% 3%", fontSize: "1rem" }}
                disabled={props.disabled}
            ></input>
        </>
    );
};
export default EInput;
