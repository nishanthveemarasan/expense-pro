import React, { useState, useEffect } from "react";
import classes from "./TotalBalance.module.css";

const TotalBalance = (props) => {
    return (
        <div className={classes.balancce}>
            <div>Current Balance</div>
            <div style={{ color: props.balance > 0 ? "green" : "red" }}>
                {props.balance}
            </div>
        </div>
    );
};
export default TotalBalance;
