import React from "react";
const TButton = (props) => {
    return (
        <>
            <button {...props}>{props.name}</button>
        </>
    );
};
export default TButton;
