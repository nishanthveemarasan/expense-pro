import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../../UI/Avatar/Avatar";
import classes from "./Option.module.css";
const Option = (props) => {
    return (
        <div className="row" style={{ margin: "7% 0" }}>
            <div className={`col-3 ${classes.position}`}>{props.heading}</div>
            <div className={`col-7 ${classes.position}`}>
                <input type="text" className={classes.textbox} />
            </div>
            <div className="col-2">
                <Avatar size="md" color={props.color}>
                    {props.icon}
                </Avatar>
            </div>
        </div>
    );
};

export default Option;
