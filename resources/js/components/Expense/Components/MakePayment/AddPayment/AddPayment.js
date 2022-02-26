import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { expenseStoreAction } from "../../../Store/Store";
import Ebutton from "../../../UI/Button/Ebutton";
import Option from "../Option/Option";
import classes from "./AddPayment.module.css";
const AddPayment = (props) => {
    const dispatch = useDispatch();
    const onUpdatePageHandler = (mainPage) => {
        console.log(mainPage);
        dispatch(expenseStoreAction.updatePage({ mainPage }));
    };
    const mapStateToProps = (state) => {
        return {
            payType: state.expenseStore.payment.type,
            payDate: state.expenseStore.payDate,
            selectedCategory: state.expenseStore.payment.add.selectedCategory,
            amount: state.expenseStore.payment.add.amount,
        };
    };
    const state = useSelector(mapStateToProps);

    const onAddPaymentItem = () => {
        const data = {
            type: state.payType,
            date: state.payDate,
            category:
                state.payType == "income" ? "Income" : state.selectedCategory,
            amount:
                state.payType == "income"
                    ? parseFloat(state.amount)
                    : -Math.abs(parseFloat(state.amount)),
        };
        dispatch(expenseStoreAction.addTranssactionItem({ data }));
    };

    const onAmountChangeHandler = (event) => {
        const value = event.target.value;
        dispatch(expenseStoreAction.updateAddPaymentAmount({ value }));
    };

    const onSavePaymentHandler = () => {
        dispatch(expenseStoreAction.savePayment());
    };
    return (
        <div className={classes.paycard}>
            <Option
                heading="Amount"
                type="number"
                avatar={false}
                icon={<i className="bi bi-calculator"></i>}
                color="primary"
                value={state.amount}
                change={onAmountChangeHandler}
            />
            {(state.payType == "expense" || state.payType == "") && (
                <Option
                    heading="Categorys"
                    type="text"
                    avatar={false}
                    icon={
                        <i
                            className="bi bi-list-ul"
                            onClick={onUpdatePageHandler.bind(this, "category")}
                        ></i>
                    }
                    color="success"
                    disabled={true}
                    value={state.selectedCategory}
                    tColor="red"
                />
            )}
            <div className={classes.paybutton}>
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Back"
                    onClick={onUpdatePageHandler.bind(this, "expenseCategory")}
                />
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Save&New"
                    onClick={onAddPaymentItem}
                />
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Save"
                    onClick={onSavePaymentHandler}
                />
            </div>
        </div>
    );
};

export default AddPayment;
