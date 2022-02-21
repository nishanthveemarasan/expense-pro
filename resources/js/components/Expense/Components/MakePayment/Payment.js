import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";
import PaySwitch from "./Switch/PaySwitch";
import classes from "./Payment.module.css";
import AddPayment from "./AddPayment/AddPayment";
useDispatch;
const Payment = (props) => {
    const { showPayment } = props;
    const mapStateToProps = (state) => {
        return {
            today: state.expenseStore.dateGroup.today.date,
        };
    };
    const state = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(expenseStoreAction.showPayment({ showPayment }));
    }, [showPayment]);
    return (
        <div>
            <div className={classes.switch}>
                <PaySwitch />
                <div className={classes.today}>{state.today}</div>
            </div>
            <AddPayment />
        </div>
    );
};

export default Payment;
