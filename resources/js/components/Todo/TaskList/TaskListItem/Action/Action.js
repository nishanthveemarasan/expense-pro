import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleUp,
    faArrowCircleDown,
    faTrashAlt,
    faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import classes from "../TaskListItem.module.css";

const Action = ({
    curIndex,
    length,
    moveItem,
    deleteItem,
    editItem,
    content,
}) => {
    // console.log(curIndex, length, moveItem);
    return (
        <>
            {curIndex != 0 && (
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    className={classes.up}
                    onClick={() => {
                        moveItem(curIndex, "up");
                    }}
                />
            )}
            {curIndex != length - 1 && (
                <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    className={classes.down}
                    onClick={() => {
                        moveItem(curIndex, "down");
                    }}
                />
            )}

            <FontAwesomeIcon
                icon={faFileSignature}
                className={classes.edit}
                onClick={() => {
                    editItem(curIndex, content);
                }}
            />
            <FontAwesomeIcon
                icon={faTrashAlt}
                className={classes.delete}
                onClick={() => {
                    deleteItem(curIndex);
                }}
            />
        </>
    );
};
export default Action;
