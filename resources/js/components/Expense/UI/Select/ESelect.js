import React from "react";
import { Form } from "react-bootstrap";

const ESelect = (props) => {
    const onSelectChangeHandler = (e) => {
        const value = e.target.value;
        props.change(value);
    };
    return (
        <Form.Select value={props.value} onChange={onSelectChangeHandler}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
        </Form.Select>
    );
};
export default ESelect;
