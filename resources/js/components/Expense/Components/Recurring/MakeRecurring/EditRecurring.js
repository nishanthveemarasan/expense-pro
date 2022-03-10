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
import { addNewRecurringPayment } from "../../../Store/reducers/expense-reducer";
const EditRecurring = (props) => {
    const mapStateToProps = (state) => {
        return {
            payDate: state.expenseStore.payDate,
            selectedCategory: state.expenseStore.payment.add.selectedCategory,
            payType: state.expenseStore.payment.type,
            recurringPayment: state.expenseStore.recurringPayment,
            checked_payment_number: state.expenseStore.checked_payment_number,
            data: state.expenseStore.editRecurringFromdata,
            token: state.expenseStore.appToken,
            dateGroup: state.expenseStore.dateGroup,
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

    const onInputChangeHandler = (e, type) => {
        const value = e.target.value;
        dispatch(
            expenseStoreAction.editRecurringSpecificFormData({ value, type })
        );
    };

    const onCheckHandler = (e) => {
        const value = !state.data.checked_payment_number;
        dispatch(
            expenseStoreAction.editRecurringSpecificFormData({
                value,
                type: "checked_payment_number",
            })
        );
    };

    const onSaveRecurrPaymentHandler = (e) => {
        e.preventDefault();
        if (state.payType == "") {
            alert("Type is required!!");
            return;
        }

        if (state.dateGroup.today.date >= state.payDate) {
            alert(
                "Next pay date should be greater than " +
                    state.dateGroup.today.date
            );
            return;
        }
        if (state.data.name.trim().length == 0) {
            alert("payment description is required!!!");
            return;
        }
        if (isNaN(state.data.amount) || state.data.amount < 1) {
            alert(
                "Please enter a valid number in Amount Field and Payment should be greater than 1"
            );
            return;
        }
        if (
            !state.data.checked_payment_number &&
            (isNaN(state.data.num_of_pay) ||
                state.data.num_of_pay <= state.data.current_pay_num)
        ) {
            alert(
                "You have already paid " +
                    state.data.current_pay_num +
                    ". So, your payment number should be greater than ".state
                        .data.current_pay_num
            );
            return;
        }

        const data = {
            uuid: state.data.uuid,
            type: state.payType,
            name: state.data.name,
            amount: parseFloat(state.data.amount),
            pay_method: state.data.pay_method,
            num_of_pay: state.checked_payment_number
                ? 0
                : state.data.num_of_pay,
            next_pay_date: state.payDate,
            status: "active",
            susbscription_type: state.checked_payment_number
                ? "unlimited"
                : "limited",
        };
        console.log(data);
        // dispatch(addNewRecurringPayment(data, state.token));
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
                            value={state.data.name}
                            eType="name"
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <EInput
                            label="Amount"
                            type="number"
                            value={state.data.amount}
                            eType="amount"
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <ESelect
                            label="Frequently"
                            value={state.data.pay_method}
                            type="pay_method"
                            change={onInputChangeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <EInput
                            label="Number of Payment"
                            type="number"
                            value={state.data.num_of_pay}
                            eType="num_of_pay"
                            onChange={onInputChangeHandler}
                            disabled={state.data.checked_payment_number}
                        />
                        <div style={{ marginTop: "1%" }}>
                            <InputCheck
                                label="chose if this transaction happens continuously!! "
                                checkColor="success"
                                checked={state.data.checked_payment_number}
                                change={onCheckHandler}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <Option
                            heading="Next Payment"
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
                                value={state.data.category}
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
export default EditRecurring;
