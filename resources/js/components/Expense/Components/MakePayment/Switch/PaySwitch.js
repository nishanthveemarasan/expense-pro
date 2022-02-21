import React from "react";
import SwitchItem from "./SwitchItem";

const PaySwitch = (props) => {
    return (
        <div>
            <SwitchItem
                label="Income"
                labelClass="btn btn-outline-success"
                id="success-outlined"
            />
            <SwitchItem
                label="Expense"
                labelClass="btn btn-outline-danger"
                id="danger-outlined"
            />
        </div>
    );
};

export default PaySwitch;
