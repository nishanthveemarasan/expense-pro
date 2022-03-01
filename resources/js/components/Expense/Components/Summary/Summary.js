import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowSingleBox from "./showSingleBox/ShowSingleBox";

const Summary = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.data.expense,
        };
    };
    const state = useSelector(mapStateToProps);

    return (
        <>
            {state.data.map((el, i) => {
                return <ShowSingleBox {...el} key={i} />;
            })}
        </>
    );
};

export default Summary;
