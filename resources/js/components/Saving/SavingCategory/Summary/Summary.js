import React from "react";
import classes from "./Summary.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
import { today } from "../../../Helper/Helper";
import { useSelector } from "react-redux";
const Summary = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.savingStore.data,
        };
    };
    const state = useSelector(mapStateToProps);
    let totalProfit = 0;
    state.data.forEach((el, i) => {
        totalProfit += el.amount;
    });
    return (
        <div className={classes.summary}>
            <div className={classes.summaryTitle}>Total Saving</div>
            <div className={classes.currency}>
                <FontAwesomeIcon icon={faSterlingSign} />
                {totalProfit}
            </div>
            <div className={classes.summaryTitle}>as at {today()}</div>
        </div>
    );
};

export default Summary;
