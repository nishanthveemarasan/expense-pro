import React from "react";
import classes from "./TextArea.module.css";
const TextArea = (props) => {
    return (
        <>
            <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                style={{ width: "100%" }}
                value={props.value}
                onChange={(e) => props.change(e)}
            ></textarea>
        </>
    );
};
export default TextArea;
