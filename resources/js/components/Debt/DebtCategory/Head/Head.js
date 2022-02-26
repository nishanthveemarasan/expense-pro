import React from "react";
import { useDispatch } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import classes from "./Head.module.css";
const Head = (props) => {
    const dispatch = useDispatch();

    const onPageChangeHandler = () => {
        const data = {
            page: "giveto",
            mainPage: "debtsummary",
            action: "",
            type: "mainpage",
        };
        dispatch(debtStoreAction.updatePage(data));
    };
    return (
        <div className={classes.head}>
            <div className={classes.heading}>
                <i
                    className="bi bi-arrow-left"
                    onClick={onPageChangeHandler}
                ></i>
            </div>

            <div className={classes.heading}>Debt Manager</div>
        </div>
    );
};
export default Head;
