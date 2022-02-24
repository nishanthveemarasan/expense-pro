import React from "react";

const EInput = (props) => {
    return (
        <>
            <input
                type="text"
                id="roundText"
                className="form-control round"
                placeholder="Enter New Main Category"
                onChange={props.onChange}
                value={props.value}
            ></input>
        </>
    );
};
export default EInput;
