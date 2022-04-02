import React, { useState, useEffect } from "react";
import { limitDemialPlaces } from "../../../../../Helper/Helper";
import classes from "./TotalBalance.module.css";

const TotalBalance = (props) => {
    return (
        <div className={classes.balancce}>
            <div>Current Balance</div>
            <div style={{ color: props.balance > 0 ? "green" : "red" }}>
                {props.balance > 0
                    ? `£${limitDemialPlaces(props.balance)}`
                    : `-£${limitDemialPlaces(Math.abs(props.balance))}`}
            </div>
        </div>
    );
};
export default TotalBalance;
