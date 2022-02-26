import React from "react";
import classes from "./Head.module.css";
const Head = ({ type, children }) => {
    return (
        <div
            className={
                type == "middle" ? classes.headMiddle : classes.headSpaceBetween
            }
        >
            {children}
        </div>
    );
};
export default Head;
