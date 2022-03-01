import React from "react";
import classes from "./Transaction.module.css";
const TransactionItem = (props) => {
    return (
        <div className={classes.activityHeading}>
            <div className={classes.date}>{props.item.date}</div>
            <div
                className={
                    props.item.type == "expense"
                        ? classes.expensecat
                        : classes.incomecat
                }
            >
                {props.item.selectedCategory}
            </div>
            <div
                className={
                    props.item.type == "income"
                        ? classes.income
                        : classes.expense
                }
            >
                {props.item.amount}
            </div>
            <div>
                <i
                    className="bi bi-trash"
                    style={{ color: "red" }}
                    onClick={() => props.handler(props.id)}
                ></i>
            </div>
        </div>
    );
};
export default TransactionItem;
