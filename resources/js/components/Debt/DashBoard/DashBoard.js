import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debtStoreAction } from "../../Expense/Store/Store";
import Ebutton from "../../Expense/UI/Button/Ebutton";
import classes from "./DashBoard.module.css";
import DebtChart from "./DebtChart";
import DebtSummary from "./DebtSummary";
import Head from "./Head";

const DashBoard = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            debtData: state.debtStore.debtData,
        };
    };
    const state = useSelector(mapStateToProps);
    let sum = {
        borrow: 0,
        lend: 0,
        total: 0,
    };
    state.debtData.forEach((el, i) => {
        sum.borrow += el.borrowTotal;
        sum.lend += el.lendTotal;
        sum.total += el.lendTotal - el.borrowTotal;
    });

    const onPageChangeHandler = () => {
        const data = {
            page: "giveto",
            mainPage: "debtcategory",
            action: "",
            type: "mainpage",
        };
        dispatch(debtStoreAction.updatePage(data));
    };
    return (
        <>
            <Head class={classes} />
            <div className={classes.dashboard}>
                <DebtSummary css={classes} balance={sum.total} />
                <DebtChart css={classes} total={sum} />
            </div>
            <div className={classes.debtManagerButton}>
                <Ebutton
                    name="Go To Debt Manager"
                    variant="primary"
                    onClick={onPageChangeHandler}
                />
            </div>
        </>
    );
};
export default DashBoard;
