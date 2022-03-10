import React from "react";
import { useDispatch } from "react-redux";
import { getFirstLetterUpperWord } from "../../../../../Helper/Helper";
import { expenseStoreAction } from "../../../../Store/Store";
import classes from "./Item.module.css";
const Item = (props) => {
    const dispatch = useDispatch();
    const onPageChangeHandler = () => {
        dispatch(
            expenseStoreAction.updateRecurringPage({
                page: "sub",
                data: props,
            })
        );
    };
    return (
        <div className={classes.activityHeading} onClick={onPageChangeHandler}>
            <div className={classes.activityBody}>
                <div>{props.name}</div>
                <div>{getFirstLetterUpperWord(props.pay_method)}</div>
                <div
                    className={
                        props.type == "income"
                            ? classes.income
                            : classes.expense
                    }
                >
                    {props.amount > 0
                        ? `£${props.amount}`
                        : `-£${Math.abs(props.amount)}`}
                </div>
            </div>
            <div
                className={classes.activityReverse}
                style={{ fontSize: "11px" }}
            >
                <div>
                    Cycle Paid: {props.current_pay_num}/
                    {props.susbscription_type == "limited"
                        ? props.num_of_pay
                        : "unlimited"}
                </div>
            </div>
            <div className={classes.activityBody} style={{ fontSize: "11px" }}>
                <div
                    className={
                        props.type == "income"
                            ? classes.incomeCategory
                            : classes.expenseCategory
                    }
                >
                    {props.category}
                </div>
                <div>
                    {props.status == "active" ? (
                        <span style={{ color: "green" }}>
                            Next Payment on: {props.next_pay_date}
                        </span>
                    ) : (
                        <span style={{ color: "red" }}>Completed</span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Item;
