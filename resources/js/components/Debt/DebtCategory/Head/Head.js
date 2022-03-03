import React from "react";
import { useDispatch } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import classes from "./Head.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
            <div className={classes.heading}>Debt Manager</div>
            <div className={classes.heading}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    className={classes.icon}
                    onClick={onPageChangeHandler}
                />
            </div>
        </div>
    );
};
export default Head;
