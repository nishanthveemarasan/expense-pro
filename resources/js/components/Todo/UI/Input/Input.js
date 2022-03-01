import React from "react";
import classes from "./input.module.css";
const Input = (props) => {
    return (
        <>
            <input
                type={props.type}
                className={`${classes.HeadingBox} ${
                    !props.border && classes.noBorder
                }`}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.change(e)}
            />
        </>
    );
};
export default Input;
