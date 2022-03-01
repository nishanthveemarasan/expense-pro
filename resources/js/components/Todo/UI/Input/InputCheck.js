import React from "react";
import classes from "./input.module.css";
const InputCheck = (props) => {
    return (
        <>
            <input
                type="checkbox"
                checked={props.value}
                className={props.class}
                id={props.id}
                onChange={props.change.bind(this, props.id)}
            />
        </>
    );
};
export default InputCheck;
