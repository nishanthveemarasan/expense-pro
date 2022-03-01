import React, { useState } from "react";
import DInput from "../Input/DInput";
import classes from "./DebtBody.module.css";
import DSelect from "../Select/DSelect";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { extractDate, getFirstLetterUpperWord } from "../../../Helper/Helper";
import { debtStoreAction } from "../../../Expense/Store/Store";
const options = [
    { value: "Nishanth", label: "Nishanth" },
    { value: "Ravi", label: "Ravi" },
    { value: "Airjun", label: "Airjun" },
];

const DebtBody = (props) => {
    const exists = options.find(
        (element) => element.value.toLowerCase() == "Nishanth".toLowerCase()
    );

    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            formData: state.debtStore.formData,
            names: state.debtStore.names,
            createDebt: state.debtStore.createDebt,
        };
    };
    const state = useSelector(mapStateToProps);

    const onDateCHangeHandler = (date) => {
        const value = extractDate(date);
        dispatch(debtStoreAction.updateFormData({ value, type: "date" }));
    };

    const onInputChangeHandler = (value, type) => {
        dispatch(
            debtStoreAction.updateFormData({
                value: getFirstLetterUpperWord(value),
                type,
            })
        );
    };

    // const getSelectedValue
    return (
        <>
            <div>
                {state.formData.name && state.createDebt != "create" ? (
                    <div className={classes.name}>{state.formData.name}</div>
                ) : (
                    <DSelect
                        options={state.names}
                        placeholder="Name"
                        className={classes.select}
                        change={onInputChangeHandler}
                        type="name"
                    />
                )}
                <DInput
                    type="number"
                    class={classes.textbox}
                    placeholder="Amount"
                    change={onInputChangeHandler}
                    value={state.formData.amount}
                    property="amount"
                />
                <DInput
                    type="text"
                    class={classes.textbox}
                    placeholder="Description -- optional"
                    change={onInputChangeHandler}
                    value={state.formData.description}
                    property="description"
                />
                <DatePicker
                    selected={
                        state.formData.date
                            ? new Date(state.formData.date)
                            : new Date()
                    }
                    dateFormat="yyyy-MM-dd"
                    className={classes.textbox}
                    onChange={onDateCHangeHandler}
                />
            </div>
        </>
    );
};
export default DebtBody;
