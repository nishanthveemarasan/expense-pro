import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "./AddSaving.module.css";
import { useDispatch, useSelector } from "react-redux";
import { savingStoreAction } from "../../Expense/Store/Store";
import Input from "../UI/Input/Input";
import ESelect from "../UI/Select/ESelect";
import Ebutton from "../UI/Button/Ebutton";
import { Form } from "react-bootstrap";
import { getDate } from "../../Helper/Helper";
import TextArea from "../UI/TextArea/TextArea";
import SModel from "../UI/Model/SModel";
import { addNewSaving } from "../../Expense/Store/reducers/saving-slice";
const AddSaving = (props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        amount: "",
        payMethod: "add",
        description: "",
    });
    const mapStateToProps = (state) => {
        return {
            mainPage: state.savingStore.mainPage,
            page: state.savingStore.page,
        };
    };

    const onChangeHandler = (e, type) => {
        setForm((prevState) => {
            return {
                ...prevState,
                [type]: e.target.value,
            };
        });
    };
    const state = useSelector(mapStateToProps);
    const onCancelSavingHandler = () => {
        const data = {
            mainPage: "savingCategory",
            page: state.page,
        };
        console.log(data);
        dispatch(savingStoreAction.updatePage(data));
    };

    const onAddSavingHandler = (e) => {
        e.preventDefault();
        if (form.amount == "" || isNaN(form.amount)) {
            alert("Please Enter the valid amount!!!");
            return;
        }
        dispatch(savingStoreAction.showModel());
        const data = {
            date: getDate().today.date,
            amount:
                form.payMethod == "add"
                    ? Math.abs(form.amount)
                    : -Math.abs(form.amount),
            type: form.payMethod,
            description: form.description,
        };
        console.log(data);
        const pageData = {
            mainPage: "savingCategory",
            page: state.page,
        };
        dispatch(addNewSaving(data, pageData));
        // dispatch(savingStoreAction.updateSavingData({ data }));
        // console.log(pageData);
        // dispatch(savingStoreAction.updatePage(pageData));
        // dispatch(savingStoreAction.showModel());
    };
    return (
        <div>
            <SModel />
            <div className={classes.head}>
                <div className={classes.heading}>Add New Savings</div>

                <div className={classes.action}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onCancelSavingHandler}
                    />
                </div>
            </div>
            <Form style={{ padding: "8% 4%" }} onSubmit={onAddSavingHandler}>
                <div>
                    <Input
                        type="number"
                        className={classes.textbox}
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(e) => onChangeHandler(e, "amount")}
                    />
                </div>
                <div>
                    <ESelect
                        class={classes.textbox}
                        value={form.payMethod}
                        change={onChangeHandler}
                        type="payMethod"
                    />
                </div>
                <div>
                    <TextArea
                        class={classes.textarea}
                        value={form.description}
                        change={onChangeHandler}
                        type="description"
                    />
                </div>
                <div className={classes.saveButton}>
                    <Ebutton
                        name="Save"
                        variant={"primary"}
                        size="lg"
                        className={classes.saveButton}
                        type="submit"
                    />
                </div>
            </Form>
        </div>
    );
};
export default AddSaving;
