import React from "react";
import Avatar from "../../../../Expense/UI/Avatar/Avatar";
import NavItem from "../NavItem";

const Add = (props) => {
    return (
        <Avatar size="xl" color="primary" align="5">
            <NavItem
                page={props.page}
                type={props.type}
                action={props.action}
                mainPage={props.mainPage}
                create={props.create}
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
