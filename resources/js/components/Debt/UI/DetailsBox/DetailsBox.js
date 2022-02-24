import React from "react";
import Avatar from "../../../Expense/UI/Avatar/Avatar";
import classes from "./Details.module.css";
const DetailsBox = (props) => {
    return (
        <div className={classes.outline}>
            <div className={classes.details}>
                <div>
                    <Avatar size="lg" color="primary" align="3">
                        N
                    </Avatar>
                </div>
                <div>
                    <div className={classes.name}>Nishanth</div>
                    <div>
                        <span className={classes.date}>Total Lend : </span>
                        <span className={classes.lend}>1245</span>
                    </div>
                    <div>
                        <span className={classes.date}>Total Borrow : </span>
                        <span className={classes.borrow}>4500</span>
                    </div>
                </div>
            </div>
            <div className={`${classes.amount} ${classes.lend}`}>5000</div>
        </div>
    );
};
export default DetailsBox;
