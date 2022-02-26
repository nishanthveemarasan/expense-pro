import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";
import PaySwitch from "./Switch/PaySwitch";
import classes from "./Payment.module.css";
import AddPayment from "./AddPayment/AddPayment";
import DatePicker from "react-datepicker";
import PaymentModal from "./PaymentModal/PaymentModal";
import Transaction from "./Transaction/Transaction";
import Head from "../../UI/head/Head";

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
    const onPageChangeHandler = () => {
        const data = {
            mainPage: "expenseCategory",
        };
        dispatch(expenseStoreAction.updatePage(data));
    };
    return (
        <div>
            <PaymentModal />
            <Head type="space">
                <div className={classes.heading}>
                    <i
                        className="bi bi-arrow-left"
                        onClick={onPageChangeHandler}
                    ></i>
                </div>
                <div className={classes.heading}>Add Expense/Income</div>
            </Head>
            <div style={{ padding: "0% 3% 5% 3%" }}>
                <div className={classes.switch}>
                    <PaySwitch />
                    <div className={classes.today} onClick={onShowModelHandler}>
                        {state.payDate}
                    </div>
                </div>
                <AddPayment />
                <Transaction />
            </div>
        </div>
    );
};

export default Payment;
