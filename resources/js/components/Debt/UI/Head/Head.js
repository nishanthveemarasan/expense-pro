import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import { extractDate, uuid } from "../../../Helper/Helper";
import classes from "./Head.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import { AddNewDebt } from "../../../Expense/Store/reducers/debt-reducer";
const Head = (props) => {
    const dispatch = useDispatch();

    const mapStateToProps = (state) => {
        return {
            formData: state.debtStore.formData,
            action: state.debtStore.action,
            token: state.debtStore.appToken,
        };
    };
    const state = useSelector(mapStateToProps);
    const onCancelDebtHandler = () => {
        let data;
        if (props.action == "lend") {
            data = {
                page: "giveto",
                mainPage: "debtcategory",
                action: "",
                type: "mainpage",
                create: "",
            };
        } else {
            data = {
                page: "borrowfrom",
                mainPage: "debtcategory",
                action: "",
                type: "mainpage",
                create: "",
            };
        }
        dispatch(debtStoreAction.updatePage(data));
    };

    const onCreateDebtHandler = () => {
        const date = state.formData.date
            ? state.formData.date
            : extractDate(new Date());

        const data = {
            action: state.action,
            formData: {
                ...state.formData,
                date,
                amount: parseFloat(state.formData.amount),
                type: props.action == "lend" ? "lend" : "borrow",
                uuid: state.formData.uuid ?? uuid(),
            },
        };

        if (data.formData.name == "") {
            alert("Name is Required!!");
            return;
        }

        if (data.formData.amount == "" || isNaN(data.formData.amount)) {
            alert("Amount is Required!!");
            return;
        }

        dispatch(debtStoreAction.showModal());
        let page;
        if (props.action == "lend") {
            page = {
                page: "giveto",
                mainPage: "debtcategory",
                action: "",
                type: "mainpage",
                create: "",
            };
        } else {
            page = {
                page: "borrowfrom",
                mainPage: "debtcategory",
                action: "",
                type: "mainpage",
                create: "",
            };
        }
        dispatch(AddNewDebt(data, page, state.token));

        // dispatch(debtStoreAction.createDebt(data));
        // dispatch(debtStoreAction.createUpdateDebtData(data));
        // onCancelDebtHandler();
    };
    return (
        <div className={classes.head}>
            <div className={classes.heading}>{props.heading}</div>
            <div>
                <div className={classes.action}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onCancelDebtHandler}
                    />
                    <span className={classes.span}> </span>
                    <FontAwesomeIcon
                        icon={faSave}
                        className={classes.icon}
                        onClick={onCreateDebtHandler}
                    />
                    {/* <i
                        className={`bi bi-x-circle-fill ${classes.icon}`}
                        onClick={onCancelDebtHandler}
                    ></i>
                    <span className={classes.span}> </span>
                    <i
                        className={`bi bi-check-circle-fill ${classes.icon}`}
                        onClick={onCreateDebtHandler}
                    ></i> */}
                </div>
            </div>
        </div>
    );
};
export default Head;
