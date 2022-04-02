import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getArray, getDate, uuid } from "../../../../Helper/Helper";
import Modal from "../../../../Modal/Modal";
import { addNewTransaction } from "../../../Store/reducers/expense-reducer";
import { expenseStoreAction } from "../../../Store/Store";
import Ebutton from "../../../UI/Button/Ebutton";
import Option from "../Option/Option";
import classes from "./AddPayment.module.css";
const AddPayment = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            payType: state.expenseStore.payment.type,
            payDate: state.expenseStore.payDate,
            selectedCategory: state.expenseStore.payment.add.selectedCategory,
            amount: state.expenseStore.payment.add.amount,
            transactionData: state.expenseStore.payment.transData,
            token: state.expenseStore.appToken,
            page: state.expenseStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    const onUpdatePageHandler = (mainPage) => {
        const data = {
            mainPage: mainPage,
            page: state.page,
        };
        dispatch(expenseStoreAction.clearSelectedCategory());
        dispatch(expenseStoreAction.updatePage(data));
        dispatch(
            expenseStoreAction.updatePrevMainPage({ prevMainPage: "payment" })
        );
    };
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
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Please Specify if it is either Income/Expense type",
                })
            );
            return;
        }
        // console.log(state.amount);
        if (isNaN(state.amount) || !state.amount) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Please Specify the right amount!!",
                })
            );
            return;
        }

        if (!state.selectedCategory && state.payType != "income") {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Please choose the expense category!!",
                })
            );
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
        // console.log(state.transactionData);
        dispatch(expenseStoreAction.showModal());
        dispatch(addNewTransaction(state.transactionData, state.token));
        // dispatch(
        //     expenseStoreAction.savePayment({ data: state.transactionData })
        // );
    };
    return (
        <>
            <Modal />
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
                        name="Add New"
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
