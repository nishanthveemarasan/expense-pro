import React from "react";
import Avatar from "../../../../UI/Avatar/Avatar";
import classes from "./Option.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarAlt, faCogs } from "@fortawesome/free-solid-svg-icons";
const Option = (props) => {
    return (
        <div className="row" style={{ margin: "7% 0" }}>
            <div className={`col-4 ${classes.position}`}>{props.heading}</div>
            <div className={`col-6 ${classes.position}`}>
                {props.input ? (
                    <input
                        type={props.type}
                        className={classes.textbox}
                        value={props.value}
                        onChange={(e) => props.change(e)}
                        disabled={props.disabled}
                        style={{ color: props.tColor ? props.tColor : "black" }}
                    />
                ) : (
                    <div className={classes.today}>{props.value}</div>
                )}
            </div>
            <div className="col-2">
                <Avatar size="md" color={props.color}>
                    <FontAwesomeIcon
                        icon={props.faIcon}
                        className={classes.icon}
                        onClick={props.onPage}
                    />
                </Avatar>
            </div>
        </div>
    );
};

export default Option;
