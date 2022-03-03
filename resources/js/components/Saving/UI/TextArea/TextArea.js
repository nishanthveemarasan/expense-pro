import React from "react";
import classes from "./TextArea.module.css";
const TextArea = (props) => {
    return (
        <>
            <label className={classes.label}>Description</label>
            <textarea
                className={props.class}
                id="exampleFormControlTextarea1"
                rows="2"
                style={{ width: "100%" }}
                value={props.value}
                onChange={(e) => props.change(e, props.type)}
            ></textarea>
        </>
    );
};
export default TextArea;
