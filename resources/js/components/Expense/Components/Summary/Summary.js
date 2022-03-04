import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowSingleBox from "./showSingleBox/ShowSingleBox";
import classes from "./Summary.module.css";
const Summary = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.data.expense,
        };
    };
    const state = useSelector(mapStateToProps);

    return (
        <>
            {state.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"There is no Income/Expense yet!!"}
                </div>
            )}
            {state.data.map((el, i) => {
                return <ShowSingleBox {...el} key={i} />;
            })}
        </>
    );
};

export default Summary;
