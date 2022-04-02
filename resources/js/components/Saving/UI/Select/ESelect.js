import React from "react";
import { Form } from "react-bootstrap";
import classes from "./ESelect.module.css";
const ESelect = (props) => {
    return (
        <>
            <label className={classes.label}>Pay Method</label>
            <Form.Select
                value={props.value}
                onChange={(e) => props.change(e, props.type)}
                className={props.class}
            >
                <option value="add">Deposits</option>
                <option value="pay">Withdrawals</option>
            </Form.Select>
        </>
    );
};
export default ESelect;
