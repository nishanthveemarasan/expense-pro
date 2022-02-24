import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";
import PaySwitch from "./Switch/PaySwitch";
import classes from "./Payment.module.css";
import AddPayment from "./AddPayment/AddPayment";
import DatePicker from "react-datepicker";
import PaymentModal from "./PaymentModal/PaymentModal";
import Transaction from "./Transaction/Transaction";

const Payment = (props) => {
    const { showPayment } = props;
    const mapStateToProps = (state) => {
        return {
            payDate: state.expenseStore.payDate,
        };
    };
    const state = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(expenseStoreAction.showPayment({ showPayment }));
    }, [showPayment]);

    const onShowModelHandler = () => {
        dispatch(expenseStoreAction.showModel());
    };
    return (
        <div>
            <PaymentModal />
            <div className={classes.switch}>
                <PaySwitch />
                <div className={classes.today} onClick={onShowModelHandler}>
                    {state.payDate}
                </div>
            </div>
            <AddPayment />
            <Transaction />
        </div>
    );
};

export default Payment;
