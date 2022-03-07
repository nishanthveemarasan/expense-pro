import React from "react";
import { Form } from "react-bootstrap";
import classes from "./ESelect.module.css";
const ESelect = (props) => {
    return (
        <>
            <label className={classes.label}>{props.label}</label>
            <Form.Select
                value={props.value}
                onChange={(e) => props.change(e, props.type)}
                className={classes.select}
            >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </Form.Select>
        </>
    );
};
export default ESelect;
