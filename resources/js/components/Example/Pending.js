import React, { useState } from "react";
import InputCheck from "../Todo/UI/Input/InputCheck";
import classes from "./App.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlusSquare,
    faArrowCircleUp,
    faArrowCircleDown,
    faTrashAlt,
    faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

export const Pending = ({ items, cIndex, showIcon, moveItem }) => {
    // console.log(items);

    const onCheckChangeHandler = () => {};
    return (
        <div className="pending">
            {items &&
                items.map((item, i) => {
                    return (
                        <div className={`${classes.item} mb-2 mt-3`} key={i}>
                            <div
                                className="widget-todo-title-wrapper d-flex justify-content-between align-items-center "
                                style={{
                                    // marginTop: "4%",
                                    fontSize: "1rem",
                                }}
                                onClick={() => {
                                    showIcon(i);
                                }}
                            >
                                <div className="widget-todo-title-area d-flex align-items-center">
                                    <div className="checkbox checkbox-shadow">
                                        <InputCheck
                                            class="form-check-input"
                                            id={i}
                                            uuid={item.uuid}
                                            value={item.completed}
                                            change={onCheckChangeHandler}
                                        />
                                    </div>
                                    <span
                                        className="widget-todo-title"
                                        style={{ marginLeft: "8px" }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={classes.actions}
                                // style={{
                                //     display: i == i ? "block" : "none",
                                // }}
                            >
                                {i != 0 && (
                                    <FontAwesomeIcon
                                        icon={faArrowCircleUp}
                                        className={classes.up}
                                        onClick={() => {
                                            moveItem(i, "up");
                                        }}
                                    />
                                )}
                                {i != items.length - 1 && (
                                    <FontAwesomeIcon
                                        icon={faArrowCircleDown}
                                        className={classes.down}
                                        onClick={() => {
                                            moveItem(i, "down");
                                        }}
                                    />
                                )}

                                <FontAwesomeIcon
                                    icon={faFileSignature}
                                    className={classes.edit}
                                />
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className={classes.delete}
                                />
                            </div>
                        </div>
                    );
                    // return (
                    //     <p className="item" key={item.id}>
                    //         <div
                    //             onClick={() => {
                    //                 showIcon(i);
                    //             }}
                    //         >
                    //             {item.title}{" "}
                    //         </div>
                    //         <div
                    //             style={{
                    //                 display: cIndex == i ? "block" : "none",
                    //             }}
                    //         >
                    //             {i != 0 && (
                    //                 <button
                    //                     className="mark_complete"
                    //                     onClick={() => {
                    //                         updateStatus(item.id, i, "up");
                    //                     }}
                    //                 >
                    //                     u
                    //                 </button>
                    //             )}
                    //             {i != items.length - 1 && (
                    //                 <button
                    //                     className="mark_complete"
                    //                     onClick={() => {
                    //                         updateStatus(
                    //                             item.id,
                    //                             i,
                    //                             "down"
                    //                         );
                    //                     }}
                    //                 >
                    //                     d
                    //                 </button>
                    //             )}
                    //         </div>
                    //     </p>
                    // );
                })}
        </div>
    );
};
