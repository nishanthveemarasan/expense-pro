import React from "react";
import Head from "../../../UI/head/Head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimesCircle,
    faCalendarAlt,
    faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import classes from "../Recurring.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import { Form } from "react-bootstrap";
import ESelect from "../../../../../UI/Select/ESelect";
import EInput from "../../../../../UI/Input/EInput";
import InputCheck from "../../../../../UI/CheckBox/InputCheck";
import Option from "../UI/Option/Option";
import Ebutton from "../../../../../UI/Button/Ebutton";
import PaymentModal from "../../MakePayment/PaymentModal/PaymentModal";
import PaySwitch from "../../MakePayment/Switch/PaySwitch";
import { uuid } from "../../../../Helper/Helper";
const MakeRecurring = (props) => {
    const mapStateToProps = (state) => {
        return {
            payDate: state.expenseStore.payDate,
            selectedCategory: state.expenseStore.payment.add.selectedCategory,
            payType: state.expenseStore.payment.type,
            recurringPayment: state.expenseStore.recurringPayment,
            checked_payment_number: state.expenseStore.checked_payment_number,
        };
    };
    const state = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const onPageChangeHandler = () => {
        const data = {
            mainPage: "expenseCategory",
            page: "recurring",
        };
        dispatch(expenseStoreAction.updatePage(data));
        dispatch(expenseStoreAction.clearSelectedCategory());
    };
    const onShowDateModelHandler = () => {
        dispatch(expenseStoreAction.showModel());
    };

    const onUpdatePageHandler = (mainPage) => {
        dispatch(expenseStoreAction.updatePage({ mainPage }));
        dispatch(
            expenseStoreAction.updatePrevMainPage({ prevMainPage: "recurring" })
        );
    };
    const onInputChangeHandler = (e, type) => {
        const value = e.target.value;
        dispatch(expenseStoreAction.updateRecurringFormData({ value, type }));
    };

    const onCheckHandler = (e) => {
        const value = !state.checked_payment_number;
        dispatch(expenseStoreAction.updateRecurringPaymentNumber({ value }));
    };

    const onSaveRecurrPaymentHandler = (e) => {
        e.preventDefault();
        if (state.recurringPayment.name.trim().length == 0) {
            alert("payment description is required!!!");
            return;
        }
        console.log(state.recurringPayment.amount);
        if (
            isNaN(state.recurringPayment.amount) ||
            state.recurringPayment.amount < 1
        ) {
            alert(
                "Please enter a valid number in Amount Field and Payment should be greater than 1"
            );
            return;
        }
        console.log(state.checked_payment_number);
        if (
            !state.checked_payment_number &&
            (isNaN(state.recurringPayment.num_of_payment) ||
                state.recurringPayment.num_of_payment < 2)
        ) {
            alert("Please enter number(>= 2) in No of Payment field");
        }
        if (
            state.selectedCategory.trim().length == 0 &&
            state.payType != "income"
        ) {
            alert("Choose the category for this payment!!!");
            return;
        }
        const data = {
            uuid: uuid(),
            type: state.payType,
            name: state.recurringPayment.name,
            amount: parseFloat(state.recurringPayment.amount),
            pay_method: state.recurringPayment.pay_method,
            num_of_payment: state.checked_payment_number
                ? 0
                : state.recurringPayment.num_of_payment,
            state_date: state.payDate,
            last_pay_date: state.payDate,
            category:
                state.payType == "expense" ? state.selectedCategory : "income",
            current_pay_num: 1,
            status: "active",
            susbscription_type: state.checked_payment_number
                ? "unlimited"
                : "limited",
        };
        console.log(data);
    };
    return (
        <>
            <PaymentModal />
            <Head type="space">
                <div className={classes.heading}>Make Recurring Payment</div>
                <div className={classes.heading}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onPageChangeHandler}
                    />
                </div>
            </Head>
            <div style={{ margin: "3% 3% 3% 3%" }}>
                <Form onSubmit={onSaveRecurrPaymentHandler}>
                    <div style={{ marginBottom: "2%" }}>
                        <PaySwitch />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <EInput
                            label="Payment Description"
                            type="text"
                            value={state.recurringPayment.name}
                            eType="name"
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <EInput
                            label="Amount"
                            type="number"
                            value={state.recurringPayment.amount}
                            eType="amount"
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <ESelect
                            label="Frequently"
                            value={state.recurringPayment.pay_method}
                            type="pay_method"
                            change={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <EInput
                            label="Number of Payment"
                            type="number"
                            value={state.recurringPayment.num_of_payment}
                            eType="num_of_payment"
                            onChange={onInputChangeHandler}
                            disabled={state.checked_payment_number}
                        />
                        <div style={{ marginTop: "1%" }}>
                            <InputCheck
                                label="chose if this transaction happens continuously!! "
                                checkColor="success"
                                checked={state.checked_payment_number}
                                change={onCheckHandler}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <Option
                            heading="First Payment"
                            value={state.payDate}
                            color="primary"
                            faIcon={faCalendarAlt}
                            input={false}
                            onPage={onShowDateModelHandler}
                        />
                    </div>
                    {(state.payType == "expense" || state.payType == "") && (
                        <div style={{ marginBottom: "2%" }}>
                            <Option
                                heading="Category"
                                color="danger"
                                faIcon={faListAlt}
                                input={false}
                                disabled={true}
                                onPage={onUpdatePageHandler.bind(
                                    this,
                                    "category"
                                )}
                                value={state.selectedCategory}
                                tColor="red"
                            />
                        </div>
                    )}
                    <div style={{ marginBottom: "2%" }}>
                        <Ebutton
                            name="Save Payment"
                            type="submit"
                            size="md"
                            style={{ width: "100%" }}
                            disabled={false}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
};
export default MakeRecurring;
