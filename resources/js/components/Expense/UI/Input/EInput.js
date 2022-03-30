import React from "react";

const EInput = (props) => {
    return (
        <>
            <input
                type={props.type ? props.type : "text"}
                id="roundText"
                className="form-control round"
                placeholder={
                    props.place ? props.place : "Enter New Main Category"
                }
                onChange={props.onChange}
                value={props.value}
            ></input>
        </>
    );
};
export default EInput;
