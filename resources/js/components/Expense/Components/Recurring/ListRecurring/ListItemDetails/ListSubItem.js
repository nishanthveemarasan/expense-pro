import React from "react";
import classes from "./ListItemDetails.module.css";
const ListSubItem = (props) => {
    console.log(props);
    return (
        <div className={classes.subItemBox}>
            <div style={{ color: "blue" }}>{props.number + 1}</div>
            <div style={{ color: "blue" }}>{props.pay_date}</div>
            <div style={{ color: "blue" }}>{props.amount}</div>
        </div>
    );
};
export default ListSubItem;
