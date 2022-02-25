import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debtStoreAction } from "../../../../Expense/Store/Store";
import classes from "./Head.module.css";
const Head = (props) => {
    const dispatch = useDispatch();

    const mapStateToProps = (state) => {
        return {
            formData: state.debtStore.formData,
            action: state.debtStore.action,
        };
    };
    const state = useSelector(mapStateToProps);
    const onCancelDebtHandler = () => {
        const data = {
            page: "individual",
            mainPage: "debtcategory",
            action: "",
            type: "mainpage",
        };

        dispatch(debtStoreAction.updatePage(data));
    };

    return (
        <>
            <div className={classes.head}>
                <div className={classes.heading}>{props.name}</div>
                <div>
                    <div className={classes.action}>
                        <i
                            className={`bi bi-x-circle-fill ${classes.icon}`}
                            onClick={onCancelDebtHandler}
                        ></i>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Head;
