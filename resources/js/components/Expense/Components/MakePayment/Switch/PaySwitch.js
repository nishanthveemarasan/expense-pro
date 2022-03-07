import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import SwitchItem from "./SwitchItem";

const PaySwitch = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            payType: state.expenseStore.payment.type,
        };
    };
    const state = useSelector(mapStateToProps);
    const onTypeChangeHandler = (type) => {
        dispatch(expenseStoreAction.setPaymentType({ type }));
    };
    console.log(state.payType);
    return (
        <div>
            <SwitchItem
                label="Income"
                labelClass="btn btn-outline-success"
                id="success-outlined"
                onClick={() => onTypeChangeHandler("income")}
                checked={state.payType == "income"}
            />
            <SwitchItem
                label="Expense"
                labelClass="btn btn-outline-danger"
                id="danger-outlined"
                onClick={() => onTypeChangeHandler("expense")}
                checked={state.payType == "expense"}
            />
        </div>
    );
};

export default PaySwitch;
