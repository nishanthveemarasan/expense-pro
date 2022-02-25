import React from "react";

const DInput = (props) => {
    return (
        <>
            <input
                type={props.type}
                className={props.class}
                placeholder={props.placeholder}
                onChange={(e) => props.change(e.target.value, props.property)}
                value={props.value}
            />
        </>
    );
};
export default DInput;
