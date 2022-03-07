import React from "react";

const SwitchItem = (props) => {
    return (
        <>
            <input
                type="radio"
                className="btn-check"
                name="options-outlined"
                id={props.id}
                autoComplete="off"
                onClick={props.onClick}
                defaultChecked={props.checked}
            />
            <label className={props.labelClass} htmlFor={props.id}>
                {props.label}
            </label>
        </>
    );
};

export default SwitchItem;
