import React from "react";
import classes from "./InputCheck.module.css";
const InputCheck = (props) => {
    return (
        <div
            style={{ fontSize: "1.1rem" }}
            className="d-inline-block me-2 mb-1"
        >
            <div className="form-check">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className={`form-check-input form-check-${props.checkColor}`}
                        checked={props.checked}
                        name="customCheck"
                        id="customColorCheck2"
                        onChange={(e) => props.change(e)}
                    />
                    <label
                        className="form-check-label"
                        style={{ color: "grey" }}
                        htmlFor="customColorCheck2"
                    >
                        {props.label}
                    </label>
                </div>
            </div>
        </div>
    );
};
export default InputCheck;
