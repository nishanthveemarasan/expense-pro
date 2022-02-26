import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../../UI/Avatar/Avatar";
import classes from "./Option.module.css";
const Option = (props) => {
    return (
        <div className="row" style={{ margin: "7% 0" }}>
            <div className={`col-3 ${classes.position}`}>{props.heading}</div>
            <div className={`col-7 ${classes.position}`}>
                <input
                    type={props.type}
                    className={classes.textbox}
                    value={props.value}
                    onChange={(e) => props.change(e)}
                    disabled={props.disabled}
                    style={{ color: props.tColor ? props.tColor : "black" }}
                />
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
