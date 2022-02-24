import React from "react";
import Avatar from "../../../../Expense/UI/Avatar/Avatar";
import NavItem from "../NavItem";

const Add = (props) => {
    return (
        <Avatar size="xl" color="primary" align="5">
            <NavItem
                path="payment"
                link="+"
                style={{
                    color: "white",
                    textDecoration: "none",
                }}
            />
        </Avatar>
    );
};
export default Add;
