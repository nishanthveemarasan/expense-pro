import React from "react";
import { useDispatch } from "react-redux";
// import { expenseStoreAction } from "../../../Store/Store";
import SwitchItem from "./SwitchItem";

const PaySwitch = (props) => {
    const dispatch = useDispatch();
    const onTypeChangeHandler = (type) => {
        dispatch(expenseStoreAction.setPaymentType({ type }));
    };

    return (
        <div>
            <SwitchItem
                label="Income"
                labelClass="btn btn-outline-success"
                id="success-outlined"
                onClick={() => onTypeChangeHandler("income")}
            />
            <SwitchItem
                label="Expense"
                labelClass="btn btn-outline-danger"
                id="danger-outlined"
                onClick={() => onTypeChangeHandler("expense")}
            />
        </div>
    );
};

export default PaySwitch;
