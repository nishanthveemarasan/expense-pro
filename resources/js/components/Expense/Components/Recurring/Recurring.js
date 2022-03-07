import React from "react";
import Avatar from "../../UI/Avatar/Avatar";
import NavItem from "../../UI/Nav/NavItem";
import classes from "./Recurring.module.css";
const Recurring = (props) => {
    return (
        <>
            <div className={classes.add}>
                <Avatar size="xl" color="primary" align="5">
                    <NavItem
                        mainPage="recurring"
                        page="recurring"
                        link="+"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    />
                </Avatar>
            </div>
        </>
    );
};

export default Recurring;
