import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debtStoreAction } from "../../../../Expense/Store/Store";
import classes from "./Head.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
            {/* <div className={classes.head}>
                <div className={classes.heading}>{props.name}</div>
                <div>
                    <div className={classes.action}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className={classes.icon}
                            onClick={onCancelDebtHandler}
                        />
                    </div>
                </div>
            </div> */}
            <div className={classes.head}>
                <div className={classes.heading}>{props.name}</div>
                <div className={classes.heading}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onCancelDebtHandler}
                    />
                </div>
            </div>
        </>
    );
};
export default Head;
