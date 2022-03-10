import React from "react";
import classes from "./ListItemDetails.module.css";
const ListItemSummary = (props) => {
    return (
        <div className={classes.summary}>
            <div>
                <span className={classes.color}>Payment Name : </span>
                {props.name}
            </div>
            <div>
                <span className={classes.color}>Cycle Length : </span>
                {props.num_of_pay == 0 ? "Unlimited" : props.num_of_pay}
            </div>
            <div>
                <span className={classes.color}>Payment Made: </span>
                {props.current_pay_num}
            </div>
            <div>
                <span className={classes.color}>Next Payment Date : </span>
                {props.next_pay_date}
            </div>
            <div>
                <span className={classes.color}>Category: </span>
                {props.category}
            </div>
            <div>
                <span className={classes.color}>Status: </span>
                <span
                    style={{
                        color: props.status == "active" ? "green" : "red",
                    }}
                >
                    {props.status}
                </span>
            </div>
        </div>
    );
};
export default ListItemSummary;
