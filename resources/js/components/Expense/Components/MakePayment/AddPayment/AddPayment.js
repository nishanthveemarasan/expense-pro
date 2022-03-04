import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getArray, getDate, uuid } from "../../../../Helper/Helper";
import { addNewTransaction } from "../../../Store/reducers/expense-reducer";
import { expenseStoreAction } from "../../../Store/Store";
import Ebutton from "../../../UI/Button/Ebutton";
import Option from "../Option/Option";
import classes from "./AddPayment.module.css";
const AddPayment = (props) => {
    const dispatch = useDispatch();
    const onUpdatePageHandler = (mainPage) => {
        dispatch(expenseStoreAction.updatePage({ mainPage }));
    };
    const mapStateToProps = (state) => {
        return {
            payType: state.expenseStore.payment.type,
            payDate: state.expenseStore.payDate,
            selectedCategory: state.expenseStore.payment.add.selectedCategory,
            amount: state.expenseStore.payment.add.amount,
            transactionData: state.expenseStore.payment.transData,
        };
    };
    const state = useSelector(mapStateToProps);
    /* {
        type: "expense",
        +category: {
            name: "Automobile",
        },
    },*/
    const onAddPaymentItem = () => {
        const date = getDate(state.payDate);
        const getCategory = getArray(state.selectedCategory, ":");
        if (!state.payType) {
            alert("Please Specify if it is either Income/Expense type");
            return;
        }
        console.log(state.amount);
        if (isNaN(state.amount) || !state.amount) {
            alert("Please Specify the right amount!!");
            return;
        }

        if (!state.selectedCategory && state.payType != "income") {
            alert("Please choose the expense category!!");
            return;
        }
        const data = {
            uuid: uuid(),
            type: state.payType,
            date: state.payDate,
            day: date.dayNumber,
            month: date.monthNumber,
            selectedCategory:
                state.payType == "income" ? "income" : state.selectedCategory,
            week: date.weekNumber,
            year: date.yearNumber,
            category: state.payType == "income" ? "income" : getCategory[0],
            subCategory: state.payType == "income" ? "income" : getCategory[1],
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
        console.log(state.transactionData);
        dispatch(expenseStoreAction.showModal());
        dispatch(addNewTransaction(state.transactionData));
        // dispatch(
        //     expenseStoreAction.savePayment({ data: state.transactionData })
        // );
    };
    return (
        <>
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
                        heading="Category"
                        type="text"
                        avatar={false}
                        icon={
                            <i
                                className="bi bi-list-ul"
                                onClick={onUpdatePageHandler.bind(
                                    this,
                                    "category"
                                )}
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
                        onClick={onUpdatePageHandler.bind(
                            this,
                            "expenseCategory"
                        )}
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
                        disabled={
                            state.transactionData.length == 0 ? true : false
                        }
                        name="Save"
                        onClick={onSavePaymentHandler}
                    />
                </div>
            </div>
        </>
    );
};

export default AddPayment;
